import express from "express";
import { uploadFile } from "../../../utils/fileUploader.js";
// import { createBanner, deleteBanner, getAllBanner, updateBanner, viewBanner } from "../../../controllers/dashboard/BannerController.js";

import { createBanner, deleteBanner, getAllBanner, updateBanner, viewBanner } from "../../../controllers/dashboard/BannerController.js";

export const BannerRouter = express.Router();

BannerRouter.post('/create',uploadFile("banners").single('image'), createBanner);
BannerRouter.put('/update/:id',uploadFile("banners").single('image'), updateBanner);
BannerRouter.delete('/delete/:id', deleteBanner);
BannerRouter.get('/view/:id', viewBanner);
BannerRouter.get('/all', getAllBanner);