import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import ProductGrid from '../Components/ProductGrid';
import ProductModal from '../Components/ProductModal';
import { fetchProductsByCategory } from '../api/products';
import Home_navbar from '../Components/Home-navbar';

function BuyerDashboard() {
  const [selectedCategory, setSelectedCategory] = useState('home');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProductsByCategory(selectedCategory);
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
    setIsLoading(false);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Home_navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />
      <div className="flex">
        <Sidebar
          selectedCategory={selectedCategory}
          onCategoryChange={(categoryId) => {
            setSelectedCategory(categoryId);
            setIsSidebarOpen(false);
          }}
          isSidebarOpen={isSidebarOpen}
          onCloseSidebar={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 lg:ml-64">
          <div className="p-4 lg:p-8">
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-black mb-2 capitalize">
                {selectedCategory.replace('-', ' & ')} Products
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length} products available
              </p>
            </div>
            <ProductGrid
              products={filteredProducts}
              isLoading={isLoading}
              onProductClick={setSelectedProduct}
            />
          </div>
        </main>
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default BuyerDashboard;
