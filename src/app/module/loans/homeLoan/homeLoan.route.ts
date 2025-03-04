import express from 'express';
import { upload } from '../../../utils/sendImageToCloud';
import { HomeLoanController } from './homeLoan.controller';


const router = express.Router();

router.post(
  '/',
  upload.single('file'),
  HomeLoanController.createHomeLoan
);
router.get('/', HomeLoanController.getAllHomeLoan);
router.patch(
  '/:id',
  upload.single('file'),
  HomeLoanController.updateHomeLoan
);

export const HomeLoanRouter = router;
