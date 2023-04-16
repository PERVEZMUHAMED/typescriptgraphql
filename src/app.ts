import express, { Application } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
dotenv.config({path:path.join(__dirname, "config/config.env")});
import typeDefs from './schema/typedefs';
import Mutation from './resolver/mutation'
import typeQuery from "./schema/type.query"
import typeInput from "./schema/type.input";
import typeMutation from './schema/type.mutation';
const {PORT} = process.env;

class App {
    app:Application;
    constructor () {
        this.app = express();
    }
    public startServer () {
        const server = new ApolloServer({typeDefs,
            resolvers:[Mutation],
            context:({req})=>{
                // req, userModel
            }
        });
        server.applyMiddleware({app:this.app});
        this.app.listen(PORT,()=>{
            console.log(`Server is Connected in http://localhost:${PORT}${server.graphqlPath}`);
        })
    }
}
export default App;
