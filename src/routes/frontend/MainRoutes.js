import express from "express";
import { UserRoutes } from "./routes/userRoute.js";

export const FrontendRouter = express.Router();
FrontendRouter.use('/users',UserRoutes);