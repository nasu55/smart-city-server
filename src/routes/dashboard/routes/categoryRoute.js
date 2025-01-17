import express from "express";
import { createCategory, deleteCategory, getAllCategory, updateCategory, viewCategory } from "../../../controllers/dashboard/Categorycontroller.js";
import { uploadFile } from "../../../utils/fileUploader.js";


export const categoryRoute = express.Router();

categoryRoute.post('/create',uploadFile('category').single('image'),createCategory); //create post
categoryRoute.put('/update/:id',uploadFile('category').single('image'),updateCategory); 
categoryRoute.delete('/delete/:id',deleteCategory); 
categoryRoute.get('/getCategory/:id',viewCategory);
categoryRoute.get('/all',getAllCategory); 
