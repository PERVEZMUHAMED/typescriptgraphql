import { injectable } from "inversify";
import "reflect-metadata";
import ICurrencyRepository from "./Interface/currency.repository.interface";

@injectable()
class CurrencyRepository implements ICurrencyRepository {

    public Create = async(args, model)=>{
        try {
            const create = await model.create(args);
            return create;
        } catch (error) {
            return error
        }
    }
    public FindOne = async (args, model)=>{
        try {
            const findOne = await model.findOne(args);
            return findOne;
        } catch (error) {
            return error;
        }
    }
    public updateMany = async (args, model)=>{
        console.log("args", args.input);
        try {
            const updatemany = await model.updateMany(
            {"wallet.currency":{$ne:args.input.code}},
            {$push:{wallet:{currency:args.input.code}}});
            console.log("updatemany", updatemany);
            return updatemany;
        } catch (error) {
            return error;
        }
    }
}

export default CurrencyRepository;