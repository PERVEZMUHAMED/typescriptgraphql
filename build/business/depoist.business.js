"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const apollo_server_express_1 = require("apollo-server-express");
const inversify_1 = require("inversify");
const Types_1 = require("../di/Types");
const auditor_model_1 = __importDefault(require("../Model/auditor.model"));
const deposit_model_1 = __importDefault(require("../Model/deposit.model"));
const deposit_repository_1 = __importDefault(require("../repository/deposit.repository"));
let DepositBusiness = class DepositBusiness {
    constructor(_deposit) {
        this._deposit = _deposit;
        this.createDeposit = (args) => __awaiter(this, void 0, void 0, function* () {
            const { user_id, transactionId, Amount, currency, currency_id } = args.input;
            if (!user_id || !transactionId || !Amount || !currency || currency_id) {
                throw new apollo_server_express_1.ApolloError("Please fill all the Fields", "401");
            }
            try {
                const existstransactionId = yield this.deposit.Findone({ transcationId: transactionId }, deposit_model_1.default);
                if (existstransactionId)
                    throw new apollo_server_express_1.ApolloError("TransactionId must be Unique", "401");
                const createdeposit = yield this.deposit.Create(Object.assign({}, args.input), deposit_model_1.default);
                const createAuditor = yield this.deposit.Create({
                    user_id: "",
                    currencY_id: "",
                    currency: "",
                    transactionId: "",
                    preBalance: "",
                    postBalance: "",
                    category: "Deposit"
                }, auditor_model_1.default);
            }
            catch (error) {
            }
        });
        this.deposit = _deposit;
    }
};
DepositBusiness = __decorate([
    __param(0, (0, inversify_1.inject)(Types_1.TYPES.Deposit)),
    __metadata("design:paramtypes", [deposit_repository_1.default])
], DepositBusiness);
