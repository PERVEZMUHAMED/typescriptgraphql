import {Schema, model} from "mongoose";
import Currency from "./Interface/currency.model.interface";

const currencySchema = new Schema ({
    currencyName:{
        type:String,
        required:[true,"Please Enter CurrencyName"],
    },
    code:{
        type:String,
        required:[true,"Please Enter Code"],
    },
},{timestamps:true});

export default model<Currency>("Currencys", currencySchema);