import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowRight, 
  Recycle, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Star, 
  Play,
  Zap,
  Award,
  Shield,
  Building,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Globe,
  BarChart3,
  Truck,
  CreditCard,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Menu,
  X
} from 'lucide-react';

const CircularEconomyPlatform = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeListing, setActiveListing] = useState(0);
  const [searchCategory, setSearchCategory] = useState('All Categories');
  const [counters, setCounters] = useState({
    materials: 0,
    co2: 0,
    companies: 0,
    exchanges: 0
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Animated counters
  useEffect(() => {
    const targetValues = {
      materials: 2500000,
      co2: 850000,
      companies: 12500,
      exchanges: 45000
    };

    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    const timer = setInterval(() => {
      setCounters(prev => ({
        materials: Math.min(prev.materials + targetValues.materials / steps, targetValues.materials),
        co2: Math.min(prev.co2 + targetValues.co2 / steps, targetValues.co2),
        companies: Math.min(prev.companies + targetValues.companies / steps, targetValues.companies),
        exchanges: Math.min(prev.exchanges + targetValues.exchanges / steps, targetValues.exchanges)
      }));
    }, increment);

    setTimeout(() => clearInterval(timer), duration);
    return () => clearInterval(timer);
  }, []);

  const categories = ['All Categories', 'Plastics', 'Metals', 'Electronics', 'Chemicals', 'Organics'];
  
  const testimonials = [
    {
      company: "EcoTech Solutions",
      logo: "🏢",
      quote: "This platform transformed our waste management strategy. We've reduced disposal costs by 60% and found new revenue streams.",
      author: "Sarah Chen, Sustainability Director",
      rating: 5,
      hasVideo: true
    },
    {
      company: "Green Manufacturing Co.",
      logo: "🏭",
      quote: "The AI matching system is incredible. It connects us with the perfect buyers for our industrial byproducts instantly.",
      author: "Michael Rodriguez, Operations Manager",
      rating: 5,
      hasVideo: false
    },
    {
      company: "Circular Innovations Ltd.",
      logo: "⚡",
      quote: "The carbon certification feature helps us meet our ESG goals while creating value from waste materials.",
      author: "Emma Thompson, CEO",
      rating: 5,
      hasVideo: true
    }
  ];

  const featuredListings = [
    {
      id: 1,
      title: "High-Grade Aluminum Scraps",
      category: "Metals",
      quantity: "50 tonnes",
      location: "Detroit, MI",
      price: "$2,400/tonne",
      image: "🔩",
      seller: "AutoParts Manufacturing",
      co2Impact: "125kg CO₂ saved"
    },
    {
      id: 2,
      title: "Clean PET Plastic Bottles",
      category: "Plastics",
      quantity: "25 tonnes",
      location: "Los Angeles, CA",
      price: "$850/tonne",
      image: "♻️",
      seller: "BeverageCorp",
      co2Impact: "89kg CO₂ saved"
    },
    {
      id: 3,
      title: "Electronic Components",
      category: "Electronics",
      quantity: "5 tonnes",
      location: "Austin, TX",
      price: "$3,200/tonne",
      image: "📱",
      seller: "TechRecycle Inc.",
      co2Impact: "156kg CO₂ saved"
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.round(num).toString();
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                CircularFlow
              </h1>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-md text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:flex absolute md:relative top-16 left-0 md:top-0 w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none p-4 md:p-0 md:items-center space-y-4 md:space-y-0 md:space-x-8`}>
              <a href="#marketplace" className="block text-gray-700 hover:text-green-600 transition font-medium">Marketplace</a>
              <a href="#solutions" className="block text-gray-700 hover:text-green-600 transition font-medium">Solutions</a>
              <a href="#impact" className="block text-gray-700 hover:text-green-600 transition font-medium">Impact</a>
              <a href="#about" className="block text-gray-700 hover:text-green-600 transition font-medium">About</a>
              <button className="w-full md:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition font-medium">
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-green-300 rounded-full animate-bounce"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Transform Waste Into 
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent block">
              Valuable Resources
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            The world's most advanced B2B circular economy platform. Connect, trade, and create value from industrial materials while building a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all transform hover:-translate-y-1 font-semibold text-lg flex items-center group">
              List Waste Material
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
            <button className="bg-white border-2 border-blue-500 text-blue-500 px-8 py-4 rounded-full hover:bg-blue-50 transition-all transform hover:-translate-y-1 font-semibold text-lg">
              Find Resources
            </button>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for materials, components, or resources..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                />
              </div>
              <div className="relative">
                <select 
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 pr-10 text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-medium"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl hover:shadow-lg transition font-semibold text-lg">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Four simple steps to transform your waste into valuable resources
            </p>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Sign Up", desc: "Create your business profile and verify your company credentials", color: "green" },
              { icon: Search, title: "List or Search", desc: "Post your materials or browse available resources in our marketplace", color: "blue" },
              { icon: Zap, title: "AI Matching", desc: "Our smart algorithm finds the perfect matches based on your requirements", color: "purple" },
              { icon: CheckCircle, title: "Trade & Track", desc: "Complete transactions securely and track your environmental impact", color: "emerald" }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-${step.color}-100 to-${step.color}-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                  <step.icon className={`w-10 h-10 text-${step.color}-600`} />
                </div>
                <div className="relative">
                  <div className={`absolute -top-2 -left-2 w-8 h-8 bg-${step.color}-500 text-white rounded-full flex items-center justify-center font-bold text-sm`}>
                    {index + 1}
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-800 pl-6">{step.title}</h4>
                </div>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-4">Global Impact Dashboard</h3>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Real-time metrics showing the positive environmental impact of our community
          </p>
          
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition">
              <Leaf className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-green-400 mb-2">
                {formatNumber(counters.materials)}
              </div>
              <p className="text-gray-300">Tonnes Material Saved</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition">
              <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {formatNumber(counters.co2)}
              </div>
              <p className="text-gray-300">Tonnes CO₂ Saved</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition">
              <Building className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {formatNumber(counters.companies)}
              </div>
              <p className="text-gray-300">Active Companies</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition">
              <TrendingUp className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                {formatNumber(counters.exchanges)}
              </div>
              <p className="text-gray-300">Successful Exchanges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-4xl font-bold text-gray-800 mb-4">Featured Listings</h3>
              <p className="text-xl text-gray-600">Discover high-quality materials available for immediate trade</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveListing(Math.max(0, activeListing - 1))}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button 
                onClick={() => setActiveListing(Math.min(featuredListings.length - 1, activeListing + 1))}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredListings.map((listing, index) => (
              <div key={listing.id} className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform ${index === activeListing ? 'scale-105 ring-2 ring-green-500' : 'hover:-translate-y-2'}`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{listing.image}</div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {listing.category}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">{listing.title}</h4>
                  <p className="text-gray-600 mb-1">By {listing.seller}</p>
                  <p className="text-gray-500 text-sm mb-4">{listing.location}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-2xl font-bold text-green-600">{listing.price}</p>
                      <p className="text-gray-500 text-sm">{listing.quantity} available</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-600 font-medium">{listing.co2Impact}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg hover:shadow-lg transition font-medium">
                      View Details
                    </button>
                    <button className="flex-1 border-2 border-green-500 text-green-500 py-2 rounded-lg hover:bg-green-50 transition font-medium">
                      Contact Seller
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">What Our Partners Say</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of companies transforming their business with circular economy solutions
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{testimonials[activeTestimonial].logo}</div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">{testimonials[activeTestimonial].company}</h4>
                <div className="flex justify-center space-x-1 mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-xl text-gray-700 text-center mb-6 leading-relaxed italic">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <p className="font-semibold text-gray-800">{testimonials[activeTestimonial].author}</p>
                {testimonials[activeTestimonial].hasVideo && (
                  <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                    <Play className="w-4 h-4" />
                    <span className="text-sm">Watch Video</span>
                  </button>
                )}
              </div>
              
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition ${
                      index === activeTestimonial ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Why Choose CircularFlow</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Advanced technology and innovative features that set us apart
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "AI Smart Matching",
                description: "Advanced algorithms match your materials with the perfect buyers automatically",
                color: "yellow"
              },
              {
                icon: Award,
                title: "Gamification & Eco-Points",
                description: "Earn rewards and recognition for your sustainable trading activities",
                color: "purple"
              },
              {
                icon: Shield,
                title: "Carbon Certification",
                description: "Verified carbon impact tracking with official ESG reporting",
                color: "green"
              },
              {
                icon: Building,
                title: "SME Support Program",
                description: "Dedicated support and resources for small and medium enterprises",
                color: "blue"
              },
              {
                icon: BarChart3,
                title: "Blockchain Transparency",
                description: "Complete transaction transparency and traceability using blockchain",
                color: "cyan"
              },
              {
                icon: Users,
                title: "Expert Network",
                description: "Access to sustainability experts and circular economy consultants",
                color: "pink"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-400 to-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-4">{feature.title}</h4>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-12">Trusted Integration Partners</h3>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 items-center opacity-60">
            <div className="flex items-center justify-center">
              <Truck className="w-16 h-16 text-gray-400" />
            </div>
            <div className="flex items-center justify-center">
              <CreditCard className="w-16 h-16 text-gray-400" />
            </div>
            <div className="flex items-center justify-center">
              <Shield className="w-16 h-16 text-gray-400" />
            </div>
            <div className="flex items-center justify-center">
              <BarChart3 className="w-16 h-16 text-gray-400" />
            </div>
            <div className="flex items-center justify-center">
              <Globe className="w-16 h-16 text-gray-400" />
            </div>
            <div className="flex items-center justify-center">
              <Award className="w-16 h-16 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h3>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join the circular economy revolution and start creating value from waste materials today
          </p>
          
          <div className="max-w-md mx-auto bg-white/20 backdrop-blur-sm rounded-2xl p-6">
            <h4 className="text-xl font-semibold mb-4">Get Started Now</h4>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Your business email"
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Company name"
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              <button className="w-full bg-white text-green-600 py-3 rounded-xl hover:bg-gray-100 transition font-semibold text-lg">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Recycle className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold">CircularFlow</h4>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Transforming the global economy through sustainable material exchange and circular business solutions.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-400 hover:text-white transition cursor-pointer" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-white transition cursor-pointer" />
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-white transition cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-6">Platform</h5>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Marketplace</a></li>
                <li><a href="#" className="hover:text-white transition">AI Matching</a></li>
                <li><a href="#" className="hover:text-white transition">Carbon Tracking</a></li>
                <li><a href="#" className="hover:text-white transition">ESG Reporting</a></li>
                <li><a href="#" className="hover:text-white transition">API Integration</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-6">Resources</h5>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition">Best Practices</a></li>
                <li><a href="#" className="hover:text-white transition">Webinars</a></li>
                <li><a href="#" className="hover:text-white transition">Support Center</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-6">Contact</h5>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5" />
                  <span>hello@circularflow.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h6 className="font-semibold mb-3">Certifications</h6>
                <div className="flex space-x-4 text-sm text-gray-500">
                  <span>ISO 14001</span>
                  <span>B-Corp</span>
                  <span>Carbon Neutral</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500">
            <p>&copy; 2025 CircularFlow. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CircularEconomyPlatform;