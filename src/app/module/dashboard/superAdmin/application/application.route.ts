
import express from "express"
import { ApplicarionController } from "./application.controller";




const route = express.Router();

route.get('/get-all-application', ApplicarionController.getAllApplication)
route.get('/get-single-application/:id', ApplicarionController.getSingleApplication)




 export const SuperAdminApplicationRouter = route