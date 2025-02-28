import express from "express";
import { getHomePage, getLocalities } from "../../../controllers/frontend/homeController.js";
import { authMiddleware } from "../../../middleware/UserMiddleware.js";


export const homeRoute = express.Router();
homeRoute.get('/',authMiddleware, getHomePage); 
homeRoute.get('/localities',getLocalities); 

