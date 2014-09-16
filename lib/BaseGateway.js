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
 *     <dd>the credit card number used for the transaction - a string with card number digit, no blank, no dash, etc</dd>
 *     <dt>expirationMonth - two digit string : 01 -> 12</dt>
 *     <dd>The month of credit card expiration date</dd>
 *     <dt>expirationYear</dt>
 *     <dd>The year of credit card expiration date - four or two digits string 00 -> 99</dd>
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
 * @return {Promise} - the promise will have these different fields
 *
 * if resolved
 * <dl>
 *      <dt>transactionId</dt>
 *      <dd>A unique identifier of the transaction.</dd>
 *      <dt>authCode</dt>
 *      <dd>authorization code from the banking institution</dd>
 *      <dt>_original<dt>
 *      <dd>the original response from the specific sdk implementation<dd>
 * </dl>
 *
 * if rejected
 *
 * if the rejection occurs because of the gateway the reason will be an instance of {@link GatewayError} holding the following information
 * <dl>
 *     <dt>message</dt>
 *     <dd>The error message from the gateway</dd>
 *     <dt>_original</dt>
 *     <dd>The original response from the specific sdk implementation</dd>
 * </dl>
 *
 * otherwise it will be an instance of standard javascript Error
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

