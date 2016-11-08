
const parserPath = "./parser/";
const notificationService = require('./services/notificationService');
const GeekMsClient = require('./client/geekMsClient');
const StoreService = require('./services/storeService');
const PostsHandler = require('./handlers/postsHandler');
const EventTypes = require('./constants/events');
const AppConfig = require('./config/appConfig');
const parserFactory = require('./parser/parserFactory');
const httpClient = require('./client/httpClient');
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
    run() {
        let geekMsClient = new GeekMsClient(httpClient);
        geekMsClient.get().then(response => {
            let parser = new (parserFactory())(response);

            let parsedPosts = parser.getPosts().then(result => {
                this.storeService.createStoreFile(JSON.stringify(result, null, 4));
                this.notifyLastPost(parsedPosts);
            });          
        });

        setTimeout(() => {
            this.run();
        }, AppConfig.CRAWL_INTERVAL);
    }
    
    notifyLastPost(parsedPosts) {
        if (!lastNotified) {
            let lastPost = parsedPosts[0];
            notificationService.notify(lastPost.title, 'Last Post : ' + lastPost.author);
            lastNotified = true;
        }
    }
}

module.exports = Main;



