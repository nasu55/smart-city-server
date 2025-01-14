import express from "express";
import { UserRoutes } from "./routes/userRoute.js";
import { shopRoute } from "./routes/shopRoute.js";
import { categoryRoute } from "./routes/categoryRoute.js";
import { AuthRoute } from "./routes/authRoute.js";
import { productRoute } from "./routes/productRoute.js";

export const DashboardRouter = express.Router();
DashboardRouter.use('/shops',shopRoute);
DashboardRouter.use('/user',UserRoutes);
DashboardRouter.use('/categories',categoryRoute);
DashboardRouter.use('/products',productRoute);
DashboardRouter.use('/auth',AuthRoute);