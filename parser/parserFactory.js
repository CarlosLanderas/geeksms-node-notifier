const AppClients = require('../config/appClients');
const AppConfig = require('../config/appConfig');


module.exports = () => {
    var configuredParser = require("./" + AppClients[AppConfig.CLIENT].parser);
    return configuredParser;
}