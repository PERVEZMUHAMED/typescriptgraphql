"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: [true, "Please enter UserName"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter Email"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please enter Password"],
    },
    personalDetails: {
        gender: String,
        age: Number,
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Users", userSchema);
