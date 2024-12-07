import express from "express";
import { createShop, deleteShop, getAllShop, updateShop, viewShop } from "../../../controllers/dashboard/Shopcontroller";


export const shopRoute = express.Router();

ShopRoutes.post('/Create/:id',createShop); //create post
ShopRoutes.put('/update/:id',updateShop); 
ShopRoutes.delete('/delete/:id',deleteShop); 
ShopRoutes.get('/view/:id',viewShop);
ShopRoutes.get('/all',getAllShop); 
