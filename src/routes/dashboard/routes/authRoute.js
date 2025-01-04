import express from "express";

import { postAuthentication } from "../../../controllers/dashboard/AuthController.js";


export const AuthRoute = express.Router();

AuthRoute.post('/login',postAuthentication); //create post

