import express from 'express';
import {
	getAllShops,
	getFavourite,
	getFeaturedShops,
	getShop,
	postFavourite,
} from '../../../controllers/frontend/shopController.js';
import { authMiddleware } from '../../../middleware/UserMiddleware.js';

export const shopRoute = express.Router();
shopRoute.get('/get-favourites', authMiddleware,getFavourite);
shopRoute.get('/featured', getFeaturedShops);
shopRoute.post('/favourites', authMiddleware, postFavourite);
shopRoute.get('/all', getAllShops);
shopRoute.get('/get/:id', getShop);

