
import React from 'react';

interface TermsProps {
  onBackClick: (e: React.MouseEvent) => void;
}

const Terms: React.FC<TermsProps> = ({ onBackClick }) => {
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
          <h1 className="text-5xl font-extrabold text-white tracking-tighter mb-4">Terms of Service</h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em]">Last Updated: June 2024</p>
        </header>

        <div className="prose prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">1. Acceptance of Terms</h2>
            <p className="text-zinc-400 leading-relaxed">
              By accessing or using the website of Ally Limited ("Ally Partners"), you agree to be bound by these Terms of Service and all applicable laws and regulations in Jersey, Channel Islands. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="bg-zinc-900/50 border border-blue-500/10 p-8 rounded-[32px]">
            <h2 className="text-xl font-bold text-blue-400 mb-4 border-b border-blue-500/10 pb-2 flex items-center gap-3">
              <i className="fa-solid fa-robot text-sm"></i> 2. AI-Generated Content & Strategic Summaries
            </h2>
            <div className="space-y-4">
              <p className="text-zinc-300 leading-relaxed font-medium">
                Our "Intelligence Engine" and "Market Insights" features utilize advanced Generative Artificial Intelligence (AI) to synthesize real-time summaries of market trends.
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-3 ml-4">
                <li><span className="text-white font-semibold">Not Professional Advice:</span> The content provided by our AI agent is for informational purposes only. It does not constitute professional financial, investment, legal, or operational advice.</li>
                <li><span className="text-white font-semibold">Accuracy Disclaimer:</span> While we aim for high-quality synthesis, Ally Partners does not warrant or guarantee the accuracy, completeness, or reliability of AI-generated insights. AI can occasionally produce "hallucinations" or factually incorrect information.</li>
                <li><span className="text-white font-semibold">No Reliance:</span> You should not rely solely on these summaries for business critical decisions. Always consult with a human partner at Ally Partners or another qualified professional before taking action based on website content.</li>
                <li><span className="text-white font-semibold">Dynamic Nature:</span> AI-generated content is ephemeral and subject to change based on evolving data patterns and underlying model updates.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">3. Intellectual Property</h2>
            <p className="text-zinc-400 leading-relaxed">
              The materials contained in this website are protected by applicable copyright and trademark law. The "Ally Partners" name, logo, and the custom operational roadmaps presented are the exclusive property of Ally Limited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">4. Use License</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Permission is granted to temporarily view the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2 ml-4">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose;</li>
              <li>Attempt to decompile or reverse engineer any software or AI models contained on the site;</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">5. Limitations of Liability</h2>
            <p className="text-zinc-400 leading-relaxed">
              In no event shall Ally Partners or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if Ally Partners has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">6. Governing Law</h2>
            <p className="text-zinc-400 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of Jersey, Channel Islands, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
