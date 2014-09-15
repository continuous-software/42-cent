var conf = require('../config.js').virtualMerchant;
var cent42 = require('../index.js');
var assert = require('assert');

xdescribe('Virtual merchant service', function () {

    var service;
    var testcc = 5000300020003003;
    var testLastName = 'Tester';

    //to avoid duplicate transaction we change the amoung
    function randomAmount() {
        return Math.ceil(Math.random() * 100);
    }

    beforeEach(function () {
        service = cent42.use('VirtualMerchant', conf);
    });

    describe('submit transaction', function () {

        it('should submit transaction request', function (done) {
            var cc = {
                creditCardNumber: testcc,
                expirationYear: 2017,
                expirationMonth: 1,
                cvv: 666
            };
            service.submitTransaction({amount: randomAmount()}, cc).then(function (transaction) {
                console.log(JSON.stringify(transaction));
                done();
            });
        });

        xit('should reject the promise when web service send an error code', function (done) {
            var cc = {
                creditCardNumber: 234234,
                expirationMonth: 2016,
                expirationYear: 10,
                cvv: 666
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

        xit('should reject the promise if any error happens', function (done) {
            var cc = {
                creditCardNumber: 234234,
                expirationMonth: 2016,
                expirationYear: 10,
                cvv: 666
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

