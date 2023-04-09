import App from "./app";
import Database from "./config/database";


const app = new App();
const database = new Database();
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
