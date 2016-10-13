"use strict";
const AppConfig = require('../config/appConfig');
const EventTypes = require('../constants/events');
const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');
const notificationService = require('./notificationService');

class StoreService extends EventEmitter {
    constructor() {
        super();
        this.storeDirectory = AppConfig.POST_STORE_PATH;
        this.storePath = this.storeDirectory + "\\" + AppConfig.POST_STORE_FILE;
        this.initializeStore();
    }
    initializeStore() {
        if (!this.isStoreDirectoryCreated()) {
            this.createStoreDirectory();
        }
    }
    getPostStore() {
        return new Promise((resolve, reject) => {
            let storedPosts = null;
            if (this.isFileStoreCreated()) {
                fs.readFile(this.storePath, (err, data) => {
                    if (err) reject(error);
                    storedPosts = JSON.parse(data);
                    resolve(storedPosts);
                });
            }
            else{
                resolve(storedPosts);
            }
            
        });
    }
    isFileStoreCreated() {
        return fs.existsSync(this.storePath);
    }

    isStoreDirectoryCreated() {
        if (!fs.existsSync(this.storeDirectory)) {
            return false;
        }
        return true;
    }
    createStoreDirectory() {
        fs.mkdirSync(this.storeDirectory, AppConfig.DIRECTORY_PERMISION);
    }

    createStoreFile(contents) {
        this.getPostStore().then(previousStore => {

            fs.writeFile(this.storePath, contents, err => {
                if (err) {
                    notificationService.notify("Error writing file", "Error");
                }
                else {
                    this.emit(EventTypes.STORE_CHANGED, { previous: previousStore, current: JSON.parse(contents) });
                }
            });

        });
    }
}

module.exports = StoreService;