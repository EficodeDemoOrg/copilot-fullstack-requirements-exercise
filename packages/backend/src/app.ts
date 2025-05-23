import express from 'express';
import cors from 'cors';
import geneticsRoutes from './routes/genetics';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Handle form-encoded data

// Routes
app.use('/api/genetics', geneticsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;
