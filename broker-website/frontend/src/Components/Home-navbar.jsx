import React from 'react';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home_navbar = ({ searchTerm, onSearchChange, onOpenSidebar}) => {
    const navigate = useNavigate();
  return (
    <header className="bg-white border-b border-gray-300 sticky top-0 z-50 hover:bg-gray-300">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
         <button
  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
  onClick={onOpenSidebar}
>
  <Menu className="h-6 w-6" />
</button>


          {/* Logo */}
          <div className="text-2xl font-bold text-black" >
            <button onClick={() => navigate('/')}>BROKERHUB</button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-4 pr-12 py-3 border border-gray-400 rounded-lg focus:outline-none focus:border-black"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/post_1')} className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-lg font-medium transition-colors">
                SELL
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <User className="h-6 w-6" />
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                navigate('/signin');
              }}
              className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-4 pr-12 py-3 border border-gray-400 rounded-lg focus:outline-none focus:border-black"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home_navbar;