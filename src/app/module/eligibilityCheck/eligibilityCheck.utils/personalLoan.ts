import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../../app';
import AppError from '../../../error/AppError';
import { TEligibilityCheck } from '../eligibilityCheck.interface';

const calculateEMI = (loanAmount: number, interestRate: number, tenureMonths: number) => {
  if (interestRate === 0) return loanAmount / tenureMonths; // Handle zero interest case

  const monthlyRate = interestRate / (12 * 100);
  return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
};

const personalLoan = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {


  if (payload?.haveAnyLoan) { 
    throw new AppError(
      StatusCodes.CONFLICT,
      'If you have any existing loan, you cannot apply for loan'
    );
  }

  if (payload?.profession === 'Salaried') {
    console.log("All in one")
    const age = Math.floor(
      (new Date().getTime() - new Date(payload.dateOfBirth).getTime()) /
      (1000 * 60 * 60 * 24 * 365.25)
    );

    const mySalary = payload?.Salaried?.bankAccount?.YourSalaryAmountBDT || 0;
    const experience = payload?.Salaried?.currentJobExperience || 0;

    const result = await prisma.personalLoan.findMany({
      where: {
        eligibility: {
          minimumIncome: { lte: mySalary }, // Income check
          minimumExperience: { lte: experience }, // Experience check
          ageRequirement: { lte: age }, // Age check
        },
      },
      include: {
        features: true,
        feesCharges: true,
        eligibility: true,
      },
    });

    const loan = result.map((res) => {
      const eligibleLoan = mySalary * 5; // Adjust multiplier as per eligibility logic
      const affordabilityRatio = eligibleLoan > 0 ? mySalary / eligibleLoan : 0;
      const estimatedRepaymentAmount = eligibleLoan * (Number(res.interestRate) / 100) + eligibleLoan;

      const tenureMonths = 36; // Assuming a 3-year loan tenure 
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

    console.log('Loan Eligibility Data:', loan);

    if (loan.length === 0) {
      throw new AppError(StatusCodes.NOT_FOUND, 'No personal loans match your eligibility.');
    }
    return loan;
  }


  // if (payload?.yourProfession === 'BUSINESS_MAN') {
  //   const age = Math.floor(
  //     (new Date().getTime() - new Date(payload.dateOfBirth).getTime()) /
  //     (1000 * 60 * 60 * 24 * 365.25)
  //   );

  //   const mySalary = payload?.Salaried?.bankAccount?.YourSalaryAmountBDT || 0;
  //   const experience = payload?.Salaried?.currentJobExperience || 0;

  //   const result = await prisma.personalLoan.findMany({
  //     where: {
  //       eligibility: {
  //         minimumIncome: { lte: mySalary }, // Income check
  //         minimumExperience: { lte: experience }, // Experience check
  //         ageRequirement: { lte: age }, // Age check
  //       },
  //     },
  //     include: {
  //       features: true,
  //       feesCharges: true,
  //       eligibility: true,
  //     },
  //   });

  //   const loan = result.map((res) => {
  //     const eligibleLoan = mySalary * 5; // Adjust multiplier as per eligibility logic
  //     const affordabilityRatio = eligibleLoan > 0 ? mySalary / eligibleLoan : 0;
  //     const estimatedRepaymentAmount = eligibleLoan * (res.interestRate / 100) + eligibleLoan;

  //     const tenureMonths = 36; // Assuming a 3-year loan tenure 
  //     const monthlyEmi = calculateEMI(eligibleLoan, Number(res.interestRate), tenureMonths);

  //     return {
  //       bankName: res.bankName,
  //       loanType: res.loanType,
  //       eligibleLoan: eligibleLoan.toFixed(2),
  //       userSalary: mySalary,
  //       coverImage: res.coverImage,
  //       affordabilityRatio: affordabilityRatio.toFixed(2),
  //       estimatedRepaymentAmount: estimatedRepaymentAmount.toFixed(2),
  //       interestRate: res.interestRate,
  //       monthlyEmi: monthlyEmi.toFixed(2),
  //       processingFee: res.processingFee,
  //       features: res.features,
  //       feesCharges: res.feesCharges,
  //       eligibility: res.eligibility,
  //     };
  //   });

  //   console.log('Loan Eligibility Data:', loan);

  //   if (loan.length === 0) {
  //     throw new AppError(StatusCodes.NOT_FOUND, 'No personal loans match your eligibility.');
  //   }
  //   return loan;
  // }

  return []; // Return an empty array if no profession is matched
};

export default personalLoan;
