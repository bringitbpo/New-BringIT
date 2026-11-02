import { MessageCircle } from 'lucide-react';
import { packages, addOns, testimonial } from '../../content/site';
import { whatsappLink } from '../../lib/contact';
import { Expandable } from './Expandable';

export function Packages() {
  return (
    <section className="sec" id="packages">
      <div className="wrap">
        <div className="label">Packages</div>
        <h2 className="h2">Choose your level of coverage.</h2>
        <p className="lead">Month to month, no long-term contract. Pricing depends on your stores, so message us on WhatsApp for a quick quote.</p>
        <div className="pk">
          {packages.map((p) => (
            <div className={`pc ${p.popular ? 'pop' : ''}`} key={p.name}>
              <div className="t"><h3>{p.name}</h3>{p.popular && <span className="tag">Most popular</span>}</div>
              <div className="for">{p.audience}</div>
              <ul>{p.features.slice(0, 3).map((f) => <li key={f}>{f}</li>)}</ul>
              <Expandable items={p.features.slice(3)} label="See everything included" />
              <a className={`btn ${p.popular ? 'accent' : 'ghost'}`} href={whatsappLink(`Hi! I'm interested in the ${p.name} package. Can you share pricing?`)} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} /> Get pricing on WhatsApp
              </a>
            </div>
          ))}
        </div>
        <div className="addons">Add-ons: {addOns.map((a) => <span key={a}>{a}</span>)}</div>

        <div className="quote">
          <p>“{testimonial.quote}”</p>
          <div className="w"><i>{testimonial.name[0]}</i><div><b>{testimonial.name}</b><span>{testimonial.role}</span></div></div>
        </div>
      </div>
    </section>
  );
}
