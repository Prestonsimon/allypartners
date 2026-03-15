
import React, { useState } from 'react';

interface ContactPageProps {
  onBackClick: (e: React.MouseEvent) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBackClick }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center animate-in fade-in zoom-in-95 duration-700">
          <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <i className="fa-solid fa-check text-3xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Message Received.</h1>
          <p className="text-zinc-400 mb-10 leading-relaxed">
            Thank you for reaching out. A partner from our Jersey office will contact you shortly to discuss your operational roadmap.
          </p>
          <button
            onClick={onBackClick}
            className="text-blue-500 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i> Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBackClick}
          className="group text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-12 outline-none"
        >
          <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          Back to Overview
        </button>

        <div className="grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <h1 className="text-5xl font-extrabold text-white tracking-tighter leading-none mb-6">
              Let's build <br/> your <span className="text-blue-500">roadmap.</span>
            </h1>
            <p className="text-zinc-400 leading-relaxed mb-10">
              We focus on high-stakes operations for alternative asset managers. Tell us where the friction is, and we'll engineer the fix.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-blue-500 mt-1"><i className="fa-solid fa-location-dot"></i></div>
                <div>
                  <p className="text-white font-bold text-sm">Jersey Office</p>
                  <p className="text-zinc-500 text-xs tracking-wide">Channel Islands, UK</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-zinc-900 border border-white/5 p-8 md:p-10 rounded-[32px] shadow-2xl relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="john@firm.com"
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Firm / Fund Name</label>
                <input 
                  type="text" 
                  placeholder="Asset Management Ltd."
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">How can we help?</label>
                <textarea 
                  required 
                  rows={4}
                  placeholder="Tell us about your operational challenges..."
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                ></textarea>
              </div>

              {/* Security Check Section (ReCAPTCHA Placeholder) */}
              <div className="pt-2 pb-4">
                <div className="bg-zinc-950/50 border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-3">Security Verification</div>
                  {/* RECAPTCHA INTEGRATION POINT */}
                  <div id="recaptcha-container" className="min-h-[78px] flex items-center justify-center">
                    <div className="text-zinc-700 text-[11px] italic">
                      ReCAPTCHA component will be initialized here.
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-zinc-100 text-zinc-950 font-bold py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    Sending Request...
                  </>
                ) : (
                  <>
                    Submit Inquiry <i className="fa-solid fa-paper-plane text-xs"></i>
                  </>
                )}
              </button>
              
              <p className="text-center text-[10px] text-zinc-600 leading-relaxed px-4">
                By submitting, you agree to our privacy policy. We respect your operational data and maintain strict confidentiality.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
