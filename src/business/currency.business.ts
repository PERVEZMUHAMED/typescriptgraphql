import { ApolloError } from "apollo-server-express";
import {injectable, inject} from "inversify";
import { TYPES } from "../di/Types";
import currencyModel from "../Model/currency.model";
import userModel from "../Model/user.model";
import walletModel from "../Model/wallet.model";
import CurrencyRepository from "../repository/currency.repository";
import IcurrencyBusiness from "./Interface/currency.business.interface";

@injectable()
class currencyBusiness implements IcurrencyBusiness {
    private currency:CurrencyRepository
    constructor(
        @inject(TYPES.Currency) public _currency:CurrencyRepository
    ) {
        this.currency = this._currency;
    }
    public createCurrency = async(args)=>{
        const {currencyName, code} = args.input;
        if(!currencyName||!code) {
            throw new ApolloError("Please filled all the fields", "401");
        }
        try {
            const existCurrency = await this.currency.FindOne({currencyName:currencyName},currencyModel)
            if(existCurrency) throw new ApolloError("CurrencyName already exists Try with another");
            const existCode = await this.currency.FindOne({code:code},currencyModel);
            if(existCode) throw new ApolloError("Code already exists Try with another", "401");
            const updateWallet = await this.currency.walletUpdate({...args.input}, walletModel)
            const createcurrency = await this.currency.Create({...args.input}, currencyModel);
            console.log("createcurrency", createcurrency);
            return createcurrency;
        } catch (error) {
            return error;
        }
    }
}

export default currencyBusiness;