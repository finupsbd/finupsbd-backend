"use strict";
/* eslint-disable no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanType = exports.LoanStatus = exports.OwnershipStatus = exports.ResidentialStatus = exports.Religion = exports.EduLavel = exports.MaritalStatus = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
    Gender["OTHER"] = "OTHER";
})(Gender || (exports.Gender = Gender = {}));
var MaritalStatus;
(function (MaritalStatus) {
    MaritalStatus["SINGLE"] = "SINGLE";
    MaritalStatus["MARRIED"] = "MARRIED";
    MaritalStatus["DIVORCED"] = "DIVORCED";
    MaritalStatus["WIDOWED"] = "WIDOWED";
})(MaritalStatus || (exports.MaritalStatus = MaritalStatus = {}));
var EduLavel;
(function (EduLavel) {
    EduLavel["BELOW_SSC"] = "BELOW_SSC";
    EduLavel["SSC"] = "SSC";
    EduLavel["HSC"] = "HSC";
    EduLavel["GRADUATE"] = "GRADUATE";
    EduLavel["POST_GRADUATE"] = "POST_GRADUATE";
    EduLavel["PHD"] = "PHD";
    EduLavel["OTHER_EDUCATION"] = "OTHER_EDUCATION";
})(EduLavel || (exports.EduLavel = EduLavel = {}));
var Religion;
(function (Religion) {
    Religion["ISLAM"] = "ISLAM";
    Religion["HINDUISM"] = "HINDUISM";
    Religion["CHRISTIANITY"] = "CHRISTIANITY";
    Religion["BUDDHISM"] = "BUDDHISM";
    Religion["OTHER"] = "OTHER";
})(Religion || (exports.Religion = Religion = {}));
var ResidentialStatus;
(function (ResidentialStatus) {
    ResidentialStatus["RESIDENT"] = "RESIDENT";
    ResidentialStatus["NONRESIDENT"] = "NONRESIDENT";
    ResidentialStatus["TEMPORARYRESIDENT"] = "TEMPORARYRESIDENT";
})(ResidentialStatus || (exports.ResidentialStatus = ResidentialStatus = {}));
var OwnershipStatus;
(function (OwnershipStatus) {
    OwnershipStatus["RENTED"] = "RENTED";
    OwnershipStatus["FAMILY_OWNED"] = "FAMILY_OWNED";
    OwnershipStatus["COMPANY_PROVIDED"] = "COMPANY_PROVIDED";
})(OwnershipStatus || (exports.OwnershipStatus = OwnershipStatus = {}));
var LoanStatus;
(function (LoanStatus) {
    LoanStatus["SUBMITTED"] = "SUBMITTED";
    LoanStatus["PENDING"] = "PENDING";
    LoanStatus["IN_PROGRESS"] = "IN_PROGRESS";
    LoanStatus["APPROVED"] = "APPROVED";
    LoanStatus["REJECTED"] = "REJECTED";
    LoanStatus["COMPLETED"] = "COMPLETED";
})(LoanStatus || (exports.LoanStatus = LoanStatus = {}));
var LoanType;
(function (LoanType) {
    LoanType["PERSONAL_LOAN"] = "PERSONAL_LOAN";
    LoanType["HOME_LOAN"] = "HOME_LOAN";
    LoanType["CAR_LOAN"] = "CAR_LOAN";
    LoanType["SME_LOAN"] = "SME_LOAN";
    LoanType["INSTANT_LOAN"] = "INSTANT_LOAN";
})(LoanType || (exports.LoanType = LoanType = {}));
