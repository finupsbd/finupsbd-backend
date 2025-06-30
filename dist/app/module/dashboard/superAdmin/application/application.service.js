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
exports.ApplicationServides = void 0;
const app_1 = require("../../../../../app");
const selects_1 = require("../../../../utils/prisma/selects");
const getAllApplication = () => __awaiter(void 0, void 0, void 0, function* () {
    const [applications, total] = yield Promise.all([
        app_1.prisma.loanApplicationForm.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
                eligibleLoanOffer: {
                    select: {
                        eligibleLoan: true,
                        bankName: true,
                        loanType: true,
                    },
                },
                loanRequest: {
                    select: {
                        loanAmount: true,
                    },
                },
            },
            take: 10,
            orderBy: {
                createdAt: "desc"
            }
        }),
        app_1.prisma.loanApplicationForm.count()
    ]);
    console.log(total);
    return applications;
});
const getSingleApplication = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = app_1.prisma.loanApplicationForm.findUnique({
        where: { id },
        include: {
            personalInfo: true,
            user: { select: selects_1.safeUserSelect },
            guarantorInfo: true,
            loanInfo: {
                include: {
                    bankAccounts: true,
                    creditCards: true,
                    existingLoans: true,
                }
            },
            eligibleLoanOffer: true,
            employmentInformation: {
                include: {
                    properties: true
                }
            },
            loanRequest: true,
            document: true,
            residentialInformation: true,
            personalGuarantor: {
                include: {
                    document: true
                }
            },
            businessGuarantor: {
                include: {
                    document: true
                }
            },
        },
    });
    return result;
});
const applicationFeedback = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, payload);
    // const result = prisma.loanApplicationForm.findUnique({
    //   where: { id },
    //   include: {
    //     personalInfo: true,
    //     user: { select: safeUserSelect },
    //     guarantorInfo: true,
    //     loanInfo: {
    //       include: {
    //         bankAccounts: true,
    //         creditCards: true,
    //         existingLoans: true,
    //       }
    //     },
    //     eligibleLoanOffer: true,
    //     employmentInformation: {
    //       include: {
    //         properties: true
    //       }
    //     },
    //     loanRequest: true,
    //     document: true,
    //     residentialInformation: true,
    //     personalGuarantor: {
    //       include: {
    //         document: true
    //       }
    //     },
    //     businessGuarantor: {
    //       include: {
    //         document: true
    //       }
    //     },
    //   },
    // })
    if (payload.status == "REJECTED") {
        yield app_1.prisma.loanApplicationForm.update({
            where: { id },
            data: {
                status: payload.status,
                isActive: false
            }
        });
        return {};
    }
    else {
        const result = yield app_1.prisma.loanApplicationForm.update({
            where: { id },
            data: {
                status: payload.status,
                adminNotes: payload.adminNote
            },
            include: {
                user: {
                    select: {
                        email: true,
                        name: true
                    }
                }
            }
        });
        return result;
    }
});
exports.ApplicationServides = {
    getAllApplication,
    getSingleApplication,
    applicationFeedback
};
