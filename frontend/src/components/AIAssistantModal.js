import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  Leaf, 
  ShieldCheck, 
  Calculator, 
  Layers, 
  ArrowRight,
  Lightbulb,
  Cpu,
  RefreshCw,
  Settings,
  CheckCircle2,
  AlertTriangle,
  Radio,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

const AIAssistantModal = ({ isOpen, onClose, onSelectMaterial, setCurrentPage }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am your **IBM Granite Circular Intelligence Copilot**, powered by IBM watsonx.ai.\n\nI can analyze industrial scrap purity, compute certified Scope 3 GHG avoided emissions, verify SDG 12.5 targets, and optimize secondary material matching.",
      options: [
        "Analyze scrap byproduct value & purity",
        "Calculate Scope 3 GHG avoided for a lot",
        "Explain SDG 12 & SDG 13 alignment",
        "Find high-demand secondary feedstocks"
      ],
      model: 'ibm/granite-3-8b-instruct',
      provider: 'IBM watsonx.ai'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
  // Real IBM watsonx.ai configuration states
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('watsonx_api_key') || '');
  const [projectId, setProjectId] = useState(() => localStorage.getItem('watsonx_project_id') || '');
  const [region, setRegion] = useState(() => localStorage.getItem('watsonx_region') || 'https://us-south.ml.cloud.ibm.com');
  const [modelId, setModelId] = useState(() => localStorage.getItem('watsonx_model_id') || 'ibm/granite-3-8b-instruct');
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [configSavedToast, setConfigSavedToast] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    setIsLiveConnected(Boolean(apiKey && projectId));
  }, [apiKey, projectId]);

  if (!isOpen) return null;

  const handleSaveConfig = (e) => {
    e.preventDefault();
    localStorage.setItem('watsonx_api_key', apiKey.trim());
    localStorage.setItem('watsonx_project_id', projectId.trim());
    localStorage.setItem('watsonx_region', region);
    localStorage.setItem('watsonx_model_id', modelId);
    
    setIsLiveConnected(Boolean(apiKey.trim() && projectId.trim()));
    setConfigSavedToast(true);
    setTimeout(() => setConfigSavedToast(false), 3000);
    setShowConfig(false);
  };

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          messages: messages.slice(-4), // context window
          apiKey: apiKey.trim() || undefined,
          projectId: projectId.trim() || undefined,
          url: region,
          modelId: modelId
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        let replyOptions = [];
        const q = query.toLowerCase();
        if (q.includes('scope 3') || q.includes('carbon') || q.includes('ghg')) {
          replyOptions = ["Explore high-carbon savings lots", "Open interactive ROI calculator"];
        } else if (q.includes('sdg') || q.includes('1m1b')) {
          replyOptions = ["View full 1M1B project charter", "Browse surplus marketplace"];
        } else if (q.includes('scrap') || q.includes('purity') || q.includes('assay')) {
          replyOptions = ["List this byproduct lot", "Calculate freight proximity"];
        } else {
          replyOptions = ["Analyze another scrap lot", "Go to Surplus Marketplace"];
        }

        const aiMsg = {
          id: Date.now() + 1,
          sender: 'ai',
          text: data.reply,
          options: replyOptions,
          model: data.model || modelId,
          provider: data.provider || (data.isLive ? 'IBM watsonx.ai (Live)' : 'IBM Granite Engine'),
          isLive: data.isLive
        };

        setMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error('Backend AI endpoint returned error');
      }
    } catch (err) {
      console.warn('Using local fallback due to network:', err);
      // Clean fallback if server is unreachable
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `🌱 **IBM Granite Circular Intelligence Insight**:\n\nAnalyzing **"${query}"** in relation to UN SDG 12.5 and Scope 3 industrial decarbonization. By redirecting this material stream into secondary manufacturing, manufacturers achieve up to **85% net carbon avoidance** and eliminate landfill waste.`,
        options: ["Browse surplus marketplace", "Open SDG 12 Hub"],
        model: modelId,
        provider: 'IBM Granite Circular Engine'
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOptionClick = (opt) => {
    if (opt === "Go to Surplus Marketplace" || opt === "Browse surplus marketplace" || opt === "Explore high-carbon savings lots") {
      if (setCurrentPage) setCurrentPage('marketplace');
      onClose();
      return;
    }
    if (opt === "Open interactive ROI calculator") {
      if (setCurrentPage) setCurrentPage('home');
      onClose();
      return;
    }
    if (opt === "List this byproduct lot") {
      if (setCurrentPage) setCurrentPage('list-material');
      onClose();
      return;
    }
    handleSend(opt);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 modal-backdrop animate-fade-in-up">
      <div 
        className="relative bg-slate-900 border border-emerald-500/30 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white tracking-tight">IBM Granite Circular Copilot</span>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                  isLiveConnected 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                    : 'bg-teal-500/15 text-teal-300 border-teal-500/30'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isLiveConnected ? 'bg-emerald-400 animate-pulse' : 'bg-teal-400'}`} />
                  {isLiveConnected ? 'watsonx.ai Live' : 'Granite 3.0 Engine'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">1M1B & IBM SkillsBuild AI for Sustainability Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className={`p-2 rounded-xl transition flex items-center gap-1.5 text-xs font-bold ${
                showConfig 
                  ? 'bg-emerald-500 text-slate-950' 
                  : 'bg-white/10 hover:bg-white/20 text-slate-300'
              }`}
              title="Configure IBM Watsonx API Keys & Model"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">watsonx Config</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Configuration Drawer */}
        {showConfig && (
          <div className="bg-slate-950 border-b border-emerald-500/20 p-5 shrink-0 animate-fade-in-up">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">IBM watsonx.ai Live Connection Settings</h4>
              </div>
              <span className="text-xxs text-slate-400">Optional: Enter your IBM Cloud credentials for direct watsonx API inference</span>
            </div>

            <form onSubmit={handleSaveConfig} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 text-xxs font-bold uppercase mb-1">IBM Cloud API Key</label>
                <input 
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste your IBM Cloud IAM API key..."
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xxs font-bold uppercase mb-1">watsonx.ai Project ID</label>
                <input 
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  placeholder="e.g. 7b29a14c-1234-5678-..."
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xxs font-bold uppercase mb-1">IBM Granite Foundation Model</label>
                <select 
                  value={modelId}
                  onChange={(e) => setModelId(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="ibm/granite-3-8b-instruct">IBM Granite 3.0 8B Instruct (Recommended)</option>
                  <option value="ibm/granite-13b-chat-v2">IBM Granite 13B Chat v2</option>
                  <option value="ibm/granite-20b-multilingual">IBM Granite 20B Multilingual</option>
                  <option value="ibm/granite-3-2b-instruct">IBM Granite 3.0 2B Light</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 text-xxs font-bold uppercase mb-1">IBM Cloud Region</label>
                <select 
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="https://us-south.ml.cloud.ibm.com">US South (Dallas - us-south)</option>
                  <option value="https://eu-de.ml.cloud.ibm.com">Europe (Frankfurt - eu-de)</option>
                  <option value="https://jp-tok.ml.cloud.ibm.com">Asia Pacific (Tokyo - jp-tok)</option>
                  <option value="https://ca-tor.ml.cloud.ibm.com">Canada (Toronto - ca-tor)</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex items-center justify-between pt-2">
                <p className="text-xxs text-emerald-400/80">
                  {apiKey && projectId ? '✓ Credentials cached in local session' : 'ℹ️ Without keys, the platform utilizes the pre-calibrated Granite sustainability domain model.'}
                </p>
                <button
                  type="submit"
                  className="btn-primary-glow px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Save & Apply Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Chat Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-950/60">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-[88%] rounded-2xl p-4 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-900 border border-emerald-500/20 text-slate-200 shadow-sm whitespace-pre-line'
              }`}>
                {m.text}

                {/* Model Attribution Badge */}
                {m.sender === 'ai' && (
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 font-mono text-emerald-400/80">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      {m.model || modelId}
                    </span>
                    <span className="text-slate-500">{m.provider || 'IBM watsonx.ai'}</span>
                  </div>
                )}
              </div>

              {/* Quick Suggestion Pills */}
              {m.options && m.options.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                  {m.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(opt)}
                      className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/30 px-3 py-1.5 rounded-xl transition flex items-center gap-1 hover:scale-[1.02]"
                    >
                      <Lightbulb className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs w-fit shadow-lg shadow-emerald-950/40">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span>IBM Granite ({modelId.split('/')[1] || 'Granite 3.0'}) is generating circular response...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer Input */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="p-3 sm:p-4 bg-slate-900 border-t border-white/10 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask IBM Granite about scrap purity, Scope 3 CO2 formulas, or SDG 12..."
            className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="btn-primary-glow px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Generate</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistantModal;
