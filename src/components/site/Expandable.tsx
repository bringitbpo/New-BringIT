import React, { useId, useState } from 'react';
import { Plus } from 'lucide-react';

// A card body that hides its details until the visitor clicks "More details".
export function Expandable({ items, label = 'More details', className = '', children }: {
  key?: React.Key;
  items: string[]; label?: string; className?: string; children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={`xp ${open ? 'open' : ''} ${className}`}>
      {children}
      <button type="button" className="xp-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        <Plus /> {open ? 'Show less' : label}
      </button>
      <div className="xp-body" id={id}>
        <div><ul>{items.map((t) => <li key={t}>{t}</li>)}</ul></div>
      </div>
    </div>
  );
}
