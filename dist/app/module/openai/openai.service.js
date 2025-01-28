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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenaiServices = void 0;
const openai_1 = __importDefault(require("openai"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const model = 'gpt-4o-mini';
function interactWithAssistant(assistantId, message) {
    return __awaiter(this, void 0, void 0, function* () {
        // Fetch active personal loans
        const personalLoans = yield prisma.personalLoan.findMany({
            where: { isActive: true },
            include: {
                features: true,
                eligibility: true,
                feesCharges: true,
            },
        });
        const user = yield prisma.user.findMany({
            include: {
                ApplicationForm: true,
                PersonalLoan: true
            }
        });
        // Prepare loan details for the AI prompt
        const loanDetails = personalLoans
            .map((loan) => {
            const features = loan.features
                ? `Features: Loan Amount (${loan.features.minimumAmount} - ${loan.features.maximumAmount}), Tenure (${loan.features.minimumYear}-${loan.features.maximumYear} years)`
                : '';
            const eligibility = loan.eligibility
                ? `Eligibility: Minimum Income (${loan.eligibility.minimumIncome}), Age Requirement (${loan.eligibility.ageRequirement})`
                : '';
            const fees = loan.feesCharges
                ? `Fees: Processing Fee (${loan.feesCharges.processingFee}), Prepayment Fee (${loan.feesCharges.prepaymentFee})`
                : '';
            return `
      Bank: ${loan.bankName}
      Amount: ${loan.amount}
      Interest Rate: ${loan.interestRate}%
      Monthly EMI: ${loan.monthlyEmi}
      ${features}
      ${eligibility}
      ${fees}
      https://www.finupsbd.com/application  visit this website for more information
      `;
        })
            .join('\n');
        // Construct the AI prompt
        console.log(loanDetails);
        const prompt = `
    You are a professional financial advisor specializing in personal loans at FinupsBD and your name is Reza. Your goal is to provide expert guidance and tailored loan solutions to meet your clients' financial needs. For inquiries, clients can reach you directly at 01531297879. Below is the latest information about the most attractive and flexible personal loan options currently available through FinupsBD.
    ${loanDetails} 

    User Question: ${message}

    Provide a detailed and accurate response. Do not include any additional information make sure every responce should like human. 
  `;
        //   async function main() {
        //     const stream = await openai.chat.completions.create({
        //         model: model,
        //         messages: [{ role: "user", content: prompt }],
        //         store: true,
        //         stream: true,
        //     });
        //     for await (const chunk of stream) {
        //         process.stdout.write(chunk.choices[0]?.delta?.content || "");
        //     }
        // }
        // const result = main()
        // Get a response from OpenAI
        const response = yield openai.chat.completions.create({
            model: model,
            messages: [{ role: 'user', content: prompt }],
        });
        return response.choices[0].message.content;
    });
}
exports.OpenaiServices = {
    interactWithAssistant,
};
