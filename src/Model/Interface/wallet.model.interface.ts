import { Document } from "mongoose";

export interface Wallet extends Document {
    user_id:string
    wallet:{
        currency_id:string
        code:string
        Amount:number
    }
}