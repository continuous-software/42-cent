//todo create a module for that
//allow "flat object" and reconstruct schema from there


exports.submitTransaction = function submitTransactionMiddleware(req, res, next) {
    var body = req.body;
    var creditCard = {};
    var prospect = {};
    var other = {};
    var gateway = {}; // todo gateway.use() ....
    //todo build from schema

    gateway.submitTransaction(creditCard, prospect, other).then(function (result) {

    }, function err(error) {

    });


};

