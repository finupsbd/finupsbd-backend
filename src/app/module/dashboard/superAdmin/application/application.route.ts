
import express from "express"
import { ApplicarionController } from "./application.controller";
import auth from "../../../../middleware/auth";




const route = express.Router();

route.get('/get-all-application', ApplicarionController.getAllApplication)

route.get('/get-single-application/:id', ApplicarionController.getSingleApplication)



 export const SuperAdminApplicationRouter = route