'use strict';

var convertRecurringBillingProfile = function ConvertModel(type) {
  var transaction = require('../Base/transaction')();
  if (type === 'ec') {
    transaction.setDefaultParameters({
      TRXTYPE: "R",
      ACTION: "A",
      TENDER: "P"
    });
    transaction.setValidationParameters(['PROFILENAME', 'START', 'PAYPERIOD', 'TERM', 'AMT', 'TRXTYPE', 'TENDER', 'BAID']);
  } else {
    transaction.setDefaultParameters({
      TRXTYPE: "R",
      ACTION: "A"
    });
    transaction.setValidationParameters(['PROFILENAME', 'START', 'PAYPERIOD', 'TERM', 'AMT', 'TRXTYPE', 'TENDER', 'ORIGID']);
  }
  return transaction;
};

module.exports = convertRecurringBillingProfile;
