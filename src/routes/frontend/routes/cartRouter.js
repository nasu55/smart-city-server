
import express from "express";
import { createCart, deleteMany, deleteOne, getAllCarts, quantityChange } from "../../../controllers/frontend/cartController.js";
import { authMiddleware } from "../../../middleware/UserMiddleware.js";


export const cartRoute = express.Router();
cartRoute.post('/',authMiddleware,createCart); 
cartRoute.get('/get-all',authMiddleware,getAllCarts);
cartRoute.get('/delete-all',authMiddleware,deleteMany);
cartRoute.get('/delete-one',authMiddleware,deleteOne);
cartRoute.get('/quantity',authMiddleware,quantityChange);




