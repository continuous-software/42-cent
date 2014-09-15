'use strict';

var setec = require('../setexpresscheckout.js')();

setec.appendDefaultParameters({BILLINGTYPE: "MerchantInitiatedBilling"});
setec.appendValidationParameters(['BILLINGTYPE']);

module.exports = setec;
