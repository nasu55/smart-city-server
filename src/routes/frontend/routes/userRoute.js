import express from "express";
import { createUser, userLogin } from "../../../controllers/frontend/usercontroller.js";

export const UserRoutes = express.Router();
UserRoutes.post('/create',createUser); //create post
UserRoutes.post('/login',userLogin)




// UserRoutes.post('/login',postAuthentication); 





// UserRoutes.put('/update/:id',updateUser); 
 