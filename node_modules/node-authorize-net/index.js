var Authorize = require('./lib/AuthorizeNet.js');

module.exports = function authorizeFactory(api,transactionKey) {
    return new Authorize(api,transactionKey);
};