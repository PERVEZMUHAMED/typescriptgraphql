import { ApolloError } from 'apollo-server-express';
import {injectable, inject} from 'inversify';
import {TYPES} from "../di/Types";
import bcrypt from 'bcrypt';
import UserRepository from '../repository/user.respository';
import userModel from '../Model/user.model';
import walletModel from '../Model/wallet.model';
import currencyModel from '../Model/currency.model';
import Iuserbusiness from './Interface/user.business.interface';

@injectable()
class UserBusiness implements Iuserbusiness {
    private user:UserRepository;
    constructor(
        @inject(TYPES.User) public _user: UserRepository,
    ) {
        this.user = _user;
    }
    public createUser= async(args)=>{
        const {userName, password , email} = args.input;
        if(!userName||!password||!email) {
            throw new ApolloError("Plese filled all Fields", "401");
        }
        try {
            const hashPassword = await bcrypt.hash(password, 7);
            const existsEmail = await this.user.FindOne({email:email}, userModel);
            if(existsEmail) throw new ApolloError("Email is already exists", "401");
            const createuser = await this.user.Create(
            {...args.input, password:hashPassword}, userModel);
            const currencyCode = await this.user.findCurrency(args, currencyModel);
            let code:any = {};
            let currency:any = [];
            currencyCode.forEach((items, index, arr)=>{
                code = {};
                code.currencyCode = currencyCode[index].code;
                code.currencyCode = currencyCode[index]._id;
                currency.push(code);
                console.log("currency", currency)
            })
            console.log("code", code);
            const walletCreate = await this.user.Create(
            {
                user_id:createuser._id,
                wallet:{
                    // currency_id:currency._id,
                    // code:currency.code
                }
            }, walletModel);
            // console.log("walletCreate", walletCreate);
            return createuser;
        } catch (error) {
            return error;
        }    
    }
}

export default UserBusiness;