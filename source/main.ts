import * as server from "routing-controllers";
import "reflect-metadata";
import * as dependecyInjection from "typedi";
import { ApplicationSettings } from "./Infrastructure/Utilities/ApplicationSettings"
import * as path from "path";
import * as url from "url";
var fs = require('fs');
var rootPath = require('app-root-path').path;

//get global settings
var settings = ApplicationSettings.Current;


// setup routing-controllers to use typedi container.
server.useContainer(dependecyInjection.Container);

//init server
const app = server.createExpressServer({
    routePrefix: "/api/",
    defaultErrorHandler: false,
    controllers: [__dirname + "/Controllers/*.js"],
    middlewares: [__dirname + "/Middlewares/*.js"]
});




//run server
app.listen(settings.port);


console.log("Shipco api instance is working on ports " + settings.port);
module.exports = app;

