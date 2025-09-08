import express from 'express'

import { SuperAdminApplicationRouter } from '../../module/dashboard/superAdmin/application/application.route';
import { SuperAdminUsersRouter } from '../../module/dashboard/superAdmin/users/user.route';

const router = express.Router()



const dashboardRoutes = [
    {
        path: '/application',
        route: SuperAdminApplicationRouter
    },
    {
        path: '/users',
        route: SuperAdminUsersRouter
    },

]


dashboardRoutes.forEach(item => router.use(item.path, item.route))

export const DashBoardSubRoutes = router