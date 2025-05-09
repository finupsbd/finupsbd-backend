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
exports.ApplicationRouter = void 0;
const app_1 = require("./../../../app");
const express_1 = __importDefault(require("express"));
const applicationForm_controller_1 = require("./applicationForm.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const applicationForm_validation_1 = require("./applicationForm.validation");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const route = express_1.default.Router();
route.get('/', (0, auth_1.default)('USER', 'SUPER_ADMIN', 'ADMIN'), applicationForm_controller_1.ApplicationController.getSingleApplication);
route.post('/', (0, auth_1.default)('USER', 'SUPER_ADMIN', 'ADMIN'), (0, validateRequest_1.default)(applicationForm_validation_1.ApplicationValidationSchema.CreateApplicationValidationSchema), applicationForm_controller_1.ApplicationController.createApplicationForm);
route.patch('/update-status/:id', (0, auth_1.default)('SUPER_ADMIN', 'ADMIN'), (0, validateRequest_1.default)(applicationForm_validation_1.ApplicationValidationSchema.ApplicationStatusUpdateValidation), applicationForm_controller_1.ApplicationController.statusUpdate);
route.get('/', applicationForm_controller_1.ApplicationController.getAllApplicationForm);
route.post('/application-tracking', applicationForm_controller_1.ApplicationController.applicationTracking);
// route.post('/application-forget', ApplicationController.applicationForget)
/////test
route.post('/step1', (0, auth_1.default)("USER", "SUPER_ADMIN"), (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    console.log(userId);
    const result = yield app_1.prisma.testApplication.create({
        data: {
            user: { connect: { id: userId } }, // you must have userId
            TestBasicInfo: {
                create: Object.assign({}, req.body),
            },
        },
    });
    console.log({ result });
    res.json({
        status: 'success',
        message: 'Application created successfully',
        data: result,
    });
})));
route.post('/step2/:id', (0, auth_1.default)("USER", "SUPER_ADMIN"), (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield app_1.prisma.testContactInfo.create({
        data: Object.assign(Object.assign({}, req.body), { testApplication: { connect: { id } } })
    });
    console.log({ result });
    res.json({
        status: 'success',
        message: 'Application created successfully',
        data: result,
    });
})));
route.post('/step3/:id', (0, auth_1.default)("USER", "SUPER_ADMIN"), (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { id } = req.params;
    console.log(userId);
    const result = yield app_1.prisma.testProfession.create({
        data: Object.assign(Object.assign({}, req.body), { testApplication: { connect: { id } } })
    });
    console.log({ result });
    res.json({
        status: 'success',
        message: 'Application created successfully',
        data: result,
    });
})));
route.get('/test/:id', (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield app_1.prisma.testApplication.findUnique({
        where: {
            id: id,
        },
        include: {
            TestBasicInfo: {
                select: {
                    name: true,
                    age: true,
                    dob: true,
                }
            },
            TestContactInfo: {
                select: {
                    email: true,
                    phone: true,
                }
            },
            testProfession: {
                select: {
                    profession: true,
                    monthlyIncome: true,
                }
            },
            user: true,
        }
    });
    console.log({ result });
    res.json({
        status: 'success',
        message: 'Application created successfully',
        data: result,
    });
})));
exports.ApplicationRouter = route;
