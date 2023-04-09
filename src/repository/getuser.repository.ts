import { injectable, inject } from "inversify";
import "reflect-metadata";
import IGetUserRepository from "./Interface/getuser.repository.interface";

@injectable()
class GetUserRepository implements IGetUserRepository {
    public getUserDetails = async(args,model)=>{
        // console.log("argsR", args);
        try {
            const getuser = await model.aggregate(args);
            console.log("getuser", getuser);            
            return getuser;
        } catch (error) {
            return error;
        }
    }
}
export default GetUserRepository;