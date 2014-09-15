var conf = require('../config.js').PayFlow;
var cent42 = require('../index.js');
var assert = require('assert');

describe('Payflow service', function () {

    var service;

    function randomAmount() {
        return Math.ceil(Math.random() * 100);
    }

    beforeEach(function () {
        conf.host = 'pilot-payflowpro.paypal.com';
        conf.port = '443';
        service = cent42.use('PayFlow', conf);
    });

    describe('authorization and capture -> submit credit card transaction', function () {

        it('should submit transaction request', function (done) {
            var cc = {
                creditCardNumber: '4111111111111111',
                expirationYear: '17',
                expirationMonth: '01',
                cvv: '000'
            };

            service.submitTransaction({amount: randomAmount()}, cc).then(function (result) {
                assert(result, 'result should be defined');
                done();
            });
        });

        it('should reject the promise when the web service returns an error code', function (done) {
            var cc = {
                creditCardNumber: '4111111111111111',
                expirationYear: '99',
                expirationMonth: '01',
                cvv: '000'
            };

            service.submitTransaction({amount: randomAmount()}, cc).then(function (result) {
                throw new Error('it should not go here');
            }, function (err) {
                console.log(err);
                done();
            });
        });


    });

});