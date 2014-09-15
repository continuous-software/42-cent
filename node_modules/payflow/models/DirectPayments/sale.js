'use strict';

var sale = function SaleModel() {
  var transaction = require('../Base/transaction')();
  transaction.setDefaultParameters({
    TRXTYPE: "S",
    TENDER: "C"
  });
  transaction.setValidationParameters(['AMT', 'TRXTYPE', 'TENDER', 'ACCT', 'EXPDATE']);
  return transaction;
};

module.exports = sale;
