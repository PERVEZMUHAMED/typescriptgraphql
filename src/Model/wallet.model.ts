import {Schema, model} from "mongoose";
import { Types } from "mongoose";
import Wallet from "./Interface/wallet.model.interface";

let OBjectId = Types.ObjectId;

const walletSchema = new Schema({
    user_id:OBjectId,
    wallet:[
        {
            currency_id:OBjectId,
            currency:String,
            Amount:{
                type:Number,
                default:0
            }
        }
    ]
},{timestamps:true})

export default model<Wallet>("wallets", walletSchema);