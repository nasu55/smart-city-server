import express from "express";
import { UserRoutes } from "./userRoute.js";
import { shopRoute } from "./routes/shopRoute.js";
export const DashboardRouter = express.Router();
DashboardRouter.use('/shops',shopRoute);
DashboardRouter.use('/user',UserRoutes);