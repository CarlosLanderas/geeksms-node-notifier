"use strict";
const axios = require('axios');
const appClients = require('../config/appClients');
const appConfig = require('../config/appConfig');

class GeekMsClient {
    constructor(){
        this.url = appClients[appConfig.CLIENT].url;
    }
    get() {
        return new Promise( (resolve, reject) => {
            axios.get(this.url).then( (response) => {
                resolve(response.data);
            }).catch( (error)=> {
                reject(error);
            });
        });   
    }
}
module.exports = new GeekMsClient();