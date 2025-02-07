import express from "express";
import { getAllProducts } from "../../../controllers/frontend/productController.js";
import { shopAuthMiddleware } from "../../../middleware/ShopMiddleware.js";


export const productRoute = express.Router();
productRoute.get('/all',shopAuthMiddleware,getAllProducts); 

