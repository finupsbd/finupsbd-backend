import express from 'express'

import { SuperAdminApplicationRouter } from '../../module/dashboard/superAdmin/application/application.route';

const router = express.Router()



const dashboardRoutes = [
    {
        path: '/application',
        route: SuperAdminApplicationRouter
    },

]


dashboardRoutes.forEach(item => router.use(item.path, item.route))

export const DashBoardSubRoutes = router