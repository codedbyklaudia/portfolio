import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContactStage } from '../context/ContactStageContext';
import { InstagramIcon, LinkedinIcon, GithubIcon } from './SocialIcons';
import './Contact.scss';

const EMAIL = 'hello@codedbyklaudia.co.uk';
const PHONE_DISPLAY = '+44 737 669 8047';
const PHONE_HREF = 'tel:+447376698047';

// Same profile links and icons as the footer
const SOCIALS = [
  { key: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/codedbyklaudia', Icon: InstagramIcon },
  { key: 'linkedin',  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/klaudia-kulawik-886b952bb/', Icon: LinkedinIcon },
  { key: 'github',    label: 'GitHub',    href: 'https://github.com/codedbyklaudia', Icon: GithubIcon },
];

// Your backend. In production VITE_CONTACT_API_URL must be set (see notes);
// localhost is only used while developing.
const API_URL =
  import.meta.env.VITE_CONTACT_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:3001/api/contact' : '');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LEN = 10;
const MAX_ATTACHMENT_MB = 5;
const REQUEST_TIMEOUT_MS = 40000; // free hosting can take a while to wake up
const EMOJIS = ['👋', '🚀', '💡', '✨', '🎯', '💻', '🐾', '☕'];

const EMPTY = { from: '', subject: '', message: '' };

// The topic chips above the form: each fills in the subject and starts the message
// (the subject and starter are translated as `${key}.subject` and `${key}.starter`)
const TOPICS = [
  { id: 'website', emoji: '🌐', key: 'contact.topic.website', label: 'A website' },
  { id: 'app', emoji: '📱', key: 'contact.topic.app', label: 'An app' },
  { id: 'collab', emoji: '🤝', key: 'contact.topic.collab', label: 'Working together' },
  { id: 'hi', emoji: '👋', key: 'contact.topic.hi', label: 'Just saying hi' },
];

export default function Contact() {
  const { t } = useLanguage();
  const { setStage } = useContactStage();

  // Translation with an English fallback for keys that don't exist yet
  const tr = (key, fallback) => {
    const value = t(key);
    return !value || value === key ? fallback : value;
  };

  useEffect(() => {
    setStage('intro');
  }, [setStage]);

  // Fade in once when the section scrolls into view
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const fileRef = useRef(null);
  const textareaRef = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Static headline, last word in the accent colour
  const heading = tr('contact.heading', 'Let’s build something together.');
  const lastSpace = heading.lastIndexOf(' ');
  const headingStart = lastSpace > 0 ? heading.slice(0, lastSpace + 1) : heading;
  const headingEnd = lastSpace > 0 ? heading.slice(lastSpace + 1) : '';

  const [form, setForm] = useState(EMPTY);
  const [fieldErrors, setFieldErrors] = useState({});
  const [sendError, setSendError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto
  const [attachment, setAttachment] = useState(null); // { name, type, base64 }
  const [attachError, setAttachError] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [topic, setTopic] = useState(null);

  // choosing a topic fills in the subject, and starts the message if it's still empty
  const pickTopic = (tp) => {
    const starter = t(`${tp.key}.starter`);
    setTopic(tp.id);
    setForm((f) => ({
      ...f,
      subject: t(`${tp.key}.subject`),
      message: !f.message.trim() || TOPICS.some((o) => t(`${o.key}.starter`) === f.message) ? starter : f.message,
    }));
    setFieldErrors((errs) => ({ ...errs, subject: '', message: '' }));
    setTimeout(() => {
      const ta = textareaRef.current;
      if (!ta) return;
      ta.focus();
      ta.selectionStart = ta.selectionEnd = ta.value.length;
    }, 0);
  };

  const socials = SOCIALS.filter((s) => s.href);

  const validate = () => {
    const errs = {};
    if (!form.from.trim()) errs.from = t('contact.mail.errorRequired');
    else if (!EMAIL_RE.test(form.from.trim())) errs.from = t('contact.mail.errorEmailInvalid');

    if (!form.subject.trim()) errs.subject = t('contact.mail.errorRequired');

    if (!form.message.trim()) errs.message = t('contact.mail.errorRequired');
    else if (form.message.trim().length < MIN_MESSAGE_LEN) errs.message = t('contact.mail.errorMessageShort');
    return errs;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setFieldErrors((errs) => (errs[name] ? { ...errs, [name]: '' } : errs));
  };

  const onFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAttachError('');

    if (file.size > MAX_ATTACHMENT_MB * 1024 * 1024) {
      setAttachError(t('contact.mail.errorAttachmentSize'));
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setAttachment({ name: file.name, type: file.type, base64: reader.result });
    reader.onerror = () => setAttachError(t('contact.mail.errorAttachmentRead'));
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setAttachment(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const addEmoji = (emoji) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const pos = ta.selectionStart;
    const message = form.message.slice(0, pos) + emoji + form.message.slice(pos);
    setForm((f) => ({ ...f, message }));
    setShowEmojis(false);
    setTimeout(() => {
      ta.selectionStart = ta.selectionEnd = pos + emoji.length;
      ta.focus();
    }, 0);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setSendError('');

    const errs = validate();
    setFieldErrors(errs);
    const firstInvalid = Object.keys(errs)[0];
    if (firstInvalid) {
      formRef.current?.elements.namedItem(firstInvalid)?.focus();
      return;
    }

    const payload = {
      from: form.from.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
      attachment: attachment
        ? { name: attachment.name, type: attachment.type, base64: attachment.base64 }
        : null,
    };

    // No backend configured (e.g. missing env var in production):
    // open the visitor's email app instead of failing silently.
    if (!API_URL) {
      const subject = encodeURIComponent(payload.subject);
      const body = encodeURIComponent(`${payload.message}\n\n${payload.from}`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setSendError(data.error || t('contact.mail.errorGeneric'));
        setStatus('idle');
        return;
      }
      setStatus('sent');
    } catch {
      setSendError(t('contact.mail.errorGeneric'));
      setStatus('idle');
    } finally {
      clearTimeout(timer);
    }
  };

  const reset = () => {
    setStatus('idle');
    setTopic(null);
    setForm(EMPTY);
    setAttachment(null);
    setFieldErrors({});
    setSendError('');
  };

  const done = status === 'sent' || status === 'mailto';

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`ct ${inView ? 'ct--in' : ''}`}
    >
      <div className="ct__inner">

        {/* Top: the headline, with the tagline beside it */}
        <header className="ct__intro">
          <h2 className="ct__title">
            {headingStart}
            {headingEnd && <em className="ct__accent">{headingEnd}</em>}
          </h2>
          <p className="ct__tagline">{t('contact.tagline')}</p>
        </header>

        <div className="ct__grid">
        {/* Mac mail window */}
        <div className="ct__panel">
          <div className="ct__mail">
            <div className="ct__mail-bar">
              <div className="ct__dots" aria-hidden="true">
                <span className="ct__dot ct__dot--r" />
                <span className="ct__dot ct__dot--y" />
                <span className="ct__dot ct__dot--g" />
              </div>
              <span className="ct__mail-title">{t('contact.mail.newMessage')}</span>
            </div>

            {done ? (
              <div className="ct__done" role="status">
                <span className="ct__done-icon" aria-hidden="true">
                  <svg className="ct__done-plane" viewBox="0 0 24 24">
                    <path d="M3 11.5 21 3l-6.5 18-3.2-7.3L3 11.5z" />
                    <path d="M11.3 13.7 21 3" />
                  </svg>
                </span>
                <h3>{status === 'sent' ? t('contact.mail.sentTitle') : tr('contact.almost', 'Almost there.')}</h3>
                <p>
                  {status === 'sent'
                    ? t('contact.mail.sentSub')
                    : `${tr('contact.mailtoText', 'Your email app should open with the message ready. If nothing happens, write to')} ${EMAIL}.`}
                </p>
                <button type="button" className="ct__new" onClick={reset}>
                  {t('contact.mail.newMessageBtn')}
                </button>
              </div>
            ) : (
              <form ref={formRef} className="ct__form" onSubmit={onSubmit} noValidate>
                <fieldset className="ct__topics">
                  <legend>{tr('contact.topic.label', "What's it about?")}</legend>
                  <div className="ct__chips">
                    {TOPICS.map((tp) => (
                      <button
                        key={tp.id}
                        type="button"
                        className={`ct__chip ${topic === tp.id ? 'ct__chip--on' : ''}`}
                        aria-pressed={topic === tp.id}
                        onClick={() => pickTopic(tp)}
                      >
                        <span aria-hidden="true">{tp.emoji}</span> {tr(tp.key, tp.label)}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="ct__row">
                  <label htmlFor="ct-to">{t('contact.mail.to')}</label>
                  <input id="ct-to" className="ct__input" value={EMAIL} readOnly tabIndex={-1} />
                </div>

                <div className={`ct__row ${fieldErrors.from ? 'ct__row--error' : ''}`}>
                  <label htmlFor="ct-from">{t('contact.mail.from')}</label>
                  <input
                    id="ct-from"
                    className="ct__input"
                    name="from"
                    type="email"
                    autoComplete="email"
                    placeholder={t('contact.mail.fromPlaceholder')}
                    value={form.from}
                    onChange={onChange}
                    aria-invalid={!!fieldErrors.from}
                    aria-describedby={fieldErrors.from ? 'ct-from-error' : undefined}
                  />
                </div>
                {fieldErrors.from && <p id="ct-from-error" className="ct__error">{fieldErrors.from}</p>}

                <div className={`ct__row ${fieldErrors.subject ? 'ct__row--error' : ''}`}>
                  <label htmlFor="ct-subject">{t('contact.mail.subject')}</label>
                  <input
                    id="ct-subject"
                    className="ct__input"
                    name="subject"
                    type="text"
                    placeholder={t('contact.mail.subjectPlaceholder')}
                    value={form.subject}
                    onChange={onChange}
                    aria-invalid={!!fieldErrors.subject}
                    aria-describedby={fieldErrors.subject ? 'ct-subject-error' : undefined}
                  />
                </div>
                {fieldErrors.subject && <p id="ct-subject-error" className="ct__error">{fieldErrors.subject}</p>}

                {attachment && (
                  <div className="ct__att">
                    <span>📎 {attachment.name}</span>
                    <button type="button" onClick={removeFile} aria-label={t('contact.mail.removeAttachment')}>✕</button>
                  </div>
                )}
                {attachError && <p className="ct__error">{attachError}</p>}

                <textarea
                  ref={textareaRef}
                  id="ct-message"
                  className={`ct__body ${fieldErrors.message ? 'ct__body--error' : ''}`}
                  name="message"
                  rows={6}
                  placeholder={t('contact.mail.bodyPlaceholder')}
                  value={form.message}
                  onChange={onChange}
                  aria-label={tr('contact.mail.message', 'Message')}
                  aria-invalid={!!fieldErrors.message}
                  aria-describedby={fieldErrors.message ? 'ct-message-error' : undefined}
                />
                {fieldErrors.message && <p id="ct-message-error" className="ct__error">{fieldErrors.message}</p>}

                {showEmojis && (
                  <div className="ct__emojis">
                    {EMOJIS.map((emoji) => (
                      <button key={emoji} type="button" onClick={() => addEmoji(emoji)}>
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}

                {sendError && (
                  <p className="ct__fail" role="alert">
                    {sendError}
                    {/* The translated generic message already includes the address */}
                    {!sendError.includes(EMAIL) && (
                      <> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></>
                    )}
                  </p>
                )}

                <div className="ct__toolbar">
                  <div className="ct__tools">
                    <button
                      type="button"
                      className="ct__tool"
                      title={tr('contact.mail.attach', 'Attach a file')}
                      aria-label={tr('contact.mail.attach', 'Attach a file')}
                      onClick={() => fileRef.current?.click()}
                    >
                      📎
                    </button>
                    <input ref={fileRef} type="file" hidden onChange={onFile} />
                    <button
                      type="button"
                      className="ct__tool"
                      title={t('contact.mail.emoji')}
                      aria-label={t('contact.mail.emoji')}
                      onClick={() => setShowEmojis((s) => !s)}
                    >
                      😊
                    </button>
                  </div>

                  <button type="submit" className="ct__submit" disabled={status === 'sending'}>
                    {status === 'sending'
                      ? <span className="ct__spinner" aria-label={tr('contact.sending', 'Sending…')} />
                      : (
                        <>
                          {t('contact.mail.send')}
                          <svg className="ct__plane" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M3 11.5 21 3l-6.5 18-3.2-7.3L3 11.5z" />
                            <path d="M11.3 13.7 21 3" />
                          </svg>
                        </>
                      )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Beside it: the other ways to reach me, as little widgets */}
        <aside className="ct__side">
          <a className="ct__card" href={`mailto:${EMAIL}`}>
            <span className="ct__card-icon" aria-hidden="true">✉️</span>
            <span className="ct__card-text">
              <span className="ct__card-label">{tr('contact.card.email', 'Email')}</span>
              <span className="ct__card-value">{EMAIL}</span>
            </span>
            <span className="ct__card-arrow" aria-hidden="true">↗</span>
          </a>
          <a className="ct__card" href={PHONE_HREF}>
            <span className="ct__card-icon" aria-hidden="true">📞</span>
            <span className="ct__card-text">
              <span className="ct__card-label">{tr('contact.card.phone', 'Phone')}</span>
              <span className="ct__card-value">{PHONE_DISPLAY}</span>
            </span>
            <span className="ct__card-arrow" aria-hidden="true">↗</span>
          </a>

          {socials.length > 0 && (
            <div className="ct__card ct__card--socials">
              <span className="ct__card-label">{tr('contact.card.socials', 'Find me online')}</span>
              <ul className="ct__socials">
                {socials.map(({ key, label, href, Icon }) => (
                  <li key={key}>
                    <a
                      className="ct__social"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                    >
                      <Icon size={20} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="ct__reply">
            <span className="ct__reply-dot" aria-hidden="true" />
            {tr('contact.replyNote', 'Usually replies within a day')}
          </p>
        </aside>
        </div>
      </div>
    </section>
  );
}