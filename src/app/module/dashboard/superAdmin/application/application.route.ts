
import express from "express"
import { ApplicarionController } from "./application.controller";




const route = express.Router();


route.get('/get-all-users', ApplicarionController.getAllusers)

route.get('/get-all-application', ApplicarionController.getAllApplication)
route.get('/get-single-application/:id', ApplicarionController.getSingleApplication)
route.patch('/application-feedback/:id', ApplicarionController.applicationFeedBack)




route.get('/dashboard-home', ApplicarionController.dashboardHome)







 export const SuperAdminApplicationRouter = route