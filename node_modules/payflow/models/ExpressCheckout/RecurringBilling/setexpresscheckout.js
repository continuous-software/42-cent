'use strict';

var setec = require('../setexpresscheckout.js')();

setec.appendDefaultParameters({BILLINGTYPE: "RecurringBilling"});
setec.appendValidationParameters(['BILLINGTYPE']);

module.exports = setec;
