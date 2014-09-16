var util = require('util');

/**
 * thrown when a specific gateway return an error message
 * @param {String} message - the error message
 * @param {Object} original - the original message specific to the gateway
 * @constructor
 */
function GatewayError(message, original) {
    Error.call(this, arguments);
    this.message = message;
    this._original = original;
}

util.inherits(GatewayError, Error);

module.exports = {
    GatewayError: GatewayError
};