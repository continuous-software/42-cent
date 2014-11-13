var extend = require('util')._extend;

function Prospect(data) {
    var dataOrDefault = data || {};
    extend(this, dataOrDefault);
}

Prospect.prototype.withCustomerFirstName = function customerFirstName(name) {
    this.customerFirstName = name;
    return this;
};

Prospect.prototype.withCustomerLastName = function customerLastName(name) {
    this.customerLastName = name;
    return this;
};

Prospect.prototype.withCustomerEmail = function customerEmail(email) {
    this.customerEmail = email;
    return this;
};

Prospect.prototype.withBillingAddress = function billingAddress(address) {
    this.billingAddress = address;
    return this;
};

Prospect.prototype.withBillingCity = function billingCity(city) {
    this.billingCity = city;
    return this;
};

Prospect.prototype.withBillingState = function billingState(state) {
    this.billingState = state;
    return this;
};

Prospect.prototype.withBillingCountry = function billingCountry(country) {
    this.billingCountry = country;
    return this;
};


Prospect.prototype.withShippingFirstName = function shippingFirstName(name) {
    this.shippingFirstName = name;
    return this;
};

Prospect.prototype.withShippingLastName = function shippingLastName(name) {
    this.shippingLastName = name;
    return this;
};

Prospect.prototype.withShippingAddress = function shippingAddress(address) {
    this.shippingAddress = address;
    return this;
};

Prospect.prototype.withShippingCity = function shippingCity(city) {
    this.shippingCity = city;
    return this;
};

Prospect.prototype.withShippingState = function shippingState(state) {
    this.shippingState = state;
    return this;
};

Prospect.prototype.withShippingCountry = function shippingCountry(country) {
    this.shippingCountry = country;
    return this;
};

module.exports = Prospect;

