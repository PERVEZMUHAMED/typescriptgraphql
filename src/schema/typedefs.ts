import {gql} from 'apollo-server-express';

const typeDefs = gql`
    type User {
        _id:ID!
        userName:String
        email:String
        password:String
        personaldetails:personalDetails
    }
    type personalDetails {
        gender:String
        age:Int
    }
    type Wallet {
        user_id:ID!
        wallet:walletDetails
    }
    type walletDetails {
        currency_id:ID!
        code:String
        Amount:Int
    }
    type Currency {
        _id:ID!
        currencyName:String
        code:String
    }
    input currencyInput {
        currencyName:String
        code:String
    }
    input userInput {
        userName:String
        password:String
        email:String
        personaldetails:detailsInput
    } 
    input detailsInput {
        gender:String
        age:Int
    }
    type Query {
        getUser:[User]
    }
    type Mutation {
        Register(input:userInput):User
        createCurrency(input:currencyInput):Currency
    }
`;
export default typeDefs;
    // createDeposit(input:depositInput):Deposit
    // createWithdraw(input:withdrawInput):Withdraw