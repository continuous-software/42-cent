'use strict';

var createRecurringBillingProfile = function CreateModel() {
  var transaction = require('../../Base/transaction')();
  transaction.setDefaultParameters({
    TRXTYPE: "R",
    ACTION: "A"
  });
  transaction.setValidationParameters(['PROFILENAME', 'START', 'PAYPERIOD', 'TERM', 'AMT', 'TRXTYPE', 'TENDER', 'ACCT', 'EXPDATE']);
  return transaction;
};

module.exports = createRecurringBillingProfile;
