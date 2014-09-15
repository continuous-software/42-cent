'use strict';

var getexpresscheckout = function GetExpressCheckoutModel() {
  var transaction = require('../Base/transaction')();
  transaction.setDefaultParameters({
    ACTION: "G",
    TENDER: "P"
  });
  transaction.setValidationParameters(['TOKEN', 'TENDER', 'ACTION']);
  return transaction;
};

module.exports = getexpresscheckout;
