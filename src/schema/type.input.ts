import { gql } from "apollo-server-express";

const Input = gql`
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
export default Input;
