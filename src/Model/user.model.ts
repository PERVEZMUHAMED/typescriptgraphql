import {Schema, model} from 'mongoose';
import User from './Interface/user.model.interface';

const userSchema = new Schema({
    userName:{
        type:String,
        required:[true, "Please enter UserName"],
        trim:true,
    },
    email:{
        type:String,
        required:[true, "Please enter Email"],
        trim:true,
    },
    password:{
        type:String,
        required:[true, "Please enter Password"],
    },
    personalDetails:{
        gender:String,
        age:Number,
    }

},{timestamps:true});

export default model<User>("Users", userSchema);

