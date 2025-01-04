import express from "express";
import { createShop, deleteShop, getAllShop, updateShop, viewShop } from "../../../controllers/dashboard/Shopcontroller.js";
import { uploadFile } from "../../../utils/fileUploader.js";

export const shopRoute = express.Router();

shopRoute.post('/create',uploadFile('shops').single('image'),createShop); //create post
shopRoute.put('/update/:id',uploadFile('shops').single('image'),updateShop); 
shopRoute.delete('/delete/:id',deleteShop); 
shopRoute.get('/view/:id',viewShop);
shopRoute.get('/all',getAllShop); 
