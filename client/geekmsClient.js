"use strict";
const axios = require('axios');
const GEEK_URL = require('../config/appConfig').GEEKMS_URL;

class GeekMsClient {
    constructor(){}
    get() {
        return new Promise( (resolve, reject) => {
            axios.get(GEEK_URL).then( (response) => {
                resolve(response.data);
            }).catch( (error)=> {
                reject(error);
            });
        });   
    }
}
module.exports = new GeekMsClient();