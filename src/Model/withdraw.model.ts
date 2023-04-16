import { model, Schema, Types } from "mongoose";
import { Withdraw } from "./Interface/withdraw.interface";

const withdrawSchema = new Schema({
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
        required:[true, "Please Enter Currency Name"]
    },
    Amount:{
        type:Number,
        required:[true, "Please Enter Amount"],
    }
},{timestamps:true});

export default model<Withdraw>("withdraws", withdrawSchema);