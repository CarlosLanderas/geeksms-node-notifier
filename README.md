[![Build Status](https://travis-ci.org/CarlosLanderas/GeekMs-Node-Notifier.svg?branch=develop)](https://travis-ci.org/CarlosLanderas/GeekMs-Node-Notifier)

<br/>

**GEEK MS NODE NOTIFIER**

GeekMs node notifier is a project developed with Node using javascript ES6



![alt tag](https://raw.githubusercontent.com/carloslanderas/geekms-node-notifier/master/images/sampleimage.png)

<br/><br/>

The program queries the geek ms blog site and show a popup notification whenever a new post has been added.

<br/><br/>


**UPDATE:** Rss has been added to Geeks blogs and a new client for XML has been added to notifier.

To swap parsers (HTML or XML) use the config file:

<br/><br/>

```javascript
module.exports = {    
    DEFAULT_TOAST_TITLE : "GeeksMs Notifier",
    POST_STORE_PATH : "c:\\temp",
    POST_STORE_FILE : "poststore.json",
    CRAWL_INTERVAL : 300000,
    DIRECTORY_PERMISION: "0744",
    CLIENT: "xmlClient" // xmlClient for RSS parser and htmlClient for html parser
}
```



**Current Clients**:
```javascript

  htmlClient : {
            parser: "GeekParser",
            url: "http://geeks.ms/blogs"
        },
        xmlClient: {
            parser: "GeekRSSParser",
            url: "http://geeks.ms/rss/mainfeed"
        }
```


<br/><br/>

Crawling interval, temporal store path and file can be configured in config/appConfig.js settings.


The following libraries have been used to create this project:


- axios

- cheerio

- xml2js

- node eventEmitter

- fs

- node-notifier


<br/><br/>

**Installation:**

<br/><br/>

npm install

npm install forever -g

forever start boot.js (To daemonize execution)
