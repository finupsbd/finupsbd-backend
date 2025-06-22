import { prisma } from './../../../app';

import express from 'express';
import { ApplicationController } from './applicationForm.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import catchAsync from '../../utils/catchAsync';
import { TMiddlewareUser } from '../../types/commonTypes';
import multer from 'multer';
import { LoanApplicationFormSchema } from './applicationForm.validation';


const route = express.Router();

const upload = multer({ storage: multer.memoryStorage() }); // keeps files in memory

// route.get(
//   '/',
//   auth('USER', 'SUPER_ADMIN', 'ADMIN'),
//   ApplicationController.getSingleApplication
// ); 

route.post('/create-application', auth('USER', 'SUPER_ADMIN', 'ADMIN'),  validateRequest(LoanApplicationFormSchema), upload.fields([
    { name: 'files', maxCount: 10 },     // your uploaded files
    { name: 'data', maxCount: 1 }        // your stringified JSON
]), ApplicationController.createApplicationForm);
route.post('/applicant-guarator-info', upload.array("files"), ApplicationController.applicantGuarantorInfo);


// route.patch(
//   '/update-status/:id',
//   auth('SUPER_ADMIN', 'ADMIN'),
//   validateRequest(ApplicationValidationSchema.ApplicationStatusUpdateValidation),
//   ApplicationController.statusUpdate
// ); 



// route.get('/', ApplicationController.getAllApplicationForm);
// route.post('/application-tracking', ApplicationController.applicationTracking)
route.post('/application-forget', ApplicationController.applicationForget)





export const ApplicationRouter = route;
