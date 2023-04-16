"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const currencySchema = new mongoose_1.Schema({
    currencyName: {
        type: String,
        required: [true, "Please, enter currencyName"],
        trim: true
    },
    code: {
        type: String,
        required: [true, "Please, enter currency code"],
        trim: true
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("currencys", currencySchema);
