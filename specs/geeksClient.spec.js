const expect = require('chai').expect
const sinon = require('sinon');
const MockAdapter = require('axios-mock-adapter');
const AppConfig = require('../config/appConfig');
const AppClients = require('../config/appClients');
const GeekMSClient = require('../client/geekmsClient');
const httpClient = require('../client/httpClient');
const axios = require('axios');


let targetUrl = '';
let mockAdapter = null;

beforeEach(function(){
    targetUrl = AppClients[AppConfig.CLIENT].url;
    mockAdapter = new MockAdapter(axios);
});


describe('The geeksMs http client', function () {
    describe('when requesting posts', function(){
         it('should perform call to retrieve data', function(done) {
             
            mockAdapter.onGet(targetUrl).reply(200, {
                data: {}
            });

            let client = new GeekMSClient(httpClient);
            
            client.get().then(data => {                                                
               done();
            });            


        });  
    });   
});