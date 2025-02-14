import express from "express";
import { UserRoutes } from "./routes/userRoute.js";
import { shopRoute } from "./routes/shopRoute.js";
import { categoryRoute } from "./routes/categoryRoute.js";
import { localityRoute } from "./routes/localityRoute.js";
import { AuthRoute } from "./routes/authRoute.js";
import { productRoute } from "./routes/productRoute.js";
import { cartRoute } from "./routes/cartRoute.js";
import { BannerRouter } from "./routes/bannerRoute.js";

export const DashboardRouter = express.Router();
DashboardRouter.use('/shops',shopRoute);
DashboardRouter.use('/user',UserRoutes);
DashboardRouter.use('/categories',categoryRoute);
DashboardRouter.use('/cart',cartRoute);
DashboardRouter.use('/localities',localityRoute);
DashboardRouter.use('/products',productRoute);
DashboardRouter.use('/auth',AuthRoute);
DashboardRouter.use('/banners', BannerRouter);