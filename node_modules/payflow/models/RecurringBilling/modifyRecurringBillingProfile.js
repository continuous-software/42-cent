'use strict';

var cancelRecurringBillingProfile = function CreateModel() {
  var transaction = require('../Base/transaction')();
  transaction.setDefaultParameters({
    TRXTYPE: "R",
    ACTION: "M"
  });
  transaction.setValidationParameters(['ORIGPROFILEID', 'START']);
  return transaction;
};

module.exports = cancelRecurringBillingProfile;
