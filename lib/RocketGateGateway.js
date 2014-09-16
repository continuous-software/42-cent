var BaseGateway = require('./BaseGateway.js');
var rocketgate = require('rocketgate');
var assert = require('assert');
var util = require('util');
var Promise = require('bluebird');
var mapKeys = require('./mapKeys.js');
var _ = require('lodash');
var flat = require('./flat.js');
var errors = require('./errors.js');

function setOnRequest(targetKey, value, srcKey, srcObj, tgObject) {
    tgObject.Set(rocketgate.GatewayRequest[targetKey], value);
}

var transactionSchema = {
    amount: setOnRequest.bind(null, 'AMOUNT'),
    expirationMonth: setOnRequest.bind(null, 'EXPIRE_MONTH'),
    expirationYear: setOnRequest.bind(null, 'EXPIRE_YEAR'),
    cvv: setOnRequest.bind(null, 'CVV2'),
    creditCardNumber: setOnRequest.bind(null, 'CARDNO'),
    customerFirstName: setOnRequest.bind(null, 'CUSTOMER_FIRSTNAME'),
    customerLastName: setOnRequest.bind(null, 'CUSTOMER_LASTNAME'),
    customerEmail: setOnRequest.bind(null, 'EMAIL')
};

//todo put this in a separate module
function RocketGateGateway(options) {

    assert(options.MERCHANT_ID, 'MERCHANT_ID is a mandatory field');
    assert(options.MERCHANT_PASSWORD, 'MERCHANT_PASSWORD is a mandatory field');

    BaseGateway.call(this, options);

    this._service = new rocketgate.GatewayService();
}

util.inherits(RocketGateGateway, BaseGateway);

RocketGateGateway.prototype.submitTransaction = function submitTransaction(order, creditCard, prospect, other) {
    console.log('prospect fields are not supported yet');
    console.log('other fields are not supported yet');

    return new Promise(function (resolve, reject) {

            var req = new rocketgate.GatewayRequest();
            var mixin = {};

            _.assign(mixin, order);
            _.assign(mixin, creditCard);
            _.assign(mixin, prospect);
            _.assign(mixin, other);

            mixin = flat(mixin);

            req.Set(rocketgate.GatewayRequest.MERCHANT_ID, this.MERCHANT_ID);
            req.Set(rocketgate.GatewayRequest.MERCHANT_PASSWORD, this.MERCHANT_PASSWORD);

            mapKeys(mixin, transactionSchema, req);

            var res = new rocketgate.GatewayResponse();

            this._service.PerformPurchase(req, res, function cb(result, request, response) {

                var err;

                if (result) {
                    resolve({
                        transactionId: response.Get(rocketgate.GatewayResponse.TRANSACT_ID),
                        authCode: response.Get(rocketgate.GatewayResponse.AUTH_NO),
                        _original: response
                    });
                }
                else {
                    if (response.Get(rocketgate.GatewayResponse.RESPONSE_CODE) !== 0) {
                        err = new errors.GatewayError('see response code ' + response.Get(rocketgate.GatewayResponse.REASON_CODE) + ' in rocket gate documentation', response);
                    } else {
                        err = response;
                    }
                    reject(err);
                }
            });

        }.bind(this)
    );
};

module.exports = function factory(options) {
    return new RocketGateGateway(options);
};
