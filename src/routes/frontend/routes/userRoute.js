import express from "express";
import { createUser, postAuthentication, updateUser } from "../../../controllers/frontend/usercontroller.js";

export const UserRoutes = express.Router();


UserRoutes.post('/login',postAuthentication); //create post
UserRoutes.post('/create/:id',createUser); //create post

UserRoutes.put('/update/:id',updateUser); 
 