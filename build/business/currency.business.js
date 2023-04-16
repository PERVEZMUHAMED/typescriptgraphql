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
const currency_model_1 = __importDefault(require("../Model/currency.model"));
const wallet_model_1 = __importDefault(require("../Model/wallet.model"));
const currency_repository_1 = __importDefault(require("../repository/currency.repository"));
let currencyBusiness = class currencyBusiness {
    constructor(_currency) {
        this._currency = _currency;
        this.createCurrency = (args) => __awaiter(this, void 0, void 0, function* () {
            const { currencyName, code } = args.input;
            if (!currencyName || !code) {
                throw new apollo_server_express_1.ApolloError("Please filled all the fields", "401");
            }
            try {
                const existCurrency = yield this.currency.FindOne({ currencyName: currencyName }, currency_model_1.default);
                if (existCurrency)
                    throw new apollo_server_express_1.ApolloError("CurrencyName already exists Try with another");
                const existCode = yield this.currency.FindOne({ code: code }, currency_model_1.default);
                if (existCode)
                    throw new apollo_server_express_1.ApolloError("Code already exists Try with another", "401");
                const updateWallet = yield this.currency.walletUpdate(Object.assign({}, args.input), wallet_model_1.default);
                const createcurrency = yield this.currency.Create(Object.assign({}, args.input), currency_model_1.default);
                console.log("createcurrency", createcurrency);
                return createcurrency;
            }
            catch (error) {
                return error;
            }
        });
        this.currency = this._currency;
    }
};
currencyBusiness = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(Types_1.TYPES.Currency)),
    __metadata("design:paramtypes", [currency_repository_1.default])
], currencyBusiness);
exports.default = currencyBusiness;
