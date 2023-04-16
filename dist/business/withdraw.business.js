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
const TYPES_1 = require("../di/TYPES");
const auditor_model_1 = __importDefault(require("../Model/auditor.model"));
const currency_model_1 = __importDefault(require("../Model/currency.model"));
const wallet_model_1 = __importDefault(require("../Model/wallet.model"));
const withdraw_model_1 = __importDefault(require("../Model/withdraw.model"));
const withdraw_repository_1 = __importDefault(require("../repository/withdraw.repository"));
let WithdrawBusiness = class WithdrawBusiness {
    constructor(_withdraw) {
        this.createWithdraw = (args) => __awaiter(this, void 0, void 0, function* () {
            const { user_id, transactionId, Amount, currency } = args.input;
            if (!user_id || !transactionId || !Amount || !currency) {
                throw new apollo_server_express_1.ApolloError("Please filled all the fileds", "401");
            }
            try {
                const existTransactionId = yield this.withdraw.FindOne({ transactionId: transactionId }, withdraw_model_1.default);
                if (existTransactionId)
                    throw new apollo_server_express_1.ApolloError("TransactionId Must be unique", "401");
                const currencyCode = yield this.withdraw.FindOne({ code: currency }, currency_model_1.default);
                const walletPre = yield this.withdraw.wallet(args, wallet_model_1.default);
                // Create withdraw
                const createwithdraw = yield this.withdraw.Create({
                    user_id: user_id,
                    currency_id: currencyCode._id,
                    transactionId: transactionId,
                    currency: currency,
                    Amount: Amount,
                }, withdraw_model_1.default);
                const walletUpdate = yield this.withdraw.walletUpdate(args, wallet_model_1.default);
                const walletPost = yield this.withdraw.wallet(args, wallet_model_1.default);
                // create Auditor  
                const createAuditor = yield this.withdraw.Create({
                    user_id: user_id,
                    currency_id: createwithdraw.currency_id,
                    transactionId: createwithdraw.transactionId,
                    preBalance: walletPre.wallet[0].Amount,
                    postBalance: walletPost.wallet[0].Amount,
                    category: "Withdraw"
                }, auditor_model_1.default);
                return createwithdraw;
            }
            catch (error) {
                return error;
            }
        });
        this.withdraw = _withdraw;
    }
};
WithdrawBusiness = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(TYPES_1.TYPES.Withdraw)),
    __metadata("design:paramtypes", [withdraw_repository_1.default])
], WithdrawBusiness);
exports.default = WithdrawBusiness;
