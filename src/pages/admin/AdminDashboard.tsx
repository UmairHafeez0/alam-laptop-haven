import React from 'react';
import { 
  Laptop, 
  Package, 
  Star, 
  TrendingUp,
  Users,
  ShoppingCart
} from 'lucide-react';

// Demo stats
const stats = [
  { name: 'Total Products', value: '124', icon: Laptop, color: 'bg-blue-500' },
  { name: 'Total Orders', value: '258', icon: Package, color: 'bg-green-500' },
  { name: 'Total Reviews', value: '89', icon: Star, color: 'bg-yellow-500' },
  { name: 'Total Customers', value: '431', icon: Users, color: 'bg-purple-500' },
  { name: 'Revenue', value: 'Rs. 1,542,689', icon: TrendingUp, color: 'bg-alam-600' },
  { name: 'Pending Orders', value: '18', icon: ShoppingCart, color: 'bg-orange-500' },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                  <stat.icon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">{stat.name}</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="px-6 py-5">
          <ul className="divide-y divide-gray-200">
            <li className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <ShoppingCart className="h-6 w-6 text-alam-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    New order received
                  </p>
                  <p className="text-sm text-gray-500">
                    Order #1234 - Macbook Pro 16
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    New
                  </span>
                </div>
              </div>
            </li>
            <li className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Star className="h-6 w-6 text-alam-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    New review submitted
                  </p>
                  <p className="text-sm text-gray-500">
                    Dell XPS 15 - 5 stars
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Review
                  </span>
                </div>
              </div>
            </li>
            <li className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-alam-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    New customer registered
                  </p>
                  <p className="text-sm text-gray-500">
                    Ahmed Khan - ahmed.khan@example.com
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Customer
                  </span>
                </div>
              </div>
            </li>
            <li className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Laptop className="h-6 w-6 text-alam-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Product updated
                  </p>
                  <p className="text-sm text-gray-500">
                    ASUS ROG Zephyrus G14 - Price updated
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Product
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
