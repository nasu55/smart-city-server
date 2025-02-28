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
shopRoute.get('/all', getAllShops);
shopRoute.get('/:id', getShop);
shopRoute.get('/favourites', authMiddleware, getFavourite);
shopRoute.post('/favourites', authMiddleware, postFavourite);
shopRoute.get('/featured', getFeaturedShops);
