// Mock product data - replace with actual API calls
const mockProducts = [
  {
    id: '1',
    name: 'Smart Home Security Camera',
    description: 'High-definition wireless security camera with night vision and mobile app control',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.pexels.com/photos/8566416/pexels-photo-8566416.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/8566416/pexels-photo-8566416.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/7709197/pexels-photo-7709197.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    rating: 4.5,
    reviewCount: 324,
    category: 'home',
    inStock: true,
    brand: 'SmartHome Pro',
    features: ['1080p HD Recording', 'Night Vision', 'Motion Detection', 'Cloud Storage']
  },
  {
    id: '2',
    name: 'Car Dash Camera Pro',
    description: 'Professional dashboard camera with GPS tracking and emergency recording',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.pexels.com/photos/6937543/pexels-photo-6937543.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviewCount: 156,
    category: 'car-electronics',
    inStock: true,
    brand: 'DriveGuard',
    features: ['4K Recording', 'GPS Tracking', 'G-Sensor', 'Loop Recording']
  },
  {
    id: '3',
    name: 'Wireless Smartphone Charger',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices',
    price: 24.99,
    originalPrice: 39.99,
    image: 'https://images.pexels.com/photos/4963435/pexels-photo-4963435.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.3,
    reviewCount: 892,
    category: 'mobile',
    inStock: true,
    brand: 'PowerWave',
    features: ['15W Fast Charging', 'Universal Compatibility', 'LED Indicator', 'Overcharge Protection']
  },
  {
    id: '4',
    name: 'Premium Installation Service',
    description: 'Professional installation service for home electronics and security systems',
    price: 79.99,
    image: 'https://images.pexels.com/photos/5691621/pexels-photo-5691621.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviewCount: 245,
    category: 'services',
    inStock: true,
    features: ['Certified Technicians', 'Same Day Service', '90-Day Warranty', 'Free Consultation']
  },
  {
    id: '5',
    name: 'Smart Air Purifier',
    description: 'HEPA filter air purifier with app control and air quality monitoring',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviewCount: 178,
    category: 'home',
    inStock: true,
    brand: 'AirPure',
    features: ['HEPA H13 Filter', 'Smart App Control', 'Air Quality Sensor', 'Ultra Quiet']
  },
  {
    id: '6',
    name: 'Bluetooth Car Adapter',
    description: 'Wireless Bluetooth adapter for hands-free calling and music streaming',
    price: 29.99,
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.2,
    reviewCount: 567,
    category: 'car-electronics',
    inStock: false,
    brand: 'ConnectPro',
    features: ['Bluetooth 5.0', 'HD Audio', 'Voice Assistant', 'USB Charging']
  }
];

export const fetchProductsByCategory = async (category) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return mockProducts.filter(product => product.category === category);
};

export const fetchProductById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockProducts.find(product => product.id === id) || null;
};

export const searchProducts = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );
};