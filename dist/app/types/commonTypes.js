"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blacklistedTokens = void 0;
/* eslint-disable no-unused-vars */
exports.blacklistedTokens = new Set();
var LoanType;
(function (LoanType) {
    LoanType["PERSONAL_LOAN"] = "PERSONAL_LOAN";
    LoanType["HOME_LOAN"] = "HOME_LOAN";
    LoanType["CAR_LOAN"] = "CAR_LOAN";
    LoanType["SME_LOAN"] = "SME_LOAN";
    LoanType["INSTANT_LOAN"] = "INSTANT_LOAN";
})(LoanType || (LoanType = {}));
