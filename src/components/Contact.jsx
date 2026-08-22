import { useEffect } from 'react';
import { useContactStage } from '../context/ContactStageContext';
import ContactFormPanel from './ContactFormPanel';
import './Contact.scss';

export default function Contact() {
  const { setStage } = useContactStage();

  useEffect(() => {
    setStage('intro');
  }, [setStage]);

  return (
    <div className="contact-wrap">
      <ContactFormPanel />
    </div>
  );
}