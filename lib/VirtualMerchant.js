var BaseGateway = require('./BaseGateway.js');
var assert = require('assert');
var virtualmerchant = require('virtualmerchant');
var util = require('util');
var Promise = require('bluebird');
function VirtualMerchantGateway(options) {

    assert(options.MERCHANT_ID, 'MERCHANT_ID must be defined');
    assert(options.USER_ID, 'USER_ID must be defined');
    assert(options.SSL_PIN, 'SSL_PIN must be defined');

    options.merchant_id = options.MERCHANT_ID;
    options.user_id = options.USER_ID;
    options.ssl_pin = options.SSL_PIN;

    BaseGateway.call(this, options);
    this._gateway = new virtualmerchant(options);
}

util.inherits(VirtualMerchantGateway, BaseGateway);

VirtualMerchantGateway.prototype.submitTransaction = function submitTransaction(order, creditCard, prospect, other) {
    console.log('prospect field are not supported yet');
    console.log('other field are not supported yet');

    return new Promise(function (resolve, reject) {
        var cc = {};
        var ord = {};
        var expMonthString = creditCard.expirationMonth.length === 1 ? '0' + creditCard.expirationMonth : creditCard.expirationMonth;
        var expYearString = creditCard.expirationYear.length === 4 ? creditCard.expirationYear.substring(2) : creditCard.expirationYear;

        ord.converted_amount = order.amount;
        cc.number = creditCard.creditCardNumber.toString();
        cc.expiration = expMonthString + ' / ' + expYearString;
        cc.cvv2 = creditCard.cvv;


        this._gateway.doPurchase(ord, undefined, cc, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    }.bind(this));
};

module.exports = function VirtualMerchantFactory(conf) {
    return new VirtualMerchantGateway(conf);
};