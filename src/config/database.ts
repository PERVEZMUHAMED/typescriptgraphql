import mongoose from "mongoose";

const {MONGODB_URL} = process.env; 

export default class Database {

    public intialiseDatabaseConnection () {
        mongoose.connect(MONGODB_URL)
        .then(()=>{
            console.log(`Db is Connected`);
        })
        .catch((error)=>{
            console.log(`Db is not Connected ${error}`);
        })
    }
} 