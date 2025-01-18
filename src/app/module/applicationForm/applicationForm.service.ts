// import { prisma } from '../../../app';


// import { TApplicationForm } from './application.interface';

// const createApplicationForm = async (payload: TApplicationForm) => {

//   const {
//     propertyDetails,
//     employmentFinancialInfo,
//     existingLoans,
//     creditCards,
//     otherLiabilities,
//     coApplicant,
//     loanApplication, 
//     address
//   } = payload;


// //   const createdApplication = await prisma.applicationForm.create({
// //     data: {
// //       ...payload,
// //       propertyDetails: {
// //         create: propertyDetails,
// //       },
// //       employmentFinancialInfo: {
// //         create: employmentFinancialInfo,
// //       },
// //       existingLoans: {
// //         create: existingLoans,
// //       },
// //       creditCards: {
// //         create: creditCards,
// //       },
// //       otherLiabilities: {
// //         create: otherLiabilities,
// //       },
// //       coApplicant: {
// //         create: coApplicant,
// //       },
// //       loanApplication: {
// //         create: loanApplication,
// //       },
// //       Address: {
// //         create: address,
// //       },
// //     },
// //   });

// //   return createdApplication;
// // };

// export const ApplicationFromService = {
//   createApplicationForm,
// };
