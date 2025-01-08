import express from 'express';
import { ProfileController } from './profile.controller';
import auth from '../../../middleware/auth';

const router = express.Router();

router.post('/', auth("USER", "ADMIN", "SUPER_ADMIN"), ProfileController.createProfile);
router.get('/',);

export const ProfileRouter = router;
