var _ = require('lodash');

module.exports = function flat(object, target) {

    var output = target || {};

    _.forOwn(object, function (val, key) {
        if (_.isObject(val) || _.isArray(val)) {
            flat(val, output);
        } else {
            output[key] = val;
        }
    });

    return output;
};
