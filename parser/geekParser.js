"use strict";
const cheerio = require('cheerio');
const CrawlerSelectors = require('../config/crawlerSelectors');
class GeekParser {
    constructor(htmlSource) {
        this.cherioDom = cheerio.load(htmlSource);
    }
    getPosts(){
        return new Promise( (resolve,reject) => {
            let postBlocks = this.cherioDom('.' + CrawlerSelectors.POST_BLOCK);        
            resolve(this.parsePosts(postBlocks));
        });                
    }
    parsePosts(postBlocks){
        let parsedPosts = [];   
        postBlocks.each( (index, elem) => {
            let currentElement = cheerio(elem);
            let postAuthor = this.findSelector(currentElement,CrawlerSelectors.POST_AUTOR_SELECTOR).text();
            let postTitle= this.findSelector(currentElement,CrawlerSelectors.POST_TITLE_SELECTOR).text();
            let postDate = this.findSelector(currentElement,CrawlerSelectors.POST_DATE_SELECTOR).text();
            parsedPosts.push({ author: postAuthor, title: postTitle, date: postDate});                      
        });
        return parsedPosts;
    }
    findSelector(elem, selector){
         return elem.find(selector);
    }

}

module.exports = GeekParser