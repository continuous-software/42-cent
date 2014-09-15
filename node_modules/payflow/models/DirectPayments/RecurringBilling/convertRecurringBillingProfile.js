'use strict';

var convertRecurringBillingProfile = function ConvertModel(type) {
  var transaction = require('../../Base/transaction')();
  transaction.setDefaultParameters({
    TRXTYPE: "R",
    ACTION: "A"
  });
  transaction.setValidationParameters(['PROFILENAME', 'START', 'PAYPERIOD', 'TERM', 'AMT', 'TRXTYPE', 'TENDER', 'ORIGID']);
  return transaction;
};

module.exports = convertRecurringBillingProfile;
