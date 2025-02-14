import express from "express";
import { approveShop, createShop, deleteShop, featuredShop, getAllShop, getRegisteredShop, rejectShop, shopAuthentication, updateShop, viewShop } from "../../../controllers/dashboard/Shopcontroller.js";
import { uploadFile } from "../../../utils/fileUploader.js";

export const shopRoute = express.Router();

shopRoute.post('/create',uploadFile('shops').single('image'),createShop); //create post
shopRoute.post('/login', shopAuthentication);  //create post
shopRoute.put('/update/:id',uploadFile('shops').single('image'),updateShop); 
shopRoute.put('/featured/:id',featuredShop); 
shopRoute.delete('/delete/:id',deleteShop); 
shopRoute.delete('/approve/:id',approveShop); 
shopRoute.delete('/reject/:id',rejectShop); 
shopRoute.get('/view/:id',viewShop);
shopRoute.get('/all',getAllShop); 
shopRoute.get('/registered',getRegisteredShop); 
