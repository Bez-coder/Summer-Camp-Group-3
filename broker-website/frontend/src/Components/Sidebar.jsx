import React from 'react';
import { Home, Car, Smartphone, Wrench, ChevronRight } from 'lucide-react';

const categories = [
  {
    id: 'home',
    name: 'Home & Kitchen',
    icon: 'Home',
    subcategories: ['Appliances', 'Furniture', 'Decor', 'Kitchen Tools']
  },
  {
    id: 'car',
    name: 'Car ',
    icon: 'Car',
    subcategories: ['Audio Systems', 'GPS Navigation', 'Dash Cams', 'Accessories']
  },
  {
    id: 'mobile',
    name: 'Mobile & Tech',
    icon: 'Smartphone',
    subcategories: ['Smartphones', 'Tablets', 'Accessories', 'Smart Watches']
  },
  {
    id: 'services',
    name: 'Services',
    icon: 'Wrench',
    subcategories: ['Installation', 'Repair', 'Consultation', 'Maintenance']
  }
];

const IconComponent = ({ name }) => {
  const icons = {
    Home: Home,
    Car: Car,
    Smartphone: Smartphone,
    Wrench: Wrench
  };
  const Icon = icons[name];
  return <Icon className="h-5 w-5" />;
};

const Sidebar = ({ selectedCategory, onCategoryChange,isSidebarOpen,onCloseSidebar }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-[120px] h-[calc(100vh-120px)] w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-bold text-black mb-4">Categories</h2>
          
          <nav className="space-y-2">
            {categories.map((category) => (
              <div key={category.id}>
                <button
                  onClick={() => onCategoryChange(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent name={category.icon} />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
                
                {selectedCategory === category.id && category.subcategories && (
                  <div className="ml-8 mt-2 space-y-1">
                    {category.subcategories.map((sub) => (
                      <button
                        key={sub}
                        className="block w-full text-left py-2 px-3 text-sm text-gray-600 hover:text-black hover:bg-gray-100 rounded"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
{isSidebarOpen && (
  <div className="fixed top:0 left:0 h-full w-80 r z-50 bg-white p-6 overflow-y-auto lg:hidden">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">Categories</h2>
      <button onClick={onCloseSidebar} className="p-2 hover:bg-gray-200 rounded">
        ✕
      </button>
    </div>

    <nav className="space-y-2">
      {categories.map((category) => (
        <div key={category.id}>
          <button
            onClick={() => onCategoryChange(category.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
              selectedCategory === category.id
                ? 'bg-black text-white'
                : 'hover:bg-gray-700 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <IconComponent name={category.icon} />
              <span className="font-medium">{category.name}</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ))}
    </nav>
  </div>
)}

    </>
  );
};

export default Sidebar;