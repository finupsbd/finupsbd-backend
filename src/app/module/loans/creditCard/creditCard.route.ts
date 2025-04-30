import express from 'express';
import { upload } from '../../../utils/sendImageToCloud';
import { CreditCardController } from './creditCard.controller';




const router = express.Router();

router.post(
  '/',
  upload.single('file'),
  CreditCardController.createCreditCard
);
router.get('/', CreditCardController.getAllCreditCard);
router.patch(
  '/:id',
  upload.single('file'),
  CreditCardController.updateCreditCard
);

export const CreditCardRouter = router;
