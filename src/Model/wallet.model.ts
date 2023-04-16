import{model, Schema, Types} from 'mongoose';
import { Wallet } from './Interface/wallet.model.interface';

const walletSchema = new Schema({
    user_id:{
        type:Types.ObjectId
    },
    wallet:{
        currency_id:Types.ObjectId,
        code:String,
        Amount:{
            type:String,
            default:0,
        },
    },
},{timestamps:true});

export  default model<Wallet>("Wallets", walletSchema);