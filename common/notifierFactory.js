"use strict";
const Notifier = require('./notifier');
const DEFAULT_TOAST_TITLE = require('../config/appConfig').DEFAULT_TOAST_TITLE;
const path = require('path');

class NotifierFactory {

    static getDefault() {       
        return new Notifier({
            title: DEFAULT_TOAST_TITLE,
            icon: path.join(__dirname + '/../images/plain.png'),
            sound: true
        });
    }
}

module.exports = NotifierFactory;