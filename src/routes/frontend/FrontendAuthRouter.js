import express from "express";
import { categoryRoute } from "./routes/categoryRoute.js";
import { shopRoute } from "./routes/shopRoute.js";
import { productRoute } from "./routes/productRoute.js";
import { cartRoute } from "./routes/cartRouter.js";

export const FrontendAuthRouter = express.Router();
FrontendAuthRouter.use('/categories',categoryRoute);
FrontendAuthRouter.use('/shops',shopRoute)
FrontendAuthRouter.use('/products',productRoute)
FrontendAuthRouter.use('/cart',cartRoute)