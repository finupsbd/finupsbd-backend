// import { StatusCodes } from 'http-status-codes';
// import { prisma } from '../../../../app';
// import AppError from '../../../error/AppError';
// import { TEligibilityCheck } from '../eligibilityCheck.interface';

// const calculateEMI = (loanAmount: number, interestRate: number, tenureMonths: number) => {
//   if (interestRate === 0) return loanAmount / tenureMonths; // Handle zero interest case

//   const monthlyRate = interestRate / (12 * 100);
//   return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
//     (Math.pow(1 + monthlyRate, tenureMonths) - 1);
// };

// const personalLoan = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {
  

// console.log(query)

//   const page = Number(query.page) || 1;
//   const limit = Number(query.limit) || 10;
//   const skip = (page - 1) * limit;

//   const sortField = (query.sortField as string) || 'interestRate';
//   const sortOrder = ((query.sortOrder as string) || 'asc').toLowerCase() === 'desc' ? 'desc' : 'asc';





//   if (payload?.haveAnyLoan) { 
//     throw new AppError(
//       StatusCodes.CONFLICT,
//       'If you have any existing loan, you cannot apply for loan'
//     );
//   }


//   const age = Math.floor(
//     (new Date().getTime() - new Date(payload.dateOfBirth).getTime()) /
//     (1000 * 60 * 60 * 24 * 365.25)
//   );



//   if (payload?.profession === 'SALARIED') {



//     const mySalary = payload?.Salaried?.bankAccount?.YourSalaryAmountBDT || 0;
//     const experience = payload?.Salaried?.currentJobExperience || 0;


//     const totalCount = await prisma.personalLoan.count({
//       where: {
//         eligibility: {
//           minimumIncome: { lte: mySalary },
//           minimumExperience: { lte: experience },
//           ageRequirement: { lte: age },
//         },
//       },
//     });

//     const result = await prisma.personalLoan.findMany({
//       where: {
//         eligibility: {
//           minimumIncome: { lte: mySalary }, // Income check
//           minimumExperience: { lte: experience }, // Experience check
//           ageRequirement: { lte: age }, // Age check
//         },
//       },
//       include: {
//         features: true,
//         feesCharges: true,
//         eligibility: true,
//       },
//       skip,
//       take: limit,
//       orderBy: {
//         [sortField]: sortOrder,
//       },
//     });

//     const loan = result.map((res) => {
//       const eligibleLoan = mySalary * 5; // Adjust multiplier as per eligibility logic
//       const affordabilityRatio = eligibleLoan > 0 ? mySalary / eligibleLoan : 0;
//       const estimatedRepaymentAmount = eligibleLoan * (Number(res.interestRate) / 100) + eligibleLoan;

//       const tenureMonths = 36; // Assuming a 3-year loan tenure 
//       const monthlyEmi = calculateEMI(eligibleLoan, Number(res.interestRate), tenureMonths);

//       return {
//         bankName: res.bankName,
//         loanType: res.loanType,
//         eligibleLoan: eligibleLoan.toFixed(2),
//         userSalary: mySalary,
//         coverImage: res.coverImage,
//         affordabilityRatio: affordabilityRatio.toFixed(2),
//         estimatedRepaymentAmount: estimatedRepaymentAmount.toFixed(2),
//         interestRate: res.interestRate,
//         monthlyEmi: monthlyEmi.toFixed(2),
//         processingFee: res.processingFee,
//         features: res.features,
//         feesCharges: res.feesCharges,
//         eligibility: res.eligibility,
//       };
//     });        

//     // console.log('Loan Eligibility Data:', loan);

//     if (loan.length === 0) {
//       throw new AppError(StatusCodes.NOT_FOUND, 'No personal loans match your eligibility.');
//     }
//     return {
//       data: loan,
//       totalCount,
//       currentPage: page,
//       totalPages: Math.ceil(totalCount / limit),
//     };;
//   }



//   if (payload?.profession === 'BUSINESS_OWNER') {

//     const mySalary = payload?.Salaried?.bankAccount?.YourSalaryAmountBDT || 0;
//     const experience = payload?.Salaried?.currentJobExperience || 0;


//     const totalCount = await prisma.personalLoan.count({
//       where: {
//         eligibility: {
//           minimumIncome: { lte: mySalary }, // Income check
//           minimumExperience: { lte: experience }, // Experience check
//           ageRequirement: { lte: age }, // Age check
//         },
//       },
//     });
  
//     const result = await prisma.personalLoan.findMany({
//       where: {
//         eligibility: {
//           minimumIncome: { lte: mySalary }, // Income check
//           minimumExperience: { lte: experience }, // Experience check
//           ageRequirement: { lte: age }, // Age check
//         },
//       },
//       include: {
//         features: true,
//         feesCharges: true,
//         eligibility: true,
//       },
//       skip,
//       take: limit,
//       orderBy: {
//         [sortField]: sortOrder,
//       },
//     });

//     const loan = result.map((res) => {
//       const eligibleLoan = mySalary * 5; // Adjust multiplier as per eligibility logic
//       const affordabilityRatio = eligibleLoan > 0 ? mySalary / eligibleLoan : 0;
//       const estimatedRepaymentAmount = eligibleLoan * (Number(res.interestRate) / 100) + eligibleLoan;

//       const tenureMonths = 36; // Assuming a 3-year loan tenure 
//       const monthlyEmi = calculateEMI(eligibleLoan, Number(res.interestRate), tenureMonths);

//       return {
//         bankName: res.bankName,
//         loanType: res.loanType,
//         eligibleLoan: eligibleLoan.toFixed(2),
//         userSalary: mySalary,
//         coverImage: res.coverImage,
//         affordabilityRatio: affordabilityRatio.toFixed(2),
//         estimatedRepaymentAmount: estimatedRepaymentAmount.toFixed(2),
//         interestRate: res.interestRate,
//         monthlyEmi: monthlyEmi.toFixed(2),
//         processingFee: res.processingFee,
//           features: res.features,
//           feesCharges: res.feesCharges,
//           eligibility: res.eligibility,
//       };
//     });

//     console.log('Loan Eligibility Data:', loan);

//     if (loan.length === 0) {
//       throw new AppError(StatusCodes.NOT_FOUND, 'No personal loans match your eligibility.');
//     }

   

//     return {
//       data: loan,
//       totalCount,
//       currentPage: page,
//       totalPages: Math.ceil(totalCount / limit),
//     };
//   }

//   return {
//     data: [],
//     message: 'No matching profession found. Please ensure your profession field is correct (e.g., SALARIED or BUSINESS_OWNER).',
//   }; // Return an empty array if no profession is matched
// };

// export default personalLoan;











import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../../app';
import AppError from '../../../error/AppError';
import { TEligibilityCheck } from '../eligibilityCheck.interface';

const calculateEMI = (loanAmount: number, interestRate: number, tenureMonths: number) => {
  if (interestRate === 0) return loanAmount / tenureMonths; // Handle zero interest case
  const monthlyRate = interestRate / (12 * 100);
  return (
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );
};

const personalLoan = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {
  // ------------------------------
  // 1) Parse Pagination + Sorting
  // ------------------------------
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const sortField = (query.sortField as string) || 'interestRate'; // default sort by interestRate
  const sortOrder =
    ((query.sortOrder as string) || 'asc').toLowerCase() === 'desc' ? 'desc' : 'asc';

  // ------------------------------
  // 2) Parse Filter Parameters
  // ------------------------------
  // For example, if the front-end slider picks 0 -> 500,000 for loan amount,
  // and 5 -> 30 for profit/interest rate, you could pass these as query strings.
  const minLoanAmount = query.minLoanAmount ? Number(query.minLoanAmount) : undefined;
  const maxLoanAmount = query.maxLoanAmount ? Number(query.maxLoanAmount) : undefined;
  const minProfitRate = query.minProfitRate ? Number(query.minProfitRate) : undefined;
  const maxProfitRate = query.maxProfitRate ? Number(query.maxProfitRate) : undefined;

  // If multiple banks can be selected, they might come as comma-separated in the query:
  // e.g. "banks=Standard Chartered,Brac Bank,City Bank"
  let bankList: string[] | undefined;
  if (query.banks) {
    bankList = (query.banks as string).split(',').map((b) => b.trim());
  }

  // ---------------------------------------------
  // 3) Common Check: user must not have any loan
  // ---------------------------------------------
  if (payload?.haveAnyLoan) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'If you have any existing loan, you cannot apply for a new loan.'
    );
  }

  // ----------------------------
  // 4) Compute Age
  // ----------------------------
  const age = Math.floor(
    (new Date().getTime() - new Date(payload.dateOfBirth).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );

  // This function can handle SALARIED and BUSINESS_OWNER differently, as you do.
  // The filter logic is mostly the same; you just add it to your existing `where` object.

  if (payload?.profession === 'SALARIED') {
    const mySalary = payload?.Salaried?.bankAccount?.YourSalaryAmountBDT || 0;
    const experience = payload?.Salaried?.currentJobExperience || 0;

    // ----------------------------
    // 5) Build "where" object
    // ----------------------------
    // Start with your eligibility checks:
    const whereClause: {
      eligibility: {
        minimumIncome: { lte: number },
        minimumExperience: { lte: number },
        ageRequirement: { lte: number },
      },
      interestRate?: { gte?: string, lte?: string },
      maxLoanAmount?: { gte?: string, lte?: string },
      bankName?: { in: string[] },
    } = {
      eligibility: {
        minimumIncome: { lte: mySalary },
        minimumExperience: { lte: experience },
        ageRequirement: { lte: age },
      },
    };

    // If your `personalLoan` table has a numeric `interestRate` field:
    if (minProfitRate !== undefined || maxProfitRate !== undefined) {
      whereClause.interestRate = {
        ...(minProfitRate !== undefined ? { gte: minProfitRate.toString() } : {}),
        ...(maxProfitRate !== undefined ? { lte: maxProfitRate.toString() } : {}),
      };
    }

    // If your table has a `maxLoanAmount` field (or something similar):
    if (minLoanAmount !== undefined || maxLoanAmount !== undefined) {
      whereClause.maxLoanAmount = {
        ...(minLoanAmount !== undefined ? { gte: minLoanAmount.toString() } : {}),
        ...(maxLoanAmount !== undefined ? { lte: maxLoanAmount.toString() } : {}),
      };
    }

    // If your table has a `bankName` field:
    if (bankList && bankList.length > 0) {
      whereClause.bankName = { in: bankList };
    }

    // 6) Count total
    const totalCount = await prisma.personalLoan.count({ where: whereClause });

    // 7) Fetch paginated + sorted
    const result = await prisma.personalLoan.findMany({
      where: whereClause,
      include: {
        features: true,
        feesCharges: true,
        eligibility: true,
      },
      skip,
      take: limit,
      orderBy: {
        [sortField]: sortOrder,
      },
    });

    // 8) Transform each item (calculate EMI, etc.)
    const loan = result.map((res) => {
      const eligibleLoan = mySalary * 5; // your custom logic
      const affordabilityRatio = eligibleLoan > 0 ? mySalary / eligibleLoan : 0;
      const estimatedRepaymentAmount =
        eligibleLoan * (Number(res.interestRate) / 100) + eligibleLoan;

      const tenureMonths = 36;
      const monthlyEmi = calculateEMI(eligibleLoan, Number(res.interestRate), tenureMonths);

      return {
        bankName: res.bankName,
        loanType: res.loanType,
        eligibleLoan: eligibleLoan.toFixed(2),
        userSalary: mySalary,
        coverImage: res.coverImage,
        affordabilityRatio: affordabilityRatio.toFixed(2),
        estimatedRepaymentAmount: estimatedRepaymentAmount.toFixed(2),
        interestRate: res.interestRate,
        monthlyEmi: monthlyEmi.toFixed(2),
        processingFee: res.processingFee,
        features: res.features,
        feesCharges: res.feesCharges,
        eligibility: res.eligibility,
      };
    });

    if (loan.length === 0) {
      throw new AppError(StatusCodes.NOT_FOUND, 'No personal loans match your eligibility or filters.');
    }

    return {
      data: loan,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  // ----------------------------
  //  Business Owner Branch
  // ----------------------------
  if (payload?.profession === 'BUSINESS_OWNER') {
    const mySalary = payload?.Salaried?.bankAccount?.YourSalaryAmountBDT || 0;
    const experience = payload?.Salaried?.currentJobExperience || 0;

    // Similar approach: build whereClause
    const whereClause: {
      eligibility: {
        minimumIncome: { lte: number },
        minimumExperience: { lte: number },
        ageRequirement: { lte: number },
      },
      interestRate?: { gte?: string, lte?: string },
      maxLoanAmount?: { gte?: string, lte?: string },
      bankName?: { in: string[] },
    } = {
      eligibility: {
        minimumIncome: { lte: mySalary },
        minimumExperience: { lte: experience },
        ageRequirement: { lte: age },
      },
    };

    if (minProfitRate !== undefined || maxProfitRate !== undefined) {
      whereClause.interestRate = {
        ...(minProfitRate !== undefined ? { gte: minProfitRate.toString() } : {}),
        ...(maxProfitRate !== undefined ? { lte: maxProfitRate.toString() } : {}),
      };
    }

    if (minLoanAmount !== undefined || maxLoanAmount !== undefined) {
      whereClause.maxLoanAmount = {
        ...(minLoanAmount !== undefined ? { gte: minLoanAmount.toString() } : {}),
        ...(maxLoanAmount !== undefined ? { lte: maxLoanAmount.toString() } : {}),
      };
    }

    if (bankList && bankList.length > 0) {
      whereClause.bankName = { in: bankList };
    }

    const totalCount = await prisma.personalLoan.count({ where: whereClause });

    const result = await prisma.personalLoan.findMany({
      where: whereClause,
      include: {
        features: true,
        feesCharges: true,
        eligibility: true,
      },
      skip,
      take: limit,
      orderBy: {
        [sortField]: sortOrder,
      },
    });

    const loan = result.map((res) => {
      const eligibleLoan = mySalary * 5;
      const affordabilityRatio = eligibleLoan > 0 ? mySalary / eligibleLoan : 0;
      const estimatedRepaymentAmount =
        eligibleLoan * (Number(res.interestRate) / 100) + eligibleLoan;

      const tenureMonths = 36;
      const monthlyEmi = calculateEMI(eligibleLoan, Number(res.interestRate), tenureMonths);

      return {
        bankName: res.bankName,
        loanType: res.loanType,
        eligibleLoan: eligibleLoan.toFixed(2),
        userSalary: mySalary,
        coverImage: res.coverImage,
        affordabilityRatio: affordabilityRatio.toFixed(2),
        estimatedRepaymentAmount: estimatedRepaymentAmount.toFixed(2),
        interestRate: res.interestRate,
        monthlyEmi: monthlyEmi.toFixed(2),
        processingFee: res.processingFee,
        features: res.features,
        feesCharges: res.feesCharges,
        eligibility: res.eligibility,
      };
    });

    if (loan.length === 0) {
      throw new AppError(StatusCodes.NOT_FOUND, 'No personal loans match your eligibility or filters.');
    }

    return {
      data: loan,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  // If profession does not match any known type
  return {
    data: [],
    message: 'No matching profession found. Please ensure your profession is SALARIED or BUSINESS_OWNER.',
  };
};

export default personalLoan;
