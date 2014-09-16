var conf = require('../config.js').authorize;
var cent42 = require('../index.js');
var assert = require('assert');
var errors = require('../lib/errors.js');

describe('AuthorizeNet service', function () {

    var service;

    //to avoid duplicate transaction we change the amount
    function randomAmount() {
        return Math.ceil(Math.random() * 100);
    }

    beforeEach(function () {
        service = cent42.use('Authorize.Net', conf);
    });

    describe('authorizationCapture', function () {

        it('should submit transaction request', function (done) {
            var cc = {
                creditCardNumber: '4012888818888',
                expirationYear: '2017',
                expirationMonth: '1',
                cvv: '666'
            };
            service.submitTransaction({amount: randomAmount()}, cc).then(function (result) {
                assert.equal(result.authCode, result._original.transactionResponse.authCode);
                assert.equal(result.transactionId, result._original.transactionResponse.transId);
                done();
            });
        });

        it('should reject the promise when web service send an error code', function (done) {
            var cc = {
                creditCardNumber: '234234',
                expirationYear: '2016',
                expirationMonth: '10',
                cvv: '666'
            };

            service.submitTransaction({amount: randomAmount()}, cc).then(function () {
                throw new Error('should not get here');
            }, function (rejection) {
                assert(rejection instanceof errors.GatewayError, 'should be an instance of GatewayError');
                assert.equal(rejection.message, 'The credit card number is invalid.');
                assert(rejection._original, 'original should be defined');
                done();
            });
        });

        it('should reject the promise if any error happens', function (done) {
            var cc = {
                creditCardNumber: '234234',
                expirationYear: '2016',
                expirationMonth: '10',
                cvv: '666'
            };

            service.submitTransaction({}, cc).then(function () {
                throw new Error('should not get here');
            }, function (rejection) {
                assert(!(rejection instanceof errors.GatewayError), 'should not be an instance of GatewayError');
                assert.equal(rejection.message, 'amount is required');
                done();
            });
        });
    });
});
