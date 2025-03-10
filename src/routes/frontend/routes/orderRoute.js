import express from "express";
import { createOrder, getAllOrdersForUser, getOrderbyId } from "../../../controllers/frontend/OrderController.js";
import { getAllOrdersForShop } from "../../../controllers/dashboard/OrderController.js";
import { authMiddleware } from "../../../middleware/UserMiddleware.js";
import { shopAuthMiddleware } from "../../../middleware/ShopMiddleware.js";


export const orderRoute = express.Router();
orderRoute.post('/', authMiddleware, createOrder); 
orderRoute.get('/',authMiddleware, getAllOrdersForUser); 
orderRoute.get('/:orderId',authMiddleware,getOrderbyId); 

