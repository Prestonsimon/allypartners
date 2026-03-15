import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AllyApproach from './components/AllyApproach';
import Services from './components/Services';
import MarketInsights from './components/MarketInsights';
import Contact from './components/Contact';
import ContactPage from './components/ContactPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'contact' | 'privacy' | 'terms'>('home');

  // Navigation Logic
  const navigateToContact = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setView('contact');
    window.scrollTo(0, 0);
  };

  const navigateToHome = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setView('home');
    window.scrollTo(0, 0);
  };

  const navigateToPrivacy = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setView('privacy');
    window.scrollTo(0, 0);
  };

  const navigateToTerms = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setView('terms');
    window.scrollTo(0, 0);
  };

  // ONE SINGLE RETURN BLOCK
  return (
    <GoogleReCaptchaProvider 
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
    >
      <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
        <Navbar 
          onContactClick={navigateToContact} 
          onHomeClick={navigateToHome} 
          isHome={view === 'home'} 
        />
        
        <main className="flex-grow">
          {view === 'home' && (
            <>
              <Hero onContactClick={navigateToContact} />
              <AllyApproach onContactClick={navigateToContact} />
              <Services onContactClick={navigateToContact} />
              <MarketInsights onContactClick={navigateToContact} />
              <Contact 
                onContactClick={navigateToContact} 
                onPrivacyClick={navigateToPrivacy}
                onTermsClick={navigateToTerms}
              />
            </>
          )}

          {view === 'contact' && (
            <ContactPage onBackClick={navigateToHome} />
          )}

          {view === 'privacy' && (
            <>
              <PrivacyPolicy onBackClick={navigateToHome} onContactClick={navigateToContact} />
              <Contact 
                onContactClick={navigateToContact} 
                onPrivacyClick={navigateToPrivacy}
                onTermsClick={navigateToTerms}
              />
            </>
          )}

          {view === 'terms' && (
            <>
              <Terms onBackClick={navigateToHome} />
              <Contact 
                onContactClick={navigateToContact} 
                onPrivacyClick={navigateToPrivacy}
                onTermsClick={navigateToTerms}
              />
            </>
          )}
        </main>
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default App;