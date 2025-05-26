import express from 'express';
import { EligibilityCheckController } from './eligibilityCheck.controller';
import { eligibilityValidationSchema } from './eligibilityCheck.validation';
import validateRequest from '../../middleware/validateRequest';




const route = express.Router();

route.post('/', 
validateRequest(eligibilityValidationSchema.eligibilitySchema.innerType()), 
EligibilityCheckController.eligibilityCheck);



export const EligibilityCheckRouter = route;
