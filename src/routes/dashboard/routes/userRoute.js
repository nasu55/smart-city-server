import express from "express";
import { createUser, deleteUser, getAllUser, updateUser, viewUser } from "../../../controllers/dashboard/Usercontroller.js";

export const UserRoutes = express.Router();


UserRoutes.post('/create/:id',createUser); //create post
UserRoutes.put('/update/:id',updateUser); 
UserRoutes.delete('/delete/:id',deleteUser); 
UserRoutes.get('/view/:id',viewUser);
UserRoutes.get('/all',getAllUser); 

