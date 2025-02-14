import express from "express";
import { getAllUsers } from "../../../controllers/dashboard/UserController.js";

export const UserRoutes = express.Router();


UserRoutes.get('/',getAllUsers); //create post


