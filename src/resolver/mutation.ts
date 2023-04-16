import {currency, user} from '../di/container'

const Mutation = {
    Mutation:{
        Register: async(parent, args, context)=>{
            try {
                const createUser = await user.createUser(args);
                return createUser;
            } catch (error) {
                return error;
            }
        },
        createCurrency: async(parent, args, context)=>{
            try {
                const createCurrency = await currency.createCurrency(args);
                return createCurrency;
            } catch (error) {
                return error;
            }
        }      
    }
}
export default Mutation;