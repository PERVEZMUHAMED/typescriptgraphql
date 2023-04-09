import {Schema, model} from "mongoose";
import { Types } from "mongoose";
import Auditor from "./Interface/auditor.model.interface";
let OBjectId = Types.ObjectId;

const withdrawSchema = new Schema ({
    user_id:OBjectId,
    currency_id:OBjectId,
    transactionId:{
        type:String,
        required:[true, "Please enter the TransactionId"],
    },
    currency:{
        type:String,
        required:[true,"Please Enter Currency"],
    },
    Amount:{
        type:Number,
        default:0
    },
},{timestamps:true});

export default model<Auditor>("withdraws",withdrawSchema);