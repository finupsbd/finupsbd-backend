
import express from 'express';
import { ApplicationController } from './applicationForm.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { ApplicationValidationSchema } from './applicationForm.validation';



const route = express.Router();

route.get(
  '/',
  auth('USER', 'SUPER_ADMIN', 'ADMIN'),
  ApplicationController.getSingleApplication
); 

route.post(
  '/',
  auth('USER', 'SUPER_ADMIN', 'ADMIN'),
  validateRequest(ApplicationValidationSchema.CreateApplicationValidationSchema),
  ApplicationController.createApplicationForm
); 


route.patch(
  '/update-status/:id',
  auth('SUPER_ADMIN', 'ADMIN'),
  validateRequest(ApplicationValidationSchema.ApplicationStatusUpdateValidation),
  ApplicationController.statusUpdate
); 



route.get('/', ApplicationController.getAllApplicationForm);
route.post('/application-tracking', ApplicationController.applicationTracking)
// route.post('/application-forget', ApplicationController.applicationForget)
export const ApplicationRouter = route;
