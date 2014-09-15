'use strict';

var cancelRecurringBillingProfile = function CreateModel() {
  var transaction = require('../../Base/transaction')();
  transaction.setDefaultParameters({
    TRXTYPE: "R",
    ACTION: "C"
  });
  transaction.setValidationParameters(['ORIGPROFILEID']);
  return transaction;
};

module.exports = cancelRecurringBillingProfile;
