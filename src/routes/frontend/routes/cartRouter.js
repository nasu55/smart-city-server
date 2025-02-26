
import express from "express";
import { createCart, deleteMany, deleteOne, getAllCarts, quantityChange } from "../../../controllers/frontend/cartController.js";
import { authMiddleware } from "../../../middleware/UserMiddleware.js";


export const cartRoute = express.Router();
cartRoute.post('/',authMiddleware,createCart); 
cartRoute.get('/',authMiddleware,getAllCarts);
cartRoute.get('/delete-all',authMiddleware,deleteMany);
cartRoute.post('/delete-one',authMiddleware,deleteOne);
cartRoute.get('/quantity',authMiddleware,quantityChange);




