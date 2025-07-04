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
exports.creditCard = void 0;
const app_1 = require("../../../../app");
// type CreditCardQuery = {
//   currency?: string[];
//   network?: string[];
//   type?: string[];
//   sortKey?: string;
//   sortOrder?: 'asc' | 'desc';
//   page?: number;
// };
const creditCard = (payload, query) => __awaiter(void 0, void 0, void 0, function* () {
    // const filter: Record<string, any> = {};
    // if (Array.isArray(currency) && currency.length > 0) {
    //   filter.currency = { in: currency };
    // }
    // if (Array.isArray(cardNetwork) && cardNetwork.length > 0) {
    //   filter.network = { in: cardNetwork };
    // }
    // if (Array.isArray(cardType) && cardType.length > 0) {
    //   filter.type = { in: cardType };
    // }
    try {
        const result = yield app_1.prisma.creditCard.findMany({
            include: {
                eligibilityCreditCard: true,
                featuresCreditCard: true,
                feesChargesCreditCard: true
            }
        });
        console.log(result);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.creditCard = creditCard;
