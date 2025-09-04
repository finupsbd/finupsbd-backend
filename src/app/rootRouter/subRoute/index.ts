import express from 'express'

import { SuperAdminApplicationRouter } from '../../module/dashboard/superAdmin/application/application.route';
import { SuperAdminUsersRouter } from '../../module/dashboard/superAdmin/users/user.route';
import { DashboardRouter } from '../../module/dashboard/superAdmin/dashboard/dashboard.route';

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
     {
        path: '/dashboard',
        route: DashboardRouter
    },
]


dashboardRoutes.forEach(item => router.use(item.path, item.route))

export const DashBoardSubRoutes = router