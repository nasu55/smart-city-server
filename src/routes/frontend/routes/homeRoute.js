import express from "express";
import { getHomePage, getLocalities } from "../../../controllers/frontend/homeController.js";


export const homeRoute = express.Router();
homeRoute.get('/',getHomePage); 
homeRoute.get('/localities',getLocalities); 

