import { Document } from "mongoose";

export interface Currency extends Document {
    currencyName:string
    code:string
}