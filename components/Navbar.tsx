
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onContactClick: (e: React.MouseEvent) => void;
  onHomeClick: (e: React.MouseEvent) => void;
  isHome: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onContactClick, onHomeClick, isHome }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || !isHome ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={onHomeClick} className="flex items-center gap-2 group outline-none">
          <div className="w-9 h-9 bg-zinc-100 rounded-lg flex items-center justify-center transition-all group-hover:bg-blue-600 group-hover:rotate-12">
            <span className="text-zinc-950 font-bold text-xl">A</span>
          </div>
          <span className="font-bold text-xl tracking-tighter text-white">
            Ally Partners<span className="text-orange-500">.</span>
          </span>
        </button>

        <div className="flex items-center gap-10">
          <button
            onClick={onContactClick}
            className="bg-zinc-100 text-zinc-950 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-lg shadow-zinc-900/50"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
