'use strict';

var _ = require('lodash');
var json2xml = require('json2xml');
var xml2json = require('xml2json');
var client = require('request');

module.exports = MyVirtualMerchant;

function MyVirtualMerchant(options) {
    this.merchant_id = options.merchant_id;
    this.user_id = options.user_id;
    this.ssl_pin = options.ssl_pin;
    this.test_mode = options.test_mode || false;
    this.endpoints = this.resolveEndpoints();
}

MyVirtualMerchant.prototype.resolveEndpoints = function () {
    return (this.test_mode) ? {
        process: 'https://demo.myvirtualmerchant.com/VirtualMerchantDemo/process.do',
        process_batch: 'https://demo.myvirtualmerchant.com/VirtualMerchantDemo/processBatch.do',
        process_xml: 'https://demo.myvirtualmerchant.com/VirtualMerchantDemo/processxml.do',
        account_xml: 'https://demo.myvirtualmerchant.com/VirtualMerchantDemo/accountxml.do'
    } : {
        process: 'https://demo.myvirtualmerchant.com/VirtualMerchant/process.do',
        process_batch: 'https://demo.myvirtualmerchant.com/VirtualMerchant/processBatch.do',
        process_xml: 'https://demo.myvirtualmerchant.com/VirtualMerchant/processxml.do',
        account_xml: 'https://demo.myvirtualmerchant.com/VirtualMerchant/accountxml.do'
    };
};

MyVirtualMerchant.prototype.signRequest = function (request) {
    return _.extend(request, {
        ssl_merchant_id: this.merchant_id,
        ssl_user_id: this.user_id,
        ssl_pin: this.ssl_pin
    });
};

MyVirtualMerchant.prototype.processRequest = function (request, callback) {
    client.post(this.endpoints.process_xml, {
        form: {
            xmldata: json2xml({
                txn: this.signRequest(request)
            })
        }
    }, function (error, response, body) {
        try {
            var result = JSON.parse(xml2json.toJson(body)).txn;
            if (result.errorMessage)
                return callback && callback(result);
            return callback && callback(error, result);
        } catch (e) {
            return callback && callback(result);
        }
    });
};

//mandatory
//ssl_transaction_type, ssl_cardNumber, ssl_exp_date, ssl_amount (+ merchants credentials)
MyVirtualMerchant.prototype.doPurchase = function (order, prospect, creditcard, callback) {

    var query = {
        ssl_transaction_type: 'ccsale',
        ssl_card_number: creditcard.number.trim().replace(/ /g, ''), //a lot of assumptions
        ssl_exp_date: creditcard.expiration.split(' / ').join(''),
        ssl_amount: order.converted_amount,
        ssl_cvv2cvc2_indicator: 1, //this should not be mandatory
        ssl_verify: 'Y'//this should not be mandatory
    };
    if (prospect) {
        query.ssl_customer_code = prospect.id;
        query.ssl_first_name = prospect.firstname;
        query.ssl_last_name = prospect.lastname;

        if (prospect.billing) {
            query.ssl_avs_address = prospect.billing.adress;
            query.ssl_as_zip = prospect.billing.zipcode;
        }
    }


    this.processRequest(query, callback);
}
;

MyVirtualMerchant.prototype.doRefund = function (data, callback) {
    this.processRequest({
        ssl_transaction_type: 'ccreturn',
        ssl_txn_id: data.txn_id,
        ssl_amount: data.amount
    }, callback);
};

MyVirtualMerchant.prototype.doVoid = function (data, callback) {
    this.processRequest({
        ssl_transaction_type: 'ccvoid',
        ssl_txn_id: data.txn_id
    }, callback);
};
