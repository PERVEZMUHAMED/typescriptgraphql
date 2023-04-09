import { Container } from "inversify";
import CurrencyBusiness from "../business/currency.business";
import DepositBusiness from "../business/deposit.business";
import GetUserBusiness from "../business/getuser.business";
import ICurrencyBusiness from "../business/Interface/currency.business.interface";
import IDepositBusiness from "../business/Interface/deposit.business.interface";
import { IGetUserBusiness } from "../business/Interface/getuser.business.repository.interface";
import IUserBusiness from "../business/Interface/user.business.interface";
import IWithdrawBusiness from "../business/Interface/withdraw.business.interface";
import UserBusiness from "../business/user.business";
import WithdrawBusiness from "../business/withdraw.business";
import CurrencyRepository from "../repository/currency.repository";
import DepositRepository from "../repository/deposit.repository";
import GetUserRepository from "../repository/getuser.repository";
import ICurrencyRepository from "../repository/Interface/currency.repository.interface";
import IDepositRepository from "../repository/Interface/deposit.repository.interface";
import IGetUserRepository from "../repository/Interface/getuser.repository.interface";
import IUserRepository from "../repository/Interface/user.repository.interface";
import IWithdrawRepository from "../repository/Interface/withdraw.repository.interface";
import UserRepository from "../repository/user.repository";
import WithdrawRepository from "../repository/withdraw.repository";
import { TYPES } from "./TYPES";

const container = new Container();

container.bind<IUserRepository>(TYPES.User).to(UserRepository);
container.bind<ICurrencyRepository>(TYPES.Currency).to(CurrencyRepository);
container.bind<IDepositRepository>(TYPES.Deposit).to(DepositRepository);
container.bind<IWithdrawRepository>(TYPES.Withdraw).to(WithdrawRepository);
container.bind<IGetUserRepository>(TYPES.GetUser).to(GetUserRepository)



export const user = container.resolve<IUserBusiness>(UserBusiness);
export const currency = container.resolve<ICurrencyBusiness>(CurrencyBusiness);
export const deposit = container.resolve<IDepositBusiness>(DepositBusiness);
export const withdraw = container.resolve<IWithdrawBusiness>(WithdrawBusiness);
export const getuser = container.resolve<IGetUserBusiness>(GetUserBusiness)



