import express from "express";
import { getAllProducts } from "../../../controllers/frontend/productController.js";
import { shopAuthMiddleware } from "../../../middleware/ShopMiddleware.js";
import { authMiddleware } from "../../../middleware/UserMiddleware.js";


export const productRoute = express.Router();
productRoute.get('/all', authMiddleware, getAllProducts); 

