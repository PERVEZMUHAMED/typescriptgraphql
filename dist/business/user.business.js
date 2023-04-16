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
const inversify_1 = require("inversify");
const TYPES_1 = require("../di/TYPES");
const user_repository_1 = __importDefault(require("../repository/user.repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../Model/user.model"));
const apollo_server_express_1 = require("apollo-server-express");
const wallet_model_1 = __importDefault(require("../Model/wallet.model"));
const currency_model_1 = __importDefault(require("../Model/currency.model"));
let UserBusiness = class UserBusiness {
    constructor(_user) {
        this._user = _user;
        this.Register = (args) => __awaiter(this, void 0, void 0, function* () {
            const { userName, password, email, currency, Amount } = args.input;
            if (!userName || !email || !password) {
                throw new apollo_server_express_1.ApolloError("Please Filled all the fileds", "401");
            }
            try {
                const hashPassword = yield bcrypt_1.default.hash(args.input.password, 7);
                const existuserName = yield this.user.FindOne({ userName: userName }, user_model_1.default);
                if (existuserName)
                    throw new apollo_server_express_1.ApolloError("userName is already Exist.Try with another userName", "401");
                const existEmail = yield this.user.FindOne({ email: email }, user_model_1.default);
                if (existEmail)
                    throw new apollo_server_express_1.ApolloError("Email is already Exist.Try with another", "401");
                const register = yield this.user.Create(Object.assign(Object.assign({}, args.input), { password: hashPassword }), user_model_1.default);
                const currencyCode = yield this.user.currency({ args }, currency_model_1.default);
                console.log("currencyCode", currencyCode);
                let currA = [];
                let currO = {};
                currencyCode.forEach((items, index, arr) => {
                    currO = {};
                    currO.currency_id = currencyCode[index]._id;
                    currO.currency = currencyCode[index].code;
                    currA.push(currO);
                });
                console.log("currA", currA);
                const createWallet = yield this.user.Create({
                    user_id: register._id,
                    wallet: currA
                }, wallet_model_1.default);
                console.log("createWallet", createWallet.wallet);
                return register;
            }
            catch (error) {
                return error;
            }
        });
        this.user = _user;
    }
};
UserBusiness = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(TYPES_1.TYPES.User)),
    __metadata("design:paramtypes", [user_repository_1.default])
], UserBusiness);
exports.default = UserBusiness;
