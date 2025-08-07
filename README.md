
# BrokerHub - Local Goods Marketplace Platform

BrokerHub is a full-stack platform designed specifically for local goods and services, with a strong focus on the Ethiopian market and local commerce. Built with a React TypeScript frontend, Node.js Express backend, and PostgreSQL database, BrokerHub enables secure, commission-based listings, local payment processing, and trusted user connections. The platform is optimized for local transactions, verification, and offline-first experiences, following OWASP security standards.


## 🚀 Features

### Local Commerce & Goods Focus
- **Local Goods Marketplace**: Buy and sell real estate, vehicles, electronics, and services within your community.
- **Location-Based Listings**: Search and filter by city, region, or neighborhood for hyperlocal results.
- **Category-Specific Verification**: Enhanced checks for local products (e.g., coffee quality, property ownership, vehicle papers).
- **Community Trust**: User ratings, reviews, and dispute resolution tailored for local transactions.

### Ethiopian Payment & Local Transaction Enhancements
- **TeleBirr Integration**: Full support for TeleBirr escrow and direct payments.
- **Local Bank Transfers**: Integration with major Ethiopian banks (CBE, Awash) for large transactions.
- **Cash Pickup**: Option for cash transactions via verified local agents.
- **Dynamic Escrow**: Escrow periods and rules adjusted for local product categories.
- **Offline-First**: Designed to support transactions in areas with limited or intermittent internet access.

### Localized Experience
- **Amharic Language Support**: Localized UI and content for Ethiopian users.
- **Ethiopian Calendar Integration**: Date pickers and schedules use the local calendar system.
- **Mobile-First Design**: Optimized for mobile devices common in local markets.

### Core Platform Features
- **Commission-Based System**: Dynamic commission rates by local product category.
- **User Management**: Buyer/Seller accounts with local profile verification.
- **Payment Processing**: Integrated payment system with local commission breakdown.
- **Advanced Search & Filtering**: By category, location, and price.
- **Real-time Features**: Live updates, notifications, and chat for local deals.

### Security Features (OWASP Top 10 Compliant)
- **Input Sanitization**: XSS and injection prevention
- **Rate Limiting**: Authentication and API rate limiting
- **Security Headers**: CSP, HSTS, X-Frame-Options, etc.
- **Access Control**: Resource ownership validation
- **Comprehensive Logging**: Security event monitoring
- **Data Protection**: Sensitive data exposure prevention

### Technical Features
- **TypeScript**: Full type safety across frontend and backend
- **Modular Architecture**: Clean, maintainable code structure
- **Comprehensive Testing**: Security and functionality tests
- **Professional UI**: Modern design with shadcn/ui components
- **Local-first Optimizations**: Fast, reliable, and robust for local network conditions

## 🏗️ Architecture

```
broker-website/
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Security & validation
│   │   ├── utils/           # Utilities
│   │   └── tests/           # Test suites
│   └── package.json
├── frontend/                # React TypeScript SPA
│   └── broker-frontend/
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── pages/       # Page components
│       │   ├── contexts/    # React contexts
│       │   └── lib/         # Utilities
│       └── package.json
└── docs/                    # Documentation
```

## 📋 Prerequisites

- **Node.js**: v18+ (recommended v20)
- **npm/pnpm**: Latest version
- **PostgreSQL**: v13+ (or use Docker)
- **Git**: For cloning the repository

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd broker-website
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

#### Environment Variables (.env)

```env
# Server Configuration
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=brokerhub
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_SALT_ROUNDS=12
```

### 3. Database Setup

#### Option A: Local PostgreSQL
```bash
# Create database
createdb brokerhub

# Or using psql
psql -U postgres
CREATE DATABASE brokerhub;
\q
```

#### Option B: Docker PostgreSQL
```bash
docker run --name brokerhub-postgres \
  -e POSTGRES_DB=brokerhub \
  -e POSTGRES_USER=your_db_user \
  -e POSTGRES_PASSWORD=your_db_password \
  -p 5432:5432 \
  -d postgres:13
```

### 4. Frontend Setup

```bash
cd ../frontend/broker-frontend

# Install dependencies
pnpm install
# or
npm install

# Create environment file
cp .env.example .env.local

# Edit environment variables
nano .env.local
```

#### Frontend Environment Variables (.env.local)

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=BrokerHub
```

## 🚀 Running the Application

### Development Mode

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend/broker-frontend
pnpm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/health

### Production Build

#### Backend
```bash
cd backend
npm run build
npm start
```

#### Frontend
```bash
cd frontend/broker-frontend
pnpm run build
pnpm run preview
```

## 🧪 Testing

### Backend Tests
```bash
cd backend

# Run all tests
npm test

# Run security tests specifically
npm run test:security

# Run tests with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### Frontend Tests
```bash
cd frontend/broker-frontend

# Run tests
pnpm test

# Run tests with coverage
pnpm run test:coverage
```

## 📊 Commission Structure

The platform uses dynamic commission rates based on item categories:

| Category | Commission Rate | Notes |
|----------|----------------|-------|
| Real Estate Sales | 3.0% | Standard real estate commission |
| Real Estate Rentals | 10.0% | Percentage of first month's rent |
| Vehicles | 2.0% | Cars, motorcycles, etc. |
| Electronics | 5.0% | Phones, laptops, gadgets |
| Services | 8.0% | Professional services |
| Default | 5.0% | Fallback for other categories |

## 🔐 Security Features

### OWASP Top 10 Compliance

1. **Injection Prevention**: Input sanitization, parameterized queries
2. **Broken Authentication**: Rate limiting, strong password policies
3. **Sensitive Data Exposure**: Security headers, data encryption
4. **XML External Entities**: XML content blocking
5. **Broken Access Control**: Resource ownership validation
6. **Security Misconfiguration**: Secure headers, CSP policies
7. **Cross-Site Scripting**: HTML escaping, XSS filtering
8. **Insecure Deserialization**: Request validation, size limits
9. **Known Vulnerabilities**: Dependency management
10. **Insufficient Logging**: Comprehensive security logging

### Rate Limiting

- **Login Attempts**: 5 attempts per 15 minutes
- **Registration**: 3 attempts per hour
- **Password Reset**: 3 attempts per hour
- **API Requests**: 100 requests per 15 minutes

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - User logout

### Payments
- `POST /api/payment/calculate-commission` - Calculate commission
- `POST /api/payment/create-intent` - Create payment intent
- `POST /api/payment/process` - Process payment
- `GET /api/payment/transactions` - Get transaction history

## 🎨 UI Components

The frontend uses modern UI components:

- **shadcn/ui**: Professional component library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Beautiful, consistent icons
- **React Hook Form**: Form handling with validation
- **Axios**: HTTP client for API calls

## 📱 Responsive Design

The application is fully responsive and works on:

- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout and navigation
- **Mobile**: Touch-friendly interface with mobile menu

## 🚀 Deployment Options

### Option 1: Traditional Hosting
- Deploy backend to services like Heroku, DigitalOcean, or AWS
- Deploy frontend to Netlify, Vercel, or similar
- Use managed PostgreSQL service

### Option 2: Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Option 3: Cloud Platforms
- **AWS**: Use ECS/EKS for containers, RDS for database
- **Google Cloud**: Use Cloud Run, Cloud SQL
- **Azure**: Use Container Instances, Azure Database

## 🔍 Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection
psql -h localhost -U your_db_user -d brokerhub
```

#### Port Already in Use
```bash
# Find process using port 3001
lsof -i :3001

# Kill process if needed
kill -9 <PID>
```

#### Node Modules Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Resources

- **TypeScript Documentation**: https://www.typescriptlang.org/docs/
- **React Documentation**: https://react.dev/
- **Express.js Guide**: https://expressjs.com/
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **OWASP Security Guide**: https://owasp.org/www-project-top-ten/

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the logs for error messages
3. Ensure all environment variables are set correctly
4. Verify database connectivity
5. Check that all dependencies are installed

## 🎯 Next Steps

After setting up the basic platform, consider:

1. **Payment Integration**: Integrate with Stripe or PayPal
2. **Email Service**: Add email notifications
3. **File Upload**: Implement image upload for listings
4. **Real-time Chat**: Add messaging between users
5. **Advanced Search**: Implement Elasticsearch
6. **Mobile App**: Create React Native mobile app
7. **Analytics**: Add user behavior tracking
8. **Multi-language**: Internationalization support

