"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const Input = (0, apollo_server_express_1.gql) `
    extend input userInput {
        userName:String
        password:String
        email:String
        personaldetails:detailsInput
    } 
    extend input detailsInput {
        gender:String
        age:Int
    }
`;
exports.default = Input;
