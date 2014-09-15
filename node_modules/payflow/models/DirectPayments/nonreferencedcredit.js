'use strict';

var refund = function RefundModel() {
  var transaction = require('../Base/transaction')();
  transaction.setDefaultParameters({
    TRXTYPE: "C",
    TENDER: "C"
  });
  transaction.setValidationParameters(['TRXTYPE', 'TENDER', 'ACCT', 'EXPDATE', 'AMT']);
  return transaction;
};

module.exports = refund;
