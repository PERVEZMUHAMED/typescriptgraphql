import { injectable, inject } from "inversify";
import { IcurrencyRepository } from "./Interface/currency.repository.interface";

@injectable()
class currencyRepository implements IcurrencyRepository {
    public Create = async(args, model)=>{
        console.log("argss", args);
        try {
            const create = await model.create(args);
            return create;
        } catch (error) {
            return error
        }
    }
    public FindOne = async(args, model)=>{
        // console.log("argss", args);
        try {
            const findOne= await model.findOne(args);
            return findOne;
        } catch (error) {
            return error
        }
    }
    public walletUpdate = async(args, model)=>{
        console.log("walletUpdate", args);
        try {
            const walletUpdate = await model.updateMany({$ne:{wallet:{currency:args.input.code}}});
            return walletUpdate;
        } catch (error) {
            return error;
        }
    }
}
export default currencyRepository;