
import express from "express"
import { ApplicarionController } from "./application.controller";


const route = express.Router();

route.get('/get-all-application', ApplicarionController.getAllApplication)




 export const SuperAdminApplicationRouter = route