var util = require('util');

/**
 * Thrown when a gateway do not return an ok status response
 * @constructor
 */
function GatewayError() {
    Error.call(this, arguments);
}

util.inherits(GatewayError, Error);

module.exports = {
    GatewayError: GatewayError
};