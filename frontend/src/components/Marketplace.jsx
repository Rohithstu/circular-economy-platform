import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Leaf, Package, Plus } from 'lucide-react';

const Marketplace = () => {
  const [materials, setMaterials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    setMaterials([
      {
        id: 1,
        title: "Steel Manufacturing Offcuts",
        company: "MetalCorp Industries",
        category: "Metals",
        quantity: "50 tons",
        location: "Detroit, MI",
        description: "High-grade steel offcuts from automotive manufacturing. Various sizes, clean condition.",
        price: 150,
        urgency: "medium",
        distance: 25,
        matchScore: 95,
        sustainabilityImpact: { co2Saved: 75, landfillDiverted: 50 },
        certifications: ["ISO 14001", "OHSAS 18001"],
        availability: "Immediate",
        contactInfo: { name: "John Smith", phone: "+1-555-0123", email: "j.smith@metalcorp.com" }
      },
      {
        id: 2,
        title: "Plastic Pellets - Food Grade",
        company: "PackagingPlus",
        category: "Plastics",
        quantity: "20 tons",
        location: "Chicago, IL",
        description: "Food-grade plastic pellets from packaging overrun. Perfect for manufacturing.",
        price: 200,
        urgency: "high",
        distance: 45,
        matchScore: 88,
        sustainabilityImpact: { co2Saved: 35, landfillDiverted: 20 },
        certifications: ["FDA Approved", "BRC Certified"],
        availability: "Within 2 weeks",
        contactInfo: { name: "Sarah Johnson", phone: "+1-555-0456", email: "s.johnson@packagingplus.com" }
      }
    ]);
  }, []);

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || material.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Metals', 'Plastics', 'Organic', 'Electronics'];

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const MaterialCard = ({ material }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{material.title}</h3>
            <p className="text-sm text-gray-600 mb-1">{material.company}</p>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {material.location}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(material.urgency)}`}>
              {material.urgency} priority
            </span>
            <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-sm font-medium text-green-700">{material.matchScore}% match</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Quantity</p>
            <p className="font-medium text-gray-900">{material.quantity}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-medium text-green-600">${material.price}</p>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-3 mb-4">
          <div className="flex items-center mb-2">
            <Leaf className="w-4 h-4 text-green-600 mr-2" />
            <span className="font-medium text-green-800">Environmental Impact</span>
          </div>
          <div className="text-sm text-green-700">
            CO₂ Saved: {material.sustainabilityImpact.co2Saved} tons
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedMaterial(material)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            View Details
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
            Contact
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search materials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMaterials.map(material => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>

        {selectedMaterial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedMaterial.title}</h2>
                  <button
                    onClick={() => setSelectedMaterial(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-gray-700 mb-4">{selectedMaterial.description}</p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                    <p className="text-gray-600">{selectedMaterial.contactInfo.name}</p>
                    <p className="text-gray-600">{selectedMaterial.contactInfo.email}</p>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;
