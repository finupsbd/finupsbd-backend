import { StatusCodes } from "http-status-codes";
import catchAsync from "../catchAsync"

const emiCalculator = catchAsync(async (req, res) => {
   
    const { loanAmount, interestRate, numberOfMonths, disbursementDate } = req.body;

    const monthlyRate = interestRate / 12 / 100; // Convert annual rate to monthly rate
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
                (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    // Format response
    const result = {
        "Disbursement Date": new Date(disbursementDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        "Loan Amount": loanAmount.toLocaleString("en-US", { style: "currency", currency: "BDT" }),
        "Number of Schedule": numberOfMonths,
        "Interest Rate": `${interestRate.toFixed(2)} %`,
        "EMI Amount": emi.toFixed(2),
      };


    res.status(StatusCodes.OK).json({
        success: true, 
        message: "Emi Calculate Successfully",
        statusCode: StatusCodes.OK,
        data: result
    })
})



export const PublicController = {
    emiCalculator
}