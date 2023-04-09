import { ApolloError } from "apollo-server-express";
import {inject, injectable} from "inversify";
import { TYPES } from "../di/TYPES";
import currencyModel from "../Model/currency.model";
import walletModel from "../Model/wallet.model";
import CurrencyRepository from "../repository/currency.repository";
import ICurrencyBusiness from "./Interface/currency.business.interface";

@injectable()
class CurrencyBusiness implements ICurrencyBusiness {
    private currency: CurrencyRepository;
    constructor(
        @inject(TYPES.Currency) public _currency:CurrencyRepository
    ) {
        this.currency = _currency;
    }
    public createCurrency = async(args)=>{
        const {currencyName, code} = args.input;
        if(!currencyName||!code){
            throw new ApolloError("Please, filled all the fields", "401");
        }
        try {
            const existCurrencyName = await this.currency.FindOne(
            {currencyName:currencyName}, currencyModel);
            if(existCurrencyName) throw new ApolloError(
            "CurrencyName already Exists", "401");
            const existCode = await this.currency.FindOne(
            {code:code}, currencyModel);
            if(existCode) throw new ApolloError("Code already Exists", "401");
            const currency = await this.currency.updateMany(args, walletModel);
            // {"wallet.currency":{$ne:args.input.code}}, walletModel);
            console.log("currency", currency);
            const createcurrency = await this.currency.Create({...args.input}, currencyModel);
            return createcurrency; 
        } catch (error) {
            return error;
        }
    }
}

export default CurrencyBusiness;