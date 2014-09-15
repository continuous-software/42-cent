'use strict';

var setexpresscheckout = function SetExpressCheckoutModel() {
  var transaction = require('../Base/transaction')();
  transaction.setDefaultParameters({
    ACTION: "S",
    TENDER: "P"
  });
  transaction.setValidationParameters(['AMT', 'TRXTYPE', 'TENDER', 'ACTION', 'RETURNURL', 'CANCELURL']);
  return transaction;
};

module.exports = setexpresscheckout;
