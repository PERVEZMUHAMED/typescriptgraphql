"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: [true, "Please Enter Name"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please Enter Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Name"],
        validate: {
            validator: isEmail_1.default,
            message: "Email is invalid"
        },
    },
    personaldetails: {
        gender: {
            type: String,
            required: [true, "Please Enter Gender"],
        },
        age: {
            type: Number,
            required: [true, "Please enter Age"]
        }
    }
});
exports.default = (0, mongoose_1.model)("users", userSchema);
