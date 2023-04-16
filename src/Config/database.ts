import mongoose from "mongoose";

const {MONGODB_URL} = process.env;

class DatabaseConnection {
    public initialiseDatabaseConnection() {
        mongoose.set("strictQuery", false);
        mongoose.connect(MONGODB_URL as string)
        .then(con=>{
            console.log(`Db is Connected in ${con.connection.host}`);
        })
        .catch((error)=>{ 
            console.log(`Db is not Connected ${error}`);  
        })
    }
}
export default DatabaseConnection;