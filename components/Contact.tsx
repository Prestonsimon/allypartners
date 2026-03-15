
import React from 'react';

interface ContactProps {
  onContactClick: (e: React.MouseEvent) => void;
  onPrivacyClick: (e: React.MouseEvent) => void;
  onTermsClick: (e: React.MouseEvent) => void;
}

const Contact: React.FC<ContactProps> = ({ onContactClick, onPrivacyClick, onTermsClick }) => {
  return (
    <footer id="contact" className="bg-zinc-950 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-zinc-900 rounded-[40px] border border-white/5 p-8 md:p-16 text-center text-white relative overflow-hidden mb-24">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,#3b82f615,transparent)]"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to work with an Ally?</h2>
            <p className="text-zinc-400 text-lg mb-12 leading-relaxed">
              We aren't just external consultants; we are part of the team. Let's build your operational roadmap together.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={onContactClick}
                className="bg-zinc-100 text-zinc-950 px-12 py-5 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/40 text-lg group"
              >
                Get In Touch <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center transition-all">
              <span className="text-zinc-950 font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-xl tracking-tighter text-white">
              Ally Partners<span className="text-orange-500">.</span>
            </span>
          </div>

          <div className="flex gap-8 text-[13px] text-zinc-500 font-semibold tracking-wide">
            <button onClick={onPrivacyClick} className="hover:text-blue-500 transition-colors">Privacy</button>
            <button onClick={onTermsClick} className="hover:text-blue-500 transition-colors">Terms</button>
            <a href="https://www.linkedin.com/company/ally-partners" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">LinkedIn</a>
          </div>

          <div className="text-xs font-medium text-zinc-600 tracking-wider">
            &copy; {new Date().getFullYear()} Ally Limited. Jersey, Channel Islands.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
