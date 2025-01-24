import express from "express";
import { uploadFile } from "../../../utils/fileUploader.js";
import { createProduct, deleteProduct, getAllProducts, updateProduct, viewProduct } from "../../../controllers/dashboard/Productcontroller.js";

export const productRoute = express.Router();

productRoute.post('/create',uploadFile('products').single('image'),createProduct); //create post
productRoute.put('/update/:id',uploadFile('products').single('image'),updateProduct); 
productRoute.delete('/delete/:id',deleteProduct); 
productRoute.get('/view/:id',viewProduct);
productRoute.get('/all',getAllProducts); 
