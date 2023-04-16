import { Document } from "mongoose";

export interface Withdraw extends Document {
    user_id:number
    currency_id:number
    transactionId:string
    currency:string
    Amount:string
}    