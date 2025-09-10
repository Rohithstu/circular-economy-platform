import React from 'react';
import { BarChart3, Users, Package, Leaf } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Materials', value: '1,234', change: '+12%', icon: Package, color: 'blue' },
    { title: 'Active Exchanges', value: '89', change: '+23%', icon: Users, color: 'green' },
    { title: 'CO₂ Saved (tons)', value: '2,156', change: '+31%', icon: Leaf, color: 'emerald' },
    { title: 'Cost Savings', value: '$456K', change: '+18%', icon: BarChart3, color: 'purple' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Impact Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your contribution to the circular economy</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} this month</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Environmental Impact Over Time</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;