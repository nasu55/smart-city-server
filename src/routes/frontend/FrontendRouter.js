import express from 'express';
import { FrontendPublicRouter } from './FrontendPublicRouter.js';
import { FrontendAuthRouter } from './FrontendAuthRouter.js';


export const FrontendRouter = express.Router();

FrontendRouter.use(FrontendPublicRouter);
FrontendRouter.use(FrontendAuthRouter);