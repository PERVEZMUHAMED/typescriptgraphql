import UserBusiness from "../business/user.business";
import UserRepository from "../repository/user.respository";
import {TYPES} from './Types';
import { inject,injectable, Container } from "inversify";
import 'reflect-metadata';
import currencyRepository from "../repository/currency.repository";
import currencyBusiness from "../business/currency.business";


const container = new Container();
container.bind(TYPES.User).to(UserRepository);
container.bind(TYPES.Currency).to(currencyRepository)

export const user = container.resolve(UserBusiness);
export const currency = container.resolve(currencyBusiness);