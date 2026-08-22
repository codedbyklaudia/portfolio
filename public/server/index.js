import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import 'dotenv/config';

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '6mb' })); // small headroom over a ~5MB attachment once base64-encoded

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = 'hello@codedbyklaudia.co.uk';

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'CodedByKlaudia <hello@codedbyklaudia.co.uk>';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LEN = 5000;
const MAX_SUBJECT_LEN = 200;

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Same shape of checks as the frontend, run again here — client-side
// validation is only ever a UX convenience, never a security
// boundary, since anyone can bypass it and hit this endpoint directly.
function validate({ from, subject, message }) {
  if (!from || typeof from !== 'string' || !EMAIL_RE.test(from.trim())) {
    return 'A valid email address is required.';
  }
  if (!subject || typeof subject !== 'string' || !subject.trim()) {
    return 'Subject is required.';
  }
  if (subject.length > MAX_SUBJECT_LEN) {
    return 'Subject is too long.';
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return 'Message is too short.';
  }
  if (message.length > MAX_MESSAGE_LEN) {
    return 'Message is too long.';
  }
  return null;
}

app.post('/api/contact', async (req, res) => {
  try {
    const { from, subject, message, attachment } = req.body || {};

    const validationError = validate({ from, subject, message });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const cleanFrom = from.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    // attachment (if present) is { name, type, base64 } from the
    // frontend, where base64 is a full data URL — Resend wants just
    // the base64 payload, not the "data:...;base64," prefix.
    const attachments = [];
    if (attachment?.base64 && attachment?.name) {
      const base64Content = String(attachment.base64).split(',').pop();
      // Basic sanity cap so someone can't smuggle a huge payload past
      // the frontend's own file-size check.
      if (base64Content && base64Content.length < 6_000_000) {
        attachments.push({ filename: attachment.name, content: base64Content });
      }
    }

    // 1. Notify Klaudia. reply-to is the visitor's own address, so
    //    hitting "Reply" in her inbox goes straight back to them —
    //    exactly the "answer the user straight away" behaviour asked
    //    for.
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: cleanFrom,
      subject: `New message from your site: ${cleanSubject}`,
      attachments,
      html: `
        <div style="font-family: -apple-system, sans-serif; line-height: 1.6; color: #1A1428;">
          <p><strong>From:</strong> ${escapeHtml(cleanFrom)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(cleanSubject)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #F5F3FA; padding: 16px; border-radius: 8px;">${escapeHtml(cleanMessage)}</p>
        </div>
      `,
    });

    // 2. Confirmation to the visitor.
    await resend.emails.send({
      from: FROM_EMAIL,
      to: cleanFrom,
      subject: `Got your message — I'll be in touch soon!`,
      html: `
        <div style="font-family: -apple-system, sans-serif; line-height: 1.6; color: #1A1428;">
          <p>Hey there,</p>
          <p>Thanks for reaching out — I've received your message and will get back to you as soon as I can.</p>
          <p>Here's a copy of what you sent, for your records:</p>
          <blockquote style="border-left: 3px solid #7C3AED; margin: 16px 0; padding-left: 14px; color: #4b4560;">
            <strong>${escapeHtml(cleanSubject)}</strong><br/>
            <span style="white-space: pre-wrap;">${escapeHtml(cleanMessage)}</span>
          </blockquote>
          <p>Talk soon,<br/>Klaudia 🐾</p>
        </div>
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({
      error: "Something went wrong sending your message. Please try again, or email hello@codedbyklaudia.co.uk directly.",
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Contact API listening on :${PORT}`));