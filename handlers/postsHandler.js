"use strict";
const notificationService = require('../services/notificationService');
class PostsHandler {

    process(store) {
        if (this.previousStoreExists(store)) {
            let lastPost = store.current[0];
            if (store.previous[0].title !== lastPost.title) {
                console.log("Notifying post " + lastPost.title);
                notificationService.notify(lastPost.title, 'Nuevo post de ' + lastPost.author);
            }
        }
    }

    previousStoreExists(store){
        return store.previous !== null  && 
        store.previous.length > 0;
    }
}

module.exports = PostsHandler;