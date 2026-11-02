import React, { useEffect, useMemo, useState } from 'react';
import { X, CheckCircle2, MessageCircle, Lock } from 'lucide-react';
import { FORMSPREE_URL } from '../ContactForm';
import { whatsappLink, EMAIL } from '../../lib/contact';

const ZONES = [
  ['ET', 'Eastern'], ['CT', 'Central'], ['MT', 'Mountain'], ['PT', 'Pacific'],
] as const;

// 9:00 AM to 5:30 PM in 30-minute steps, in the visitor's chosen U.S. time zone.
const SLOTS = Array.from({ length: 18 }, (_, i) => {
  const mins = 9 * 60 + i * 30;
  const h = Math.floor(mins / 60), m = mins % 60;
  return `${((h + 11) % 12) + 1}:${m ? '30' : '00'} ${h < 12 ? 'AM' : 'PM'}`;
});

function nextDays(n: number) {
  const out: Date[] = [];
  const d = new Date();
  for (let i = 1; i <= n; i++) out.push(new Date(d.getFullYear(), d.getMonth(), d.getDate() + i));
  return out;
}

export function BookingModal({ onClose }: { onClose: () => void }) {
  const days = useMemo(() => nextDays(14), []);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [zone, setZone] = useState<string>('ET');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  const dateLabel = days[day].toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!slot) return;
    const fd = new FormData(e.currentTarget);
    const when = `${dateLabel} at ${slot} ${zone}`;
    fd.append('booking_time', when);
    fd.append('_subject', `New call booking: ${when}`);
    setStatus('sending');
    try {
      const r = await fetch(FORMSPREE_URL, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error();
      setSummary(`Hi BringIT! I just booked a free 15-minute call for ${when}.\nName: ${fd.get('name')}\nBusiness: ${fd.get('business')}\nLocations: ${fd.get('locations') || 'not given'}\nEmail: ${fd.get('email')}\nPhone: ${fd.get('phone')}`);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="modal-bg" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="book-title">
        <div className="mh">
          <div><h3 id="book-title">Book a free 15-minute call</h3><p>Pick a time that works for you. We'll confirm by email or WhatsApp.</p></div>
          <button className="x" onClick={onClose} aria-label="Close"><X /></button>
        </div>

        {status === 'done' ? (
          <div className="mb">
            <div className="form-msg" style={{ padding: '10px 0 0' }}>
              <CheckCircle2 color="#12805C" />
              <h3>You're booked for {dateLabel} at {slot} {zone}</h3>
              <p>We've received your request. Tap below to send the confirmation to our WhatsApp so we can reach you faster.</p>
              <a className="btn wa" href={whatsappLink(summary)} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> Send confirmation on WhatsApp</a>
            </div>
          </div>
        ) : (
          <form className="mb" onSubmit={submit}>
            <div>
              <div className="lbl">Date <span>{dateLabel}</span></div>
              <div className="days">
                {days.map((d, i) => (
                  <button type="button" key={d.toISOString()} className={`day ${i === day ? 'on' : ''}`} onClick={() => setDay(i)} aria-pressed={i === day}>
                    <small>{d.toLocaleDateString('en-US', { weekday: 'short' })}</small><b>{d.getDate()}</b>
                    <small>{d.toLocaleDateString('en-US', { month: 'short' })}</small>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="lbl">Time
                <select className="field" style={{ width: 'auto', padding: '4px 8px', fontSize: 13 }} value={zone} onChange={(e) => setZone(e.target.value)} aria-label="Time zone">
                  {ZONES.map(([z, n]) => <option key={z} value={z}>{n} time ({z})</option>)}
                </select>
              </div>
              <div className="slots">
                {SLOTS.map((s) => <button type="button" key={s} className={`slot ${s === slot ? 'on' : ''}`} onClick={() => setSlot(s)} aria-pressed={s === slot}>{s}</button>)}
              </div>
            </div>
            <div className="form" style={{ border: 0, padding: 0 }}>
              <div style={{ display: 'grid', gap: 12 }}>
                <div className="two">
                  <input className="field" required name="name" placeholder="Your name" aria-label="Your name" />
                  <input className="field" required name="business" placeholder="Business name" aria-label="Business name" />
                </div>
                <div className="two">
                  <input className="field" required name="email" type="email" placeholder="Email" aria-label="Email" />
                  <input className="field" required name="phone" type="tel" placeholder="Phone or WhatsApp" aria-label="Phone or WhatsApp" />
                </div>
                <select className="field" name="locations" defaultValue="" aria-label="Number of locations">
                  <option value="" disabled>Number of locations</option>
                  <option>1</option><option>2–3</option><option>4–6</option><option>7–10</option><option>10+</option>
                </select>
              </div>
            </div>
            {slot && <div className="summary">Your call: <b>{dateLabel} at {slot} {zone}</b></div>}
            {status === 'error' && <div className="summary" style={{ color: '#C4372C' }}>We couldn't save your booking. Please try again or email {EMAIL}.</div>}
            <button className="btn accent" type="submit" disabled={!slot || status === 'sending'}>{status === 'sending' ? 'Booking…' : slot ? 'Confirm booking' : 'Choose a time to continue'}</button>
            <div className="note"><Lock />Your information is kept private and confidential.</div>
          </form>
        )}
      </div>
    </div>
  );
}
