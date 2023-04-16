import { model, Schema, Types } from "mongoose";
import { Currency } from "./Interface/currency.model.interface";

const currencySchema = new Schema({
    currencyName:{
        type:String,
        required:[true, "Please, enter currencyName"],
        trim:true
    },
    code:{
        type:String,
        required:[true, "Please, enter currency code"],
        trim:true
    },
},{timestamps:true})

export default model<Currency>("currencys", currencySchema);