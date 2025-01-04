import express from "express";
import { createCategory, deleteCategory, getAllCategory, updateCategory, viewCategory } from "../../../controllers/dashboard/Categorycontroller.js";
import { uploadFile } from "../../../utils/fileUploader.js";


export const categoryRoute = express.Router();

categoryRoute.post('/create',uploadFile('shops').single('image'),createCategory); //create post
categoryRoute.put('/update/:id',uploadFile('shops').single('image'),updateCategory); 
categoryRoute.delete('/delete/:id',deleteCategory); 
categoryRoute.get('/view/:id',viewCategory);
categoryRoute.get('/all',getAllCategory); 
