var AuthorizeNet = require('42-cent-authorizenet');
var BaseGateway = require('42-cent-base').BaseGateway;
var PayFlow = require('42-cent-payflow');
var RocketGate = require('42-cent-rocketgate');
var VirtualMerchant = require('42-cent-virtualmerchant');
var nmi = require('42-cent-nmi');
var supportedGateway = {
    "Authorize.Net": AuthorizeNet,
    "PayFlow": PayFlow,
    "RocketGate": RocketGate,
    "VirtualMerchant": VirtualMerchant,
    "NMI": nmi
};
var CreditCard = require('./models/creditCard.js');
var Prospect = require('./models/prospect.js');


/**
 * @param {String} gateway - the name of a registered gateway
 * @param {Object} constructorOption - an object with the properties required by a particular Gateway factory,
 * see the relevant gateway factory for more details
 * @returns {BaseGateway} an object which inherits (prototype) from BaseGateway
 */
exports.use = function use(gateway, constructorOption) {

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
exports.registerGateway = function registerGateway(name, factory) {
    supportedGateway[name] = factory;
};

exports.createCreditCard = function (creditCard) {
    return new CreditCard(creditCard);
};

exports.createProspect = function (prospect) {
    return new Prospect(prospect);
};
