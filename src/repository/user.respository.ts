import {injectable, inject} from 'inversify';
import Iuserrepository from './Interface/user.repository.interface';
import 'reflect-metadata';

@injectable()
class UserRepository implements Iuserrepository {
    public Create = async(args, model)=>{
        try {
            const create = await model.create(args);
            return create;  
        } catch (error) {
            return error;
        }
    }
    public FindOne = async(args, model)=>{ 
        try {
            const findOne = await model.findOne(args);
            return findOne;  
        } catch (error) {
            return error;
        }
    }
    public findCurrency = async(args, model)=>{
        try {
            const findOne = await model.findOne().select("code");
            return findOne;
        } catch (error) {
            return error;
        }
    }
}
export default UserRepository;