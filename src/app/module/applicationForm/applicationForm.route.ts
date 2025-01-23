import express from 'express';
import { ApplicationController } from './applicationForm.controller';


const route = express.Router();

route.post(
  '/',
  // validateRequest(
  //   ApplicationValidationSchema.CreateApplicationValidationSchema
  // ),
  ApplicationController.createApplicationForm
);
route.get('/', ApplicationController.getAllApplicationForm);

export const ApplicationRouter = route;
