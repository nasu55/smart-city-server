import express from "express";
import { createUser, deleteUser, getAllUser, updateUser, viewUser } from "../../../controllers/dashboard/Usercontroller";

export const UserRoutes = express.Router();


ShopRoutes.post('/Create/:id',createUser); //create post
ShopRoutes.put('/update/:id',updateUser); 
ShopRoutes.delete('/delete/:id',deleteUser); 
ShopRoutes.get('/view/:id',viewUser);
ShopRoutes.get('/all',getAllUserer); 

