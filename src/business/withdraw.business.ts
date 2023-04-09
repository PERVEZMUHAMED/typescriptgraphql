import { ApolloError } from "apollo-server-express";
import{inject, injectable} from "inversify";
import { TYPES } from "../di/TYPES";
import auditorModel from "../Model/auditor.model";
import currencyModel from "../Model/currency.model";
import walletModel from "../Model/wallet.model";
import withdrawModel from "../Model/withdraw.model";
import WithdrawRepository from "../repository/withdraw.repository";
import IWithdrawBusiness from "./Interface/withdraw.business.interface";

@injectable()
class WithdrawBusiness implements IWithdrawBusiness {
    private withdraw : WithdrawRepository;
    constructor(
        @inject(TYPES.Withdraw) _withdraw :WithdrawRepository,
    ) {
        this.withdraw = _withdraw;
    }
    
    public createWithdraw = async(args) =>{
        const {user_id, transactionId, Amount, currency}= args.input;
        if(!user_id||!transactionId||!Amount||!currency){
            throw new ApolloError("Please filled all the fileds","401");
        }
        try {
            const existTransactionId = await this.withdraw.FindOne({transactionId:transactionId}, withdrawModel);
            if(existTransactionId) throw new ApolloError("TransactionId Must be unique","401");    
            const currencyCode = await this.withdraw.FindOne({code:currency},currencyModel);
            const walletPre = await this.withdraw.wallet(args, walletModel);
            // Create withdraw
            const createwithdraw = await this.withdraw.Create({
                user_id:user_id,
                currency_id:currencyCode._id,
                transactionId:transactionId,
                currency:currency,
                Amount:Amount,
            }, withdrawModel);

            const walletUpdate = await this.withdraw.walletUpdate(args, walletModel);
            const walletPost = await this.withdraw.wallet(args, walletModel);
            
            // create Auditor  
            const createAuditor = await this.withdraw.Create({
                user_id:user_id,
                currency_id:createwithdraw.currency_id,
                transactionId:createwithdraw.transactionId,
                preBalance: walletPre.wallet[0].Amount,
                postBalance: walletPost.wallet[0].Amount,
                category:"Withdraw"
            }, auditorModel);
            return createwithdraw;
        } catch (error) {
            return error;
        }
    }
}
export default WithdrawBusiness;