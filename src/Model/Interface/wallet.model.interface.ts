import { Document } from "mongoose";

export default interface Wallet extends Document {
    user_id:string
    wallet:{
        currency_id:string
        currency:string
        Amount:number
    }
}