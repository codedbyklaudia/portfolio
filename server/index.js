import 'dotenv/config';
import path from 'node:path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';

const {
  PORT = 3001,
  MAIL_TO = 'hello@codedbyklaudia.co.uk',
  CORS_ORIGIN = 'http://localhost:5173',
  MAIL_DRY_RUN,
  // Resend (preferred)
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
  // SMTP (fallback if there is no Resend key)
  MAIL_FROM,
  SMTP_HOST,
  SMTP_PORT = '587',
  SMTP_USER,
  SMTP_PASS,
} = process.env;

const RESEND_URL = process.env.RESEND_API_URL || 'https://api.resend.com/emails';
const dryRun = MAIL_DRY_RUN === 'true';
const smtpConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

// ── How emails get sent ─────────────────────────────────────
let smtp = null;
if (dryRun) {
  console.log('Dry run: emails are printed here, not sent.');
} else if (RESEND_API_KEY) {
  console.log(`Sending with Resend, from ${RESEND_FROM_EMAIL || '(RESEND_FROM_EMAIL is not set)'}`);
  if (!RESEND_FROM_EMAIL) console.warn('Set RESEND_FROM_EMAIL, for example: CodedByKlaudia <hello@codedbyklaudia.co.uk>');
} else if (smtpConfigured) {
  smtp = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  smtp
    .verify()
    .then(() => console.log('SMTP connection OK'))
    .catch((err) => console.warn('SMTP connection failed:', err.message));
} else {
  console.warn('No email provider configured. Set RESEND_API_KEY (or the SMTP_* values) in .env.');
}

// Sends one email through whichever provider is configured. Throws on failure.
async function deliver({ subject, text, html, replyTo, file }) {
  if (dryRun) {
    console.log(JSON.stringify({ to: MAIL_TO, replyTo, subject, text, attachment: file?.filename ?? null }, null, 2));
    return;
  }

  if (RESEND_API_KEY) {
    if (!RESEND_FROM_EMAIL) throw new Error('RESEND_FROM_EMAIL is not set');
    const res = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [MAIL_TO],
        reply_to: replyTo,
        subject,
        text,
        html,
        attachments: file
          ? [{ filename: file.filename, content: file.content.toString('base64') }]
          : undefined,
      }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(`Resend ${res.status}: ${body.message || 'request failed'}`);
    }
    return;
  }

  if (smtp) {
    await smtp.sendMail({
      from: MAIL_FROM || SMTP_USER,
      to: MAIL_TO,
      replyTo,
      subject,
      text,
      html,
      attachments: file ? [file] : [],
    });
    return;
  }

  throw new Error('No email provider configured');
}

// ── Validation helpers ──────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LEN = 10;
const MAX_MESSAGE_LEN = 5000;
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
const BLOCKED_EXTENSIONS = new Set([
  '.exe', '.bat', '.cmd', '.com', '.scr', '.msi', '.js', '.jar',
  '.vbs', '.ps1', '.sh', '.app', '.dmg', '.apk', '.lnk',
]);

// Single-line text: no line breaks (blocks email header injection)
const oneLine = (value, max) =>
  String(value ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Turns the browser's data URL into an attachment, or throws a readable error
function parseAttachment(attachment) {
  if (!attachment) return null;

  const match = /^data:([^;]*);base64,(.+)$/s.exec(String(attachment.base64 ?? ''));
  if (!match) throw new Error('The attachment could not be read.');

  const content = Buffer.from(match[2], 'base64');
  if (content.length > MAX_ATTACHMENT_BYTES) throw new Error('The attachment is too large (5MB max).');

  const filename =
    path.basename(String(attachment.name || 'attachment')).replace(/[^\w.\- ()]/g, '_').slice(0, 100) ||
    'attachment';
  if (BLOCKED_EXTENSIONS.has(path.extname(filename).toLowerCase())) {
    throw new Error('That file type is not allowed.');
  }

  return { filename, content, contentType: match[1] || undefined };
}

// ── App ─────────────────────────────────────────────────────
const app = express();
app.set('trust proxy', 1); // correct visitor IPs behind Render, Railway, etc.
app.use(helmet());
app.use(
  cors({
    origin: CORS_ORIGIN.split(',').map((o) => o.trim()),
    methods: ['GET', 'POST'],
  })
);
app.use(express.json({ limit: '8mb' })); // 5MB file is ~6.7MB as base64

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5, // successful sends per visitor per window
  skipFailedRequests: true, // typos and validation errors don't use up the limit
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Please try again in a few minutes.' },
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  const from = oneLine(req.body?.from, 254);
  const subject = oneLine(req.body?.subject, 150);
  const message = String(req.body?.message ?? '').trim();

  if (!EMAIL_RE.test(from)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  if (!subject) return res.status(400).json({ error: 'Please add a subject.' });
  if (message.length < MIN_MESSAGE_LEN) return res.status(400).json({ error: 'Your message is too short.' });
  if (message.length > MAX_MESSAGE_LEN) return res.status(400).json({ error: 'Your message is too long.' });

  let file;
  try {
    file = parseAttachment(req.body?.attachment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  try {
    await deliver({
      subject: `[Portfolio] ${subject}`,
      replyTo: from, // Reply goes straight to the visitor
      text: `${message}\n\n--\nFrom: ${from}`,
      html: `
        <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#1d1a18">
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
          <hr style="border:none;border-top:1px solid #ddd;margin:24px 0" />
          <p style="color:#666">From: <a href="mailto:${escapeHtml(from)}">${escapeHtml(from)}</a></p>
        </div>`,
      file,
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error('Send failed:', err.message);
    // No `error` text: the website then shows its own translated message
    return res.status(500).json({ ok: false });
  }
});

// Oversized or malformed requests
app.use((err, _req, res, _next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'That file is too large (5MB max).' });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid request.' });
  }
  console.error(err);
  return res.status(500).json({ ok: false });
});

app.listen(PORT, () => console.log(`Contact API listening on port ${PORT}`));