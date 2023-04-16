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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_respository_1 = __importDefault(require("../repository/user.respository"));
const user_model_1 = __importDefault(require("../Model/user.model"));
const wallet_model_1 = __importDefault(require("../Model/wallet.model"));
const currency_model_1 = __importDefault(require("../Model/currency.model"));
let UserBusiness = class UserBusiness {
    constructor(_user) {
        this._user = _user;
        this.createUser = (args) => __awaiter(this, void 0, void 0, function* () {
            const { userName, password, email } = args.input;
            if (!userName || !password || !email) {
                throw new apollo_server_express_1.ApolloError("Plese filled all Fields", "401");
            }
            try {
                const hashPassword = yield bcrypt_1.default.hash(password, 7);
                const existsEmail = yield this.user.FindOne({ email: email }, user_model_1.default);
                if (existsEmail)
                    throw new apollo_server_express_1.ApolloError("Email is already exists", "401");
                const createuser = yield this.user.Create(Object.assign(Object.assign({}, args.input), { password: hashPassword }), user_model_1.default);
                const currencyCode = yield this.user.findCurrency(args, currency_model_1.default);
                let code = {};
                let currency = [];
                currencyCode.forEach((items, index, arr) => {
                    code = {};
                    code.currencyCode = currencyCode[index].code;
                    code.currencyCode = currencyCode[index]._id;
                    currency.push(code);
                    console.log("currency", currency);
                });
                console.log("code", code);
                const walletCreate = yield this.user.Create({
                    user_id: createuser._id,
                    wallet: {
                    // currency_id:currency._id,
                    // code:currency.code
                    }
                }, wallet_model_1.default);
                // console.log("walletCreate", walletCreate);
                return createuser;
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
    __param(0, (0, inversify_1.inject)(Types_1.TYPES.User)),
    __metadata("design:paramtypes", [user_respository_1.default])
], UserBusiness);
exports.default = UserBusiness;
