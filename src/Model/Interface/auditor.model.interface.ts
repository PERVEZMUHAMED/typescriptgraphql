import {Document} from 'mongoose';

export interface Auditor extends Document {
    user_id:string
    currency_id:string
    transactionId:string
    preBalance:number
    postBalance:number
    category:string
}