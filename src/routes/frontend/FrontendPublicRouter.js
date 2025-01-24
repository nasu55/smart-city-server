import express from 'express';
import { UserRoutes } from './routes/userRoute.js';


export const FrontendPublicRouter = express.Router();

FrontendPublicRouter.use('/users',UserRoutes);