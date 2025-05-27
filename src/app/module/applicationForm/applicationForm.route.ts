import { prisma } from './../../../app';

import express from 'express';
import { ApplicationController } from './applicationForm.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { ApplicationValidationSchema } from './applicationForm.validation';
import catchAsync from '../../utils/catchAsync';
import { TMiddlewareUser } from '../../types/commonTypes';



const route = express.Router();




// route.get(
//   '/',
//   auth('USER', 'SUPER_ADMIN', 'ADMIN'),
//   ApplicationController.getSingleApplication
// ); 

route.post( '/', ApplicationController.createApplicationForm); 


// route.patch(
//   '/update-status/:id',
//   auth('SUPER_ADMIN', 'ADMIN'),
//   validateRequest(ApplicationValidationSchema.ApplicationStatusUpdateValidation),
//   ApplicationController.statusUpdate
// ); 



// route.get('/', ApplicationController.getAllApplicationForm);
// route.post('/application-tracking', ApplicationController.applicationTracking)
route.post('/application-forget', ApplicationController.applicationForget)




/////test

// route.post('/step1', auth("USER", "SUPER_ADMIN"), catchAsync(async (req, res) => {

//   const {userId} = req.user as TMiddlewareUser;

//   console.log(userId)

//    const result  = await prisma.testApplication.create({
//     data: {
//       user: { connect: { id: userId} }, // you must have userId
//       TestBasicInfo: {
//         create: {
//          ...req.body,
//         },
//       },
//     },
//   }); 


// res.json({
//   status: 'success',
//   message: 'Application created successfully',
//   data: result,
// });

  
// }))


// route.post('/step2/:id', auth("USER", "SUPER_ADMIN"), catchAsync(async (req, res) => {

//   const { id } = req.params;

//    const result  = await prisma.testContactInfo.create({
//     data: {
//       ...req.body,
//       testApplication: { connect: { id} }, 
//     }
//    })

//   console.log({result})
// res.json({
//   status: 'success',
//   message: 'Application created successfully',
//   data: result,
// });
// }))


// route.post('/step3/:id', auth("USER", "SUPER_ADMIN"), catchAsync(async (req, res) => {
//   const {userId} = req.user as TMiddlewareUser;
//   const { id } = req.params;

//   console.log(userId)

//    const result  = await prisma.testProfession.create({
//     data: {
//       ...req.body,
//       testApplication: { connect: { id} }, 
//     }
//    })

//   console.log({result})
// res.json({
//   status: 'success',
//   message: 'Application created successfully',
//   data: result,
// });
// }))




// route.get('/test/:id', catchAsync(async (req, res) => {
//   const { id } = req.params;

//    const result  = await prisma.testApplication.findUnique({
//     where: {
//       id: id,
//     },
//     include: {
//       TestBasicInfo: {
//         select: {
//           name: true,
//           age: true,
//           dob: true,
//         }
//       },
//       TestContactInfo: {
//         select: {
//           email: true,
//           phone: true,
//         }
//       },
//       testProfession: {
//         select: {
//           profession: true,
//           monthlyIncome: true,
//         }
//       },
//       user: true,
//     }
//    })

//   console.log({result})
// res.json({
//   status: 'success',
//   message: 'Application created successfully',
//   data: result,
// });
// }))



// route.get('/test/', auth("USER", "SUPER_ADMIN"), catchAsync(async (req, res) => {

// const {userId} = req.user as TMiddlewareUser;


//    const result  = await prisma.testApplication.findMany({
//     include: {
//       TestBasicInfo: {
//         select: {
//           name: true,
//           age: true,
//           dob: true,
//         }
//       },
//       TestContactInfo: {
//         select: {
//           email: true,
//           phone: true,
//         }
//       },
//       testProfession: {
//         select: {
//           profession: true,
//           monthlyIncome: true,
//         }
//       },
//      user: {
//       select: {
//         id: true,
//         name: true,
//         email: true,
//       }
//      }
//     }
//    })

//    const result2  = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//     include: {
//       TestApplication: {
//         include: {
//           TestBasicInfo: {
//             select: {
//               name: true,
//               age: true,
//               dob: true,
//             }
//           },
//           TestContactInfo: {
//             select: {
//               email: true,
//               phone: true,
//             }
//           },
//           testProfession: {
//             select: {
//               profession: true,
//               monthlyIncome: true,
//             }
//           },
//         }
//       }
//     }
   
//    })

//   console.log({result})
// res.json({
//   status: 'success',
//   message: 'Application created successfully',
//   data: result2,
// });
// }))









export const ApplicationRouter = route;
