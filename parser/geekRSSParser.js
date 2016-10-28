"use strict";
const parseString = require('xml2js').parseString;

class GeekXMLParser {
    constructor(source) {
        this.xml = source;
    }
    getPosts(){
        return new Promise( (resolve,reject) => {
            parseString(this.xml, (err,result)=> {
                resolve(this.parsePosts(result));
           });
        });       
    }
    parsePosts(results){
       let parsedPosts = [];
       let postChannel = results.rss.channel['0'];       
       for (var i = 0; i < postChannel.item.length; i++) {           
            let title = postChannel.item[i].title[0];
            let creator = postChannel.item[i]['dc:creator']; 
            let author =  creator !== undefined && creator.length > 0 ? creator[0] : '';
            let postDate = postChannel.item[i].pubDate;
            parsedPosts.push({ author, title, postDate});   
        }                       
        debugger;
        return parsedPosts;
    }
    
}

module.exports = GeekXMLParser