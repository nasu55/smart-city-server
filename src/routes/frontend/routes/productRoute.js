import express from "express";
import { getAllProducts } from "../../../controllers/frontend/productController.js";


export const productRoute = express.Router();
productRoute.get('/all',getAllProducts); 

