import React, { useState } from 'react';
import { X } from 'lucide-react';

export function FaqItem({ q, a }: { q: string; a: string; key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`bg-[#0C0E18] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10 ${isOpen ? 'accordion-open border-white/10 shadow-lg shadow-black/30' : ''}`}>
      <button onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} className="w-full text-left p-6 flex justify-between items-center gap-4">
        <span className="font-semibold text-[16px] text-white">{q}</span>
        <X className={`w-5 h-5 text-[#B0B8D0] shrink-0 accordion-arrow transition-transform duration-300 ${isOpen ? '' : 'rotate-45'}`} />
      </button>
      <div className={`accordion-content px-6 bg-white/[0.02] text-[15px] text-[#7A82A0] leading-relaxed transition-all duration-300 ${isOpen ? 'pb-6' : ''}`}>
        {a}
      </div>
    </div>
  );
}
