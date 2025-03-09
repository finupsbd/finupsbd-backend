import express from 'express';
import { upload } from '../../../utils/sendImageToCloud';
import { SMELoanController } from './smeLoan.controller';




const router = express.Router();

router.post(
    '/',
    upload.single('file'),
    SMELoanController.createSMELoan
);
router.get('/', SMELoanController.getAllSMELoan);
router.patch(
    '/:id',
    upload.single('file'),
    SMELoanController.updateSMELoan
);

export const SMELoanRouter = router;
