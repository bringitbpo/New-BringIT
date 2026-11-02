import { ShieldCheck, FileCheck2, AlarmClock, MessageCircle, Mail, Phone } from 'lucide-react';
import { howWeWork } from '../../content/site';

const PR_ICONS = [ShieldCheck, FileCheck2, AlarmClock];

export function HowWeWork() {
  return (
    <section className="sec" id="how">
      <div className="wrap">
        <div className="label">{howWeWork.label}</div>
        <h2 className="h2">{howWeWork.title}</h2>
        <div className="flow">
          {howWeWork.steps.map((s, i) => (
            <div key={s.title}><div className="n">STEP 0{i + 1}</div><b>{s.title}</b><p>{s.text}</p></div>
          ))}
        </div>
        <div className="principles">
          {howWeWork.principles.map((p, i) => {
            const Icon = PR_ICONS[i];
            return <div className="pr" key={p.title}><b><Icon />{p.title}</b><p>{p.text}</p></div>;
          })}
        </div>
        <div className="channels">{howWeWork.channels}
          <span><MessageCircle />WhatsApp</span><span><Mail />Email</span><span><Phone />Phone</span>
        </div>
      </div>
    </section>
  );
}

export function Reporting() {
  return (
    <section className="sec alt">
      <div className="wrap split">
        <div className="doc" aria-label="Sample weekly report">
          <div className="paper back" />
          <div className="paper front">
            <div className="h"><b>Weekly Summary</b><span>Week 44 · 3 stores</span></div>
            <div className="g">
              <div><span>Revenue protected</span><b>$3,480</b></div>
              <div><span>Disputes won</span><b>7 of 9</b></div>
              <div><span>Reviews answered</span><b>42</b></div>
              <div><span>Tasks closed</span><b>186</b></div>
            </div>
            <h6>Highlights</h6>
            <ul>
              <li>Uber Eats outage at Store 2 caught in 12 minutes</li>
              <li>All deposits matched to POS and bank</li>
              <li>Freezer repair approved and completed</li>
              <li className="o">Health permit renewal due Nov 20</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="label">Reporting</div>
          <h2 className="h2">Know exactly what happened in every store, every week.</h2>
          <p className="lead">One short report covers what we caught, what we fixed, what we recovered and what still needs your attention.</p>
        </div>
      </div>
    </section>
  );
}
