import React from 'react';
import { Truck, MapPin } from 'lucide-react';

const Logistics = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Logistics Coordination</h1>
          <p className="text-gray-600 mt-2">Manage transportation and delivery</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <Truck className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-lg font-bold text-gray-900">Active Shipments</h2>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-medium text-gray-900">Steel Offcuts → GreenTech</p>
                <p className="text-sm text-gray-600">En route • ETA: Tomorrow 2:00 PM</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="font-medium text-gray-900">Plastic Pellets → EcoPackaging</p>
                <p className="text-sm text-gray-600">Preparing for pickup</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-lg font-bold text-gray-900">Logistics Partners</h2>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">GreenLogistics</p>
                <p className="text-sm text-gray-600">Carbon-neutral shipping</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">EcoTransport</p>
                <p className="text-sm text-gray-600">Local delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logistics;