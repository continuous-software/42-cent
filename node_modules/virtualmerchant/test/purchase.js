'use strict';

var should = require('should');
var MyVirtualMerchant = require('../.');

var gateway = new MyVirtualMerchant({
  merchant_id: '', // your merchant_id
  user_id: '', // your user_id
  ssl_pin: '', // your ssl_ping
  test_mode: false
});

describe('purchase', function() {
  this.timeout(0);
  it('should perform purchase', function(done) {
    gateway.doPurchase({
      card_number: '5000300020003003',
      exp_date: '0419',
      amount: '0.42'
    }, function(error, result) {
      console.log(result);
      done();
    });
  });
});

describe('refund', function() {
  this.timeout(0);
  it('should perform a purchase then refund it', function(done) {
    gateway.doPurchase({
      card_number: '5000300020003003',
      exp_date: '0419',
      amount: '0.84'
    }, function(error, result) {
      console.log(result);
      gateway.doRefund({
        txn_id: result.ssl_txn_id,
        amount: '0.84'
      }, function(error, result) {
        console.log(result);
        done();
      });
    });
  });
});

describe('void', function() {
  this.timeout(0);
  it('should perform a purchase then void it', function(done) {
    gateway.doPurchase({
      card_number: '5000300020003003',
      exp_date: '0419',
      amount: '1.23'
    }, function(error, result) {
      console.log(result);
      gateway.doVoid({
        txn_id: result.ssl_txn_id
      }, function(error, result) {
        console.log(result);
        done();
      });
    });
  });
});
