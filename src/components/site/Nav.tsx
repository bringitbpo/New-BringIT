import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { whatsappLink } from '../../lib/contact';

const LINKS = [
  ['#services', 'Services'],
  ['#disputes', 'Chargebacks'],
  ['#how', 'How we work'],
  ['#about', 'About'],
  ['#packages', 'Packages'],
  ['#contact', 'Contact'],
];

export function Nav({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="wrap in">
        <a href="#top" aria-label="BringIT home"><img src="/LOGO_1_1_no_BG.png" alt="BringIT" /></a>
        <nav className="links">{LINKS.map(([href, t]) => <a key={href} href={href}>{t}</a>)}</nav>
        <div className="acts">
          <a className="btn ghost" href={whatsappLink("Hi! I'd like to know more about BringIT pricing.")} target="_blank" rel="noopener noreferrer">Get pricing</a>
          <button className="btn accent" onClick={onBook}>Book a call</button>
          <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <nav className="mnav">
          {LINKS.map(([href, t]) => <a key={href} href={href} onClick={() => setOpen(false)}>{t}</a>)}
          <a href={whatsappLink("Hi! I'd like to know more about BringIT pricing.")} target="_blank" rel="noopener noreferrer">Get pricing on WhatsApp</a>
        </nav>
      )}
    </header>
  );
}
