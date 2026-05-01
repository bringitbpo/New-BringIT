import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, CheckCircle2, Smartphone, Clock, Zap, Users, MessageCircle, Mail } from 'lucide-react';
import { ContainerScroll } from './components/ui/container-scroll-animation';
import { SquishyPricing } from './components/ui/squishy-pricing';
import './App.css';

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCmFaSucPvyFIXt_mxfc8X-U6rDcrYJ1T8",
  authDomain: "bringit-25.firebaseapp.com",
  projectId: "bringit-25",
  storageBucket: "bringit-25.firebasestorage.app",
  messagingSenderId: "812546413996",
  appId: "1:812546413996:web:26f3777ad763bfd76d9609"
};
const fbApp = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(fbApp);
const googleProvider = new GoogleAuthProvider();

const Logo = () => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-[#4A7FD4] via-[#7B5EA7] to-[#E8921A] rounded-lg"></div>
        <span className="text-2xl font-bold tracking-tight bg-gradient-brand bg-clip-text text-transparent" style={{ fontFamily: 'Georgia, serif' }}>BringIT</span>
      </div>
    );
  }
  return <img src="/LOGO_1_1_no_BG.png" alt="BringIT Logo" className="h-9 object-contain" onError={() => setError(true)} />;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  
useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

   

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
      document.head.removeChild(link);
    };
  }, []);

  const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    setUser(result.user);
    setIsAuthModalOpen(false);
    if (selectedPackage) {
      setIsContactModalOpen(true);
    }
 } catch (error: any) {
    if (error.code === 'auth/popup-blocked') {
      alert('Please allow popups for this site to use Google login.');
    }
  }
};

  const handlePackageClick = (pkgName: string) => {
    setSelectedPackage(pkgName);
    if (user) {
      setIsContactModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--dark)] text-[var(--text)] selection:bg-[var(--purple)] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full h-[72px] z-50 flex items-center justify-between px-6 md:px-12 bg-[#07090F]/82 backdrop-blur-[24px] border-b border-white/5 transition-all">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex-shrink-0 z-50 relative"><Logo /></a>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[var(--soft)]">
            <a href="#" className="text-white">Home</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="hidden md:flex flex-row items-center space-x-4">
            {!user ? (
              <>
                <button onClick={() => { setSelectedPackage(null); setIsAuthModalOpen(true); }} className="px-6 py-2 rounded-full border border-white/15 text-sm font-semibold hover:bg-white/5 transition-colors text-white">Login</button>
                <a href="#contact" className="px-6 py-2 rounded-full bg-gradient-to-r from-[#4A7FD4] to-[#7B5EA7] text-white text-sm font-bold shadow-lg shadow-blue-500/10">
                  Book Strategy Call
                </a>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img src={user.photoURL || ''} alt="User" className="w-8 h-8 rounded-full border border-white/20" />
                  <span className="text-sm font-medium">{user.displayName?.split(' ')[0]}</span>
                </div>
                <button onClick={() => signOut(auth)} className="text-xs text-[var(--muted)] hover:text-white transition-colors">Sign out</button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden z-50 relative text-[var(--soft)] hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 glass-nav border-t border-white/5 p-6 flex flex-col space-y-4 md:hidden shadow-2xl"
            >
              <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Home</a>
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Services</a>
              <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Pricing</a>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">About</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Contact</a>
              <hr className="border-white/10 my-2" />
              {!user ? (
                <div className="flex flex-col gap-3">
                  <button onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }} className="w-full px-5 py-3 rounded-full border border-white/15 text-white text-sm font-semibold">Login</button>
                  <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full px-5 py-3 rounded-full bg-gradient-brand text-white text-sm font-semibold text-center pointer-events-auto">
                    Book Free Consultation
                  </a>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={user.photoURL || ''} alt="User" className="w-10 h-10 rounded-full border border-white/20" />
                    <span className="font-medium">{user.displayName}</span>
                  </div>
                  <button onClick={() => signOut(auth)} className="text-sm text-[var(--muted)] hover:text-white">Sign out</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-6 md:px-12 text-center h-full overflow-hidden">
        {/* Background Radial Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#7B5EA7]/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#4A7FD4]/15 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#E8921A]/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#4A7FD4]/10 border border-[#4A7FD4]/20 rounded-full">
              <div className="w-2 h-2 bg-[#4A7FD4] rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold tracking-widest text-[#4A7FD4] uppercase">Remote Operations & Revenue Control</span>
            </div>
            <span className="text-[11px] font-bold tracking-[0.18em] text-[#E8921A] uppercase">Back Office Made Easy</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="max-w-4xl text-[clamp(3rem,6vw,64px)] font-bold leading-[1.07] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Stop Losing Money From <br/>
            <span className="italic font-normal">
              <span className="text-[#4A7FD4]">Small</span>{' '}
              <span className="text-[#7B5EA7]">Daily</span>{' '}
              <span className="text-[#E8921A]">Mistakes</span>
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-[580px] text-lg text-[var(--muted)] font-light leading-relaxed mb-10">
            BringIT helps restaurant owners stay in control with remote back-office operations, revenue protection, and daily accountability systems.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mb-8">
            <a href="#contact" className="px-10 py-4 bg-gradient-to-r from-[#4A7FD4] to-[#7B5EA7] text-white rounded-full font-bold text-lg hover:opacity-90 transition-all text-center pointer-events-auto">
              Book Free Strategy Call
            </a>
            <a href="#pricing" className="px-10 py-4 border border-white/15 bg-white/5 text-[var(--soft)] rounded-full font-bold text-lg text-center hover:bg-white/10 transition-colors pointer-events-auto">
              See Pricing
            </a>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="text-sm italic text-white/25 mb-16">
            "We don't replace your manager — we make sure nothing slips."
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
            <div className="py-8 px-6 border-b md:border-b-0 md:border-r border-white/10 flex flex-col gap-2">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#4A7FD4] to-[#7B5EA7]" style={{ fontFamily: 'Georgia, serif' }}>6–15%</span>
              <span className="text-[10px] font-bold tracking-widest text-[#7A82A0] uppercase">Revenue Leakage Prevented</span>
            </div>
            <div className="py-8 px-6 border-b md:border-b-0 md:border-r border-white/10 flex flex-col gap-2">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#7B5EA7] to-[#E8921A]" style={{ fontFamily: 'Georgia, serif' }}>$150K+</span>
              <span className="text-[10px] font-bold tracking-widest text-[#7A82A0] uppercase">Hidden Annual Loss Per Store</span>
            </div>
            <div className="py-8 px-6 flex flex-col gap-2">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#E8921A] to-[#4A7FD4]" style={{ fontFamily: 'Georgia, serif' }}>6</span>
              <span className="text-[10px] font-bold tracking-widest text-[#7A82A0] uppercase">Major Franchise Brands Supported</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Block B: Dashboard Scroll */}
      <section className="bg-[var(--dark)] pb-[60px] relative z-10 w-full overflow-hidden">
        <ContainerScroll titleComponent={<div className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted)] font-medium mb-4">LIVE OPERATIONS DASHBOARD</div>}>
          <div className="w-full flex-col h-full bg-[var(--dark3)] flex p-6 gap-3">
             <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 w-full">
                <span className="px-3 py-1 bg-[rgba(232,146,26,0.1)] text-[var(--orange)] rounded-md text-xs font-bold whitespace-nowrap">ALERT</span>
                <span className="text-sm">POS Revenue Gap Identified in Store 2 - Pending explanation from shift lead.</span>
             </div>
             <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 w-full">
                <span className="px-3 py-1 bg-[rgba(74,212,127,0.1)] text-[#5DD98A] rounded-md text-xs font-bold whitespace-nowrap">DONE</span>
                <span className="text-sm">UberEats offline incident resolved. Tablet rebooted manually via manager call.</span>
             </div>
             <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 w-full">
                <span className="px-3 py-1 bg-[rgba(74,127,212,0.1)] text-[var(--blue2)] rounded-md text-xs font-bold whitespace-nowrap">TRACK</span>
                <span className="text-sm">Weekly Refund Recovery process started. Disputing 12 false claims with DoorDash.</span>
             </div>
             <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 w-full">
                <span className="px-3 py-1 bg-[rgba(232,146,26,0.1)] text-[var(--orange)] rounded-md text-xs font-bold whitespace-nowrap">ALERT</span>
                <span className="text-sm">2 Google Reviews unanswered from yesterday. Drafting responses for owner approval.</span>
             </div>
             <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 w-full">
                <span className="px-3 py-1 bg-[rgba(74,212,127,0.1)] text-[#5DD98A] rounded-md text-xs font-bold whitespace-nowrap">DONE</span>
                <span className="text-sm">Daily Platform Sweep Complete (UberEats, DoorDash, OLO). All systems green.</span>
             </div>
             <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 w-full">
                <span className="px-3 py-1 bg-[rgba(74,127,212,0.1)] text-[var(--blue2)] rounded-md text-xs font-bold whitespace-nowrap">TRACK</span>
                <span className="text-sm">Vendor Follow-up: Refrigeration unit repair scheduled for Thu 9:00 AM.</span>
             </div>
             <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 w-full">
                <span className="px-3 py-1 bg-[rgba(232,146,26,0.1)] text-[var(--orange)] rounded-md text-xs font-bold whitespace-nowrap">ALERT</span>
                <span className="text-sm">Payroll Discrepancy: Employee #4032 clocked in 45m early twice this week.</span>
             </div>
             <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 w-full">
                <span className="px-3 py-1 bg-[rgba(74,212,127,0.1)] text-[#5DD98A] rounded-md text-xs font-bold whitespace-nowrap">DONE</span>
                <span className="text-sm">Weekly Executive Summary compiled and sent to Owner email.</span>
             </div>
          </div>
        </ContainerScroll>
      </section>

      {/* Brand Trust */}
      <section className="w-full py-4 border-y border-white/5 bg-[#0C0E18] flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 overflow-hidden z-20 relative">
        <span className="text-[10px] uppercase tracking-widest text-[#7A82A0]">Trusted Experience:</span>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-[11px] font-bold text-white/20 tracking-wider">
          <span>COLD STONE CREAMERY</span>
          <div className="w-[1px] h-3 bg-white/10 hidden md:block"></div>
          <span>DUNKIN'</span>
          <div className="w-[1px] h-3 bg-white/10 hidden md:block"></div>
          <span>BASKIN ROBBINS</span>
          <div className="w-[1px] h-3 bg-white/10 hidden lg:block"></div>
          <span>CHARLEYS CHEESESTEAKS</span>
        </div>
      </section>
      
      {/* Section 3 — Problems */}
      <section id="services" className="bg-[#0C0E18] py-24 px-6 md:px-12 border-t border-white/5">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="text-[10px] font-bold tracking-widest text-[#4A7FD4] uppercase mb-4">THE HIDDEN PROBLEM</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center" style={{ fontFamily: 'Georgia, serif' }}>The Hidden Leaks Costing Restaurants Thousands</h2>
            <div className="mx-auto max-w-3xl border border-[rgba(232,146,26,0.15)] bg-[rgba(232,146,26,0.06)] rounded-2xl p-6 md:p-8 text-[var(--text)] leading-relaxed shadow-lg shadow-[#E8921A]/5">
              Restaurants lose 6–15%+ of annual revenue through preventable operational leakage. A $1M store can silently lose <strong className="text-[#E8921A]">$150,000 every year.</strong>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
            {[
              { e: '📦', t: 'Inventory Shrinkage', d: 'Food stolen, wasted, or given away without records. Every unaccounted item is direct profit loss.' },
              { e: '📱', t: 'Missed Online Orders', d: 'UberEats, DoorDash, Grubhub going offline during rush. Tablets switched off. Every minute offline is money gone.' },
              { e: '⏱️', t: 'Labor Inefficiency', d: 'Employees clocking in early, leaving late, or not working. Clock manipulation draining payroll silently.' },
              { e: '💸', t: 'Refund Abuse', d: 'False food quality complaints on delivery apps. Fraudulent refund requests accepted without dispute.' },
              { e: '👥', t: 'Staff Accountability Issues', d: 'Untracked attendance, cash stolen from registers. Without monitoring, misconduct goes unseen.' },
              { e: '📋', t: 'Compliance & Deadline Failures', d: 'Missed license renewals, unpaid bills, forgotten franchise submissions, equipment repairs ignored.' }
            ].map((i, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-[#07090F] p-10 hover:bg-[#4A7FD4]/5 transition-colors group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4A7FD4]/0 to-[#4A7FD4]/0 group-hover:from-[#4A7FD4]/5 group-hover:to-transparent transition-all duration-500 rounded-3xl"></div>
                <div className="text-3xl mb-5 relative z-10">{i.e}</div>
                <h3 className="font-bold text-lg mb-3 relative z-10 text-white group-hover:text-[#4A7FD4] transition-colors">{i.t}</h3>
                <p className="text-[#7A82A0] text-sm leading-relaxed relative z-10">{i.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Why BringIT */}
      <section className="bg-[var(--dark)] py-24 px-6 md:px-12 relative overflow-hidden">
        {/* Subtle purple glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#7B5EA7]/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <div className="mb-16 text-center">
            <span className="text-[10px] uppercase text-[#7B5EA7] tracking-widest font-bold mb-4 block">WHY BRINGIT</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4">Why Owners Choose BringIT</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {[
              { icon: '🛡️', t: 'We Prevent Small Mistakes That Quietly Cost Money', d: 'Daily monitoring catches issues before they become losses. Nothing slips through the cracks.' },
              { icon: '📡', t: "We Monitor Delivery Platforms So You Don't Miss Sales", d: 'UberEats, DoorDash, Grubhub, OLO monitored daily. Platform outages caught and resolved fast.' },
              { icon: '✅', t: 'We Track Tasks Until They Are Completed', d: 'Vendor follow-ups, equipment repairs, permit renewals — tracked and chased until closed.' },
              { icon: '💰', t: 'We Reduce Refund Losses', d: 'False refund claims disputed with delivery platforms. Recovery tracked and reported weekly.' },
              { icon: '👁️', t: 'We Improve Owner Visibility Without Being In-Store', d: 'CCTV monitoring, POS reports, attendance tracking, daily summaries.' },
              { icon: '📈', t: 'We Help Owners Scale Without Chaos', d: 'Multi-store reporting, cross-location tracking, expansion support systems.' }
            ].map((i, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-[#0C0E18] border border-white/5 shadow-2xl shadow-black/40 rounded-2xl p-7 flex gap-5 hover:border-[#7B5EA7]/30 hover:bg-[#7B5EA7]/5 transition-all duration-300">
                <div className="w-[42px] h-[42px] shrink-0 rounded-xl bg-[#7B5EA7]/10 flex justify-center items-center text-[20px] shadow-inner shadow-white/5">{i.icon}</div>
                <div>
                  <h3 className="font-bold text-[16px] mb-2 leading-snug text-white">{i.t}</h3>
                  <p className="text-[#7A82A0] text-[14px] leading-relaxed">{i.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — How It Works */}
      <section className="bg-[#0C0E18] py-24 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="text-[10px] uppercase text-[var(--muted)] tracking-widest font-bold mb-4 block">THE PROCESS</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4">Zero Disruption. Instant Insight.</h2>
          </div>
          
          <div className="space-y-8 md:space-y-12">
            {[
              {
                t: 'We Identify Operational Leaks', 
                rows: [
                  { s: 'ALERT', c: 'orange', text: 'POS Revenue Gap' },
                  { s: 'ALERT', c: 'orange', text: 'Google Reviews unanswered' },
                  { s: 'ALERT', c: 'orange', text: 'DoorDash offline incidents' },
                  { s: 'ALERT', c: 'orange', text: 'License renewal overdue' },
                  { s: 'ALERT', c: 'orange', text: 'Payroll clock manipulation' }
                ]
              },
              {
                t: 'We Monitor + Follow Up Daily',
                reverse: true,
                rows: [
                  { s: 'DONE', c: 'green', text: 'Platform sweep complete' },
                  { s: 'DONE', c: 'green', text: '1-star review replied' },
                  { s: 'DONE', c: 'green', text: 'UberEats restored' },
                  { s: 'IN PROG', c: 'blue', text: 'Vendor follow-up' },
                  { s: 'DONE', c: 'green', text: '11 tasks completed' }
                ]
              },
              {
                t: 'We Protect Revenue + Reduce Losses',
                rows: [
                  { s: 'DONE', c: 'green', text: 'Refund disputed $47 recovered' },
                  { s: 'DONE', c: 'green', text: 'Cash shortage escalated' },
                  { s: 'ALERT', c: 'orange', text: 'CCTV incident logged' },
                  { s: 'DONE', c: 'green', text: 'OLO bill fixed' },
                  { s: 'TRACK', c: 'blue', text: 'Weekly recovery $1,240' }
                ]
              },
              {
                t: 'You Gain Control + Scale Confidently',
                reverse: true,
                rows: [
                  { s: 'DONE', c: 'green', text: 'Weekly summary sent' },
                  { s: 'IN PROG', c: 'blue', text: 'Cross-store gap identified' },
                  { s: 'IN PROG', c: 'blue', text: 'New store 80% complete' },
                  { s: 'DONE', c: 'green', text: '18 tasks closed this week' }
                ]
              }
            ].map((block, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`flex flex-col md:flex-row items-center gap-6 md:gap-16 lg:gap-24 ${block.reverse ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 w-full flex item-center text-center md:text-left justify-center md:justify-start">
                  <h3 className="text-3xl font-bold font-serif mb-2">{idx + 1}. {block.t}</h3>
                </div>
                <div className="flex-1 w-full bg-[#111422] border border-white/5 rounded-[20px] p-6 shadow-xl shadow-black/50 flex flex-col gap-3">
                  {block.rows.map((r, i) => (
                     <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-3.5 text-[14px]">
                      <span className={`px-2.5 py-1 rounded-[6px] text-[10px] font-bold tracking-wider ${
                        r.c === 'green' ? 'bg-[#5DD98A]/10 text-[#5DD98A]' :
                        r.c === 'blue' ? 'bg-[#4A7FD4]/10 text-[#4A7FD4]' :
                        'bg-[#E8921A]/10 text-[#E8921A]'
                      }`}>{r.s}</span>
                       <span className="text-white/80 font-medium">{r.text}</span>
                     </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SquishyPricing onPackageClick={handlePackageClick} />

      {/* Section 7 — Flexible Add-Ons */}
      <section className="bg-[#07090F] py-[80px] px-[6%]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Flexible <span className="italic" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', backgroundImage: 'linear-gradient(135deg, #4A7FD4, #7B5EA7, #E8921A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>Add-Ons</span>
            </h2>
            <p className="text-[#7A82A0] font-light max-w-[600px] leading-relaxed">
               Customize your support without unnecessary pressure — only pay for what your operation truly needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Smartphone, color: '#4A7FD4', bg: 'rgba(74,127,212,0.12)', t: 'Extra Social Media Content', p: '$100–$200/MONTH', d: 'Additional branded content creation, posting, and engagement support for stronger local visibility.' },
              { icon: Clock, color: '#7B5EA7', bg: 'rgba(123,94,167,0.12)', t: '24/7 Coverage', p: 'STARTING AT $150+/MONTH', d: 'Extended operational monitoring for urgent issues, late-night problems, and continuous oversight.' },
              { icon: Zap, color: '#E8921A', bg: 'rgba(232,146,26,0.12)', t: 'Priority Escalation Support', p: '$100/MONTH', d: 'Faster issue escalation, urgent follow-up handling, and priority response for unresolved operational problems.' }
            ].map((i, idx) => {
              const Icon = i.icon;
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-[#111422] border border-[rgba(255,255,255,0.07)] rounded-[16px] p-8 flex flex-col items-start gap-4 hover:border-[rgba(255,255,255,0.15)] transition-colors duration-300">
                  <div className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center shrink-0" style={{ backgroundColor: i.bg, color: i.color }}><Icon size={24} /></div>
                  <h3 className="font-bold text-[1rem] text-white my-1">{i.t}</h3>
                  <div className="px-[14px] py-[4px] rounded-[50px] border text-[11px] font-bold uppercase tracking-[0.1em]" style={{ background: 'linear-gradient(135deg, rgba(74,127,212,0.1), rgba(123,94,167,0.1), rgba(232,146,26,0.1))', borderColor: i.color, color: i.color }}>
                     {i.p}
                  </div>
                  <p className="text-[13.5px] text-[#7A82A0] leading-[1.75] mb-6 flex-1 mt-2">{i.d}</p>
                  <a href={`mailto:bringit.bpo@gmail.com?subject=Add-On Enquiry — ${i.t}`} className="mt-auto text-[12px] font-bold uppercase tracking-[0.1em] text-[#4A7FD4] hover:text-[#3A8DFF] transition-colors">ENQUIRE NOW →</a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 8 — Revenue Stats */}
      <section className="bg-[#0C0E18] py-24 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="text-[10px] uppercase text-[#7A82A0] tracking-widest font-bold mb-4 block">REVENUE REALITY</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4" style={{ fontFamily: 'Georgia, serif' }}>Revenue Lost Is Revenue You Never See</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 mb-20">
             {[
               { i: '📦', v: '2–10%', d: 'of annual revenue lost to inventory waste' },
               { i: '📱', v: '3–15%', d: 'of online order revenue lost to platform downtime' },
               { i: '⏱️', v: '2–8%', d: 'of payroll wasted on labor inefficiency' },
               { i: '💳', v: '1–5%', d: 'leaked through unmonitored POS discrepancies' },
               { i: '💸', v: '0.5–3%', d: 'lost to fraudulent refund abuse' },
               { i: '⭐', v: '30', d: 'customers lost per unanswered negative review' }
             ].map((stat, idx) => (
               <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex flex-col items-center text-center">
                  <div className="text-3xl mb-4 opacity-80">{stat.i}</div>
                  <div className="font-serif text-[2.8rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#4A7FD4] to-[#7B5EA7] mb-2 leading-none" style={{ fontFamily: 'Georgia, serif' }}>{stat.v}</div>
                  <div className="text-sm text-[#7A82A0] font-medium">{stat.d}</div>
               </motion.div>
             ))}
          </div>
          <div className="mx-auto max-w-[600px] border border-[#4A7FD4]/40 bg-[#4A7FD4]/10 rounded-2xl p-6 text-center text-white font-bold text-xl shadow-2xl shadow-[#4A7FD4]/20">
             Increasing sales by 10% is hard. <span className="text-[#4A7FD4]">Stopping 10% leakage is faster.</span>
          </div>
        </div>
      </section>

      {/* Section 9 — Testimonials */}
      <section className="bg-[#07090F] py-24 px-6 md:px-12 relative">
         <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8921A]/5 blur-[120px] rounded-full pointer-events-none"></div>
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 flex flex-col items-center">
               <span className="text-[10px] uppercase text-[#7B5EA7] tracking-widest font-bold mb-4 block">TESTIMONIALS</span>
               <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4" style={{ fontFamily: 'Georgia, serif' }}>What Restaurant Owners Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { q: "BringIT changed my life. I finally have my weekends back knowing they are catching every missed online order.", n: "S. Harris", r: "Multi-unit Franchisee" },
                 { q: "We found over $2,000 in monthly labor waste just in early clock-ins within the first 30 days of using BringIT. Incredible.", n: "J. Martinez", r: "Restaurant Owner" },
                 { q: "Honestly, I was tired of being involved in every little problem. Now I focus on opening new locations and bigger plans. I just have one weekly meeting with BringIT and my store manager, and they handle the rest. Life is much easier now.", n: "Arshad", r: "MULTI-UNIT OPERATOR" }
               ].map((t, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-[#111422] border border-white/5 rounded-[20px] p-8 flex flex-col shadow-xl shadow-black/40">
                     <div className="text-[#E8921A] mb-4 text-sm tracking-widest">★★★★★</div>
                     <p className="italic text-[#B0B8D0] text-[14px] leading-relaxed mb-8 flex-1">"{t.q}"</p>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-serif text-lg font-bold shadow-inner shadow-white/5">{t.n[0]}</div>
                        <div>
                           <div className="font-bold text-[13px] text-white">{t.n}</div>
                           <div className="text-[11px] text-[#7A82A0] uppercase tracking-wider">{t.r}</div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Section 10 — About Founder */}
      <section id="about" className="bg-[#07090F] py-[100px] px-[6%]">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full lg:w-1/3 bg-[#0C0E18] border border-[rgba(255,255,255,0.07)] rounded-[24px] p-10 flex flex-col items-center justify-between">
               <div className="bg-[#111422] rounded-[16px] p-10 mb-8 flex items-center justify-center">
                  <Users size={120} color="rgba(255,255,255,0.12)" />
               </div>
               <div className="flex flex-col items-center">
                 <h3 className="font-bold text-[1.1rem] text-[#ECEEF5] mb-1">Fahad Siddique</h3>
                 <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#4A7FD4]">FOUNDER</span>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="w-full lg:w-2/3 flex flex-col justify-center">
               <h2 className="font-serif font-bold leading-[1.1] mb-[1.2rem] text-[clamp(2rem,4vw,3.2rem)] text-white" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                  Built by someone who understands<br/>
                  <span className="text-[#4A7FD4]">restaurant</span>{' '}
                  <span className="text-[#E8921A]">chaos</span>{' '}
                  <span className="text-[#ECEEF5]">from the inside.</span>
               </h2>
               <p className="text-[1rem] text-[#7A82A0] font-light leading-[1.8] mb-[2rem]">
                  Over 5+ years of experience managing restaurant operations remotely for U.S.-based restaurant groups.
               </p>
               
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                  {['Back-Office Operations', 'Customer Support', 'Social Media Management', 'Inventory Coordination', 'Reporting Systems', 'Staff Accountability', 'Operational Follow-Up', 'Revenue Protection Systems'].map((s, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="bg-[#111422] border border-[rgba(255,255,255,0.08)] rounded-[10px] px-4 py-2.5 text-[11px] uppercase tracking-[0.08em] font-bold text-[#B0B8D0] hover:border-[rgba(74,127,212,0.3)] hover:text-[#ECEEF5] transition-colors flex items-center justify-center text-center cursor-default">
                      {s}
                    </motion.div>
                  ))}
               </div>

               <div className="mt-8 bg-[#0C0E18] border border-[rgba(255,255,255,0.07)] border-l-[3px] border-l-[#4A7FD4] rounded-[12px] p-[1.5rem_2rem]">
                 <div className="text-[13px] text-[#7A82A0] italic mb-2">Operation Experience with:</div>
                 <div className="font-bold text-[#ECEEF5] text-[1rem]">Cold Stone • Dunkin' • Baskin Robbins • Charleys</div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Section 11 — FAQ */}
      <section className="bg-[#07090F] py-24 px-6 md:px-12 relative border-t border-white/5">
        <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-[#4A7FD4]/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-[760px] mx-auto relative z-10">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="text-[10px] uppercase text-[#4A7FD4] tracking-widest font-bold mb-4 block">FAQ</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4" style={{ fontFamily: 'Georgia, serif' }}>Common Questions</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { q: 'Are you replacing my manager?', a: 'No. BringIT works behind the scenes to support your existing team. We handle what your manager doesn\'t have time for and hold everyone accountable.' },
              { q: 'Do you work with franchises?', a: 'Yes. We have hands-on experience with Cold Stone, Dunkin\', Baskin Robbins, Charleys, Domino\'s, and Papa John\'s. We understand franchise compliance and operational pressure.' },
              { q: 'Can you support multiple locations?', a: 'Absolutely. Our Premium package is built for multi-store operators with cross-location reporting, executive summaries, and dedicated account management.' },
              { q: 'Do you handle delivery app disputes?', a: 'Yes. We dispute false refund claims on UberEats, DoorDash, and Grubhub up to platform limits, track recovery weekly, and report exactly what was saved.' },
              { q: 'Is this only for large restaurants?', a: 'Not at all. Our Starter at $149/month is for single-store owners. The problems we solve affect every size of operation.' },
              { q: 'Who has access to my store systems?', a: 'Access is handled personally by Fahad Siddique, the BringIT founder. Sensitive credentials are never shared without your explicit approval.' },
            ].map((faq, i) => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <div key={i} className={`bg-[#0C0E18] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10 ${isOpen ? 'accordion-open border-white/10 shadow-lg shadow-black/30' : ''}`}>
                  <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-6 flex justify-between items-center gap-4">
                    <span className="font-semibold text-[16px] text-white">{faq.q}</span>
                    <X className={`w-5 h-5 text-[#B0B8D0] shrink-0 accordion-arrow transition-transform duration-300 ${isOpen ? '' : 'rotate-45'}`} />
                  </button>
                  <div className={`accordion-content px-6 bg-white/[0.02] text-[15px] text-[#7A82A0] leading-relaxed transition-all duration-300 ${isOpen ? 'pb-6' : ''}`}>
                    {faq.a}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 12 — Final CTA */}
      <section className="bg-[#0C0E18] py-32 px-6 md:px-12 border-y border-white/5 relative overflow-hidden text-center">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-[#4A7FD4]/10 to-[#7B5EA7]/10 blur-[150px] rounded-full pointer-events-none"></div>
         <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="font-serif text-[clamp(2.5rem,4vw,4rem)] font-bold mb-6" style={{ fontFamily: 'Georgia, serif' }}>Your Store Runs Better With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A7FD4] to-[#7B5EA7]">BringIT</span></h2>
            <p className="text-lg text-[#7A82A0] font-light mb-12 max-w-xl mx-auto leading-relaxed">Let us handle the back office while you focus on growth. No long contracts, no complicated setup.</p>
            <a href="#contact" className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#4A7FD4] to-[#7B5EA7] text-white font-bold tracking-wide shadow-xl shadow-blue-500/20 hover:opacity-90 transition-all text-lg border border-white/10 pointer-events-auto">
              Book Free Strategy Call →
            </a>
         </div>
      </section>

      {/* Section 13 — Contact Form */}
      <section id="contact" className="bg-[#07090F] py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-5/12 flex flex-col">
             <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Georgia, serif' }}>Let's Talk About Your Stores</h2>
             <p className="text-[14.5px] text-[#7A82A0] leading-relaxed mb-10">Book a free 15-minute strategy call. We'll identify your biggest operational gaps and show you exactly how BringIT can protect your revenue — no pressure, no commitment.</p>
             
             <div className="space-y-6 mb-12">
                <a href="https://wa.me/8801351656330?text=Hi, I'd like to learn more about BringIT" target="_blank" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[#25D366]/5 border border-[#25D366]/20 rounded-xl flex justify-center items-center group-hover:bg-[#25D366]/20 text-[#25D366] transition-colors"><MessageCircle size={20} /></div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#7A82A0] mb-1">WhatsApp</div>
                    <div className="text-[15px] font-medium group-hover:text-white transition-colors">+880 1351-656330</div>
                  </div>
                </a>
                <a href="mailto:bringit.bpo@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[#4A7FD4]/5 border border-[#4A7FD4]/20 rounded-xl flex justify-center items-center group-hover:bg-[#4A7FD4]/20 text-[#4A7FD4] transition-colors"><Mail size={20} /></div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#7A82A0] mb-1">Email</div>
                    <div className="text-[15px] font-medium group-hover:text-white transition-colors">bringit.bpo@gmail.com</div>
                  </div>
                </a>
             </div>

             <div className="bg-[#111422] border border-white/5 rounded-[14px] p-5 text-[13.5px] text-[#B0B8D0] flex gap-3 shadow-inner shadow-black/20">
               <span className="shrink-0">📍</span>
               <p><strong className="text-white">Response Time:</strong> We reply within 24 hours. WhatsApp is the fastest way to reach us.</p>
             </div>
          </div>

          <div className="w-full md:w-7/12">
             <div className="bg-[#0C0E18] border border-white/5 rounded-[24px] p-8 md:p-10 shadow-2xl shadow-black/50 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#4A7FD4]/10 blur-[80px] pointer-events-none rounded-full"></div>
               <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#7B5EA7]/10 blur-[80px] pointer-events-none rounded-full"></div>
               <div className="relative z-10">
               {(() => {
                 const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle');
                 
                 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
                   e.preventDefault();
                   setStatus('submitting');
                   const formData = new FormData(e.currentTarget);
                   try {
                     const response = await fetch("https://formspree.io/f/mgorgakb", {
                       method: 'POST',
                       body: formData,
                       headers: { 'Accept': 'application/json' }
                     });
                     if (response.ok) setStatus('success');
                     else setStatus('error');
                   } catch (err) {
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
                       <a href="mailto:bringit.bpo@gmail.com" className="px-6 py-3 rounded-full bg-[#4A7FD4] text-white font-bold">Email Us Directly</a>
                     </div>
                   );
                 }

                 return (
                   <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
                     <div className="flex flex-col md:flex-row gap-5">
                       <div className="flex-1"><input required name="name" type="text" placeholder="Your Name" className="w-full bg-[#111422] border border-white/5 rounded-[12px] px-4 py-3.5 focus:border-[#4A7FD4]/50 hover:border-white/10 outline-none text-[14px] transition-colors" /></div>
                       <div className="flex-1"><input required name="business" type="text" placeholder="Business Name" className="w-full bg-[#111422] border border-white/5 rounded-[12px] px-4 py-3.5 focus:border-[#4A7FD4]/50 hover:border-white/10 outline-none text-[14px] transition-colors" /></div>
                     </div>
                     <div className="flex flex-col md:flex-row gap-5">
                       <div className="flex-1"><input required name="email" type="email" placeholder="Email Address" className="w-full bg-[#111422] border border-white/5 rounded-[12px] px-4 py-3.5 focus:border-[#4A7FD4]/50 hover:border-white/10 outline-none text-[14px] transition-colors" /></div>
                       <div className="flex-1"><input name="whatsapp" type="tel" placeholder="WhatsApp (Optional)" className="w-full bg-[#111422] border border-white/5 rounded-[12px] px-4 py-3.5 focus:border-[#4A7FD4]/50 hover:border-white/10 outline-none text-[14px] transition-colors" /></div>
                     </div>
                     <select name="locations" className="w-full bg-[#111422] border border-white/5 rounded-[12px] px-4 py-3.5 focus:border-[#4A7FD4]/50 hover:border-white/10 outline-none text-[14px] text-[#7A82A0] transition-colors appearance-none" defaultValue="">
                        <option value="" disabled>Number of Locations</option>
                        <option value="1">1</option>
                        <option value="2-3">2–3</option>
                        <option value="4-6">4–6</option>
                        <option value="7+">7+</option>
                     </select>
                     <textarea required name="message" placeholder="How can we help?" rows={5} className="w-full bg-[#111422] border border-white/5 rounded-[12px] px-4 py-3.5 focus:border-[#4A7FD4]/50 hover:border-white/10 outline-none text-[14px] transition-colors resize-none"></textarea>
                     <button type="submit" disabled={status === 'submitting'} className="w-full py-4 rounded-[12px] bg-gradient-to-r from-[#4A7FD4] to-[#7B5EA7] text-white font-bold text-[15px] tracking-wide hover:opacity-90 disabled:opacity-50 transition-opacity mt-2 shadow-lg shadow-[#4A7FD4]/20 border border-white/10">
                       {status === 'submitting' ? 'Sending...' : 'Send Message →'}
                     </button>
                   </form>
                 );
               })()}
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#07090F] border-t border-white/5 py-12 px-6 md:px-12 relative overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <Logo />
            <div className="text-[12px] text-[var(--muted)]">© 2025 BringIT. Remote Operations & Revenue Control for Restaurants. All rights reserved.</div>
            <div className="flex gap-6 text-[12px] font-medium uppercase tracking-wider text-[var(--soft)]">
               <a href="#" className="hover:text-white">Home</a>
               <a href="#services" className="hover:text-white">Services</a>
               <a href="#pricing" className="hover:text-white">Pricing</a>
               <a href="#contact" className="hover:text-white">Contact</a>
            </div>
         </div>
      </footer>

      {/* Auth Modal */}
      <AnimatePresence>
         {isAuthModalOpen && !user && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] modal-overlay flex items-center justify-center p-4" onClick={(e) => { if(e.target === e.currentTarget) setIsAuthModalOpen(false) }}>
               <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-[480px] bg-[var(--dark2)] border border-[rgba(255,255,255,0.12)] rounded-3xl p-10 md:p-12 relative flex flex-col">
                  <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-6 right-6 text-[var(--muted)] hover:text-white"><X size={20}/></button>
                  <h3 className="font-serif text-3xl font-bold mb-2">Welcome <span className="italic text-gradient">Partner</span></h3>
                  <div className="mb-8">
                    {selectedPackage ? (
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(123,94,167,0.1)] border border-[rgba(123,94,167,0.3)] rounded-full text-[11px] font-bold text-[var(--purple)] uppercase tracking-wider">
                        <span>Selected Package: </span>
                        <span className="text-white">{selectedPackage}</span>
                      </div>
                    ) : (
                      <p className="text-[13.5px] text-[var(--muted)]">Please log in to continue</p>
                    )}
                  </div>
                  
                  <button onClick={handleLogin} className="w-full bg-white text-black font-semibold py-3.5 rounded-full flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
                     <svg width="20" height="20" viewBox="0 0 48 48" className="shrink-0"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.16 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                     Continue with Google
                  </button>
                  <p className="text-[11px] text-[var(--muted)] text-center mt-6">By signing in, you agree to our terms.</p>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* Package Contact Modal */}
      <AnimatePresence>
         {isContactModalOpen && user && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] modal-overlay flex items-center justify-center p-4" onClick={(e) => { if(e.target === e.currentTarget) setIsContactModalOpen(false) }}>
               <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-[480px] bg-[var(--dark2)] border border-[rgba(255,255,255,0.12)] rounded-3xl p-10 relative flex flex-col">
                  <button onClick={() => setIsContactModalOpen(false)} className="absolute top-6 right-6 text-[var(--muted)] hover:text-white"><X size={20}/></button>
                  <h3 className="font-serif text-3xl font-bold mb-1">Let's Get <span className="italic text-gradient">Started</span></h3>
                  <p className="text-[#a1a1aa] mb-8 text-[13.5px]">Selected Package: <strong className="text-white ml-1">{selectedPackage}</strong></p>
                  
                  <div className="flex flex-col gap-4">
                     <a href={`https://wa.me/8801351656330?text=Hi! I'm interested in the ${selectedPackage} package. Can we talk?`} target="_blank" className="bg-[rgba(255,255,255,0.03)] border border-white/5 hover:border-[rgba(37,211,102,0.4)] hover:bg-[rgba(37,211,102,0.05)] rounded-2xl p-5 transition-colors flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] flex shrink-0 justify-center items-center group-hover:scale-110 transition-transform"><MessageCircle /></div>
                        <div>
                           <div className="font-bold text-white mb-0.5">WhatsApp Us</div>
                           <div className="text-[12px] text-[var(--muted)]">Fastest response — usually within a few hours</div>
                        </div>
                     </a>

                     <a href={`mailto:bringit.bpo@gmail.com?subject=BringIT Package Inquiry — ${selectedPackage}`} target="_blank" className="bg-[rgba(255,255,255,0.03)] border border-white/5 hover:border-[rgba(74,127,212,0.4)] hover:bg-[rgba(74,127,212,0.05)] rounded-2xl p-5 transition-colors flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-[var(--blue)]/10 text-[var(--blue)] flex shrink-0 justify-center items-center group-hover:scale-110 transition-transform"><Mail /></div>
                        <div>
                           <div className="font-bold text-white mb-0.5">Send an Email</div>
                           <div className="text-[12px] text-[var(--muted)]">We reply within 24 hours</div>
                        </div>
                     </a>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <img src={user.photoURL || ''} alt="User" className="w-6 h-6 rounded-full opacity-60" />
                        <div className="flex flex-col text-[10px] text-[var(--muted)] leading-tight">
                           <span>Signed in as {user.displayName}</span>
                           <span>{user.email}</span>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}
