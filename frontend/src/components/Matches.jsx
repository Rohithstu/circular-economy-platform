import React, { useState, useEffect } from 'react';
import { Star, Leaf, BarChart3, Calendar } from 'lucide-react';

const Matches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches([
      {
        id: 1,
        material: "Steel Manufacturing Offcuts",
        supplierCompany: "MetalCorp Industries",
        buyerCompany: "GreenTech Manufacturing",
        status: "pending",
        matchScore: 95,
        estimatedSavings: 7500,
        co2Impact: 75,
        proposedDate: "2025-09-15"
      },
      {
        id: 2,
        material: "Plastic Pellets - Food Grade",
        supplierCompany: "PackagingPlus",
        buyerCompany: "EcoPackaging Solutions",
        status: "approved",
        matchScore: 88,
        estimatedSavings: 4000,
        co2Impact: 35,
        proposedDate: "2025-09-12"
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Material Matches</h1>
          <p className="text-gray-600 mt-2">AI-powered matches based on your business needs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {matches.map(match => (
            <div key={match.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{match.material}</h3>
                  <p className="text-sm text-gray-600">
                    {match.supplierCompany} → {match.buyerCompany}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                  {match.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <Star className="w-8 h-8 text-blue-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-500">Match Score</p>
                  <p className="font-bold text-blue-600">{match.matchScore}%</p>
                </div>
                <div className="text-center">
                  <Leaf className="w-8 h-8 text-green-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-500">CO₂ Impact</p>
                  <p className="font-bold text-green-600">{match.co2Impact}t saved</p>
                </div>
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-500">Savings</p>
                  <p className="font-bold text-purple-600">${match.estimatedSavings.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                Exchange date: {match.proposedDate}
              </div>

              <div className="flex space-x-2">
                {match.status === 'pending' && (
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                    Accept Match
                  </button>
                )}
                {match.status === 'approved' && (
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    Coordinate Logistics
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Matches;