'use strict';

var createRecurringBillingProfile = function CreateModel(type) {
  var transaction = require('../Base/transaction')();
  if (type === 'ec') {
    transaction.setDefaultParameters({
      TRXTYPE: "R",
      ACTION: "A",
      TENDER: "P"
    });
    transaction.setValidationParameters(['PROFILENAME', 'START', 'PAYPERIOD', 'TERM', 'AMT', 'TRXTYPE', 'TENDER', 'BAID']);
    return transaction;
  }
  else {
    transaction.setDefaultParameters({
      TRXTYPE: "R",
      ACTION: "A"
    });
    transaction.setValidationParameters(['PROFILENAME', 'START', 'PAYPERIOD', 'TERM', 'AMT', 'TRXTYPE', 'TENDER']);
    return transaction;
  }
};

module.exports = createRecurringBillingProfile;
