import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middleware/auth';

const router = express.Router();



router.get('/get_all_application/:id', auth('USER'), UserController.getAllApplication);

router.get(
  '/',
  auth('USER', 'ADMIN', 'SUPER_ADMIN'),
  UserController.getAllUsers
);

router.get(
  '/my-profile',
  auth('USER', 'ADMIN', 'SUPER_ADMIN'),
  UserController.meProfile
);

router.get('/:id', auth('USER', 'ADMIN', 'SUPER_ADMIN'),UserController.getSingleUser);







export const UserRouter = router;
