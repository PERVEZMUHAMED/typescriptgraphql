import { ApolloError } from 'apollo-server-express';
import {injectable, inject} from 'inversify';
import { TYPES } from '../di/Types';
import auditorModel from '../Model/auditor.model';
import depositModel from '../Model/deposit.model';
import DepositRepository from '../repository/deposit.repository';


class DepositBusiness  {

    private deposit:DepositRepository;
    constructor(
        @inject(TYPES.Deposit) public _deposit:DepositRepository
    ) {
        this.deposit = _deposit;
    }
    public createDeposit = async(args)=>{
        const {user_id, transactionId, Amount, currency, currency_id} = args.input;
        if(!user_id||!transactionId||!Amount||!currency||currency_id){
            throw new ApolloError("Please fill all the Fields", "401");
        }
        try {
            const existstransactionId:any = await this.deposit.Findone({transcationId:transactionId}, depositModel);
            if(existstransactionId) throw new ApolloError("TransactionId must be Unique", "401");
            const createdeposit = await this.deposit.Create({...args.input}, depositModel);
            const createAuditor = await this.deposit.Create({
                user_id:"",
                currencY_id:"",
                currency:"",
                transactionId:"",
                preBalance:"",
                postBalance:"",
                category:"Deposit"

            }, auditorModel)

        } catch (error) {
            
        }
    }
}