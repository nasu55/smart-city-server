import express from "express";
import { updateLocality,deleteLocality,viewLocality,getAllLocality, createLocality } from "../../../controllers/dashboard/LocalityController.js";


export const localityRoute = express.Router();
localityRoute.post('/',createLocality); 
localityRoute.put('/update/:id',updateLocality); 
localityRoute.delete('/delete/:id',deleteLocality); 
localityRoute.get('/getLocality/:id',viewLocality);
localityRoute.get('/all',getAllLocality); 
