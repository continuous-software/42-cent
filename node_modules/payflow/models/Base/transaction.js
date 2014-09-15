'use strict';

var _ = require('underscore');

var transaction = function TransactionModel() {
  var validation_parameters = [];
  var default_parameters = {};
  var parameters = {};
  return {
    getParameters: function () {
      return parameters;
    },
    getDefaultParameters: function () {
      return default_parameters;
    },
    getValidationParameters: function () {
      return validation_parameters;
    },
    appendDefaultParameters: function (params) {
      if (typeof params === 'object') {
        _.extend(default_parameters, params);
      }
      else {
        throw new Error("argument is not an object");
      }
    },
    setDefaultParameters: function (params) {
      if (typeof params === 'object') {
        default_parameters = params;
      }
      else {
        throw new Error("argument is not an object");
      }
    },
    appendValidationParameters: function (params) {
      if (typeof params === 'object') {
        validation_parameters = validation_parameters.concat(params);
      }
      else {
        throw new Error("argument is not an object");
      }
    },
    setValidationParameters: function (params) {
      if (params instanceof Array) {
        validation_parameters = params;
      }
      else {
        throw new Error("argument is not an array");
      }
    },
    exchangeData: function (data) {
      parameters = {};
      _.extend(data, default_parameters);
      parameters = data;
      return parameters;
    },
    validateData: function (data) {
      validation_parameters.forEach(function (v) {
        if (parameters[v] === undefined) {
          throw new Error(v + ": Required parameter for this transaction is undefined");
        }
      });
    }
  };
};

module.exports = transaction;
