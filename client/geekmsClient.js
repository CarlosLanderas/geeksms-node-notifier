"use strict";
const axios = require('axios');
const appClients = require('../config/appClients');
const appConfig = require('../config/appConfig');

class GeekMsClient {
    constructor(httpClient){
        this.url = appClients[appConfig.CLIENT].url;
        this.httpClient = httpClient;
    }
    get() {        
        return this.httpClient.get(this.url);
    }
}
module.exports = GeekMsClient;