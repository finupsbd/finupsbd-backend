import express from 'express';
import { DashboardUsersController } from './users.controller';
import auth from '../../../../middleware/auth';

const route = express.Router();

route.get('/get-all-users', auth('SUPER_ADMIN'), DashboardUsersController.getAllusers);
route.get('/get-single-user/:id', DashboardUsersController.getSingleUser);

export const SuperAdminUsersRouter = route;
