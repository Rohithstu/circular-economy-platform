import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  TrendingUp, 
  Star, 
  Zap, 
  ShieldCheck, 
  Building2, 
  Leaf, 
  Globe2, 
  Sparkles,
  ArrowUpRight,
  Factory,
  Cpu,
  Calculator,
  Truck
} from 'lucide-react';
import MaterialDetailModal from '../components/MaterialDetailModal';

const HomePage = ({ setCurrentPage, user, setAuthMode, addToCart }) => {
  const [selectedListing, setSelectedListing] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCat, setSearchCat] = useState('All');
  
  // Interactive ESG Calculator State
  const [calcMaterial, setCalcMaterial] = useState('plastic');
  const [calcTons, setCalcTons] = useState(50);

  // Animated counters
  const [counters, setCounters] = useState({
    materials: 2540000,
    co2: 890000,
    companies: 14200,
    exchanges: 48500
  });

  const categories = [
    { name: 'Plastics & Polymers', icon: '♻️', count: '4,280 tons', desc: 'PET, HDPE, PP regrind & recycled flakes', slug: 'plastic', color: 'from-cyan-500/10 to-teal-500/20' },
    { name: 'Industrial Metals', icon: '🔩', count: '12,500 tons', desc: 'Aluminum scrap, brass, copper, high-grade alloys', slug: 'metal', color: 'from-slate-500/10 to-zinc-500/20' },
    { name: 'Timber & Wood Pallets', icon: '🪵', count: '8,400 units', desc: 'Heat-treated pallets, offcuts & wood fiber', slug: 'wood', color: 'from-amber-500/10 to-orange-500/20' },
    { name: 'E-Waste & Components', icon: '⚡', count: '1,850 units', desc: 'Circuit boards, precious metals, testing devices', slug: 'electronic', color: 'from-purple-500/10 to-indigo-500/20' },
    { name: 'Glass & Silica', icon: '🧪', count: '3,100 tons', desc: 'Container cullet, automotive & plate glass', slug: 'glass', color: 'from-emerald-500/10 to-teal-500/20' },
    { name: 'Industrial Textiles', icon: '🧵', count: '920 tons', desc: 'Cotton cuttings, polyester yarn, fabric rolls', slug: 'textile', color: 'from-rose-500/10 to-pink-500/20' }
  ];

  const featuredListings = [
    {
      _id: 'feat-1',
      title: 'High-Grade 6061 Aluminum Extrusion Scraps',
      category: 'Metal',
      quantity: 45,
      unit: 'tons',
      location: 'Detroit, MI',
      price: 2150,
      isFree: false,
      company: 'Apex Automotive Mfg',
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
      description: 'Clean, sorted aluminum extrusion offcuts with certified 99.4% purity. Ready for remelt with full metallurgical assay certificate.',
    },
    {
      _id: 'feat-2',
      title: 'Pre-Washed Clear PET Bottle Flakes',
      category: 'Plastic',
      quantity: 30,
      unit: 'tons',
      location: 'Los Angeles, CA',
      price: 780,
      isFree: false,
      company: 'Pacifica Beverage Packaging',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
      description: 'Hot-washed, food-grade compliant recycled PET flakes. Zero heavy metal contaminants. Ideal for thermoforming or synthetic fiber spinning.',
    },
    {
      _id: 'feat-3',
      title: 'Heat-Treated Euro Spec Wood Pallets (Grade A)',
      category: 'Wood',
      quantity: 400,
      unit: 'pallets',
      location: 'Chicago, IL',
      price: 0,
      isFree: true,
      company: 'Midwest Logistics Hub',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      description: 'Standard 1200x800mm EUR/EPAL certified wood pallets from clean warehouse operations. Available free for immediate reuse and logistics hauling.',
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Audit & List Surplus Byproducts',
      desc: 'Catalog your manufacturing scraps, offcuts, or packaging surplus with verified specs, images, and purity records in minutes.',
      icon: Factory,
      highlight: 'Instant AI carbon valuation'
    },
    {
      num: '02',
      title: 'Intelligent AI Cross-Match',
      desc: 'Our semantic matching engine automatically pairs your byproduct with secondary manufacturers needing raw materials.',
      icon: Cpu,
      highlight: '94% average match rate'
    },
    {
      num: '03',
      title: 'Escrow & Freight Logistics',
      desc: 'Lock in transactions through safe green escrow payments and integrated circular freight transport with chain of custody tracking.',
      icon: Truck,
      highlight: 'Zero financial risk'
    },
    {
      num: '04',
      title: 'Verifiable ESG Certification',
      desc: 'Receive ISO-compliant carbon reduction certificates and Scope 3 emissions audit reports for your annual corporate filings.',
      icon: ShieldCheck,
      highlight: 'Official ESG audit trails'
    }
  ];

  const testimonials = [
    {
      company: "Nordic Green Alloys Corp",
      quote: "EcoTrade transformed our metal waste streams from a $120,000 annual hauling expense into a $340,000 secondary resource revenue line.",
      author: "Elena Rostova",
      role: "VP of Sustainability & Circular Supply",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      co2: "840 tonnes CO₂ diverted",
      rating: 5
    },
    {
      company: "BioPolymer Solutions",
      quote: "The transparency and certified chemical assays provided on EcoTrade allow us to source high-grade recycled resins with zero quality degradation.",
      author: "Dr. Marcus Vance",
      role: "Chief Materials Scientist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      co2: "1,200 tonnes plastic saved",
      rating: 5
    },
    {
      company: "EcoConstruct Infrastructure",
      quote: "Finding bulk industrial wood and architectural offcuts on this exchange has cut our raw material procurement costs by 38% while achieving net-zero site status.",
      author: "David K. Chang",
      role: "Procurement Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      co2: "410 tonnes landfill avoided",
      rating: 5
    }
  ];

  // Calculation helpers
  const materialMultipliers = {
    plastic: { co2: 2.1, savings: 650, water: 4200 },
    metal: { co2: 5.8, savings: 1400, water: 7600 },
    wood: { co2: 1.2, savings: 280, water: 1200 },
    electronic: { co2: 18.5, savings: 3200, water: 15400 },
    glass: { co2: 0.9, savings: 190, water: 850 },
    textile: { co2: 3.4, savings: 820, water: 9800 }
  };

  const currentMultiplier = materialMultipliers[calcMaterial] || materialMultipliers.plastic;
  const estimatedCO2 = Math.round(calcTons * currentMultiplier.co2);
  const estimatedSavings = Math.round(calcTons * currentMultiplier.savings);
  const estimatedTrees = Math.round(estimatedCO2 * 0.045);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    setCurrentPage('marketplace');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      
      {/* ========================================================
          HERO SECTION WITH AMBIENT PARTICLES & ESG COUNTERS
          ======================================================== */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-950 to-slate-900 text-white">
        
        {/* Ambient background glow & radial gradient */}
        <div className="absolute inset-0 bg-eco-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[350px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Pill Announcement */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-400/30 backdrop-blur-md shadow-lg">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-semibold text-emerald-200">
                🌱 World's Leading B2B Circular Material Marketplace
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6">
              Turn Industrial Waste Into{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-300 bg-clip-text text-transparent">
                High-Value Resources
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
              Connect surplus byproducts, scrap materials, and manufacturing offcuts directly with buyers. Cut procurement costs, eliminate landfill fees, and verify your ESG impact.
            </p>

            {/* Hero Interactive Search Pill */}
            <form 
              onSubmit={handleHeroSearch}
              className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl p-2 sm:p-2.5 rounded-2xl border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center gap-2 mb-10"
            >
              <div className="flex-1 flex items-center gap-3 px-3.5 w-full">
                <Search className="w-5 h-5 text-emerald-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search surplus aluminum, PET flakes, wood pallets, textiles..."
                  className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={searchCat}
                  onChange={(e) => setSearchCat(e.target.value)}
                  className="bg-slate-900/80 text-xs font-semibold text-slate-200 px-3 py-2.5 rounded-xl border border-white/10 focus:outline-none w-full sm:w-auto"
                >
                  <option value="All">All Categories</option>
                  <option value="Plastic">Plastics</option>
                  <option value="Metal">Metals</option>
                  <option value="Wood">Wood</option>
                  <option value="Electronic">Electronics</option>
                  <option value="Glass">Glass</option>
                  <option value="Textile">Textiles</option>
                </select>

                <button
                  type="submit"
                  className="btn-primary-glow px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shrink-0 w-full sm:w-auto"
                >
                  Explore
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> ISO 14001 Audited
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                <Zap className="w-4 h-4 text-amber-400" /> Zero Escrow Trading Fees
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                <Leaf className="w-4 h-4 text-teal-400" /> Scope 3 GHG Reports Included
              </span>
            </div>
          </div>
        </div>

        {/* Global Impact Telemetry Ticker */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="glass-panel-dark rounded-2xl p-5 text-center border-emerald-500/20">
              <div className="text-2xl sm:text-4xl font-black text-emerald-400 tracking-tight mb-1">
                {(counters.materials / 1000000).toFixed(2)}M
              </div>
              <div className="text-xs text-slate-300 font-medium flex items-center justify-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" /> Tonnes Diverted
              </div>
            </div>

            <div className="glass-panel-dark rounded-2xl p-5 text-center border-teal-500/20">
              <div className="text-2xl sm:text-4xl font-black text-teal-400 tracking-tight mb-1">
                {(counters.co2 / 1000).toFixed(0)}k+
              </div>
              <div className="text-xs text-slate-300 font-medium flex items-center justify-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-teal-400" /> Tonnes CO₂ Avoided
              </div>
            </div>

            <div className="glass-panel-dark rounded-2xl p-5 text-center border-emerald-500/20">
              <div className="text-2xl sm:text-4xl font-black text-green-400 tracking-tight mb-1">
                {counters.companies.toLocaleString()}+
              </div>
              <div className="text-xs text-slate-300 font-medium flex items-center justify-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-green-400" /> Verified Enterprises
              </div>
            </div>

            <div className="glass-panel-dark rounded-2xl p-5 text-center border-emerald-500/20">
              <div className="text-2xl sm:text-4xl font-black text-emerald-300 tracking-tight mb-1">
                $38.4M
              </div>
              <div className="text-xs text-slate-300 font-medium flex items-center justify-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-300" /> Raw Cost Savings
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE CIRCULAR ECONOMY CALCULATOR
          ======================================================== */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-emerald-500/30 overflow-hidden relative">
            
            {/* Background decoration */}
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left explanation */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                  <Calculator className="w-4 h-4" />
                  Interactive ESG Impact Estimator
                </div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  Estimate Your Carbon & Financial ROI in Real-Time
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Select your industrial material and estimated monthly scrap volume. See instant Scope 3 GHG reduction projections, tree preservation equivalents, and raw purchasing cost savings.
                </p>

                {/* Material selector buttons */}
                <div className="pt-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Select Material Category
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'plastic', label: 'Plastics & Resins' },
                      { id: 'metal', label: 'Metals & Alloys' },
                      { id: 'wood', label: 'Wood & Pallets' },
                      { id: 'electronic', label: 'E-Waste & PCBs' },
                      { id: 'glass', label: 'Cullet & Glass' },
                      { id: 'textile', label: 'Textile Fibers' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setCalcMaterial(m.id)}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all border ${
                          calcMaterial === m.id
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                            : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Volume Slider */}
                <div className="pt-4">
                  <div className="flex justify-between items-center mb-2 text-xs font-semibold">
                    <span className="text-slate-300">Monthly Volume (Tons)</span>
                    <span className="text-emerald-400 font-bold text-base">{calcTons} tonnes</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="500"
                    step="5"
                    value={calcTons}
                    onChange={(e) => setCalcTons(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>5 tons</span>
                    <span>250 tons</span>
                    <span>500 tons</span>
                  </div>
                </div>
              </div>

              {/* Right Results Grid */}
              <div className="lg:col-span-6 bg-slate-950/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-500/30">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-6 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Projected Monthly Circular Economy Gains
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <div className="text-xs text-slate-400 font-medium mb-1">CO₂ Emissions Diverted</div>
                    <div className="text-3xl font-black text-emerald-400">
                      {estimatedCO2.toLocaleString()} <span className="text-sm font-semibold">kg</span>
                    </div>
                    <div className="text-[11px] text-emerald-200/70 mt-1">Equivalent to {(estimatedCO2 / 1000).toFixed(1)} metric tons</div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <div className="text-xs text-slate-400 font-medium mb-1">Raw Material Cost Savings</div>
                    <div className="text-3xl font-black text-teal-400">
                      ${estimatedSavings.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-teal-200/70 mt-1">Direct bottom-line margin</div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <div className="text-xs text-slate-400 font-medium mb-1">Mature Trees Preserved</div>
                    <div className="text-3xl font-black text-green-400">
                      {estimatedTrees.toLocaleString()} <span className="text-sm font-semibold">trees</span>
                    </div>
                    <div className="text-[11px] text-green-200/70 mt-1">Annual oxygen output equivalent</div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <div className="text-xs text-slate-400 font-medium mb-1">Landfill Divert Rate</div>
                    <div className="text-3xl font-black text-emerald-300">
                      100%
                    </div>
                    <div className="text-[11px] text-emerald-200/70 mt-1">Zero industrial disposal fee</div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPage('list-material')}
                  className="mt-6 w-full btn-primary-glow py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
                >
                  List This Volume Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CATEGORY DISCOVERY GRID
          ======================================================== */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">Explore Secondary Materials</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                High-Purity Circular Categories
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('marketplace')}
              className="mt-4 md:mt-0 text-emerald-700 font-bold text-sm hover:text-emerald-800 flex items-center gap-1 group"
            >
              View All 1,400+ Listings
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentPage('marketplace')}
                className="category-card p-6 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-3 bg-slate-100 rounded-2xl group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
                      {cat.count}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {cat.desc}
                  </p>
                </div>
                
                <div className="flex items-center text-xs font-bold text-emerald-700 gap-1 pt-3 border-t border-slate-100 group-hover:text-emerald-800">
                  Browse category materials
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          HOW IT WORKS: 4-STEP INTERACTIVE LOOP
          ======================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Seamless Closed Loop System
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
              How Industrial Circular Trading Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              From audit to audited delivery—our AI-guided exchange ensures safe transactions, purity guarantees, and real-time ESG certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer relative ${
                  activeStep === idx 
                    ? 'bg-gradient-to-b from-emerald-50 to-white border-emerald-500/40 shadow-xl scale-102' 
                    : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-black text-emerald-700 opacity-80">{s.num}</span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activeStep === idx ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  {s.desc}
                </p>

                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-md">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  {s.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          FEATURED SURPLUS LISTINGS
          ======================================================== */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">Verified Surplus Exchange</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Featured Live Byproduct Lots
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('marketplace')}
              className="mt-4 md:mt-0 btn-secondary-glass px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              Browse Full Catalog
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((item) => (
              <div 
                key={item._id}
                onClick={() => setSelectedListing(item)}
                className="glass-card rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-950/70 text-emerald-300 backdrop-blur-md">
                      ⚡ ISO Verified Assay
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1.5 flex items-center justify-between">
                      <span className="text-emerald-700 font-semibold">{item.company}</span>
                      <span>{item.location}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-xl font-black text-emerald-700">
                        {item.isFree ? 'Free' : `$${item.price.toLocaleString()}`}
                        {!item.isFree && <span className="text-xs font-medium text-slate-400">/{item.unit}</span>}
                      </div>
                      <div className="text-[10px] text-slate-400">Available: {item.quantity} {item.unit}</div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                      }}
                      className="btn-primary-glow px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          PARTNER TESTIMONIALS CAROUSEL
          ======================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Enterprise Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-10">
            Validated by Global Sustainability Leaders
          </h2>

          <div className="bg-gradient-to-br from-emerald-50 via-teal-50/40 to-slate-50 p-8 sm:p-12 rounded-3xl border border-emerald-200/60 shadow-lg relative">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
              ))}
            </div>

            <blockquote className="text-lg sm:text-2xl font-semibold text-slate-800 leading-relaxed mb-8 italic">
              "{testimonials[activeTestimonial].quote}"
            </blockquote>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <img
                src={testimonials[activeTestimonial].avatar}
                alt={testimonials[activeTestimonial].author}
                className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500 shadow-md"
              />
              <div className="text-left">
                <div className="font-bold text-slate-900 text-sm">{testimonials[activeTestimonial].author}</div>
                <div className="text-xs text-slate-500">{testimonials[activeTestimonial].role}</div>
                <div className="text-xs font-bold text-emerald-700">{testimonials[activeTestimonial].company}</div>
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === activeTestimonial ? 'w-8 bg-emerald-600' : 'w-2.5 bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CALL TO ACTION BANNER
          ======================================================== */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 via-slate-950 to-teal-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6">
            Ready to Monetize Your Waste Streams?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 font-normal">
            Join over 14,000 manufacturers and circular enterprises converting industrial scrap into certified revenue today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                if (user) {
                  setCurrentPage('list-material');
                } else {
                  setAuthMode('register');
                  setCurrentPage('authform');
                }
              }}
              className="w-full sm:w-auto btn-primary-glow px-8 py-4 rounded-2xl font-bold text-base shadow-xl"
            >
              List Scrap Material Free
            </button>
            <button
              onClick={() => setCurrentPage('marketplace')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base transition"
            >
              Browse Open Listings
            </button>
          </div>
        </div>
      </section>

      {/* Detail modal if quick-view opened */}
      {selectedListing && (
        <MaterialDetailModal
          material={selectedListing}
          isOpen={Boolean(selectedListing)}
          onClose={() => setSelectedListing(null)}
          addToCart={addToCart}
          user={user}
          setCurrentPage={setCurrentPage}
          setAuthMode={setAuthMode}
        />
      )}
    </div>
  );
};

export default HomePage;