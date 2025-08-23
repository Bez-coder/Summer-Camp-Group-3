import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Settings, 
  DollarSign, 
  Users, 
  Package, 
  MessageSquare, 
  HelpCircle, 
  Plus,
} from 'lucide-react';
import Seller_nav from '../Components/seller_nav';

function Sellers_dashboard() {
  const [activeTab, setActiveTab] = useState('adverts');
  const navigate = useNavigate();

  return (
    <>
    <Seller_nav/>
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 relative">
              {/* Profile Section */}
              <div className="text-center mb-6">
                <button className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={() => navigate('/settings')}>
                  <Settings size={20} className="text-gray-600" />
                </button>
                
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User size={32} className="text-gray-600" />
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Broker Store</h2>
                
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                  ADD PHONE NUMBER
                </button>
              </div>

              {/* Menu Items */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('money')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    activeTab === 'money' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <DollarSign size={20} className="text-green-600" />
                  <span className="text-gray-700">Make money</span>
                </button>

                <button
                  onClick={() => setActiveTab('followers')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    activeTab === 'followers' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <Users size={20} className="text-gray-600" />
                  <span className="text-gray-700">Followers</span>
                </button>

                <button
                  onClick={() => setActiveTab('adverts')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    activeTab === 'adverts' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <Package size={20} className="text-gray-600" />
                  <span className="text-gray-700">My adverts</span>
                </button>

                <button
                  onClick={() => setActiveTab('feedback')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    activeTab === 'feedback' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <MessageSquare size={20} className="text-gray-600" />
                  <span className="text-gray-700">Feedback</span>
                </button>

                <button
                  onClick={() => setActiveTab('faq')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    activeTab === 'faq' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <HelpCircle size={20} className="text-gray-600" />
                  <span className="text-gray-700">Frequently Asked Questions</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm min-h-96">
              {activeTab === 'adverts' && (
                <div className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">My adverts</h1>
                    <button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                      <Plus size={20} />
                      <span>Create New Advert</span>
                    </button>
                  </div>

                  {/* Empty State */}
                  <div className="text-center py-16">
                    <div className="mb-8">
                      <svg
                        className="mx-auto h-32 w-32 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      There are no adverts yet
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Create your first advertisement to start selling on Broker Hub
                    </p>
                    <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                      Create new one now!
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'money' && (
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Make Money</h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold mb-2">Total Earnings</h3>
                      <p className="text-2xl font-bold text-green-600">$0.00</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold mb-2">This Month</h3>
                      <p className="text-2xl font-bold text-blue-600">$0.00</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold mb-2">Pending</h3>
                      <p className="text-2xl font-bold text-orange-600">$0.00</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'followers' && (
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Followers</h1>
                  <div className="text-center py-16">
                    <Users size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No followers yet</h3>
                    <p className="text-gray-600">Start posting products to gain followers</p>
                  </div>
                </div>
              )}

              {activeTab === 'feedback' && (
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Feedback</h1>
                  <div className="text-center py-16">
                    <MessageSquare size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No feedback yet</h3>
                    <p className="text-gray-600">Customer reviews will appear here</p>
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">How do I create an advertisement?</h3>
                      <p className="text-gray-600">Click on "Create New Advert" to start posting your products.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">How do I get paid?</h3>
                      <p className="text-gray-600">Payments are processed after successful transactions through our secure payment system.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">How can I increase my sales?</h3>
                      <p className="text-gray-600">Use high-quality photos, detailed descriptions, and competitive pricing to attract more buyers.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors">
        <HelpCircle size={24} />
      </button>
    </div>
    </>
  );
}

export default Sellers_dashboard;