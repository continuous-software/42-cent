'use strict';

var doexpresscheckout = function DoExpressCheckoutModel() {
  var transaction = require('../Base/transaction')();
  transaction.setDefaultParameters({
    ACTION: "D",
    TENDER: "P"
  });
  transaction.setValidationParameters(['TOKEN', 'TENDER', 'ACTION', 'AMT', 'PAYERID']);
  return transaction;
};

module.exports = doexpresscheckout;
