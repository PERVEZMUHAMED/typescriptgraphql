import { ApolloError } from "apollo-server-express";
import{inject, injectable} from "inversify";
import { TYPES } from "../di/TYPES";
import auditorModel from "../Model/auditor.model";
import currencyModel from "../Model/currency.model";
import depositModel from "../Model/deposit.model";
import walletModel from "../Model/wallet.model";
import DepositRepository from "../repository/deposit.repository";
import IDepositBusiness from "./Interface/deposit.business.interface";

@injectable()
class DepositBusiness implements IDepositBusiness {
    private deposit:DepositRepository;
    constructor(
        @inject(TYPES.Deposit) _depoist:DepositRepository
    ) {
        this.deposit = _depoist;
    }
    
    public createDeposit = async(args)=>{

        const {user_id, transactionId, Amount, currency}= args.input;
        if(!user_id||!transactionId||!currency||!Amount){
            throw new ApolloError("Please filled all the fileds","401");
        }
        try {
            const existTransactionId = await this.deposit.FindOne({transactionId:transactionId},depositModel);
            if(existTransactionId) throw new ApolloError("TransactionId Must be Unique","401");
            const currencyCode = await this.deposit.FindOne(
            {code:currency}, currencyModel);
            const walletPre = await this.deposit.wallet(args, walletModel);
            console.log("walletPre", walletPre.wallet[0].Amount);
            
            // Create Deposit 
            const createdeposit = await this.deposit.Create({
                user_id:user_id,
                currency_id:currencyCode._id,
                transactionId: transactionId,
                currency: currency,
                Amount: Amount,
            },depositModel);
            const walletUpdate = await this.deposit.walletUpdate(args, walletModel);
            const walletPost = await this.deposit.wallet(args, walletModel);
            
            // create Auditor for Depsoit
            const createAuditor = await this.deposit.Create({
                user_id:user_id,
                currency_id:createdeposit.currency_id,
                transactionId:createdeposit.transactionId,
                preBalance: walletPre.wallet[0].Amount,
                postBalance: walletPost.wallet[0].Amount,
                category:"Deposit"
            }, auditorModel);
            // console.log("createAuditor", createAuditor);
            return createdeposit;
        } catch (error) {
         return error;   
        }
    }
}
export default DepositBusiness;