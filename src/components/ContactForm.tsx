import React, { useState } from 'react';
import { CheckCircle2, XCircle, Lock } from 'lucide-react';
import { EMAIL } from '../lib/contact';

export const FORMSPREE_URL = 'https://formspree.io/f/mgorgakb';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    formData.append('_subject', 'New website message');
    try {
      const response = await fetch(FORMSPREE_URL, { method: 'POST', body: formData, headers: { Accept: 'application/json' } });
      setStatus(response.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-msg">
        <CheckCircle2 color="#12805C" />
        <h3>Message sent</h3>
        <p>Thank you. We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="form-msg">
        <XCircle color="#C4372C" />
        <h3>Something went wrong</h3>
        <p>We couldn't send your message. Please email us directly.</p>
        <a className="btn" href={`mailto:${EMAIL}`}>Email us</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="two">
        <input className="field" required name="name" type="text" placeholder="Your name" aria-label="Your name" />
        <input className="field" required name="business" type="text" placeholder="Business name" aria-label="Business name" />
      </div>
      <div className="two">
        <input className="field" required name="email" type="email" placeholder="Email" aria-label="Email" />
        <input className="field" name="phone" type="tel" placeholder="Phone or WhatsApp (optional)" aria-label="Phone or WhatsApp" />
      </div>
      <select className="field" name="locations" aria-label="Number of locations" defaultValue="">
        <option value="" disabled>Number of locations</option>
        <option value="1">1</option>
        <option value="2-3">2–3</option>
        <option value="4-6">4–6</option>
        <option value="7-10">7–10</option>
        <option value="10+">10+</option>
      </select>
      <textarea className="field" required name="message" placeholder="How can we help?" aria-label="How can we help?" rows={4} />
      <button type="submit" className="btn" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending…' : 'Send message'}</button>
      <div className="note"><Lock />Your information is kept private and confidential.</div>
    </form>
  );
}
