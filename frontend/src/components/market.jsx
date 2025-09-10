// src/components/Marketplace.jsx

import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Leaf, Package, Plus } from 'lucide-react';

const Marketplace = () => {
  const [materials, setMaterials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  // Sample data - in real app, this would come from your backend API
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
        sustainabilityImpact: {
          co2Saved: 75,
          landfillDiverted: 50
        },
        certifications: ["ISO 14001", "OHSAS 18001"],
        availability: "Immediate",
        contactInfo: {
          name: "John Smith",
          phone: "+1-555-0123",
          email: "j.smith@metalcorp.com"
        }
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
        sustainabilityImpact: {
          co2Saved: 35,
          landfillDiverted: 20
        },
        certifications: ["FDA Approved", "BRC Certified"],
        availability: "Within 2 weeks",
        contactInfo: {
          name: "Sarah Johnson",
          phone: "+1-555-0456",
          email: "s.johnson@packagingplus.com"
        }
      },
      {
        id: 3,
        title: "Wood Chips & Sawdust",
        company: "TimberWorks LLC",
        category: "Organic",
        quantity: "100 cubic meters",
        location: "Portland, OR",
        description: "Clean wood chips and sawdust from furniture manufacturing. Ideal for biomass energy.",
        price: 50,
        urgency: "low",
        distance: 120,
        matchScore: 78,
        sustainabilityImpact: {
          co2Saved: 15,
          landfillDiverted: 80
        },
        certifications: ["FSC Certified", "SFI Standard"],
        availability: "Ongoing",
        contactInfo: {
          name: "Mike Chen",
          phone: "+1-555-0789",
          email: "m.chen@timberworks.com"
        }
      },
      {
        id: 4,
        title: "Electronic Components",
        company: "TechRecycle Pro",
        category: "Electronics",
        quantity: "500 units",
        location: "Austin, TX",
        description: "Refurbished electronic components from device manufacturing. Tested and certified.",
        price: 25,
        urgency: "medium",
        distance: 60,
        matchScore: 82,
        sustainabilityImpact: {
          co2Saved: 20,
          landfillDiverted: 5
        },
        certifications: ["RoHS Compliant", "WEEE Certified"],
        availability: "Next week",
        contactInfo: {
          name: "Alex Rodriguez",
          phone: "+1-555-0987",
          email: "a.rodriguez@techrecycle.com"
        }
      }
    ]);
  }, []);

  // Filter materials based on search and category
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || material.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Metals', 'Plastics', 'Organic', 'Electronics', 'Textiles', 'Chemicals'];

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
              {material.location} • {material.distance}km away
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
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-medium text-gray-900">{material.category}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Quantity</p>
            <p className="font-medium text-gray-900">{material.quantity}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Price per unit</p>
            <p className="font-medium text-green-600">${material.price}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Availability</p>
            <p className="font-medium text-gray-900">{material.availability}</p>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{material.description}</p>

        <div className="bg-green-50 rounded-lg p-3 mb-4">
          <div className="flex items-center mb-2">
            <Leaf className="w-4 h-4 text-green-600 mr-2" />
            <span className="font-medium text-green-800">Environmental Impact</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-green-700">
              CO₂ Saved: <span className="font-medium">{material.sustainabilityImpact.co2Saved} tons</span>
            </div>
            <div className="text-green-700">
              Waste Diverted: <span className="font-medium">{material.sustainabilityImpact.landfillDiverted} tons</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {material.certifications.map((cert, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {cert}
            </span>
          ))}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedMaterial(material)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            View Details
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
            Contact Supplier
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Material Marketplace</h1>
              </div>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              List Material
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search materials, companies, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>
                
                <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-900">
                {filteredMaterials.length} materials available
              </p>
              <p className="text-sm text-gray-600">
                Discover sustainable material exchanges in your area
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Package className="w-4 h-4" />
              <span>Sorted by relevance</span>
            </div>
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {filteredMaterials.map(material => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>

        {/* No Results State */}
        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No materials found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find more materials.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium">
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Material Details Modal */}
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
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Company Information</h3>
                  <p className="text-gray-700">{selectedMaterial.company}</p>
                  <p className="text-gray-600">{selectedMaterial.location}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Material Details</h3>
                  <p className="text-gray-700 mb-4">{selectedMaterial.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-medium text-gray-900">{selectedMaterial.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price per unit</p>
                      <p className="font-medium text-green-600">${selectedMaterial.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium text-gray-900">{selectedMaterial.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Availability</p>
                      <p className="font-medium text-gray-900">{selectedMaterial.availability}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Environmental Impact</h3>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">CO₂ Savings</p>
                        <p className="text-lg font-bold text-green-600">{selectedMaterial.sustainabilityImpact.co2Saved} tons</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Waste Diverted</p>
                        <p className="text-lg font-bold text-green-600">{selectedMaterial.sustainabilityImpact.landfillDiverted} tons</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMaterial.certifications.map((cert, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900">{selectedMaterial.contactInfo.name}</p>
                    <p className="text-gray-600">{selectedMaterial.contactInfo.email}</p>
                    <p className="text-gray-600">{selectedMaterial.contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium">
                    Request Quote
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium">
                    Contact Supplier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;