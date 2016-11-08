const fs = require('fs');
const path = require('path');

const expect = require('chai').expect
const AppConfig = require('../config/appConfig');
const AppClients = require('../config/appClients');
const parserFactory = require('../parser/parserFactory');
const GeekRssParser = require('../parser/geekRSSParser');
const GeekParser = require('../parser/geekParser');

describe('The parser factory', function () {
    it('should return configured parsed', function () {
        let configuredParser = AppClients[AppConfig.CLIENT].parser;
        let parser = parserFactory();

        expect(configuredParser.toLowerCase()).equal(parser.name.toLowerCase());
    });

});

describe('The xmlparser', function () {
    it('should process xml content into posts', function (done) {
        getTestContent('rssXmlContent.xml').then(content => {
            let geekRssParser = new GeekRssParser(content);           
            geekRssParser.getPosts().then(posts => {

                expect(posts[0].author).equal('Juan Carlos González');               
                expect(posts[1].title).equal('Office 365: Exchange Server Deployment Assistant para escenarios de migración (II)!');
                done();

            });
        });
    });
});

describe('The htmlParser', function(){
      it('should process http content into posts', function (done) {
        getTestContent('htmlContent.html').then(content => {
            let geekParser = new GeekParser(content);           
            geekParser.getPosts().then(posts => {         
                
                expect(posts[5].title.trim()).equal('[Podcast] Xamarin: Mitos y verdades');
                expect(posts[5].author).equal('Javier Suárez Ruiz');
                done();

            }).catch( err=> console.log(err));
        });
    });

});

function getTestContent(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile('./specs/fake/' + filePath, 'utf8', function (err, data) {            
            if (err) {
                reject(err);
            }            
            resolve(data.toString());
        });
    });

}