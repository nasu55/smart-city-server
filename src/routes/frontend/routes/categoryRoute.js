import express from "express";
import { getAllCategories } from "../../../controllers/frontend/categoryController.js";


export const categoryRoute = express.Router();
categoryRoute.get('/all',getAllCategories); 

