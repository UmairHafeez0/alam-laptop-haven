import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Laptop, 
  Star, 
  Package, 
  LogOut, 
  Settings,
  Image,
  Users 
} from 'lucide-react';
import { useAdminAuth, useAdminProtectedRoute } from '@/context/AdminAuthContext';

const AdminLayout: React.FC = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  
  // Protect this route
  const isAuthenticated = useAdminProtectedRoute();

  if (!isAuthenticated) {
    // Return a loading or empty state while redirecting
    return <div className="flex items-center justify-center h-screen">Checking authentication...</div>;
  }
  
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/admin" 
                end
                className={({ isActive }) => 
                  `flex items-center p-3 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'bg-alam-50 text-alam-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/products" 
                className={({ isActive }) => 
                  `flex items-center p-3 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'bg-alam-50 text-alam-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Laptop className="mr-3 h-5 w-5" />
                Products
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/image" 
                className={({ isActive }) => 
                  `flex items-center p-3 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'bg-alam-50 text-alam-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Image className="mr-3 h-5 w-5" />
                Images
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/orders" 
                className={({ isActive }) => 
                  `flex items-center p-3 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'bg-alam-50 text-alam-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Package className="mr-3 h-5 w-5" />
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/reviews" 
                className={({ isActive }) => 
                  `flex items-center p-3 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'bg-alam-50 text-alam-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Star className="mr-3 h-5 w-5" />
                Reviews
              </NavLink>
            </li>
            
            
          </ul>
          
          <div className="pt-8">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold text-gray-900">Admin Portal</h1>
          </div>
        </header>
        
        <main className="px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
