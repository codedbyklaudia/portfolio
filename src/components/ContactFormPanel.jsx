import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const WORD_ROTATE_MS = 2000;
const EMAIL = 'hello@codedbyklaudia.co.uk';
const PHONE_DISPLAY = '+44 737 669 8047';
const PHONE_HREF = 'tel:+447376698047';

const API_URL = import.meta.env.VITE_CONTACT_API_URL || 'http://localhost:3001/api/contact';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LEN = 10;
const MAX_ATTACHMENT_MB = 5;


export default function ContactFormPanel() {
  const { t } = useLanguage();
  const fileRef     = useRef(null);
  const textareaRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [formOpen, setFormOpen]   = useState(false);

  const words = t('contact.title3Words');

  const [form, setForm]               = useState({ from: '', subject: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [sendError, setSendError]     = useState('');
  const [sent, setSent]               = useState(false);
  const [sending, setSending]         = useState(false);
  const [attachment, setAttachment]   = useState(null); // { name, type, base64 }
  const [attachError, setAttachError] = useState('');
  const [showEmojis, setShowEmojis]   = useState(false);

  useEffect(() => {
    if (!Array.isArray(words)) return;
    const id = setInterval(() => setWordIndex(i => (i + 1) % words.length), WORD_ROTATE_MS);
    return () => clearInterval(id);
  }, [words]);

  const openForm = (e) => {
    e?.preventDefault();
    setFormOpen(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setFieldErrors(errs => (errs[name] ? { ...errs, [name]: '' } : errs));
  };

  const validate = () => {
    const errs = {};
    if (!form.from.trim()) {
      errs.from = t('contact.mail.errorRequired');
    } else if (!EMAIL_RE.test(form.from.trim())) {
      errs.from = t('contact.mail.errorEmailInvalid');
    }
    if (!form.subject.trim()) {
      errs.subject = t('contact.mail.errorRequired');
    }
    if (!form.message.trim()) {
      errs.message = t('contact.mail.errorRequired');
    } else if (form.message.trim().length < MIN_MESSAGE_LEN) {
      errs.message = t('contact.mail.errorMessageShort');
    }
    return errs;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setSendError('');

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setSending(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: form.from.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          attachment: attachment ? { name: attachment.name, type: attachment.type, base64: attachment.base64 } : null,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setSendError(data.error || t('contact.mail.errorGeneric'));
        setSending(false);
        return;
      }

      setSending(false);
      setSent(true);
    } catch (err) {
      setSendError(t('contact.mail.errorGeneric'));
      setSending(false);
    }
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setAttachError('');

    if (f.size > MAX_ATTACHMENT_MB * 1024 * 1024) {
      setAttachError(t('contact.mail.errorAttachmentSize'));
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAttachment({ name: f.name, type: f.type, base64: reader.result });
    };
    reader.onerror = () => {
      setAttachError(t('contact.mail.errorAttachmentRead'));
    };
    reader.readAsDataURL(f);
  };

  const handleEmoji = (emoji) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const pos = ta.selectionStart;
    const newMsg = form.message.slice(0, pos) + emoji + form.message.slice(pos);
    setForm(f => ({ ...f, message: newMsg }));
    setTimeout(() => { ta.selectionStart = ta.selectionEnd = pos + emoji.length; ta.focus(); }, 0);
  };

  const EMOJIS = ['👋','🚀','💡','✨','🎯','💻','🐾','☕'];
  const displayWord = Array.isArray(words) ? words[wordIndex] : t('contact.title3');

  const dockItems = [
    { key: 'instagram', label: 'Instagram', href: 'https://instagram.com/codedbyklaudia', emoji: '📷' },
    { key: 'linkedin',  label: 'LinkedIn',  href: 'https://linkedin.com/',                emoji: 'in' },
    { key: 'github',    label: 'GitHub',    href: 'https://github.com/',                  emoji: '🐙' },
    { key: 'mail',      label: t('contact.dock.email'), href: `mailto:${EMAIL}`,           emoji: '✉️', onClick: openForm },
    { key: 'phone',     label: t('contact.dock.call'),  href: PHONE_HREF,                  emoji: '📞' },
  ];

  const renderDock = () => (
    <div className="contact-dock">
      {dockItems.map(item => {
        const isExternal = item.href.startsWith('http');
        return (
          <a
            key={item.key}
            href={item.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="contact-dock-icon"
            aria-label={item.label}
            onClick={item.onClick}
          >
            <img
              src={`/images/${item.key}.png`}
              alt=""
              className="contact-dock-img"
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <span className="contact-dock-fallback" style={{ display: 'none' }}>
              {item.emoji}
            </span>
          </a>
        );
      })}
    </div>
  );

  const heading = (
    <h2 className={`contact-h2 ${formOpen ? '' : 'contact-h2--hero'}`}>
      {t('contact.title1')} 
       {t('contact.title2')}<br />
      <span key={wordIndex} className="contact-h2-word">{displayWord}</span>
    </h2>
  );

  // ── Closed state: full-screen title + visible email/phone + dock ──
  if (!formOpen) {
    return (
      <div className="contact-form-panel">
        <div className="contact-hero-bg" aria-hidden="true">
          <span className="contact-hero-blob contact-hero-blob--1" />
          <span className="contact-hero-blob contact-hero-blob--2" />
        </div>

        <div className="contact-hero">
          <div className="contact-hero-badge">
            <span className="contact-hero-pulse" />
            {t('contact.hero.available')}
          </div>

          {heading}

          <div className="contact-hero-contacts">
            <a href={`mailto:${EMAIL}`} className="contact-hero-email" onClick={openForm}>
              {EMAIL}
            </a>
            <span className="contact-hero-divider">·</span>
            <a href={PHONE_HREF} className="contact-hero-phone">{PHONE_DISPLAY}</a>
          </div>
          <p>Looking for form? Click on email.</p>

          {renderDock()}
        </div>
      </div>
    );
  }

  // ── Open state: kicker + heading + tagline + mail card + dock ──
  return (
    <div className="contact-form-panel contact-form-panel--active">
      <div className="contact-layout">

        <div className="contact-left">
          {heading}
          <p className="contact-tagline">{t('contact.tagline')}</p>
        </div>

        <div className="contact-right">
          <div className="mac-mail">
            <div className="mm-titlebar">
              <div className="mm-dots">
                <button
                  type="button"
                  className="mm-dot mm-dot--red"
                  onClick={() => setFormOpen(false)}
                  aria-label={t('contact.mail.close')}
                  title={t('contact.mail.close')}
                />
                <span className="mm-dot mm-dot--yellow" />
                <span className="mm-dot mm-dot--green" />
              </div>
              <span className="mm-title">{t('contact.mail.newMessage')}</span>
              <div className="mm-actions">
                <button className="mm-action-btn" type="button">Aa</button>
              </div>
            </div>

            {sent ? (
              <div className="mm-sent">
                <span className="mm-sent-icon">✉️</span>
                <p className="mm-sent-title">{t('contact.mail.sentTitle')}</p>
                <p className="mm-sent-sub">{t('contact.mail.sentSub')}</p>
                <button
                  className="mm-new-btn"
                  onClick={() => {
                    setSent(false);
                    setForm({ from: '', subject: '', message: '' });
                    setAttachment(null);
                    setFieldErrors({});
                    setSendError('');
                  }}
                >
                  {t('contact.mail.newMessageBtn')}
                </button>
              </div>
            ) : (
              <form className="mm-form" onSubmit={handleSend} noValidate>
                <div className={`mm-field ${fieldErrors.from ? 'mm-field--error' : ''}`}>
                  <label className="mm-label">{t('contact.mail.to')}</label>
                  <input className="mm-input" value={EMAIL} readOnly tabIndex={-1} />
                </div>

                <div className={`mm-field ${fieldErrors.from ? 'mm-field--error' : ''}`}>
                  <label className="mm-label">{t('contact.mail.from')}</label>
                  <input
                    className="mm-input"
                    name="from"
                    type="email"
                    placeholder={t('contact.mail.fromPlaceholder')}
                    onChange={handleChange}
                    value={form.from}
                    aria-invalid={!!fieldErrors.from}
                    autoFocus
                  />
                </div>
                {fieldErrors.from && <p className="mm-error-text">{fieldErrors.from}</p>}

                <div className={`mm-field ${fieldErrors.subject ? 'mm-field--error' : ''}`}>
                  <label className="mm-label">{t('contact.mail.subject')}</label>
                  <input
                    className="mm-input"
                    name="subject"
                    type="text"
                    placeholder={t('contact.mail.subjectPlaceholder')}
                    value={form.subject}
                    onChange={handleChange}
                    aria-invalid={!!fieldErrors.subject}
                  />
                </div>
                {fieldErrors.subject && <p className="mm-error-text">{fieldErrors.subject}</p>}

                {attachment && (
                  <div className="mm-attachment">
                    <span>📎 {attachment.name}</span>
                    <button type="button" className="mm-remove-att" onClick={() => setAttachment(null)}>✕</button>
                  </div>
                )}
                {attachError && <p className="mm-error-text mm-error-text--attachment">{attachError}</p>}

                <div className="mm-divider" />

                <textarea
                  ref={textareaRef}
                  className={`mm-body ${fieldErrors.message ? 'mm-body--error' : ''}`}
                  name="message"
                  placeholder={t('contact.mail.bodyPlaceholder')}
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  aria-invalid={!!fieldErrors.message}
                />
                {fieldErrors.message && <p className="mm-error-text mm-error-text--body">{fieldErrors.message}</p>}

                {showEmojis && (
                  <div className="mm-emoji-picker">
                    {EMOJIS.map(e => (
                      <button key={e} type="button" className="mm-emoji-btn"
                        onClick={() => { handleEmoji(e); setShowEmojis(false); }}>
                        {e}
                      </button>
                    ))}
                  </div>
                )}

                {sendError && <p className="mm-send-error">{sendError}</p>}

                <div className="mm-toolbar">
                  <div className="mm-toolbar-left">
                    <button type="button" className="mm-tool" title="Attach file"
                      onClick={() => fileRef.current?.click()}>📎</button>
                    <input ref={fileRef} type="file" style={{display:'none'}} onChange={handleFile} />
                    <button type="button" className="mm-tool" title="Emoji"
                      onClick={() => setShowEmojis(s => !s)}>😊</button>
                  </div>
                  <button type="submit" className="mm-send-btn" disabled={sending}>
                    {sending ? <span className="mm-spinner" /> : <>{t('contact.mail.send')} <span className="mm-send-arrow">↑</span></>}
                  </button>
                </div>
              </form>
            )}
          </div>

          {renderDock()}
        </div>

      </div>
    </div>
  );
}