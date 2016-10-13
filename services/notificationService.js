"use strict";
const NotifierFactory = require('../common/notifierFactory');
class NotificationService {
    constructor(){
        this.notifier = NotifierFactory.getDefault();
    }
    notify(title,message){
        this.notifier.notify(title,message);
    }
}

module.exports = new NotificationService();