import express from 'express';
import cors from 'cors';
import listingsRoute from './src/routes/listings.js';
import productsRoute from './src/routes/productRoutes.js'; 
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const safeUse = (path, router) => {
  try {
    app.use(path, router);
  } catch (err) {
    console.error(`❌ Failed to register route: ${path}`);
    console.error(err);
  }
};

safeUse('/api/listings', listingsRoute);
safeUse('/api/products', productsRoute);

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
