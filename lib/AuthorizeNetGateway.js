//todo create a module for that

var assert = require('assert');
var authorize = require('node-authorize-net');
var util = require('util');
var BaseGateway = require('./BaseGateway.js');
var mapKeys = require('./mapKeys.js');
var errors = require('./errors.js');

var creditCardSchema = {
    "cvv": "cardCode"
};

function AuthorizeNetGateway(options) {
    assert(options.API_LOGIN_ID, 'API_LOGIN_ID must be provided');
    assert(options.TRANSACTION_KEY, 'TRANSACTION_KEY must be provided');
    BaseGateway.call(this, options);
    //mixin with underlying implementation
    this._gateway = authorize(options.API_LOGIN_ID, options.TRANSACTION_KEY);
}

util.inherits(AuthorizeNetGateway, BaseGateway);

AuthorizeNetGateway.prototype.submitTransaction = function submitTransaction(order, creditCard, prospect, other) {
    console.log('prospect field are not supported yet');
    console.log('other field are not supported yet');

    var cardNumber = creditCard.creditCardNumber;
    var expirationMonth = creditCard.expirationMonth;
    var expirationYear = creditCard.expirationYear;
    var cc = mapKeys(creditCard, creditCardSchema);
    var more = {
        transactionRequest: {
            payment: {
                creditCard: cc
            }
        }
    };

    return this._gateway.authCaptureTransaction(order.amount, cardNumber, expirationYear, expirationMonth, more)
        .then(function (result) {
            return {
                _original: result,
                authCode: result.transactionResponse.authCode,
                transactionId: result.transactionResponse.transId
            };
        })
        .catch(function (error) {
            var err;
            if (error.transactionResponse) {
                err = new errors.GatewayError(error.transactionResponse.errors.error.errorText, error);
            } else {
                err = error;
            }
            throw err;
        });

};

module.exports = function AuthorizeNetGatewayFactory(conf) {
    return new AuthorizeNetGateway(conf);
};