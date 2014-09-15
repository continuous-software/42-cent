//todo create a module for that

var assert = require('assert');
var payFlow = require('payflow');
var util = require('util');
var BaseGateway = require('./BaseGateway.js');
var mapKeys = require('./mapKeys.js');
var _ = require('lodash');
var Promise = require('bluebird');
var flat = require('./flat.js');

var ccschema = {
    creditCardNumber: 'ACCT',
    amount: 'AMT',
    cvv: 'CVV2',
    expDate: 'EXPDATE'
};

function PayFlowGateway(options) {
    assert(options.PARTNER, 'PARTNER must be provided');
    assert(options.VENDOR, 'VENDOR must be provided');
    assert(options.USER, 'USER must be provided');
    assert(options.PWD, 'PWD must be provided');

    options.credentials = {
        "PARTNER": options.PARTNER,
        "VENDOR": options.VENDOR,
        "USER": options.USER,
        "PWD": options.PWD
    };

    BaseGateway.call(this, options);

    payFlow.configure(options);

    this._gateway = payFlow;
}

util.inherits(PayFlowGateway, BaseGateway);

PayFlowGateway.prototype.submitTransaction = function submitTransaction(order, creditCard, prospect, other) {

    console.log('prospect field are not supported yet');
    console.log('other field are not supported yet');

    return new Promise(function (resolve, reject) {
        var mixin = {};
        var month = creditCard.expirationMonth.length === 1 ? '0' + creditCard.expirationMonth : creditCard.expirationMonth;
        var year = creditCard.expirationYear.length === 4 ? creditCard.expirationYear.substr(2) : creditCard.expirationYear;
        mixin.expDate = month + year;
        _.assign(mixin, order);
        _.assign(mixin, creditCard);

        mixin = flat(mixin);

        var requestConf = mapKeys(mixin, ccschema);

        requestConf.TRXTYPE = 'S';
        requestConf.TENDER = 'C';

        this._gateway.execute(requestConf, function (err, result) {
            if (err) {
                reject();
            } else {
                resolve(result);
            }
        });
    }.bind(this));
};


module.exports = function (conf) {
    return new PayFlowGateway(conf);
};