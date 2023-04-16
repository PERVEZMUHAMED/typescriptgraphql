"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
let OBjectId = mongoose_2.Types.ObjectId;
const withdrawSchema = new mongoose_1.Schema({
    user_id: OBjectId,
    currency_id: OBjectId,
    transactionId: {
        type: String,
        required: [true, "Please enter the TransactionId"],
    },
    currency: {
        type: String,
        required: [true, "Please Enter Currency"],
    },
    Amount: {
        type: Number,
        default: 0
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("withdraws", withdrawSchema);
