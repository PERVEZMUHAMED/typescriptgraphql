import { model, Schema, Types } from "mongoose";
import {Auditor} from "./Interface/auditor.model.interface";

const auditorSchema = new Schema({
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
    preBalance:{
        type:String,
        required:[true, "Please Enter preBalance"]
    },
    postBalance:{
        type:Number,
        required:[true, "Please Enter postBalance"],
    },
    category:{
        type:String,
        required:true
    },
},{timestamps:true});

export default model<Auditor>("auditors", auditorSchema);