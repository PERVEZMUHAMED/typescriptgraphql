"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { MONGODB_URL } = process.env;
class DatabaseConnection {
    initialiseDatabaseConnection() {
        mongoose_1.default.set("strictQuery", false);
        mongoose_1.default.connect(MONGODB_URL)
            .then(con => {
            console.log(`Db is Connected in ${con.connection.host}`);
        })
            .catch((error) => {
            console.log(`Db is not Connected ${error}`);
        });
    }
}
exports.default = DatabaseConnection;
