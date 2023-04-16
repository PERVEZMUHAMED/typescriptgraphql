"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
let OBjectId = mongoose_2.Types.ObjectId;
const auditorSchema = new mongoose_1.Schema({
    user_id: OBjectId,
    currency_id: OBjectId,
    transactionId: {
        type: String,
        required: [true, "Please enter the TransactionId"],
    },
    preBalance: {
        type: Number,
        required: [true, "Please Enter PreBalance"]
    },
    postBalance: {
        type: Number,
        required: [true, "Please Enter PreBalance"]
    },
    category: {
        type: String,
        required: [true, "Please Enter Category"]
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("auditors", auditorSchema);
