"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const auditorSchema = new mongoose_1.Schema({
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
    preBalance: {
        type: String,
        required: [true, "Please Enter preBalance"]
    },
    postBalance: {
        type: Number,
        required: [true, "Please Enter postBalance"],
    },
    category: {
        type: String,
        required: true
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("auditors", auditorSchema);
