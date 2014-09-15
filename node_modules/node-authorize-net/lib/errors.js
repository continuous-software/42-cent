"use strict";

var util = require('util');
var _ = require('lodash');

function AuthorizeNetError(error) {
    Error.call(this);
    _.assign(this, error);
}

function HttpError(response) {
    Error.call(this);
    _.assign(this, response);
}

util.inherits(AuthorizeNetError, Error);
util.inherits(HttpError, Error);

module.exports = {
    AuthorizeNetError: AuthorizeNetError,
    HttpError: HttpError
};
