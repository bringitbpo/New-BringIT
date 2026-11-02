import { Smartphone, CreditCard, Star, Eye, Wrench, CalendarCheck, Megaphone, BarChart3 } from 'lucide-react';
import { services, results } from '../../content/site';
import { Expandable } from './Expandable';

const ICONS = { smartphone: Smartphone, card: CreditCard, star: Star, eye: Eye, wrench: Wrench, calendar: CalendarCheck, megaphone: Megaphone, chart: BarChart3 } as const;

export function Services() {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="label">Services</div>
        <h2 className="h2">One remote team for everything that slips between shifts.</h2>
        <div className="svc">
          {services.map((s) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <Expandable key={s.title} items={s.details} className={`sv ${s.highlight ? 'hl' : ''}`}>
                <Icon />
                <h3>{s.title}</h3>
                <p>{s.short}</p>
              </Expandable>
            );
          })}
        </div>
        <div className="results">
          {results.items.map((r) => <div key={r.label}><b>{r.value}</b><span>{r.label}</span></div>)}
        </div>
        <div className="results-note">{results.note}</div>
      </div>
    </section>
  );
}
