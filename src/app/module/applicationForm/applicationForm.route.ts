
import express from 'express';
import { ApplicationController } from './applicationForm.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import multer from 'multer';
import { LoanApplicationFormSchema } from './applicationForm.validation';




const route = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // keeps files in memory





route.post('/create-application', auth('USER', 'SUPER_ADMIN', 'ADMIN'),  upload.fields([
    { name: 'files', maxCount: 10 },     // your uploaded files
    { name: 'data', maxCount: 1 }        // your stringified JSON
]), ApplicationController.createApplicationForm);


route.post('/applicant-guarator-info', upload.array("files"), ApplicationController.applicantGuarantorInfo);


route.get('/my-loan-application',auth('USER', 'SUPER_ADMIN', 'ADMIN'), ApplicationController.myLoanApplication)      



// route.patch(
//   '/update-status/:id',
//   auth('SUPER_ADMIN', 'ADMIN'),
//   validateRequest(ApplicationValidationSchema.ApplicationStatusUpdateValidation),
//   ApplicationController.statusUpdate
// ); 



route.get('/', ApplicationController.getAllApplicationForm);
route.post('/application-tracking', ApplicationController.applicationTracking)
route.post('/application-forget', ApplicationController.applicationForget)

route.get('/:id', auth('USER', 'SUPER_ADMIN', 'ADMIN'),ApplicationController.getSingleApplication); 



export const ApplicationRouter = route;
