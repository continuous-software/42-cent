'use strict';

var authorization = function AuthorizationModel() {
  var transaction = require('../Base/transaction')();
  transaction.setDefaultParameters({
    TRXTYPE: "A",
    TENDER: "C"
  });
  transaction.setValidationParameters(['AMT', 'TRXTYPE', 'TENDER', 'ACCT', 'EXPDATE']);
  return transaction;
};

module.exports = authorization;
