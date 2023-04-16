"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const apollo_server_express_1 = require("apollo-server-express");
dotenv_1.default.config({ path: path_1.default.join(__dirname, "config/config.env") });
const typedefs_1 = __importDefault(require("./schema/typedefs"));
const mutation_1 = __importDefault(require("./resolver/mutation"));
const { PORT } = process.env;
class App {
    constructor() {
        this.app = (0, express_1.default)();
    }
    startServer() {
        const server = new apollo_server_express_1.ApolloServer({ typeDefs: typedefs_1.default,
            resolvers: [mutation_1.default],
            context: ({ req }) => {
                // req, userModel
            }
        });
        server.applyMiddleware({ app: this.app });
        this.app.listen(PORT, () => {
            console.log(`Server is Connected in http://localhost:${PORT}${server.graphqlPath}`);
        });
    }
}
exports.default = App;
