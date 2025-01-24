import express from "express";
import { createCart } from "../../../controllers/dashboard/CartController.js";


export const cartRoute = express.Router();

cartRoute.post('/create',createCart); 
