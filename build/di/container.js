"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currency = exports.user = void 0;
const user_business_1 = __importDefault(require("../business/user.business"));
const user_respository_1 = __importDefault(require("../repository/user.respository"));
const Types_1 = require("./Types");
const inversify_1 = require("inversify");
require("reflect-metadata");
const currency_repository_1 = __importDefault(require("../repository/currency.repository"));
const currency_business_1 = __importDefault(require("../business/currency.business"));
const container = new inversify_1.Container();
container.bind(Types_1.TYPES.User).to(user_respository_1.default);
container.bind(Types_1.TYPES.Currency).to(currency_repository_1.default);
exports.user = container.resolve(user_business_1.default);
exports.currency = container.resolve(currency_business_1.default);
