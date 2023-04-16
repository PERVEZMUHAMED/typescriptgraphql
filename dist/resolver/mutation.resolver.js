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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutationResolver = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const container_di_1 = require("../di/container.di");
exports.mutationResolver = {
    Mutation: {
        createUser: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const register = yield container_di_1.user.Register(args);
                if (!register)
                    throw new apollo_server_express_1.ApolloError("Data Not Found", "401");
                return register;
            }
            catch (error) {
                return error;
            }
        }),
        createCurrency: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const createcurrency = yield container_di_1.currency.createCurrency(args);
                if (!createcurrency)
                    throw new apollo_server_express_1.ApolloError("Data Not Found", "401");
                return createcurrency;
            }
            catch (error) {
                return error;
            }
        }),
        createDeposit: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const createdeposit = yield container_di_1.deposit.createDeposit(args);
                if (!createdeposit)
                    throw new apollo_server_express_1.ApolloError("Data Not Found", "401");
                return createdeposit;
            }
            catch (error) {
                return error;
            }
        }),
        createWithdraw: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const createwithdraw = yield container_di_1.withdraw.createWithdraw(args);
                if (!createwithdraw)
                    throw new apollo_server_express_1.ApolloError("Data Not Found", "401");
                return createwithdraw;
            }
            catch (error) {
                return error;
            }
        })
    }
};
