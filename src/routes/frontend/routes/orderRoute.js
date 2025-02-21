import express from "express";
import { createOrder, getAllOrdersForUser } from "../../../controllers/frontend/OrderController.js";
import { getAllOrdersForShop } from "../../../controllers/dashboard/OrderController.js";
import { authMiddleware } from "../../../middleware/UserMiddleware.js";


export const orderRoute = express.Router();
orderRoute.post('/', authMiddleware, createOrder); 
orderRoute.get('/', authMiddleware,getAllOrdersForUser); 
orderRoute.get('/all-orders',getAllOrdersForShop); 

