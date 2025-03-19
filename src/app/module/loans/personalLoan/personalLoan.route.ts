import express from 'express';
import { upload } from '../../../utils/sendImageToCloud';
import { PersonalLoanController } from './personalLoan.controller';
import auth from '../../../middleware/auth';

const router = express.Router();

router.post(
  '/',
  upload.single('file'), auth("ADMIN", "SUPER_ADMIN"),
  PersonalLoanController.createPersonalLoan
);
router.get('/', PersonalLoanController.getAllPersonalLoan);
router.patch(
  '/:id',
  upload.single('file'), auth("ADMIN", "SUPER_ADMIN"),
  PersonalLoanController.updatePersonalLoan
);

export const PersonalLoanRouter = router;
