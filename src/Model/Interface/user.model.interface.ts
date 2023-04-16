import { Document } from "mongoose";

export interface  User extends Document {
    userName:String
    password:string
    email:string
    personaldetails:{
        gender:string
        age:number
    }
}