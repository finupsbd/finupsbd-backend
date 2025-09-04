
import express from "express"
import { ApplicarionController } from "./application.controller";




const route = express.Router();



route.get('/get-all-application', ApplicarionController.getAllApplication)
route.get('/get-single-application/:id', ApplicarionController.getSingleApplication)
route.patch('/application-feedback/:id', ApplicarionController.applicationFeedBack)
route.get('/status-events/:id', ApplicarionController.getStatusEvents)







 export const SuperAdminApplicationRouter = route