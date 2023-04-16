import App from "./app";
import DatabaseConnection from "./Config/database";

const app = new App();
const database = new DatabaseConnection();

app.startServer();
database.initialiseDatabaseConnection();  
