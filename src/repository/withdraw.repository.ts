import {injectable } from "inversify";
import "reflect-metadata";
import IWithdrawRepository from "./Interface/withdraw.repository.interface";

@injectable()
class WithdrawRepository implements IWithdrawRepository {
    public Create = async(args, model) =>{
        try {
            const create  = await model.create(args);
            return create;
        } catch (error) {
            return error;
        }
    }
    public FindOne = async(args, model)=>{
        try {
            const findone = await model.findOne(args);
            return findone;
        } catch (error) {
            return error;
        }
    }
    public wallet = async(args, model)=>{
        console.log("argsR", args);
        try {
            const wallet = await model.findOne({user_id:args.input.user_id},
            {wallet:{$elemMatch:{currency:args.input.currency}}});
            console.log("walletR", wallet);
            // console.log("wallletAmount", wallet[0].Amount);
            return wallet;
        } catch (error) {
            return error;
        }
    }
    public walletUpdate = async(args, model)=>{
        try {
            const wallet = await model.updateOne({user_id:args.input.user_id,
                wallet:{$elemMatch:{currency:args.input.currency}}},
            {$inc:{"wallet.$.Amount":-args.input.Amount}});
            console.log("walletupdateR", wallet);
            return wallet;
        } catch (error) {
            return error;
        }
    }
}
export default WithdrawRepository;
