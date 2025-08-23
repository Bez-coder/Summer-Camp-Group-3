import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const features = [
    {
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19c-4.418 0-8-1.79-8-4V7a2 2 0 012-2h12a2 2 0 012 2v8c0 2.21-3.582 4-8 4z" /></svg>
      ),
      title: "Secure Transactions",
      description: "All transactions are protected with industry-standard security measures and commission-based trust system."
    },
    {
      icon: (
        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      ),
      title: "Verified Users",
      description: "Connect with verified buyers and sellers. Build trust through our comprehensive review system."
    },
    {
      icon: (
        <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2M16 9V5a2 2 0 00-2-2H6a2 2 0 00-2 2v4m16 0V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v4" /></svg>
      ),
      title: "Fair Commission",
      description: "Transparent commission structure that varies by category, ensuring fair pricing for all parties."
    },
    {
      icon: (
        <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
      ),
      title: "Smart Matching",
      description: "Our system connects buyers with sellers based on location, preferences, and requirements."
    }
  ];

  const categories = [
    {
      icon: (
        <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l9-7 9 7v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z" /></svg>
      ),
      title: "Real Estate",
      description: "Buy, sell, or rent properties",
      count: "1,234+ listings"
    },
    {
      icon: (
        <svg className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16v-1a4 4 0 014-4h10a4 4 0 014 4v1M16 3.13a4 4 0 01.84 7.9M6 3.13a4 4 0 00-.84 7.9" /></svg>
      ),
      title: "Vehicles",
      description: "Cars, motorcycles, and more",
      count: "856+ listings"
    },
    {
      icon: (
        <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4H7z" /></svg>
      ),
      title: "Electronics",
      description: "Phones, laptops, gadgets",
      count: "2,341+ listings"
    },
    {
      icon: (
        <svg className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 21m5.25-4l.75 4m-7.5-4h10.5M12 3v4m0 0C7.03 7 3 11.03 3 16h18c0-4.97-4.03-9-9-9z" /></svg>
      ),
      title: "Services",
      description: "Professional services",
      count: "567+ listings"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Property Seller",
      content: "BrokerHub made selling my home incredibly easy. The commission structure was transparent and fair.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Car Buyer",
      content: "Found the perfect car through BrokerHub. The verification system gave me confidence in the seller.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Service Provider",
      content: "As a freelancer, BrokerHub has connected me with quality clients. The platform is user-friendly.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="hero-title text-4xl md:text-6xl font-extrabold dark:font-bold text-gray-900 mb-6">
              Connect. Trade. <span className="hero-accent text-blue-600"> Succeed.</span>
            </h1>
            <p className="text-xl text-black dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              The trusted marketplace where buyers and sellers meet. 
              Post your resources, find what you need, and transact with confidence 
              through our secure commission-based platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signin">
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-lg font-semibold transition-colors">
                  Get Started
                </button>
              </Link>
              <Link to="/signin">
                <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3 rounded-lg font-semibold transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/listings">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-lg px-8 py-3 rounded-lg font-semibold transition-colors">
                  Browse Listings
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BrokerHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide a secure, transparent, and efficient platform for all your trading needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore thousands of listings across various categories with competitive commission rates.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-2">{category.description}</p>
                <p className="text-sm text-gray-500">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who trust BrokerHub for their trading needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><polygon points="9.9,1.1 7.6,6.6 1.6,7.6 6,11.9 4.9,17.9 9.9,14.9 14.9,17.9 13.8,11.9 18.2,7.6 12.2,6.6" /></svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join BrokerHub today and start connecting with buyers and sellers in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <button className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3 rounded-lg font-semibold transition-colors">
                Sign Up Now
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-blue-500 border border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3 rounded-lg font-semibold transition-colors">
                Login
              </button>
            </Link>
            <Link to="/listings">
              <button className="bg-transparent border border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3 rounded-lg font-semibold transition-colors">
                Explore Listings
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;