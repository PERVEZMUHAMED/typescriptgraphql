"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
let WithdrawRepository = class WithdrawRepository {
    constructor() {
        this.Create = (args, model) => __awaiter(this, void 0, void 0, function* () {
            try {
                const create = yield model.create(args);
                return create;
            }
            catch (error) {
                return error;
            }
        });
        this.FindOne = (args, model) => __awaiter(this, void 0, void 0, function* () {
            try {
                const findone = yield model.findOne(args);
                return findone;
            }
            catch (error) {
                return error;
            }
        });
        this.wallet = (args, model) => __awaiter(this, void 0, void 0, function* () {
            console.log("argsR", args);
            try {
                const wallet = yield model.findOne({ user_id: args.input.user_id }, { wallet: { $elemMatch: { currency: args.input.currency } } });
                console.log("walletR", wallet);
                // console.log("wallletAmount", wallet[0].Amount);
                return wallet;
            }
            catch (error) {
                return error;
            }
        });
        this.walletUpdate = (args, model) => __awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = yield model.updateOne({ user_id: args.input.user_id,
                    wallet: { $elemMatch: { currency: args.input.currency } } }, { $inc: { "wallet.$.Amount": -args.input.Amount } });
                console.log("walletupdateR", wallet);
                return wallet;
            }
            catch (error) {
                return error;
            }
        });
    }
};
WithdrawRepository = __decorate([
    (0, inversify_1.injectable)()
], WithdrawRepository);
exports.default = WithdrawRepository;
