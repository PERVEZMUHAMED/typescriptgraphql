import { gql } from "apollo-server-express";

const Query = gql`
     extend type Query {
        getUser:[User]
    }
`;

export default Query;