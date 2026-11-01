import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

const inputClass = 'w-full bg-[#111422] border border-white/5 rounded-[12px] px-4 py-3.5 focus:border-[#E8921A]/60 hover:border-white/10 outline-none text-[14px] transition-colors';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch('https://formspree.io/f/mgorgakb', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      setStatus(response.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-[#5DD98A]/20 text-[#5DD98A] rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={32} /></div>
        <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
        <p className="text-[#7A82A0]">We will get back to you within 24 hours.</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6"><X size={32} /></div>
        <h3 className="text-2xl font-bold mb-3">Something went wrong</h3>
        <p className="text-[#7A82A0] mb-6">We couldn't send your message. Please reach out directly.</p>
        <a href="mailto:bringit.bpo@gmail.com" className="px-6 py-3 rounded-full btn-orange font-bold">Email Us Directly</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1"><input required name="name" type="text" placeholder="Your Name" aria-label="Your Name" className={inputClass} /></div>
        <div className="flex-1"><input required name="business" type="text" placeholder="Business Name" aria-label="Business Name" className={inputClass} /></div>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1"><input required name="email" type="email" placeholder="Email Address" aria-label="Email Address" className={inputClass} /></div>
        <div className="flex-1"><input name="whatsapp" type="tel" placeholder="Phone or WhatsApp (Optional)" aria-label="Phone or WhatsApp" className={inputClass} /></div>
      </div>
      <select name="locations" aria-label="Number of Locations" className={`${inputClass} text-[#7A82A0] appearance-none`} defaultValue="">
        <option value="" disabled>Number of Locations</option>
        <option value="1">1</option>
        <option value="2-3">2–3</option>
        <option value="4-6">4–6</option>
        <option value="7+">7+</option>
      </select>
      <textarea required name="message" placeholder="How can we help?" aria-label="How can we help?" rows={5} className={`${inputClass} resize-none`}></textarea>
      <button type="submit" disabled={status === 'submitting'} className="w-full py-4 rounded-[12px] btn-orange font-bold text-[15px] tracking-wide disabled:opacity-50 transition-opacity mt-2 shadow-lg shadow-orange-500/20 border border-white/10">
        {status === 'submitting' ? 'Sending...' : 'Send Message →'}
      </button>
    </form>
  );
}
