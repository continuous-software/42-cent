var conf = require('../config.js').PayFlow;
var cent42 = require('../index.js');
var assert = require('assert');
var errors = require('../lib/errors.js');

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
            var prospect={
                customerFirstName:'Bob',
                customerLastName:'Eponge',
                customerEmail:'bob.eponge@gmail.com'
            };

            service.submitTransaction({amount: randomAmount()}, cc, prospect).then(function (result) {
                assert.equal(result.authCode, result._original.AUTHCODE, 'it should have the authorization code');
                assert.equal(result.transactionId, result._original.PNREF, 'it should have the transaction id');
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
                assert(err instanceof errors.GatewayError);
                assert.equal(err.message, 'Invalid expiration date: 0199');
                assert(err._original, 'original should be defined');
                done();
            });
        });
    });
});