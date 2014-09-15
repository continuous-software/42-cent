var conf = require('../config.js').authorize;
var cent42 = require('../index.js');
var assert = require('assert');

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
            service.submitTransaction({amount: randomAmount()}, cc).then(function (transaction) {
                assert.equal(transaction.transactionResponse.responseCode, '1');
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
                var response = rejection.transactionResponse;
                assert.equal(response.errors.error.errorCode, 6);
                assert.equal(response.errors.error.errorText, 'The credit card number is invalid.');
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
                assert.equal(rejection.message, 'amount is required');
                done();
            });
        });
    });
});
