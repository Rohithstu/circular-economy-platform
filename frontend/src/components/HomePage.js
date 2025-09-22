import React, { useEffect, useRef } from "react";

const HomePage = ({ setCurrentPage, user, setAuthMode }) => {
  const openAuthForm = (mode) => {
    setAuthMode(mode);
    setCurrentPage("authform");
  };

  const stats = [
    { number: "500+", label: "Businesses Connected" },
    { number: "10K+", label: "Materials Listed" },
    { number: "85%", label: "Waste Reduction" },
    { number: "$2M+", label: "Value Created" }
  ];

  const features = [
    { 
      title: "List Your Materials", 
      description: "Easily list your industrial by-products, waste materials, or surplus inventory.",
      icon: "📦",
      color: "from-green-400 to-emerald-400",
      bgColor: "from-green-50 to-emerald-50"
    },
    { 
      title: "Connect with Buyers", 
      description: "Find businesses looking for your materials through our intelligent matching system.",
      icon: "🔗",
      color: "from-blue-400 to-cyan-400",
      bgColor: "from-blue-50 to-cyan-50"
    },
    { 
      title: "Complete Transactions", 
      description: "Secure transactions with verified partners and sustainable logistics support.",
      icon: "💳",
      color: "from-purple-400 to-pink-400",
      bgColor: "from-purple-50 to-pink-50"
    }
  ];

  const benefits = [
    {
      title: "Reduce Waste Costs",
      description: "Turn disposal costs into revenue streams",
      icon: "💰",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Environmental Impact", 
      description: "Significantly reduce your carbon footprint",
      icon: "🌱",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "New Revenue Streams",
      description: "Create additional income from waste materials",
      icon: "📈",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    }
  ];

  const styles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(17, 228, 94, 0.3); }
      50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); }
    }
    
    @keyframes slideIn {
      from { transform: translateX(-100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeInUp {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    
    .animate-glow {
      animation: glow 2s ease-in-out infinite;
    }
    
    .animate-slide-in {
      animation: slideIn 0.8s ease-out;
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out;
    }
    
    .gradient-text {
      background: linear-gradient(135deg, #10b981, #059669, #047857);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .hover-lift {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hover-lift:hover {
      transform: translateY(-8px);
      box-shadow: 0 25px 50px rgba(240, 17, 17, 0.15);
    }
    
    .particle {
      position: absolute;
      background: rgba(34, 197, 94, 0.3);
      border-radius: 50%;
      animation: float 6s ease-in-out infinite;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
        
        {/* Animated Background Particles */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                width: Math.random() * 60 + 20,
                height: Math.random() * 60 + 20,
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                opacity: Math.random() * 0.3 + 0.1,
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-white py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.2)_0%,transparent_50%),radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.2)_0%,transparent_50%)]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 animate-fade-in-up">
              <div className="lg:w-1/2 text-left">
                <div className="mb-6 animate-slide-in">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-opacity-30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-green-300/30 animate-glow">
                    🌱 Sustainable Business Platform
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Transform Waste Into <span className="gradient-text animate-float">Value</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-green-100 leading-relaxed mb-8">
                  Join the circular economy movement. Connect businesses to exchange 
                  materials, reduce waste, and create sustainable value chains.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button
                    className="bg-gradient-to-r from-white to-green-50 text-green-700 px-8 py-4 rounded-lg text-lg font-semibold hover-lift shadow-2xl hover:shadow-3xl transition-all duration-500 group"
                    onClick={() => setCurrentPage("marketplace")}
                  >
                    <span className="flex items-center gap-2 group-hover:scale-105 transition-transform">
                      🛍️ Explore Marketplace
                    </span>
                  </button>
                  {!user && (
                    <button
                      className="border-2 border-green-300 bg-green-500/10 backdrop-blur-sm text-green-700 px-8 py-4 rounded-lg text-lg font-semibold hover-lift hover:bg-white hover:text-green-700 transition-all duration-500 group"
                      onClick={() => openAuthForm("register")}
                    >
                      <span className="flex items-center gap-2 group-hover:scale-105 transition-transform">
                        ✨ Join Free Today
                      </span>
                    </button>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-green-200">
                  <div className="flex items-center gap-2 animate-pulse">
                    <span className="text-2xl">⭐</span>
                    <span>Trusted by 500+ companies</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2 animate-float">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl hover-lift">
                  <h3 className="text-2xl font-bold text-center mb-8">Platform Impact</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <div 
                        key={index} 
                        className="text-center p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-xl hover:from-white/20 hover:to-white/10 transition-all duration-500 border border-white/10 hover-lift group"
                      >
                        <div className="text-3xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">
                          {stat.number}
                        </div>
                        <div className="text-green-100 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How EcoTrade Works
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Simple steps to transform your waste into valuable resources
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group text-center p-8 bg-gradient-to-br from-white to-green-50/50 rounded-2xl hover-lift shadow-xl border border-green-100/50 relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className={`bg-gradient-to-br ${feature.bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg relative z-10`}>
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  
                  <h3 className={`text-xl font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent mb-3 relative z-10`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">{feature.description}</p>
                  
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 to-emerald-100/30"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2 animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Choose EcoTrade?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Join thousands of businesses transforming their waste management
                </p>
                
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-start bg-white p-6 rounded-xl shadow-lg hover-lift transition-all duration-500 border border-green-100/50 group"
                    >
                      <div className={`${benefit.bgColor} rounded-full p-3 mt-1 mr-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                        <span className={`text-2xl ${benefit.color}`}>{benefit.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-1/2 animate-float">
                <div className="bg-gradient-to-br from-white to-green-50/80 rounded-2xl p-8 shadow-2xl border border-green-100/50 hover-lift">
                  <div className="text-6xl text-green-400 mb-4 animate-pulse">"</div>
                  <p className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                    "EcoTrade helped us turn our manufacturing waste into a $50,000 annual revenue stream. 
                    The platform is intuitive and the community is professional."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <span className="font-bold text-green-700">RR</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">ROHITH REDDY</div>
                      <div className="text-gray-600">Operations Manager, MetalWorks Inc.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.2)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.2)_0%,transparent_50%)]"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Waste?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses creating sustainable value from their by-products
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              {user ? (
                <button
                  className="bg-gradient-to-r from-white to-green-50 text-green-700 px-8 py-4 rounded-lg text-lg font-semibold hover-lift shadow-2xl transition-all duration-500 group"
                  onClick={() => setCurrentPage("marketplace")}
                >
                  <span className="flex items-center gap-2 group-hover:scale-105 transition-transform">
                    Browse Available Materials
                  </span>
                </button>
              ) : (
                <>
                  <button
                    className="bg-gradient-to-r from-white to-green-50 text-green-700 px-8 py-4 rounded-lg text-lg font-semibold hover-lift shadow-2xl transition-all duration-500 group"
                    onClick={() => openAuthForm("register")}
                  >
                    <span className="flex items-center gap-2 group-hover:scale-105 transition-transform">
                      Start Free Account
                    </span>
                  </button>
                  <button
                    className="border-2 border-green-300 bg-green-500/10 backdrop-blur-sm text-green-700 px-8 py-4 rounded-lg text-lg font-semibold hover-lift hover:bg-white hover:text-green-700 transition-all duration-500 group"
                    onClick={() => openAuthForm("login")}
                  >
                    <span className="flex items-center gap-2 group-hover:scale-105 transition-transform">
                      Sign In to Account
                    </span>
                  </button>
                </>
              )}
            </div>
            
            <div className="text-green-200 text-sm animate-pulse">
              <div className="flex justify-center gap-6 flex-wrap">
                <span>✅ No credit card required</span>
                <span>✅ Setup in 5 minutes</span>
                <span>✅ Free forever plan</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-slate-800/50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Top: EcoTrade description */}
            <div className="animate-fade-in-up mb-8">
              <h3 className="text-xl font-bold mb-4 gradient-text">EcoTrade</h3>
              <p className="text-gray-400">
                Transforming industrial waste into valuable resources through intelligent marketplace connections.
              </p>
            </div>

            {/* Navigation & Resources side by side */}
            <div className="flex flex-col md:flex-row justify-center md:justify-start gap-12 mb-12">
              {/* Navigation */}
              <div className="animate-fade-in-up text-center md:text-left">
                <h4 className="font-semibold mb-4">Navigation</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><button onClick={() => setCurrentPage('home')} className="bg-green-700 hover:text-green-400 transition-colors duration-300">Home</button></li>
                  <li><button onClick={() => setCurrentPage('marketplace')} className="bg-green-700 hover:text-green-400 transition-colors duration-300">Marketplace</button></li>
                  <li><button className=" bg-green-700 hover:text-green-400 transition-colors duration-300">How It Works</button></li>
                </ul>
              </div>
               
              {/* Resources */}
              <div className="animate-fade-in-up text-center md:text-left">
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><button className="hover:text-green-400 transition-colors duration-300">Case Studies</button></li>
                  <li><button className="hover:text-green-400 transition-colors duration-300">Sustainability Guide</button></li>
                  <li><button className="hover:text-green-400 transition-colors duration-300">API Documentation</button></li>
                </ul>
              </div>
            </div>

            {/* Contact Us centered below */}
            <div className="animate-fade-in-up text-center mb-81">
              <h4 className="font-semibold mb-4 text-red-600">Contact Us</h4>
              <ul className="space-y-2 text-white">
                <li>📧 reddykrohith4@gmail.com</li>
                <li>📞 +91 8688068256 </li>
                <li>🏢 Green Business District</li>
              </ul>
            </div>

            {/* Bottom copyright */}
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-red-600 animate-fade-in-up">
              <p>&copy; 2024 EcoTrade. All rights reserved. Building a sustainable future together.</p>
            </div>

          </div>
        </footer>

      </div>
    </>
  );
};

export default HomePage;
