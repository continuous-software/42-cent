var conf = require('../config.js').RocketGate;
var cent42 = require('../index.js');
var assert = require('assert');
var rocketGate = require('rocketGate');
var errors = require('../lib/errors.js');

describe('rocket gate service', function () {

    var service;

    function randomAmount() {
        return Math.ceil(Math.random() * 100);
    }

    beforeEach(function () {
        service = cent42.use('RocketGate', conf);
        service._service.SetTestMode(true);
    });

    describe('authorization and capture', function () {

        it('should submit a transaction', function (done) {

            var cc = {
                creditCardNumber: '4111111111111111',
                expirationYear: '2010',
                expirationMonth: '02',
                cvv: '999'
            };

            var order = {amount: '3.99'};

            service.submitTransaction(order, cc, {}, {}).then(function (result) {
                assert.equal(result.transactionId, result._original.Get(rocketGate.GatewayResponse.TRANSACT_ID), 'it should have the appropriate transactionId');
                assert.equal(result.authCode, result._original.Get(rocketGate.GatewayResponse.AUTH_NO), 'it should have the appropriate authCode');
                done();
            });
        });
    });

    it('should reject the promise when we get a web service error', function (done) {
        var cc = {
            expirationYear: '2010',
            expirationMonth: '02',
            cvv: '999'
        };

        var order = {amount: '3.99'};

        service.submitTransaction(order, cc, {}, {}).then(function (result) {
            throw new Error('should not get here');
        }, function (reason) {
            assert(reason instanceof errors.GatewayError);
            assert.equal(reason.message, 'see response code 403 in rocket gate documentation', 'it should have the appropriate message');
            assert(reason._original, '_original should be defined');
            done();
        });
    });
});
