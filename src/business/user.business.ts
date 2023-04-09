import { inject, injectable } from "inversify";
import { TYPES } from "../di/TYPES";
import UserRepository from "../repository/user.repository";
import IUserBusiness from "./Interface/user.business.interface";
import bcrypt from 'bcrypt';
import userModel from "../Model/user.model";
import { ApolloError } from "apollo-server-express";
import walletModel from "../Model/wallet.model";
import currencyModel from "../Model/currency.model";

@injectable()
class UserBusiness implements IUserBusiness {

    private user:UserRepository
    constructor(
        @inject(TYPES.User) public _user:UserRepository
    ) {
        this.user = _user;
    }
    public Register = async(args)=>{
        const {userName, password, email, currency, Amount} = args.input;
        if(!userName||!email||!password){
            throw new ApolloError("Please Filled all the fileds","401");
        }
        try {
            const hashPassword = await bcrypt.hash(args.input.password, 7);
            const existuserName = await this.user.FindOne({userName:userName},userModel);
            if(existuserName) throw new ApolloError("userName is already Exist.Try with another userName","401");
            const existEmail = await this.user.FindOne({email:email},userModel);
            if(existEmail) throw new ApolloError("Email is already Exist.Try with another","401");
            const register = await this.user.Create(
            {...args.input, password:hashPassword}, userModel);
            const currencyCode = await this.user.currency({args},currencyModel);
            console.log("currencyCode",currencyCode);
            let currA = [];
            let currO :any= {};
            currencyCode.forEach((items, index, arr)=>{
                currO = {};
                currO.currency_id = currencyCode[index]._id;
                currO.currency = currencyCode[index].code;
                currA.push(currO);
            })
            console.log("currA", currA);
            
            const createWallet = await this.user.Create({
                user_id:register._id,
                wallet:currA
            }, walletModel);
            console.log("createWallet", createWallet.wallet);
            return register;    
        } catch (error) {
            return error;
        }    
    }
}

export default UserBusiness;