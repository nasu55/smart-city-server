import express from "express";
import { createCart } from "../../../controllers/frontend/cartController.js";


export const cartRoute = express.Router();

cartRoute.post('/create',createCart); 
