"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const walletSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Types.ObjectId
    },
    wallet: {
        currency_id: mongoose_1.Types.ObjectId,
        code: String,
        Amount: {
            type: String,
            default: 0,
        },
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Wallets", walletSchema);
