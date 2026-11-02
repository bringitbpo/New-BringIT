import { ShieldCheck, Lock, UserCheck, FileLock2 } from 'lucide-react';
import { security } from '../../content/site';

const ICONS = [ShieldCheck, Lock, UserCheck, FileLock2];

export function Security() {
  return (
    <section className="sec alt" id="security">
      <div className="wrap secgrid">
        <div className="shield" aria-hidden="true">
          <svg viewBox="0 0 360 300" fill="none">
            <rect x="40" y="60" width="200" height="150" rx="10" fill="#fff" stroke="#E4E7EC" strokeWidth="2" />
            <rect x="40" y="60" width="200" height="30" rx="10" fill="#F6F7F9" />
            <circle cx="58" cy="75" r="4" fill="#D5DAE1" /><circle cx="72" cy="75" r="4" fill="#D5DAE1" />
            <rect x="62" y="110" width="110" height="10" rx="5" fill="#E4E7EC" /><rect x="62" y="132" width="150" height="10" rx="5" fill="#E4E7EC" />
            <rect x="62" y="156" width="80" height="26" rx="6" fill="#F6F7F9" stroke="#E4E7EC" />
            <text x="72" y="174" fontFamily="monospace" fontSize="13" fill="#6B7483">••••••••</text>
            <path d="M250 70 L310 92 V150 C310 192 284 220 250 234 C216 220 190 192 190 150 V92 Z" fill="#0F2A4A" />
            <rect x="232" y="138" width="36" height="30" rx="5" fill="#fff" />
            <path d="M238 138 v-10 a12 12 0 0 1 24 0 v10" stroke="#fff" strokeWidth="5" fill="none" />
            <circle cx="250" cy="152" r="4" fill="#0F2A4A" />
            <circle cx="300" cy="226" r="20" fill="#12805C" />
            <path d="M291 226 l6 6 12 -13" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div className="label">{security.label}</div>
          <h2 className="h2">{security.title}</h2>
          <p className="lead">{security.lead}</p>
          <div className="pts">
            {security.points.map((p, i) => {
              const Icon = ICONS[i];
              return <div className="pt" key={p.title}><b><Icon />{p.title}</b><p>{p.text}</p></div>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
