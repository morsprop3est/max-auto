'use client';

import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';

const AboutUs = dynamic(() => import('../components/AboutUs/AboutUs'));
const Stats = dynamic(() => import('../components/Stats/Stats'));
const Services = dynamic(() => import('../components/Services/Services'));
const Millitary = dynamic(() => import('../components/Millitary/Millitary'));
const Dashboard = dynamic(() => import('../components/Dashboard/Dashboard.jsx'));
const Calculator = dynamic(() => import('../components/Calculator/Calculator'));
const Reviews = dynamic(() => import('../components/Reviews/Reviews.jsx'));
const ContactUs = dynamic(() => import('../components/ContactUs/ContactUs'));
const Footer = dynamic(() => import('../components/Footer/Footer'));

export default function ClientSections({ components, lots, bodyTypes, fuelTypes  }) {
  const [aboutUsRef, aboutUsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [millitaryRef, millitaryInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [dashboardRef, dashboardInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [calculatorRef, calculatorInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [reviewsRef, reviewsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [footerRef, footerInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <div ref={aboutUsRef}>{aboutUsInView && <AboutUs component={components.about_us} />}</div>
      {/* <div ref={statsRef}>{statsInView && <Stats component={components.stats} />}</div>
      <div ref={servicesRef}>{servicesInView && <Services component={components.service} />}</div>
      <div ref={millitaryRef}>{millitaryInView && <Millitary component={components.millitary} />}</div>
      <div ref={dashboardRef}>
        {dashboardInView && (
          <Dashboard
            components={components.dashboard}
            lots={lots}
            bodyTypes={bodyTypes}
            fuelTypes={fuelTypes}
          />
        )}
      </div>
      <div ref={calculatorRef}>{calculatorInView && <Calculator component={components.calculator} />}</div>
      <div ref={reviewsRef}>{reviewsInView && <Reviews component={components.reviews} />}</div>
      <div ref={contactRef}>{contactInView && <ContactUs />}</div>
      <div ref={footerRef}>{footerInView && <Footer />}</div> */}
    </>
  );
}
