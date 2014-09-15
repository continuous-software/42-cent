"use strict";

var _ = require('lodash');
var toJson = require('xml2json').toJson;
var toXml = require('json2xml');
var Promise = require('bluebird');
var request = require('request');
var assert = require('assert');
var errors = require('./errors.js');
var AuthorizeNetError = errors.AuthorizeNetError;
var HttpError = errors.HttpError;
var flat = require('./applySchema.js');

var endpoints = {
    prod: 'https://api.authorize.net/xml/v1/request.api',
    test: 'https://apitest.authorize.net/xml/v1/request.api'
};

function wrap(rootElementName, jsonObject) {

    var _attr = {
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
        "xmlns": "AnetApi/xml/v1/schema/AnetApiSchema.xsd"
    };
    var toParse = {};
    toParse[rootElementName] = jsonObject;
    toParse.attr = _attr;


    return toXml(toParse, {header: true, attributes_key: 'attr'});
}

function requestCallBack(resolve, reject, rootNodeName) {

    var jsonBody;
    var root = rootNodeName || 'createTransactionResponse';
    var res;

    return function callback(err, response, body) {
        if (err) {
            return reject(err);
        }

        if (response.statusCode >= 400) {
            throw new HttpError(response);
        }

        jsonBody = JSON.parse(toJson(body));
        res = jsonBody[root];

        if (res && res.messages.resultCode === 'Ok') {
            return resolve(res);
        } else {
            return reject(new AuthorizeNetError(jsonBody[root] || jsonBody));
        }
    }
}

function generateRequestConfiguration(service, transactionRequest, rootElementName) {

    var xmlContent = wrap(rootElementName || 'createTransactionRequest', transactionRequest);

    return {
        url: service.endpoint,
        headers: {
            'Content-Type': 'application/xml',
            'Content-Length': xmlContent.length
        },
        body: xmlContent
    }
}

/**
 * @param apiLogin
 * @param transactionKey
 * @constructor
 */
function AuthorizeNet(apiLogin, transactionKey) {

    assert(apiLogin, 'API login is required');
    assert(transactionKey, 'Transaction key is required');

    this.merchantInfo = {
        name: apiLogin,
        transactionKey: transactionKey
    };
    this.endpoint = process.env.NODE_ENV === 'production' ? endpoints.prod : endpoints.test;
}

/**
 *<p> submit a transaction request type authCaptureTransaction. </p>
 * <ul>
 *  <li>will resolve with an json object representing the <em>createTransactionResponse</em> xml field of the web service response it the resultCode is <code>"Ok"</code></li>
 *  <li>will reject with an instance of AuthorizationNetError whose properties will be json version of the xml field <em>createTransactionResponse</em> if the resultCode is not <code>"Ok"</code></li>
 *  <li>will reject with an instance of HttpError if the http status code of the response is higher or equal to 400</li>
 *  <li>will reject with an instance of AssertionError if one of the mandatory field is falsy</li>
 *  <li>will reject with an instance of Error if any other error occurs (parsing, etc)</li>
 * </ul>
 * @param {string |number} amount - the amount of the transaction
 * @param {string | number } cardNumber - the card number used for the transaction
 * @param {string | number} expirationYear - a four digits number for the expiration year of the card
 * @param {string | number} expirationMonth - one or two digit for the expiration month of the card
 * @param {object} [other] - a json object you want to mix with the transactionRequest field before transformation into xml. Note it will override already assigned properties
 * @returns {Promise}
 */
AuthorizeNet.prototype.authCaptureTransaction = function authCaptureTransaction(amount, cardNumber, expirationYear, expirationMonth, other) {

    var self = this;

    return new Promise(function (resolve, reject) {

        assert(amount, 'amount is required');
        assert(cardNumber, 'cardNumber is required');
        assert(expirationYear, 'expirationYear is required');
        assert(expirationMonth, 'expirationMonth is required');

        var creditCard = { cardNumber: cardNumber, expirationDate: expirationYear.toString() + '-' + expirationMonth.toString() };
        var transactionRequest = {
            transactionRequest: {
                amount: amount,
                transactionType: 'authCaptureTransaction',
                payment: {
                    creditCard: creditCard
                }
            },
            merchantAuthentication: self.merchantInfo
        };

        var toSend = other || {};
        _.merge(toSend, transactionRequest);


        request.post(generateRequestConfiguration(self, flat.transactionRequest(toSend)), requestCallBack(resolve, reject));
    });
};

/**
 *<p> submit a transaction request type authOnlyTransaction. </p>
 *  <ul>
 *  <li>will resolve with an json object representing the <em>createTransactionResponse</em> xml field of the web service response it the resultCode is <code>"Ok"</code></li>
 *  <li>will reject with an instance of AuthorizationNetError whose properties will be json version of the xml field <em>createTransactionResponse</em> if the resultCode is not <code>"Ok"</code></li>
 *  <li>will reject with an instance of HttpError if the http status code of the response is higher or equal to 400</li>
 *  <li>will reject with an instance of AssertionError if one of the mandatory field is falsy</li>
 *  <li>will reject with an instance of Error if any other error occurs (parsing, etc)</li>
 * </ul>
 * @param {number} amount - the amount of the transaction
 * @param {string | number } cardNumber - the card number used for the transaction
 * @param {number} expirationYear - a four digits number for the expiration year of the card
 * @param expirationMonth - one or two digit for the expiration month of the card
 * @param {object} [other] - a json object you want to mix with the transactionRequest field before transformation into xml. Note it will override already assigned properties
 * @returns {Promise}
 */
AuthorizeNet.prototype.authOnlyTransaction = function authOnlyTransaction(amount, cardNumber, expirationYear, expirationMonth, other) {

    var self = this;

    return new Promise(function (resolve, reject) {

        assert(amount, 'amount is required');
        assert(cardNumber, 'cardNumber is required');
        assert(expirationYear, 'expirationYear is required');
        assert(expirationMonth, 'expirationMonth is required');

        var creditCard = { cardNumber: cardNumber, expirationDate: expirationYear.toString() + '-' + expirationMonth.toString() };
        var transactionRequest = {
            merchantAuthentication: self.merchantInfo,
            transactionRequest: {
                transactionType: 'authOnlyTransaction',
                amount: amount,
                payment: {
                    creditCard: creditCard
                }
            }
        };
        var toSend = other || {};
        _.merge(toSend, transactionRequest);

        request.post(generateRequestConfiguration(self, flat.transactionRequest(toSend)), requestCallBack(resolve, reject));
    });
};

/**
 *<p> submit a transaction request type priorAuthCaptureTransaction. </p>
 *  <ul>
 *  <li>will resolve with an json object representing the <em>createTransactionResponse</em> xml field of the web service response it the resultCode is <code>"Ok"</code></li>
 *  <li>will reject with an instance of AuthorizationNetError whose properties will be json version of the xml field <em>createTransactionResponse</em> if the resultCode is not <code>"Ok"</code></li>
 *  <li>will reject with an instance of HttpError if the http status code of the response is higher or equal to 400</li>
 *  <li>will reject with an instance of AssertionError if one of the mandatory field is falsy</li>
 *  <li>will reject with an instance of Error if any other error occurs (parsing, etc)</li>
 * </ul>
 * @param {String|number} refTransId - the transaction reference id returned by the web service after the related authorize only transaction
 * @param {number} amount - the amount of the transaction
 * @param {object} [other] - a json object you want to mix with the transactionRequest field before transformation into xml. Note it will override already assigned properties
 * @returns {Promise}
 *
 *
 */
AuthorizeNet.prototype.priorAuthCaptureTransaction = function captureOnlyTransaction(refTransId, amount, other) {

    var self = this;

    return new Promise(function (resolve, reject) {

        assert(amount, 'amount is required');
        assert(refTransId, 'refTransId is required');

        var transactionRequest = {
            merchantAuthentication: self.merchantInfo,
            transactionRequest: {
                transactionType: 'priorAuthCaptureTransaction',
                amount: amount,
                refTransId: refTransId
            }
        };

        var toSend = other || {};
        _.merge(toSend, transactionRequest);

        request.post(generateRequestConfiguration(self, flat.transactionRequest(transactionRequest)), requestCallBack(resolve, reject));
    });
};

AuthorizeNet.prototype.refundTransaction = function refundTransaction(refTransId, amount, cardNumber, expirationYear, expirationMonth, other) {
    var self = this;

    return new Promise(function (resolve, reject) {

        assert(refTransId, 'refTransId is required');
        assert(amount, 'amount is required');
        assert(cardNumber, 'cardNumber is required');
        assert(expirationYear, 'expirationYear is required');
        assert(expirationMonth, 'expirationMonth is required');

        var creditCard = { cardNumber: cardNumber, expirationDate: expirationYear.toString() + '-' + expirationMonth.toString() };
        var transactionRequest = {
            merchantAuthentication: self.merchantInfo,
            transactionRequest: {
                transactionType: 'refundTransaction',
                amount: amount,
                refTransId: refTransId,
                payment: {
                    creditCard: creditCard
                }
            }
        };

        var toSend = other || {};
        _.merge(toSend, transactionRequest);

        request.post(generateRequestConfiguration(self, flat.transactionRequest(toSend)), requestCallBack(resolve, reject));
    });
};

/**
 *<p> submit a transaction request type voidTransaction. </p>
 *  <ul>
 *  <li>will resolve with an json object representing the <em>createTransactionResponse</em> xml field of the web service response it the resultCode is <code>"Ok"</code></li>
 *  <li>will reject with an instance of AuthorizationNetError whose properties will be json version of the xml field <em>createTransactionResponse</em> if the resultCode is not <code>"Ok"</code></li>
 *  <li>will reject with an instance of HttpError if the http status code of the response is higher or equal to 400</li>
 *  <li>will reject with an instance of AssertionError if one of the mandatory field is falsy</li>
 *  <li>will reject with an instance of Error if any other error occurs (parsing, etc)</li>
 * </ul>
 * @param {String|number} refTransId - the transaction reference id (you want to void) returned by the web service.
 * @param {object} [other] - a json object you want to mix with the transactionRequest field before transformation into xml. Note it will override already assigned properties
 * @returns {Promise}
 */
AuthorizeNet.prototype.voidTransaction = function voidTransaction(refTransId, other) {
    var self = this;

    return new Promise(function (resolve, reject) {

        assert(refTransId, 'refTransId is required');

        var transactionRequest = {
            merchantAuthentication: self.merchantInfo,
            transactionRequest: {
                transactionType: 'voidTransaction',
                refTransId: refTransId
            }
        };

        var toSend = other || {};
        _.merge(toSend, transactionRequest);

        request.post(generateRequestConfiguration(self, flat.transactionRequest(transactionRequest)), requestCallBack(resolve, reject));
    });
};

/**
 *<p> submit a getTransactionDetails request </p>
 *  <ul>
 *  <li>will resolve with an json object representing the <em>getTransactionDetailResponse</em> xml field of the web service response it the resultCode is <code>"Ok"</code></li>
 *  <li>will reject with an instance of AuthorizationNetError whose properties will be json version of the xml field <em>createTransactionResponse</em> if the resultCode is not <code>"Ok"</code></li>
 *  <li>will reject with an instance of HttpError if the http status code of the response is higher or equal to 400</li>
 *  <li>will reject with an instance of AssertionError if one of the mandatory field is falsy</li>
 *  <li>will reject with an instance of Error if any other error occurs (parsing, etc)</li>
 * </ul>
 * @param {String|number} refTransId - the transaction reference id (you want to void) returned by the web service.
 * @returns {Promise}
 */
AuthorizeNet.prototype.getTransactionDetails = function getTransactionDetailRequest(refTransId) {
    var self = this;

    return new Promise(function (resolve, reject) {

        assert(refTransId, 'refTransId is required');

        var transactionRequest = {
            merchantAuthentication: self.merchantInfo,
            transId: refTransId
        };

        request.post(generateRequestConfiguration(self, transactionRequest, 'getTransactionDetailsRequest'), requestCallBack(resolve, reject, 'getTransactionDetailsResponse'));
    });
};

/**
 *<p> submit a getTransactionDetails request </p>
 *  <ul>
 *  <li>will resolve with an json object representing the <em>getUnsettledTransactionListResponse</em> xml field of the web service response it the resultCode is <code>"Ok"</code></li>
 *  <li>will reject with an instance of AuthorizationNetError whose properties will be json version of the xml field <em>createTransactionResponse</em> if the resultCode is not <code>"Ok"</code></li>
 *  <li>will reject with an instance of HttpError if the http status code of the response is higher or equal to 400</li>
 *  <li>will reject with an instance of AssertionError if one of the mandatory field is falsy</li>
 *  <li>will reject with an instance of Error if any other error occurs (parsing, etc)</li>
 * </ul>
 * @returns {Promise}
 */
AuthorizeNet.prototype.getUnsettledTransactionList = function () {
    var self = this;

    return new Promise(function (resolve, reject) {

        var transactionRequest = {
            merchantAuthentication: self.merchantInfo
        };

        request.post(generateRequestConfiguration(self, transactionRequest, 'getUnsettledTransactionListRequest'), requestCallBack(resolve, reject, 'getUnsettledTransactionListResponse'));
    });
};

/**
 *<p> get a batch list of already settled transactions </p>
 *  <ul>
 *  <li>will resolve with an json object representing the <em>getBatchListResponse</em> xml field of the web service response it the resultCode is <code>"Ok"</code></li>
 *  <li>will reject with an instance of AuthorizationNetError whose properties will be json version of the xml field <em>createTransactionResponse</em> if the resultCode is not <code>"Ok"</code></li>
 *  <li>will reject with an instance of HttpError if the http status code of the response is higher or equal to 400</li>
 *  <li>will reject with an instance of AssertionError if one of the mandatory field is falsy</li>
 *  <li>will reject with an instance of Error if any other error occurs (parsing, etc)</li>
 * </ul>
 * @param {boolean} [withStats] - if true the response will include detailed view of the statistics
 * @param {Date} [startDate] - a date object to define the lower bound of the time window requested
 * @param {Date} [lastDate] - a date object to define the higher bound of the time window requested
 *
 * @returns {Promise}
 */
AuthorizeNet.prototype.getSettledBatchList = function getSettleBatchList(withStats, startDate, lastDate) {
    var self = this;

    return new Promise(function (resolve, reject) {

        var monthString;
        var dayString;
        var hourString;
        var minuteString;

        var batchListRequest = {
            merchantAuthentication: self.merchantInfo
        };

        function formatString(date) {

            monthString = (date.getUTCMonth() + 1).toString();
            monthString = monthString.length === 2 ? monthString : '0' + monthString;

            dayString = (date.getUTCDate()).toString();
            dayString = dayString.length === 2 ? dayString : '0' + dayString;

            hourString = (date.getUTCHours()).toString();
            hourString = hourString.length === 2 ? hourString : '0' + hourString;

            minuteString = (date.getUTCMinutes()).toString();
            minuteString = minuteString.length === 2 ? minuteString : '0' + minuteString;


            return date.getUTCFullYear() + '-' + monthString + '-' + dayString + 'T' + hourString + ':' + minuteString + ':00Z';
        }

        batchListRequest.includeStatistics = withStats;

        if (startDate && lastDate) {
            batchListRequest.firstSettlementDate = formatString(startDate);
            batchListRequest.lastSettlementDate = formatString(lastDate);
        }

        request.post(generateRequestConfiguration(self, batchListRequest, 'getSettledBatchListRequest'), requestCallBack(resolve, reject, 'getSettledBatchListResponse'));

    });
};

/**
 *<p> get statistics for a particular batch </p>
 *  <ul>
 *  <li>will resolve with an json object representing the <em>getBatchStatisticsResponse</em> xml field of the web service response it the resultCode is <code>"Ok"</code></li>
 *  <li>will reject with an instance of AuthorizationNetError whose properties will be json version of the xml field <em>createTransactionResponse</em> if the resultCode is not <code>"Ok"</code></li>
 *  <li>will reject with an instance of HttpError if the http status code of the response is higher or equal to 400</li>
 *  <li>will reject with an instance of AssertionError if one of the mandatory field is falsy</li>
 *  <li>will reject with an instance of Error if any other error occurs (parsing, etc)</li>
 * </ul>
 * @param {string | number} batchId - the batch id requested
 * @returns {Promise}
 */
AuthorizeNet.prototype.getBatchStatistics = function getBatchStatistics(batchId) {
    var self = this;

    return new Promise(function (resolve, reject) {

        assert(batchId, 'batchId is mandatory');

        var batchRequest = {
            merchantAuthentication: self.merchantInfo,
            batchId: batchId
        };

        request.post(generateRequestConfiguration(self, batchRequest, 'getBatchStatisticsRequest'), requestCallBack(resolve, reject, 'getBatchStatisticsResponse'));

    });
};

module.exports = AuthorizeNet;
