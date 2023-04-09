import express, { Application } from 'express';
import path, { join } from 'path';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './type/typedefs';
import { mutationResolver } from './resolver/mutation.resolver';
import { queryResolver } from './resolver/Query.resolver';
dotenv.config({path:join(__dirname, "config/config.env")});

const {PORT} = process.env;

class App {
    public app:Application;
    constructor(){
        this.app = express();
    }
    public startServer = async()=>{
        const server = new ApolloServer({typeDefs, resolvers:[
            mutationResolver, queryResolver
        ]});
        const app = await server.applyMiddleware({app:this.app});
        this.app.listen(PORT,()=>{
            console.log(`server is Connected in http://localhost:${PORT}${server.graphqlPath}`); 
        })
    }
}
export default App;