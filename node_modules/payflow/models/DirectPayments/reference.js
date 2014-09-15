'use strict';

var reference = function ReferenceModel() {
  var transaction = require('../Base/transaction')();
  transaction.setDefaultParameters({

  });
  transaction.setValidationParameters(['AMT', 'TRXTYPE', 'TENDER', 'ORIGID']);
  return transaction;
};

module.exports = reference;
