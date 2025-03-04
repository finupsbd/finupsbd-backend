import express from 'express';
import { upload } from '../../../utils/sendImageToCloud';
import { CarLoanController } from './carLoan.controller';



const router = express.Router();

router.post(
  '/',
  upload.single('file'),
  CarLoanController.createCarLoan
);
router.get('/', CarLoanController.getAllCarLoan);
router.patch(
  '/:id',
  upload.single('file'),
  CarLoanController.updateCarLoan
);

export const CarLoanRouter = router;
