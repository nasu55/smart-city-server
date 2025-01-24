import express from "express";
import { categoryRoute } from "./routes/categoryRoute.js";

export const FrontendAuthRouter = express.Router();
FrontendAuthRouter.use('/categories',categoryRoute);