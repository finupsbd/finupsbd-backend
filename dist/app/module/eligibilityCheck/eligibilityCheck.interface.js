"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardType = exports.ExistingLoanType = exports.VehicleType = exports.BusinessOwnerType = exports.Profession = exports.EGender = exports.MainLoanType = void 0;
/* eslint-disable no-unused-vars */
// Enums
var MainLoanType;
(function (MainLoanType) {
    MainLoanType["PERSONAL_LOAN"] = "PERSONAL_LOAN";
    MainLoanType["HOME_LOAN"] = "HOME_LOAN";
    MainLoanType["CAR_LOAN"] = "CAR_LOAN";
    MainLoanType["SME_LOAN"] = "SME_LOAN";
    MainLoanType["INSTANT_LOAN"] = "INSTANT_LOAN";
})(MainLoanType || (exports.MainLoanType = MainLoanType = {}));
var EGender;
(function (EGender) {
    EGender["MALE"] = "MALE";
    EGender["FEMALE"] = "FEMALE";
    EGender["OTHER"] = "OTHER";
})(EGender || (exports.EGender = EGender = {}));
var Profession;
(function (Profession) {
    Profession["BUSINESS_OWNER"] = "BUSINESS_OWNER";
    Profession["SALARIED"] = "SALARIED";
    Profession["SELF_EMPLOYED"] = "SELF_EMPLOYED";
})(Profession || (exports.Profession = Profession = {}));
var BusinessOwnerType;
(function (BusinessOwnerType) {
    BusinessOwnerType["PROPRIETORSHIP"] = "PROPRIETORSHIP";
    BusinessOwnerType["PARTNERSHIP"] = "PARTNERSHIP";
    BusinessOwnerType["PUBLIC_LIMITED_COMPANY"] = "PUBLIC_LIMITED_COMPANY";
})(BusinessOwnerType || (exports.BusinessOwnerType = BusinessOwnerType = {}));
var VehicleType;
(function (VehicleType) {
    VehicleType["CAR_SEDAN"] = "CAR_SEDAN";
    VehicleType["CAR_SUV"] = "CAR_SUV";
    VehicleType["CAR_HATCHBACK"] = "CAR_HATCHBACK";
    VehicleType["BIKE"] = "BIKE";
})(VehicleType || (exports.VehicleType = VehicleType = {}));
var ExistingLoanType;
(function (ExistingLoanType) {
    ExistingLoanType["HOME_LOAN"] = "HOME_LOAN";
    ExistingLoanType["PERSONAL_LOAN"] = "PERSONAL_LOAN";
    ExistingLoanType["CAR_LOAN"] = "CAR_LOAN";
    ExistingLoanType["SME_LOAN"] = "SME_LOAN";
    ExistingLoanType["CREDIT_CARD"] = "CREDIT_CARD";
    ExistingLoanType["OTHER"] = "OTHER";
})(ExistingLoanType || (exports.ExistingLoanType = ExistingLoanType = {}));
var CardType;
(function (CardType) {
    CardType["CREDIT_CARD"] = "CREDIT_CARD";
    CardType["DEBIT_CARD"] = "DEBIT_CARD";
})(CardType || (exports.CardType = CardType = {}));
