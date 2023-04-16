import { model, Schema, Types } from "mongoose";
import {Deposit} from "./Interface/depositmodel.interface";

const depositSchema = new Schema({
    user_id:{
        type:Types.ObjectId
    },
    currency_id:{
        type:Types.ObjectId
    },
    transcationId:{
        type:String,
        required:true
    },
    currency:{
        type:String,
        required:[true, "Please Enter CurrencyName"]
    },
    Amount:{
        type:Number,
        required:[true, "Please Enter Amount"],
    },
},{timestamps:true});

export default model<Deposit>("deposits", depositSchema);