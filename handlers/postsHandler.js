"use strict";
const notificationService = require('../services/notificationService');
class PostsHandler {

    process(store) {
        if (store.previous !== undefined) {
            let lastPost = store.current[0];
            if (store.previous[0].title !== lastPost.title) {
                console.log("Notifying post " + lastPost.title);
                notificationService.notify(lastPost.title, 'Nuevo post de ' + lastPost.author);
            }
        }
    }
}

module.exports = PostsHandler;