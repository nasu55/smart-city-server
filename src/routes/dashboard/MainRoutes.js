import expresss from "express";
import { ShopRoutes } from "./shopRoute";
import { UserRoutes } from "./userRoute";
export const DashboardRouter = express.Router();
DashboardRouter.use('/shop',ShopRoutes);
DashboardRouter.use('/user',UserRoutes);