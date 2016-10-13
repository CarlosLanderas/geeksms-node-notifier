"use strict";
const notifier = require('node-notifier');
const AppConfig = require('../config/appConfig');

class Notifier {
    constructor(options) {
        this.options = options;
    }    
    notify(message,title) {
        Object.assign(this.options, { message: message, title: title || AppConfig.DEFAULT_TOAST_TITLE});
        notifier.notify(this.options);
    }
}

module.exports  = Notifier;