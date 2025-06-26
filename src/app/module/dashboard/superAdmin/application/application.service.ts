import { prisma } from "../../../../../app"


const getAllApplication = async () => {



    const applications = await prisma.loanApplicationForm.findMany(

    {
        include: {
            user: {
                select: {
                    name: true
                }
            },
            EligibleLoanOffer: {
                select: {
                    eligibleLoan: true,
                    bankName: true, 
                    loanType: true,
                }
            }, 
            loanRequest: {
                select: {
                    loanAmount: true
                }
            }
        }
    })

    return applications
}


export const ApplicationServides = {
    getAllApplication
}