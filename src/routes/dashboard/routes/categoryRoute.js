import express from "express";
import { createCategory, deleteCategory, getAllCategory, updateCategory, viewCategory } from "../../../controllers/dashboard/Categorycontroller.js";

export const categoryRoute = express.Router();

categoryRoute.post('/create',createCategory); //create post
categoryRoute.put('/update/:id',updateCategory); 
categoryRoute.delete('/delete/:id',deleteCategory); 
categoryRoute.get('/view/:id',viewCategory);
categoryRoute.get('/all',getAllCategory); 
