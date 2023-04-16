"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const depositSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Types.ObjectId
    },
    currency_id: {
        type: mongoose_1.Types.ObjectId
    },
    transcationId: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: [true, "Please Enter CurrencyName"]
    },
    Amount: {
        type: Number,
        required: [true, "Please Enter Amount"],
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("deposits", depositSchema);