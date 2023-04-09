import {Schema, model} from "mongoose";
import { Types } from "mongoose";
import Auditor from "./Interface/auditor.model.interface";
let OBjectId = Types.ObjectId;

const auditorSchema = new Schema ({
    user_id:OBjectId,
    currency_id:OBjectId,
    transactionId:{
        type:String,
        required:[true, "Please enter the TransactionId"],
    },
    preBalance:{
        type:Number,
        required:[true,"Please Enter PreBalance"]
    },
    postBalance:{
        type:Number,
        required:[true,"Please Enter PreBalance"]
    },
    category:{
        type:String,
        required:[true,"Please Enter Category"]
    }
},{timestamps:true});

export default model<Auditor>("auditors",auditorSchema)