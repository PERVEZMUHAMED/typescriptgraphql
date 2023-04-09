import { injectable } from "inversify";
import "reflect-metadata";
import IUserRepository from "./Interface/user.repository.interface";

@injectable()
class UserRepository implements IUserRepository {
    public Create = async(args, model)=>{
        const create = await model.create(args);
        return create;
    }
    public FindOne = async(args, model)=>{
        const FindOne = await model.findOne(args);
        return FindOne;
    }
    public currency = async(args, model)=>{
        const wallet= await model.find({}, {code:1});
        return wallet;
    }
}

export default UserRepository;