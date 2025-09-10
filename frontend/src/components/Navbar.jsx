import React, { useState, useEffect } from "react";
import {
  Recycle,
  Globe,
  Truck,
  BarChart3,
  Search,
  CheckCircle,
} from "lucide-react";

// Counter animation hook
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

export default function HomePage() {
  // Impact metrics counters
  const tonsDiverted = useCounter(12450);
  const jobsCreated = useCounter(3200);
  const exchanges = useCounter(18750);

  return (
    <div className="bg-gray-50">
      {/* ================ NAVBAR ================ */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">EcoXchange</h1>
          <div className="hidden md:flex gap-6 text-gray-700 font-medium">
            <a href="#" className="hover:text-green-600">
              Marketplace
            </a>
            <a href="#" className="hover:text-green-600">
              How It Works
            </a>
            <a href="#" className="hover:text-green-600">
              Impact
            </a>
            <a href="#" className="hover:text-green-600">
              News
            </a>
          </div>
          <a
            href="#"
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            Join Now
          </a>
        </div>
      </nav>

      {/* ================ HERO SECTION ================ */}
      <section className="bg-green-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-extrabold text-gray-900">
            Turn Waste Into Opportunity
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Join the circular economy by exchanging surplus materials with
            trusted businesses near you.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#"
              className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
            >
              List Materials
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-white text-green-600 border border-green-600 rounded-xl shadow hover:bg-green-50"
            >
              Explore Marketplace
            </a>
          </div>
        </div>
      </section>

      {/* ================ HOW IT WORKS ================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Recycle, title: "List", desc: "Post your surplus materials" },
              { icon: Search, title: "Match", desc: "Find businesses that need them" },
              { icon: Truck, title: "Coordinate", desc: "Seamless logistics support" },
              { icon: BarChart3, title: "Track", desc: "See your real-time impact" },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-green-50 rounded-xl shadow p-6 flex flex-col items-center"
              >
                <step.icon className="h-12 w-12 text-green-600" />
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================ SUPPLY CHAIN FEATURES ================ */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Empowering Circular Supply Chains
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "AI Matching",
                desc: "Smart algorithms connect waste to demand",
              },
              {
                title: "Logistics",
                desc: "Built-in coordination with transporters",
              },
              {
                title: "Impact Dashboard",
                desc: "Track CO₂ savings and waste diversion",
              },
              {
                title: "Secure Payments",
                desc: "Trusted B2B transactions with escrow",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white shadow rounded-xl p-6 flex flex-col items-center"
              >
                <Globe className="h-10 w-10 text-green-600" />
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================ MARKETPLACE ================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Explore Marketplace
          </h2>
          <div className="mt-8 flex justify-between items-center">
            <input
              type="text"
              placeholder="Search materials..."
              className="flex-1 px-4 py-2 border rounded-xl shadow"
            />
            <button className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
              Search
            </button>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Recycled Plastic Pellets",
                score: 92,
                price: "$500 / ton",
              },
              {
                name: "Industrial Metal Scrap",
                score: 88,
                price: "$700 / ton",
              },
              {
                name: "Surplus Textiles",
                score: 80,
                price: "$200 / ton",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-green-50 p-6 rounded-xl shadow flex flex-col"
              >
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="mt-2 text-gray-600">
                  Sustainability Score:{" "}
                  <span className="font-bold text-green-600">
                    {item.score}%
                  </span>
                </p>
                <p className="mt-2 font-medium">{item.price}</p>
                <div className="mt-4 flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" /> Verified Seller
                </div>
                <button className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================ NEWS SECTION ================ */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Latest Insights
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Circular Economy Policies 2025",
                category: "Policy",
                date: "Sept 2025",
              },
              {
                title: "Top 10 Materials Exchanged Globally",
                category: "Report",
                date: "Aug 2025",
              },
              {
                title: "How SMEs Benefit from Material Exchanges",
                category: "Case Study",
                date: "July 2025",
              },
            ].map((news, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow">
                <p className="text-sm text-green-600 font-medium">
                  {news.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{news.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{news.date}</p>
                <a
                  href="#"
                  className="mt-4 inline-block text-green-600 font-medium hover:underline"
                >
                  Read More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================ IMPACT METRICS ================ */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Collective Impact</h2>
          <p className="mt-2 text-lg text-gray-600">
            Every exchange creates jobs, saves resources, and regenerates nature.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-2xl p-8">
              <h3 className="text-4xl font-extrabold text-green-600">
                {tonsDiverted.toLocaleString()}
              </h3>
              <p className="mt-2 text-gray-700">Tons of materials diverted</p>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-8">
              <h3 className="text-4xl font-extrabold text-green-600">
                {jobsCreated.toLocaleString()}
              </h3>
              <p className="mt-2 text-gray-700">Jobs supported worldwide</p>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-8">
              <h3 className="text-4xl font-extrabold text-green-600">
                {exchanges.toLocaleString()}
              </h3>
              <p className="mt-2 text-gray-700">Successful exchanges</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================ TESTIMONIALS ================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            What Our Partners Say
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "We turned leftover textile waste into revenue while reducing landfill costs. This platform is a game-changer.",
                name: "Sustainable Fashion Co.",
                role: "Textile Industry",
                img: "https://i.pravatar.cc/40?img=3",
              },
              {
                quote:
                  "The marketplace connected us to affordable raw materials and cut our sourcing costs in half.",
                name: "GreenBuild Ltd.",
                role: "Construction Sector",
                img: "https://i.pravatar.cc/40?img=5",
              },
              {
                quote:
                  "We’ve built partnerships across industries that we never thought possible. Impact tracking makes ESG reporting effortless.",
                name: "EcoChem Pvt.",
                role: "Chemical Manufacturing",
                img: "https://i.pravatar.cc/40?img=8",
              },
            ].map((t, idx) => (
              <div key={idx} className="bg-green-50 p-6 rounded-2xl shadow">
                <p className="text-gray-700 italic">“{t.quote}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================ CALL TO ACTION ================ */}
      <section className="bg-green-600 py-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl font-extrabold text-white">
            Be part of the circular economy revolution
          </h2>
          <p className="mt-4 text-lg text-green-100">
            Connect with businesses, create jobs, and regenerate nature by giving
            materials a second life.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#"
              className="px-6 py-3 bg-white text-green-700 font-semibold rounded-xl shadow hover:bg-green-100"
            >
              Get Started
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-green-800 text-white font-semibold rounded-xl shadow hover:bg-green-900"
            >
              List Materials
            </a>
          </div>
        </div>
      </section>

      {/* ================ FOOTER ================ */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white">EcoXchange</h3>
            <p className="mt-4 text-sm">
              Building a global circular economy where waste becomes a resource.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Platform</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Impact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  News
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-gray-500 text-sm">
          © 2025 EcoXchange. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
