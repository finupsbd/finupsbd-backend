import express from 'express';
import { EligibilityCheckController } from './eligibilityCheck.controller';




const route = express.Router();

route.post('/', EligibilityCheckController.eligibilityCheck);



export const EligibilityCheckRouter = route;
