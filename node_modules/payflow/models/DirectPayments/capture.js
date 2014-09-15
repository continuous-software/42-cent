'use strict';

var capture = function CaptureModel() {
  var transaction = require('../Base/transaction')();
  transaction.setDefaultParameters({
    TRXTYPE: "D",
    TENDER: "C"
  });
  transaction.setValidationParameters(['AMT', 'TRXTYPE', 'TENDER', 'ORIGID']);
  return transaction;
};

module.exports = capture;
