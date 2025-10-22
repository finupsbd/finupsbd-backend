"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardServides = void 0;
const app_1 = require("../../../../../app");
const dashboardHome = () => __awaiter(void 0, void 0, void 0, function* () {
    // Define time ranges
    const startOfThisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const startOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
    const endOfLastMonth = new Date(startOfThisMonth.getTime() - 1); // last day of last month
    // Users
    const usersThisMonth = yield app_1.prisma.user.count({
        where: { createdAt: { gte: startOfThisMonth } },
    });
    const usersLastMonth = yield app_1.prisma.user.count({
        where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
    });
    // Applications
    const applicationsThisMonth = yield app_1.prisma.loanApplicationForm.count({
        where: { createdAt: { gte: startOfThisMonth } },
    });
    const applicationsLastMonth = yield app_1.prisma.loanApplicationForm.count({
        where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
    });
    // Growth formula
    const calcGrowth = (prev, current) => {
        if (prev === 0 && current > 0)
            return "+100%"; // avoid divide-by-zero
        if (prev === 0 && current === 0)
            return "0%";
        const growth = ((current - prev) / prev) * 100;
        return (growth < 0 ? 0 : growth).toFixed(2) + "%";
    };
    const userGrowth = calcGrowth(usersLastMonth, usersThisMonth);
    const applicantGrowth = calcGrowth(applicationsLastMonth, applicationsThisMonth);
    const totalUsers = yield app_1.prisma.user.count();
    const totalApplications = yield app_1.prisma.loanApplicationForm.count();
    const last5Application = yield app_1.prisma.loanApplicationForm.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 5,
        select: {
            status: true,
            applicationId: true,
            user: {
                select: {
                    name: true
                }
            }
        },
    });
    const last5User = yield app_1.prisma.user.findMany({
        take: 5,
        select: {
            id: true,
            name: true,
            userId: true,
            profile: true,
            createdAt: true
        }
    });
    return {
        totalUsers,
        totalApplications,
        userGrowth,
        applicantGrowth,
        last5Application,
        last5User
    };
});
exports.DashboardServides = {
    dashboardHome,
};
