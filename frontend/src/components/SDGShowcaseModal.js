import React from 'react';
import { 
  X, 
  Award, 
  Leaf, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Building2, 
  ArrowRight,
  Globe2,
  FileText,
  Calculator
} from 'lucide-react';

const SDGShowcaseModal = ({ isOpen, onClose, setCurrentPage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 modal-backdrop animate-fade-in-up">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-emerald-500/20 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-950 via-slate-950 to-teal-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <Award className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white">1M1B AI for Sustainability Virtual Internship</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  IBM SkillsBuild & AICTE
                </span>
              </div>
              <p className="text-xs text-slate-300">Project Overview, SDG 12/13 Alignment & Architecture Charter</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-800 text-xs sm:text-sm">
          
          {/* SDG Alignment Banner */}
          <div>
            <h3 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-emerald-600" />
              UN Sustainable Development Goals (SDG) Alignment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* SDG 12 */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-amber-600 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                  12
                </div>
                <div>
                  <div className="font-bold text-amber-900 text-sm">SDG 12: Responsible Consumption & Production</div>
                  <p className="text-xs text-amber-800/80 mt-1 leading-relaxed">
                    <strong>Target 12.5</strong>: Substantially reduce waste generation through prevention, reduction, recycling, and reuse by converting manufacturing byproducts into certified secondary feedstock.
                  </p>
                </div>
              </div>

              {/* SDG 13 */}
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                  13
                </div>
                <div>
                  <div className="font-bold text-emerald-900 text-sm">SDG 13: Climate Action</div>
                  <p className="text-xs text-emerald-800/80 mt-1 leading-relaxed">
                    <strong>Target 13.2</strong>: Integrate climate change measures into national policies and corporate supply chains by quantifying and certifying Scope 3 GHG carbon offsets.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* AI Role & IBM Granite Stack */}
          <div>
            <h3 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-teal-600" />
              Role of AI & IBM Granite Integration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="font-bold text-slate-900 text-xs mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Multimodal Classification
                </div>
                <p className="text-slate-600 text-xxs leading-relaxed">
                  Extracts chemical purity, moisture, and alloy specs from uploaded scrap imagery using IBM Granite vision embeddings.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="font-bold text-slate-900 text-xs mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-teal-600" />
                  Agentic Proximity Matcher
                </div>
                <p className="text-slate-600 text-xxs leading-relaxed">
                  Pairs industrial suppliers with nearby recyclers to minimize freight logistics emissions and handling costs.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="font-bold text-slate-900 text-xs mb-1 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-green-600" />
                  Scope 3 RAG Calculator
                </div>
                <p className="text-slate-600 text-xxs leading-relaxed">
                  Retrieves standard GHG Protocol emission factors (EPA WARM / ISO 14044) to issue verifiable digital carbon receipts.
                </p>
              </div>
            </div>
          </div>

          {/* Design Thinking Framework */}
          <div>
            <h3 className="text-base font-black text-slate-900 mb-3">
              Design Thinking Implementation Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center">
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <div className="font-bold text-emerald-800 text-xs">1. Empathize</div>
                <p className="text-[10px] text-slate-600 mt-1">Found 68% of industrial scrap is landfilled due to buyer discovery friction.</p>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <div className="font-bold text-emerald-800 text-xs">2. Define</div>
                <p className="text-[10px] text-slate-600 mt-1">Framed need for B2B circular exchange with verified ESG receipts.</p>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <div className="font-bold text-emerald-800 text-xs">3. Ideate</div>
                <p className="text-[10px] text-slate-600 mt-1">Designed dual-pane live preview listing studio and instant ROI estimator.</p>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <div className="font-bold text-emerald-800 text-xs">4. Prototype</div>
                <p className="text-[10px] text-slate-600 mt-1">Built full-stack responsive web platform with resilient mock data engine.</p>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <div className="font-bold text-emerald-800 text-xs">5. Test & Refine</div>
                <p className="text-[10px] text-slate-600 mt-1">Normalized card proportions, tested 1-click demo logins and escrow flows.</p>
              </div>
            </div>
          </div>

          {/* Responsible AI Principles */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white border border-emerald-500/20">
            <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Responsible AI Principles (Mandatory Section)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xxs text-slate-300">
              <div>
                <strong className="text-white block mb-0.5">Fairness:</strong>
                Zero algorithmic bias towards large corporations over small facilities.
              </div>
              <div>
                <strong className="text-white block mb-0.5">Transparency:</strong>
                Every Scope 3 metric shows its underlying GHG emission equation.
              </div>
              <div>
                <strong className="text-white block mb-0.5">Privacy:</strong>
                Proprietary scrap recipes and trade data encrypted with 256-bit SSL.
              </div>
              <div>
                <strong className="text-white block mb-0.5">Green AI:</strong>
                Lightweight client-side inference to minimize energy consumption.
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-medium">Ready for PPT / PDF submission to 1M1B & IBM SkillsBuild</span>
          <button
            onClick={() => {
              onClose();
              if (setCurrentPage) setCurrentPage('marketplace');
            }}
            className="btn-primary-glow px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <span>Explore Live Prototype</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SDGShowcaseModal;
