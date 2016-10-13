**GEEK MS NODE NOTIFIER**

GeekMs node notifier is a project developed with Node using javascript ES6

The program queries the geek ms blog site and show a popup notification whenever a new post has been added:



![alt tag](https://raw.githubusercontent.com/carloslanderas/geekms-node-notifier/master/images/sampleimage.png)




Crawling interval, temporal store path and file can be configured in config/appConfig.js settings.


The following libraries have been used to create this project:


- axios

- cheerio

- node eventEmitter

- fs

- node-notifier



**Installation:**


npm install
npm install forever -g
forever start boot.js (To daemonize execution)
