
import React from 'react';

interface PrivacyPolicyProps {
  onBackClick: (e: React.MouseEvent) => void;
  onContactClick: (e: React.MouseEvent) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBackClick, onContactClick }) => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-zinc-950">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBackClick}
          className="group text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-12 outline-none"
        >
          <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          Back to Overview
        </button>

        <header className="mb-16">
          <h1 className="text-5xl font-extrabold text-white tracking-tighter mb-4">Privacy Policy</h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em]">Last Updated: June 2024</p>
        </header>

        <div className="prose prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">1. Introduction</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Your privacy is important to us. It is Ally Limited's policy to respect your privacy regarding any information we may collect from you across our website, <span className="text-blue-400">ally-partners.com</span>, and other sites we own and operate.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Ally Limited is registered in Jersey, Channel Islands. We are committed to protecting your personal data and being transparent about what information we hold about you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">2. Information we collect</h2>
            <h3 className="text-white font-semibold mb-2">Log Data</h3>
            <p className="text-zinc-400 leading-relaxed mb-4">
              When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.
            </p>
            <h3 className="text-white font-semibold mb-2">Personal Information</h3>
            <p className="text-zinc-400 leading-relaxed">
              We may ask for personal information, such as your name, email, and company details, specifically when you use our contact form or request a consultation. We only ask for personal information when we truly need it to provide a service to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">3. Legal bases for processing</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We process your personal information lawfully, fairly, and in a transparent manner. We collect and process information about you only where we have legal bases for doing so.
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2 ml-4">
              <li>Where it is necessary for the performance of a contract to which you are a party.</li>
              <li>Where it satisfies a legitimate interest (which is not overridden by your data protection interests).</li>
              <li>Where you give us consent to do so for a specific purpose.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">4. Data Retention & Security</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              While we do our best to protect the personal information you provide to us, we advise that no method of electronic transmission or storage is 100% secure and no one can guarantee absolute data security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">5. Disclosure to Third Parties</h2>
            <p className="text-zinc-400 leading-relaxed">
              We do not share your personal information with third parties, except when required by law or to protect our rights. We may use third-party services for our website operations, and they may have access to your data only to perform specific tasks on our behalf.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">6. Your Rights</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              In accordance with the Data Protection (Jersey) Law 2018 and the GDPR, you have the right to be informed about how your data is collected and used. You are entitled to know what data we collect about you, and how it is processed.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
              You are entitled to correct and update any personal information about you, and to request that this information be deleted.
            </p>
            <p className="text-zinc-500 text-sm">
              If you have any questions about how we handle user data and personal information, feel free to contact us via our 
              <button 
                onClick={onContactClick} 
                className="text-blue-400 hover:text-blue-300 ml-1 font-bold underline transition-colors"
              >
                contact form
              </button>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
