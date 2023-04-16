import{Schema, model} from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { User } from './Interface/user.model.interface';
const userSchema = new Schema({
    userName:{
        type:String,
        required:[true, "Please Enter Name"],
        trim:true
    },
    password:{
        type:String,
        required:[true, "Please Enter Name"],
    },
    email:{
        type:String,
        required:[true, "Please Enter Name"],
        validate:{
            validator: isEmail, 
            message: "Email is invalid"},
    },
    personaldetails:{
        gender:{
            type:String,
            required:[true, "Please Enter Gender"],
        },
        age:{
            type:Number,
            required:[true, "Please enter Age"]
        }
    }
});

export default model<User>("users", userSchema);
