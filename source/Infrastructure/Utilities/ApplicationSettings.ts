import { DatabaseInfo } from "./DatabaseInfo";

export class ApplicationSettings {

    public database: DatabaseInfo;
    public port: number;

    //get current application settings depending on environment variable
    static get Current(): ApplicationSettings {
        let path = '../../../config.json';
        let databasePath = '../../../ormconfig.json';
        let settings = ApplicationSettings.GetSettings(path, databasePath);
        return settings;
    }

    public static GetSettings(path: string, databasePath: string) {
        var settings = new ApplicationSettings();
        try {
            let currentSettings = require(path);
            let databaseSettings = require(databasePath);
            //load general settings
            settings.port = currentSettings.port;
            //load database info
            settings.database = new DatabaseInfo();
            settings.database.host = databaseSettings.host;
            settings.database.name = databaseSettings.database;
            settings.database.username = databaseSettings.username;
            settings.database.password = databaseSettings.password;
            settings.database.type = databaseSettings.type;
            settings.database.autoSchemaSync = databaseSettings.synchronize;

        } catch (error) {
            throw TypeError("Invalid configuration path or bad configuration file schema, Please use the sample config file.")
        }
        return settings;
    }
}
