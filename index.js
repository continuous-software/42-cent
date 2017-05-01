var BaseGateway = require('42-cent-base').BaseGateway;
var AuthorizeNet = require('authorize-net');
var PayFlow = require('payflow').gateway;
var RocketGate = require('rocketgate').gateway;
var VirtualMerchant = require('virtualmerchant').gateway;
var NMI = require('nmi');
var Omise = require('42-cent-omise').factory;
var Stripe = require('42-cent-stripe').factory;
var Braintree = require('42-cent-braintree').factory;
var PayPal = require('42-cent-paypal').factory;
var Payeezy = require('42-cent-payeezy').factory
var WorldPay = require('42-cent-worldpay').factory;
var Beanstream = require('42-cent-beanstream').factory;
var Moneris = require('42-cent-moneris');
var supportedGateway = {
  "Authorize.Net": AuthorizeNet,
  "PayFlow": PayFlow,
  "RocketGate": RocketGate,
  "VirtualMerchant": VirtualMerchant,
  "NMI": NMI,
  "Omise": Omise,
  "Stripe": Stripe,
  "Braintree": Braintree,
  "PayPal": PayPal,
  "Payeezy": Payeezy,
  "WorldPay": WorldPay,
  "Beanstream": Beanstream,
  "Moneris": Moneris
};
var CreditCard = require('42-cent-model').CreditCard;
var Prospect = require('42-cent-model').Prospect;
var SubscriptionPlan = require('42-cent-model').SubscriptionPlan;
var Order = require('42-cent-model').Order;


/**
 * @param {String} gateway - the name of a registered gateway
 * @param {Object} constructorOption - an object with the properties required by a particular Gateway factory,
 * see the relevant gateway factory for more details
 * @returns {BaseGateway} an object which inherits (prototype) from BaseGateway
 */
exports.use = function use (gateway, constructorOption) {

  var gatewayFactory = supportedGateway[gateway];
  var gw;

  if (!gatewayFactory) {
    throw new Error('the gateway provided does not match any item of the list...todo');
  }

  gw = gatewayFactory(constructorOption);

  if (!gw instanceof BaseGateway) {
    throw new Error('the gateway must be an instance of the BaseGateway');
  }

  return gw;
};

/**
 * register a new gateway factory (note it will overwrite an existing one
 * @param {String} name - the gateway name
 * @param {Function} factory - a factory function which must return an instance of BaseGateway
 */
exports.registerGateway = function registerGateway (name, factory) {
  supportedGateway[name] = factory;
};

exports.createCreditCard = function (creditCard) {
  return new CreditCard(creditCard);
};

exports.createProspect = function (prospect) {
  return new Prospect(prospect);
};

exports.createSubscriptionPlan = function creatSubscriptionPlan (options) {
  return new SubscriptionPlan(options);
};

exports.createOrder = function createOrder (order) {
  return new Order(order)
};
