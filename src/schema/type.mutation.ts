import { gql } from "apollo-server-express";
import typeDefs from "./typedefs";

const Mutation = gql`
    extend type Mutation {
        Register(input:userInput):User
    }
`;
export default Mutation;
    // createCurrency(input:currencyInput):Currency
    // createDeposit(input:depositInput):Deposit
    // createWithdraw(input:withdrawInput):Withdraw