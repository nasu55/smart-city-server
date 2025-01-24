import express from "express";
import { getAllShops } from "../../../controllers/frontend/shopController.js";


export const shopRoute = express.Router();
shopRoute.get('/all',getAllShops); 

