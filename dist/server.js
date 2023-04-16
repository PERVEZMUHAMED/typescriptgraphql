"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const app = new app_1.default();
const database = new database_1.default();
app.startServer();
database.intialiseDatabaseConnection();
// const arr = [
//     {
//         currencyName:"IndianRupees",
//         code:"INR"
//     },
//     {
//         currencyName:"United states Dollar",
//         code:"USD"
//     },
//     {
//         currencyName:"Omanian Riyal",
//         code:"OMR"
//     }
// ]
//     let arr2 = [];
//     let objec:any = {};
// arr.forEach((items, index)=>{
//     objec = {};
//     objec.currency = arr[index].code;
//     arr2.push(objec);
// });
// console.log(arr2);
