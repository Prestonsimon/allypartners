import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
// 1. Import the necessary icons
import { ArrowLeft, Check, MapPin, Loader2, Send } from 'lucide-react';

interface ContactPageProps {
  onBackClick: (e: React.MouseEvent) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBackClick }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    firm: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      alert("Security check not yet ready. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const token = await executeRecaptcha('contact_form');
      const response = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: token
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const err = await response.json();
        alert(err.error || "Failed to send message.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center animate-in fade-in zoom-in-95 duration-700">
          <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            {/* 2. Success Check Icon */}
            <Check size={32} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Message Received.</h1>
          <p className="text-zinc-400 mb-10 leading-relaxed">
            Thank you for reaching out. A partner from our Jersey office will contact you shortly to discuss your operational roadmap.
          </p>
          <button
            onClick={onBackClick}
            className="flex items-center justify-center mx-auto gap-2 text-blue-500 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Return to Home
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
          {/* 3. Back Arrow Icon */}
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
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
                {/* 4. Location Pin Icon */}
                <div className="text-blue-500 mt-1"><MapPin size={18} /></div>
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                  <input 
                    required 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    placeholder="john@firm.com"
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Firm / Fund Name</label>
                <input 
                  name="firm"
                  value={formData.firm}
                  onChange={handleChange}
                  type="text" 
                  placeholder="Asset Management Ltd."
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">How can we help?</label>
                <textarea 
                  required 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your operational challenges..."
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                ></textarea>
              </div>

              <div className="pt-2 pb-4">
                <p className="text-[10px] text-zinc-500 text-center leading-relaxed">
                  Secured by Google reCAPTCHA.<br/>
                  <a href="https://policies.google.com/privacy" className="hover:text-blue-500 transition-colors">Privacy</a> & <a href="https://policies.google.com/terms" className="hover:text-blue-500 transition-colors">Terms</a> apply.
                </p>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-zinc-100 text-zinc-950 font-bold py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    {/* 5. Animated Loading Spinner */}
                    <Loader2 size={18} className="animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  <>
                    {/* 6. Paper Plane Icon */}
                    Submit Inquiry <Send size={14} />
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