//todo create a npm module for that
//todo find a way to publish the "schema"

var _ = require('lodash');
var Promise = require('bluebird');

function throwNotImplemented() {
    return new Error('method not implemented/supported by this gateway');
}

function BaseGateway(options) {
    _.assign(this, options);
}

/**
 * authorize and capture a transaction.
 *
 * all values must be Strings
 *
 * @param {Object} order - the fields related to the order
 * <dl>
 *     <dt>amount</dt>
 *     <dd>the amount of the transaction</dd>
 * </dl>
 * @param {Object} creditCard - object holding credit card information
 * <dl>
 *     <dt>creditCardNumber</dt>
 *     <dd>the credit card number used for the transaction</dd>
 *     <dt>expirationMonth</dt>
 *     <dd>The month of credit card expiration date</dd>
 *     <dt>expirationYear</dt>
 *     <dd>The year of credit card expiration date</dd>
 *     <dt>cardHolder</dt>
 *     <dd>An object holding card owner information:
 *          <dl>
 *           <dt>firstName</dt>
 *           <dd>the first name of the card holder</dd>
 *           <dt>lastName</dt>
 *           <dd>the last name of the card holder</dd>
 *           <dt>fullName</dt>
 *           <dd>the card owner full name will be used instead of firstName and lastName if provided</dd>
 *          </dl>
 *     </dd>
 *     <dt>cvv</dt>
 *     <dd>the credit card cvv number</dd>
 * </dl>
 * @param prospect
 * //todo
 * @param other
 * //todo
 * @return {Promise}
 * //todo defined what this promise should be resolve with
 */
BaseGateway.prototype.submitTransaction = function submitTransaction(order, creditCard, prospect, other) {
    return Promise.reject(throwNotImplemented());
};

//todo
BaseGateway.prototype.voidTransaction = function voidTransaction(transactionId) {
    return Promise.reject(throwNotImplemented());
};

//todo
BaseGateway.prototype.authOnly = function authOnly() {
    return Promise.reject(throwNotImplemented());
};

//todo
BaseGateway.prototype.refundTransaction = function refundTransaction(transactionId) {
    return Promise.reject(throwNotImplemented());
};

//todo
BaseGateway.prototype.getTransactionDetails = function getTransactionDetails(transactionId) {
    return Promise.reject(throwNotImplemented());
};


module.exports = BaseGateway;

