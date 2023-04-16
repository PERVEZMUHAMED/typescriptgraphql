import { Document } from "mongoose";

export interface Deposit extends Document {
    user_id:number
    currency_id:number
    transactionId:string
    currency:string
    Amount:string
}    