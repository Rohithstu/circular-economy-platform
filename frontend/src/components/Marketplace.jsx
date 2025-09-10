import React, { useState } from "react";

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [recipient, setRecipient] = useState("");
  const [location, setLocation] = useState("");

  const urgentItems = [
    {
      title: "Office Chairs (50 units)",
      img: "https://images.unsplash.com/photo-1581091215367-59ab7bfba510?auto=format&fit=crop&w=400&q=80",
      location: "London, UK",
    },
    {
      title: "Retail Shelving Units",
      img: "https://images.unsplash.com/photo-1598300054208-0e6c927af6d6?auto=format&fit=crop&w=400&q=80",
      location: "Manchester, UK",
    },
    {
      title: "Construction Timber Offcuts",
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80",
      location: "Birmingham, UK",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search + Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Search category</h2>
          <div className="flex flex-col lg:flex-row gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search materials, companies, or locations..."
              className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-600"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">All Categories</option>
              <option>Construction</option>
              <option>Retail</option>
              <option>Offices</option>
              <option>Hospitality</option>
              <option>Medical</option>
            </select>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">Condition</option>
              <option>New</option>
              <option>Good</option>
              <option>Used</option>
            </select>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">Who is it for?</option>
              <option>Non Profit</option>
              <option>Businesses</option>
            </select>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="px-4 py-2 border rounded-md"
            />
            <button className="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="bg-white rounded-lg shadow p-6 space-y-6">
          <h3 className="text-lg font-bold text-gray-800">Filters</h3>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Category</h4>
            <ul className="space-y-2 text-gray-600">
              <li><label><input type="checkbox" /> Construction</label></li>
              <li><label><input type="checkbox" /> Retail</label></li>
              <li><label><input type="checkbox" /> Offices</label></li>
              <li><label><input type="checkbox" /> Hospitality</label></li>
              <li><label><input type="checkbox" /> Medical</label></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Condition</h4>
            <ul className="space-y-2 text-gray-600">
              <li><label><input type="checkbox" /> New</label></li>
              <li><label><input type="checkbox" /> Good</label></li>
              <li><label><input type="checkbox" /> Used</label></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Who is it for?</h4>
            <ul className="space-y-2 text-gray-600">
              <li><label><input type="checkbox" /> Non Profit</label></li>
              <li><label><input type="checkbox" /> Businesses</label></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Location</h4>
            <input
              type="text"
              placeholder="Enter location"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          {/* Urgent Items */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Urgent Items</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {urgentItems.map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                  <img src={item.img} alt={item.title} className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.location}</p>
                    <button className="mt-3 w-full py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Marketplace;
