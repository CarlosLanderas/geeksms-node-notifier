"use strict";
const notificationService = require('./services/notificationService');
const geekMsClient = require('./client/geekMsClient');
const GeekParser = require('./parser/geekParser');
const StoreService = require('./services/storeService');
const PostsHandler = require('./handlers/postsHandler');
const EventTypes = require('./constants/events');
const AppConfig = require('./config/appConfig');
let lastNotified = false;

class Main {
    constructor() {
        this.storeService = new StoreService();
        this.postsHandler = new PostsHandler();

        this.storeService.on(EventTypes.STORE_CHANGED, (store) => {
            this.postsHandler.process(store);
        });
    }
    /*Entry Point*/
    Run() {
        geekMsClient.get().then(response => {
            let parser = new GeekParser(response);
            let parsedPosts = parser.getPosts();
            this.storeService.createStoreFile(JSON.stringify(parsedPosts, null, 4));
            this.NotifyLastPost(parsedPosts);
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



