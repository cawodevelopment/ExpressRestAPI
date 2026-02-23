import express from 'express';
import userRoutes from './services/UserRoutes.js';
import authRoutes from './services/AuthRoutes.js';

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);

export default app;