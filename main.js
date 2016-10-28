"use strict";
const parserPath = "./parser/";
const notificationService = require('./services/notificationService');
const geekMsClient = require('./client/geekMsClient');
const StoreService = require('./services/storeService');
const PostsHandler = require('./handlers/postsHandler');
const EventTypes = require('./constants/events');
const AppConfig = require('./config/appConfig');
const AppClients = require('./config/appClients');
let lastNotified = false;

class Main {
    constructor() {
        this.storeService = new StoreService();
        this.postsHandler = new PostsHandler();       
        this.storeService.on(EventTypes.STORE_CHANGED, (store) => {
            this.postsHandler.process(store);
        });
    }

    getConfiguredParser(){
        return require(parserPath + AppClients[AppConfig.CLIENT].parser);
    }
    /*Entry Point*/
    Run() {
        geekMsClient.get().then(response => {
            let parser = new (this.getConfiguredParser())(response);

            let parsedPosts = parser.getPosts().then(result => {
                this.storeService.createStoreFile(JSON.stringify(result, null, 4));
                this.NotifyLastPost(parsedPosts);
            });          
        });

        setTimeout(() => {
            this.Run();
        }, AppConfig.CRAWL_INTERVAL);
    }
    
    NotifyLastPost(parsedPosts) {
        if (!lastNotified) {
            let lastPost = parsedPosts[0];
            notificationService.notify(lastPost.title, 'Last Post : ' + lastPost.author);
            lastNotified = true;
        }
    }
}

module.exports = Main;



