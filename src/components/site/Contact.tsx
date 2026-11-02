import { CalendarDays } from 'lucide-react';
import { ContactForm } from '../ContactForm';
import { whatsappLink, WHATSAPP_DISPLAY, US_PHONE_TEL, US_PHONE_DISPLAY, EMAIL } from '../../lib/contact';

export function Contact({ onBook }: { onBook: () => void }) {
  return (
    <section className="sec" id="contact">
      <div className="wrap contact">
        <div>
          <div className="label">Contact</div>
          <h2 className="h2">Let's talk about your stores.</h2>
          <p className="lead">A free 15-minute call. We'll find your biggest gaps. No pressure, no commitment.</p>
          <div style={{ marginTop: 26 }}><button className="btn accent" onClick={onBook}><CalendarDays size={17} /> Pick a date and time</button></div>
          <div className="ch">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><span>WhatsApp</span><b>{WHATSAPP_DISPLAY}</b></a>
            <a href={`tel:${US_PHONE_TEL}`}><span>US phone</span><b>{US_PHONE_DISPLAY}</b></a>
            <a href={`mailto:${EMAIL}`}><span>Email</span><b>{EMAIL}</b></a>
            <div><span>Response time</span><b>Within 24 hours</b></div>
          </div>
        </div>
        <div className="form"><ContactForm /></div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap in">
        <span>© {new Date().getFullYear()} BringIT. Remote operations & revenue control for restaurants.</span>
        <span><a href="#services">Services</a><a href="#packages">Packages</a><a href="#security">Security</a><a href="#/privacy">Privacy Policy</a></span>
      </div>
    </footer>
  );
}
