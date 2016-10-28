"use strict";
const notificationService = require('../services/notificationService');
class PostsHandler {

    process(store) {
        if (store.previous !== undefined) {
            let lastPost = store.current[0];
            if (this.previousStoreExists(store) && (store.previous[0].title !== lastPost.title)) {
                console.log("Notifying post " + lastPost.title);
                notificationService.notify(lastPost.title, 'Nuevo post de ' + lastPost.author);
            }
        }
    }

    previousStoreExists(store){
        return store.previous !== undefined  && store.previous.length > 0;
    }
}

module.exports = PostsHandler;