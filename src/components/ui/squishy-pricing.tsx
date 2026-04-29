import { motion } from 'motion/react';
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

// Pricing options using BringIT branding packages
// Option 1: Starter, Option 2: Growth, Option 3: Premium

export const SquishyPricing = ({
  onPackageClick
}: {
  onPackageClick: (pkg: string) => void
}) => {
  return (
    <section id="pricing" className="bg-[#07090F] px-[6%] py-24 min-h-[50vh] transition-colors relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4A7FD4]/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase text-[#4A7FD4] tracking-widest font-bold mb-4 block">PRICING</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-2 text-white" style={{ fontFamily: 'Georgia, serif' }}>
            Pricing <span style={{ backgroundImage: 'linear-gradient(135deg, #4A7FD4, #7B5EA7, #E8921A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>Built For Scale</span>
          </h2>
          <div className="text-[13px] uppercase tracking-widest font-bold text-[#7A82A0] mb-6">PER MONTH PER STORE</div>
          <p className="text-[#7A82A0] max-w-2xl mx-auto leading-relaxed text-sm">Every package includes the same dedication — scaled to your operation. Saturday to Thursday, assigned daily time windows per store.</p>
        </div>

        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl justify-items-center">
          <PricingCard
            label="Starter"
            monthlyPrice="149"
            audience="Single-store owners"
            description="Essential visibility and core operations support."
            features={[
              { text: 'Review replies' },
              { text: 'Complaint logging' },
              { text: 'Daily reminders' },
              { text: 'Follow-up tracking' },
              { text: 'Calendar scheduling' },
              { text: 'Admin support' },
              { text: 'Task tracking' },
              { text: 'Limited support' }
            ]}
            cta="Get Started"
            onClick={() => onPackageClick('Starter')}
            background="bg-[#111422] border-[rgba(255,255,255,0.07)]"
            accentColor="#4A7FD4"
            BGComponent={BGComponent1}
          />
          <PricingCard
            label="Growth"
            monthlyPrice="299"
            audience="Busy owners needing full control"
            description="Comprehensive management for growing restaurants."
            features={[
              { text: 'Everything in Starter +', bold: true },
              { text: 'Vendor coordination' },
              { text: 'Hiring coordination' },
              { text: 'Uber Eats / OLO monitoring' },
              { text: 'Missed order alerts' },
              { text: 'Dispute handling' },
              { text: 'Weekly reports' },
              { text: 'Weekly owner summary' },
              { text: 'Light social media support' }
            ]}
            cta="Book Strategy Call"
            onClick={() => onPackageClick('Growth')}
            background="bg-[#0C0E18] border-[#7B5EA7]/40 shadow-[0_0_30px_rgba(123,94,167,0.15)]"
            accentColor="#7B5EA7"
            isPopular={true}
            BGComponent={BGComponent2}
          />
          <PricingCard
            label="Premium"
            monthlyPrice="499"
            audience="Multi-store operators"
            description="Mission-critical concierge for maximum oversight."
            features={[
              { text: 'Everything in Growth +', bold: true },
              { text: 'Staff attendance tracking' },
              { text: 'Inventory follow-up' },
              { text: 'Procurement coordination' },
              { text: 'Refund recovery system' },
              { text: 'CCTV review support' },
              { text: 'Legal/insurance coordination' },
              { text: 'Multi-location reporting' },
              { text: 'Expansion support' },
              { text: 'Dedicated account manager' }
            ]}
            cta="Enquire Premium"
            onClick={() => onPackageClick('Premium')}
            background="bg-[#111422] border-[rgba(255,255,255,0.07)]"
            accentColor="#E8921A"
            BGComponent={BGComponent3}
          />
        </div>
      </div>
    </section>
  );
};

interface PricingCardProps {
  label: string;
  monthlyPrice: string;
  audience: string;
  description: string;
  features: { text: string; bold?: boolean }[];
  cta: string;
  background: string;
  accentColor: string;
  isPopular?: boolean;
  onClick: () => void;
  BGComponent: React.ComponentType;
}

const PricingCard = ({ label, monthlyPrice, description, audience, features, cta, background, accentColor, isPopular, onClick, BGComponent }: PricingCardProps) => {
  return (
    <motion.div
      whileHover="hover"
      transition={{ duration: 1, ease: "backInOut" }}
      variants={{ hover: { scale: 1.02, translateY: -5 } }}
      className={`relative min-h-[680px] w-full max-w-[360px] shrink-0 overflow-hidden rounded-[24px] p-8 lg:p-10 border ${background} shadow-2xl transition-shadow group flex flex-col`}
    >
      {isPopular && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#4A7FD4] to-[#7B5EA7] text-white text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full z-20 shadow-lg shadow-purple-500/20">
          MOST POPULAR
        </div>
      )}
      <div className="relative z-10 text-white flex flex-col h-full">
        <div className="font-serif italic text-2xl md:text-3xl font-bold uppercase mb-4" style={{ color: accentColor, fontFamily: 'Georgia, serif' }}>
          {label}
        </div>
        <motion.span
          initial={{ scale: 0.95 }}
          variants={{ hover: { scale: 1 } }}
          transition={{ duration: 1, ease: "backInOut" }}
          className="mb-2 block origin-top-left font-serif text-[3.2rem] font-bold leading-[1.1]"
        >
          ${monthlyPrice}<span className="text-lg text-[#7A82A0] font-sans">/mo</span>
        </motion.span>
        <div className="text-[13px] font-semibold mb-2" style={{ color: accentColor }}>{audience}</div>
        <p className="text-[13px] text-[#B0B8D0] leading-[1.7] mb-8">{description}</p>
        
        <div className="space-y-3 mb-10">
          {features.map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
               <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentColor }} />
               <span className={`text-[13.5px] ${item.bold ? 'text-white font-bold' : 'text-[#B0B8D0]'}`}>{item.text}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={onClick}
          className="mt-auto relative z-20 w-full rounded-xl border border-white/10 bg-white/5 py-3.5 text-center font-bold text-[13px] uppercase tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30"
          style={isPopular ? {
            background: 'linear-gradient(135deg, rgba(74,127,212,0.9), rgba(123,94,167,0.9))',
            borderColor: 'rgba(255,255,255,0.2)'
          } : {}}
        >
          {cta}
        </button>
      </div>
      <div className="opacity-40 group-hover:opacity-100 transition-opacity duration-700" style={{ color: accentColor }}>
        <BGComponent />
      </div>
    </motion.div>
  );
};

const BGComponent1 = () => (
  <motion.svg
    width="340"
    height="420"
    viewBox="0 0 320 384"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    variants={{ hover: { scale: 1.5 } }}
    transition={{ duration: 1, ease: "backInOut" }}
    className="absolute inset-0 z-0 pointer-events-none"
  >
    <motion.circle
      variants={{ hover: { scaleY: 0.5, y: -25 } }}
      transition={{ duration: 1, ease: "backInOut", delay: 0.2 }}
      cx="160.5"
      cy="114.5"
      r="101.5"
      fill="currentColor"
      opacity="0.06"
    />
    <motion.ellipse
      variants={{ hover: { scaleY: 2.25, y: -25 } }}
      transition={{ duration: 1, ease: "backInOut", delay: 0.2 }}
      cx="160.5"
      cy="265.5"
      rx="101.5"
      ry="43.5"
      fill="currentColor"
      opacity="0.06"
    />
  </motion.svg>
);

const BGComponent2 = () => (
  <motion.svg
    width="340"
    height="420"
    viewBox="0 0 320 384"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    variants={{ hover: { scale: 1.05 } }}
    transition={{ duration: 1, ease: "backInOut" }}
    className="absolute inset-0 z-0 pointer-events-none"
  >
    <motion.rect
      x="14"
      width="153"
      height="153"
      rx="15"
      fill="currentColor"
      opacity="0.04"
      variants={{ hover: { y: 219, rotate: "90deg", scaleX: 2 } }}
      style={{ y: 12 }}
      transition={{ delay: 0.2, duration: 1, ease: "backInOut" }}
    />
    <motion.rect
      x="155"
      width="153"
      height="153"
      rx="15"
      fill="currentColor"
      opacity="0.04"
      variants={{ hover: { y: 12, rotate: "90deg", scaleX: 2 } }}
      style={{ y: 219 }}
      transition={{ delay: 0.2, duration: 1, ease: "backInOut" }}
    />
  </motion.svg>
);

const BGComponent3 = () => (
  <motion.svg
    width="340"
    height="420"
    viewBox="0 0 320 384"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    variants={{ hover: { scale: 1.25 } }}
    transition={{ duration: 1, ease: "backInOut" }}
    className="absolute inset-0 z-0 pointer-events-none"
  >
    <motion.path
      variants={{ hover: { y: -50 } }}
      transition={{ delay: 0.3, duration: 1, ease: "backInOut" }}
      d="M148.893 157.531C154.751 151.673 164.249 151.673 170.107 157.531L267.393 254.818C273.251 260.676 273.251 270.173 267.393 276.031L218.75 324.674C186.027 357.397 132.973 357.397 100.25 324.674L51.6068 276.031C45.7489 270.173 45.7489 260.676 51.6068 254.818L148.893 157.531Z"
      fill="currentColor"
      opacity="0.04"
    />
    <motion.path
      variants={{ hover: { y: -50 } }}
      transition={{ delay: 0.2, duration: 1, ease: "backInOut" }}
      d="M148.893 99.069C154.751 93.2111 164.249 93.2111 170.107 99.069L267.393 196.356C273.251 202.213 273.251 211.711 267.393 217.569L218.75 266.212C186.027 298.935 132.973 298.935 100.25 266.212L51.6068 217.569C45.7489 211.711 45.7489 202.213 51.6068 196.356L148.893 99.069Z"
      fill="currentColor"
      opacity="0.04"
    />
    <motion.path
      variants={{ hover: { y: -50 } }}
      transition={{ delay: 0.1, duration: 1, ease: "backInOut" }}
      d="M148.893 40.6066C154.751 34.7487 164.249 34.7487 170.107 40.6066L267.393 137.893C273.251 143.751 273.251 153.249 267.393 159.106L218.75 207.75C186.027 240.473 132.973 240.473 100.25 207.75L51.6068 159.106C45.7489 153.249 45.7489 143.751 51.6068 137.893L148.893 40.6066Z"
      fill="currentColor"
      opacity="0.04"
    />
  </motion.svg>
);
