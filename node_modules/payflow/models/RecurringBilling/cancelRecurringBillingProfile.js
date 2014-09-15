'use strict';

var cancelRecurringBillingProfile = function CreateModel() {
  var transaction = require('../Base/transaction')();
  transaction.setDefaultParameters({
    TRXTYPE: "R",
    ACTION: "C",
    TENDER: "P"
  });
  transaction.setValidationParameters(['ORIGPROFILEID']);
  return transaction;
};

module.exports = cancelRecurringBillingProfile;
