import express from "express";
import { createShop, deleteShop, getAllShop, updateShop, viewShop } from "../../../controllers/dashboard/Shopcontroller.js";


export const shopRoute = express.Router();

shopRoute.post('/create',createShop); //create post
shopRoute.put('/update/:id',updateShop); 
shopRoute.delete('/delete/:id',deleteShop); 
shopRoute.get('/view/:id',viewShop);
shopRoute.get('/all',getAllShop); 
