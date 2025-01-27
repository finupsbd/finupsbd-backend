import express from 'express';
import { upload } from '../../../utils/sendImageToCloud';
import { PersonalLoanController } from './personalLoan.controller';

const router = express.Router();

router.post(
  '/',
  upload.single('file'),
  PersonalLoanController.createPersonalLoan
);
router.get('/', PersonalLoanController.getAllPersonalLoan);
router.patch(
  '/:id',
  upload.single('file'),
  PersonalLoanController.updatePersonalLoan
);

export const PersonalLoanRouter = router;
