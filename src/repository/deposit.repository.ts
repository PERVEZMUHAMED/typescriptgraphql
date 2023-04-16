import IDepositrepository from "./Interface/deposit.repository.interface";


class DepositRepository implements IDepositrepository {
    
    public Create = async(args,model)=>{
        try {
            const create = await model.create();
            return create;
        } catch (error) {
            return error;
        }
    }
    public Findone = async (args, model)=>{
        try {
            
        } catch (error) {
            
        }
    }
    public Find = async (args, model)=>{
        try {
            
        } catch (error) {
            
        }
    }
    public wallet = async (args, model)=>{
        try {
            
        } catch (error) {
            
        }
    }

}
export default DepositRepository;