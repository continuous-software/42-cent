var extend = require('util')._extend;

function CreditCard(data) {
    var dataOrDefault = data || {};
    extend(this, dataOrDefault);
}

CreditCard.prototype.withCreditCardNumber = function creditCardNumber(number) {
    this.creditCardNumber = number;
    return this;
};

CreditCard.prototype.withExpirationMonth = function expirationMonth(month) {
    this.expirationMonth = month;
    return this;
};

CreditCard.prototype.withExpirationYear = function expirationYear(year) {
    this.expirationYear = year;
    return this;
};

CreditCard.prototype.withCvv = function cvv(cvv) {
    this.cvv = cvv;
    return this;
};

module.exports = CreditCard;


