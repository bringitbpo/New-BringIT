import { useEffect, useState } from 'react';
import './site.css';
import './effects.css';
import { useSiteEffects } from './components/site/useSiteEffects';
import { Nav } from './components/site/Nav';
import { Hero, Strips } from './components/site/Hero';
import { OpsTablet } from './components/site/OpsTablet';
import { Services } from './components/site/Services';
import { Disputes } from './components/site/Disputes';
import { HowWeWork, Reporting } from './components/site/HowWeWork';
import { About } from './components/site/About';
import { Security } from './components/site/Security';
import { Packages } from './components/site/Packages';
import { Faq } from './components/site/Faq';
import { Contact, Footer } from './components/site/Contact';
import { BookingModal } from './components/site/BookingModal';
import { PrivacyPolicy } from './components/site/PrivacyPolicy';

const usePrivacyRoute = () => {
  const [isPrivacy, setIsPrivacy] = useState(() => window.location.hash === '#/privacy');
  useEffect(() => {
    const onHash = () => {
      const p = window.location.hash === '#/privacy';
      setIsPrivacy(p);
      if (p) window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return isPrivacy;
};

export default function App() {
  const [booking, setBooking] = useState(false);
  const isPrivacy = usePrivacyRoute();
  const openBooking = () => setBooking(true);
  useSiteEffects([isPrivacy]);

  return (
    <div className="site">
      <Nav onBook={openBooking} />
      {isPrivacy ? <PrivacyPolicy /> : (
        <main>
          <Hero onBook={openBooking} />
          <OpsTablet />
          <Strips />
          <Services />
          <Disputes />
          <HowWeWork />
          <Reporting />
          <About />
          <Security />
          <Packages />
          <Faq />
          <Contact onBook={openBooking} />
        </main>
      )}
      <Footer />
      {booking && <BookingModal onClose={() => setBooking(false)} />}
    </div>
  );
}
