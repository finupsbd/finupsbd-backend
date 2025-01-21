import express from 'express';
import { BankInfoController } from './bank.controller';
import { upload } from '../../utils/sendImageToCloud';

const router = express.Router();

router.post('/', upload.single('file'), BankInfoController.createBankInfo);
router.get('/', BankInfoController.getallBankInfo);
router.patch('/:id', upload.single('file'), BankInfoController.updateBookInfo);

export const BankRouter = router;
