'use strict';

var voidtrx = function VoidModel() {
  var transaction = require('../Base/transaction')();
  transaction.setDefaultParameters({
    TRXTYPE: "V",
    TENDER: "C"
  });
  transaction.setValidationParameters(['TRXTYPE', 'TENDER', 'ORIGID']);
  return transaction;
};

module.exports = voidtrx;
