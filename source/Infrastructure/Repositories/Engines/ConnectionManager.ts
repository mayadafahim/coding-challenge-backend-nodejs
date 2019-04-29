import * as orm from "typeorm";
import { ApplicationSettings } from "../../Utilities/ApplicationSettings";

export class ConnectionManager {
    static async Start(): Promise<orm.Connection> {

        let config = ApplicationSettings.Current;

        let connection: orm.Connection;
        if (orm.getConnectionManager().has("default")) {
            connection = orm.getConnection("default");
            if (connection.isConnected) {
                return connection;
            }
        }

        connection = <orm.Connection>await orm.createConnection({
            type: "mysql",
            host: config.database.host,
            username: config.database.username,
            password: config.database.password,
            database: config.database.name,
            entities: [
                __dirname + "/MappingEntities/*.js"
            ],
            synchronize: config.database.autoSchemaSync,
            logging: ["error"]
        }).catch((error) => {
            console.log(error);
        });

        return connection;
    }
}

