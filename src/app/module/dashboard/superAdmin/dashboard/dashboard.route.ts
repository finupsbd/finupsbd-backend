
import express from "express"
import { DashboardController } from "./dashboard.controller";

import auth from "../../../../middleware/auth";








const route = express.Router();

route.get('/dashboard-home', DashboardController.getDashboardHone)

 export const DashboardRouter = route