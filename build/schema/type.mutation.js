"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const Mutation = (0, apollo_server_express_1.gql) `
    extend type Mutation {
        Register(input:userInput):User
    }
`;
exports.default = Mutation;
// createCurrency(input:currencyInput):Currency
// createDeposit(input:depositInput):Deposit
// createWithdraw(input:withdrawInput):Withdraw
