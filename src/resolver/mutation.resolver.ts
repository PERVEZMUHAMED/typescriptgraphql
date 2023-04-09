import { ApolloError } from "apollo-server-express";
import { currency, deposit, user, withdraw } from "../di/container.di"


export const mutationResolver = {
    Mutation:{
        createUser: async(parent, args, context)=>{
            try {
                const register = await user.Register(args);
                if(!register) throw new ApolloError("Data Not Found", "401");
                return register;
            } catch (error) {
                return error;
            }
        },
        createCurrency: async(parent, args, context)=>{
            try {
                const createcurrency = await currency.createCurrency(args);
                if(!createcurrency) throw new ApolloError("Data Not Found", "401");
                return createcurrency;
            } catch (error) {
                return error;
            }
        },
        createDeposit: async(parent, args, context)=>{
            try {
                const createdeposit = await deposit.createDeposit(args);
                if(!createdeposit) throw new ApolloError("Data Not Found", "401");
                return createdeposit;
            } catch (error) {
                return error;
            }
        },
        createWithdraw: async(parent, args, context)=>{
            try {
                const createwithdraw = await withdraw.createWithdraw(args);
                if(!createwithdraw) throw new ApolloError("Data Not Found", "401");
                return createwithdraw;
            } catch (error) {
                return error;
            }
        }            
    }
}