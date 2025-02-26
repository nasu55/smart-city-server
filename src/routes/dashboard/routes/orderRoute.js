import express from "express";
import { getAllOrdersForShop } from "../../../controllers/dashboard/OrderController.js";
import { shopAuthMiddleware } from "../../../middleware/ShopMiddleware.js";


export const orderRoute = express.Router();

orderRoute.get('/',shopAuthMiddleware,getAllOrdersForShop)

