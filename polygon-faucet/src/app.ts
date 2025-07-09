import express, { Request, Response } from 'express';
import cors from 'cors';
import { setRoutes } from './routes/index';
import { json } from 'body-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy to get real IP addresses
app.set('trust proxy', true);

// Middleware
app.use(cors());
app.use(json());
app.use(express.static(path.join(__dirname, '../public')));

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 12 * 60 * 60 * 1000, // 12 hours
  max: 1, // limit each IP to 1 request per 12 hours
  message: { success: false, message: 'You can only claim tokens once every 12 hours. Please try again later.' }
});
app.use(limiter);

// Set up routes
setRoutes(app);

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});