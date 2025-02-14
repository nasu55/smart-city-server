import express from "express";
import { favoritedShop, getAllShops, getFeaturedShops } from "../../../controllers/frontend/shopController.js";


export const shopRoute = express.Router();
shopRoute.get('/all',getAllShops); 
shopRoute.put('/favourite/:id',favoritedShop); 
shopRoute.get('/featured',getFeaturedShops); 

