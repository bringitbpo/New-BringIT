import React, { useId, useState } from 'react';
import { Plus } from 'lucide-react';

export function FaqItem({ q, a }: { q: string; a: string; key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls={id}>
        <span>{q}</span>
        <Plus />
      </button>
      <div className="xp-body" id={id}><div><p>{a}</p></div></div>
    </div>
  );
}
