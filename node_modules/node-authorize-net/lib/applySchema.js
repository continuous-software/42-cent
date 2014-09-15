//xsd schema expects a sequence of fields, Javascript json object (map) does not ensure an order in the keys, we have to use arrays

//schema not complete ...
var transactionRequestSchema = [
    {node: 'merchantAuthentication', value: [
        {node: 'name'},
        {node: 'transactionKey'}
    ]},
    {node: 'transactionRequest', value: [
        {node: 'transactionType'},
        {node: 'amount'},
        {node: 'refTransId'},
        {node: 'payment', value: [
            {node: 'trackData', value: [
                {node: 'track1'},
                {node: 'track2'}
            ]},
            {node: 'creditCard', value: [
                {node: 'cardNumber'},
                {node: 'expirationDate'},
                {node: 'cardCode'}
            ]}
        ]}
    ]}
];

function applySchema(schema, obj) {
    var out = [];
    schema.forEach(function (val, index) {
        var key = val.node;
        var value = val.value;
        var node = {};

        if (!value) {
            //leaf
            if (obj[key]) {
                node[key] = obj[key];
                out.push(node);
            }
        } else if (obj[key]) {
            //branch
            node[key] = applySchema(value, obj[key]);
            out.push(node);
        }
    });

    return out;
}

module.exports = {
    transactionRequest: applySchema.bind(null, transactionRequestSchema)
};
