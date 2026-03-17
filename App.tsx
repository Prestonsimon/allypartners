import './index.css';
import React, { useState, useCallback, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AllyApproach from './components/AllyApproach';
import Services from './components/Services';
import Contact from './components/Contact';
import ContactPage from './components/ContactPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';

// Lazy load the heavy component
const MarketInsights = lazy(() => import('./components/MarketInsights'));

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'contact' | 'privacy' | 'terms'>('home');

  const navigateToContact = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setView('contact');
    window.scrollTo(0, 0);
  }, []);

  const navigateToHome = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setView('home');
    window.scrollTo(0, 0);
  }, []);

  const navigateToPrivacy = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setView('privacy');
    window.scrollTo(0, 0);
  }, []);

  const navigateToTerms = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setView('terms');
    window.scrollTo(0, 0);
  };

  // CLEAN RETURN BLOCK - No dangling ReCaptcha code
  return (
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
            
            <Suspense fallback={
              <div className="h-64 bg-zinc-900/50 flex items-center justify-center">
                <span className="text-zinc-700 text-[10px] uppercase tracking-widest">Loading...</span>
              </div>
            }>
              <MarketInsights onContactClick={navigateToContact} />
            </Suspense>

            <Contact 
              onContactClick={navigateToContact} 
              onPrivacyClick={navigateToPrivacy}
              onTermsClick={navigateToTerms}
            />
          </>
        )}

        {view === 'contact' && <ContactPage onBackClick={navigateToHome} />}

        {view === 'privacy' && (
          <>
            <PrivacyPolicy onBackClick={navigateToHome} onContactClick={navigateToContact} />
            <Contact onContactClick={navigateToContact} onPrivacyClick={navigateToPrivacy} onTermsClick={navigateToTerms} />
          </>
        )}

        {view === 'terms' && (
          <>
            <Terms onBackClick={navigateToHome} />
            <Contact onContactClick={navigateToContact} onPrivacyClick={navigateToPrivacy} onTermsClick={navigateToTerms} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;