import { useLanguage } from '../context/LanguageContext';

export default function ContactIntro({ visible, onTalkClick }) {
  const { t } = useLanguage();

  return (
    <section id="contact" className={`contact-intro ${visible ? '' : 'contact-intro--hidden'}`}>
      <div className="contact-intro-inner">
        <h2 className="contact-intro-h2">
          {t('contact.title1')}<br />
          {t('contact.title2')}<br />
          <span className="contact-h2-word">{t('contact.title3')}</span>
        </h2>

        <button className="contact-cta" onClick={onTalkClick} tabIndex={visible ? 0 : -1}>
          {t('contact.cta')} <span className="contact-cta-arrow">→</span>
        </button>
      </div>
    </section>
  );
}