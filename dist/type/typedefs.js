"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
    type User {
        _id:ID!
        userName:String
        email:String
        password:String
        personalDetails:details
        userAuditorDetails:[Auditor]
        walletDetails:[Wallet]
        depositDetails:[Deposit]
        withdrawDetails:[Withdraw]
    }
    type Wallet {
        _id:ID!
        user_id:String
        wallet:[walletdetails]
    }
    type walletdetails {
        curreny_id:String
        currency:String
        Amount:String
    }
    type Auditor {
        _id:ID!
        user_id:String
        currency_id:String
        transactionId:String
        preBalance:Int
        postBalance:Int
        category:String
    }
    type details {
        gender:String
        age:Int
    }
    input userInput {
        _id:ID
        userName:String
        email:String
        password:String
        personalDetails:detailsInput
    }
    input detailsInput {
        gender:String
        age:Int
    }
    type Currency {
        _id:ID!
        currencyName:String
        code:String
    }
    input currencyInput {
        _id:ID
        currencyName:String
        code:String
    }
    type Deposit {
        _id:ID!
        user_id:String
        currency_id:String
        transactionId:String
        currency:String
        Amount:Int
    }
    input depositInput {
        _id:ID
        user_id:String
        currency_id:String
        transactionId:String
        currency:String
        Amount:Int
    }
    type Withdraw {
        _id:ID!
        user_id:String
        currency_id:String
        transactionId:String
        currency:String
        Amount:Int
    }  
    input withdrawInput {
        _id:ID
        user_id:String
        currency_id:String
        transactionId:String
        currency:String
        Amount:Int
    }
    type Query {
        getUser(_id:ID!):User
        getUserAuditorDetails(_id:ID!):[User]
        getSpecificUserAuditorDetailsFDTD(_id:ID!, FromDate:String, ToDate:String):[User]
        getSpecificUserAllDetails(_id:ID!):[User]
    }
    type Mutation {
        createUser(input:userInput):User
        createCurrency(input:currencyInput):Currency
        createDeposit(input:depositInput):Deposit
        createWithdraw(input:withdrawInput):Withdraw
    }
`;
