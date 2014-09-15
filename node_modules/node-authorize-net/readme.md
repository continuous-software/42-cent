[![build status](https://travis-ci.org/continuous-software/node-authorize-net.svg?branch=master)](https://travis-ci.org/continuous-software/node-authorize-net)

# node-authorize-net

a nodejs sdk to communicate with [authorize.net](http://www.authorize.net/) payment gateway.

## installation

`npm install node-authorize-net`

## test

`npm test`

## usage

1. create a service by passing your apiLogin and your transaction key
2. You can then call any method listed on the api. These methods return Promises. See API documentation for further details

```javascript
    var service=require('node-authorize-net')(apiloging,key);

    service.authCaptureTransaction(amount, cardNumber, expirationYear, expirationMonth).then(function (transaction) {
        
        //process the response
        
        assert.equal(transaction.transactionResponse.responseCode, '1');
    });
```

## api

###Global





---

### AuthorizeNet



#### authCaptureTransaction(amount, cardNumber, expirationYear, expirationMonth, other) 

<p> submit a transaction request type authCaptureTransaction. </p>
<ul>
 <li>will resolve with an json object representing the <em>createTransactionResponse</em> xml field of the web service response it the resultCode is <code>"Ok"</code></li>
 <li>will reject with an instance of AuthorizationNetError whose properties will be json version of the xml field <em>createTransactionResponse</em> if the resultCode is not <code>"Ok"</code></li>
 <li>will reject with an instance of HttpError if the http status code of the response is higher or equal to 400</li>
 <li>will reject with an instance of AssertionError if one of the mandatory field is falsy</li>
 <li>will reject with an instance of Error if any other error occurs (parsing, etc)</li>
</ul>

**Parameters**

**amount**: string | number, the amount of the transaction

**cardNumber**: string | number, the card number used for the transaction

**expirationYear**: string | number, a four digits number for the expiration year of the card

**expirationMonth**: string | number, one or two digit for the expiration month of the card

**other**: object, a json object you want to mix with the transactionRequest field before transformation into xml. Note it will override already assigned properties

**Returns**: Promise, 
#### authOnlyTransaction(amount, cardNumber, expirationYear, expirationMonth, other) 

<p> submit a transaction request type authOnlyTransaction. </p>
 <ul>
 <li>will resolve with an json object representing the <em>createTransactionResponse</em> xml field of the web service response it the resultCode is <code>"Ok"</code></li>
 <li>will reject with an instance of AuthorizationNetError whose properties will be json version of the xml field <em>createTransactionResponse</em> if the resultCode is not <code>"Ok"</code></li>
 <li>will reject with an instance of HttpError if the http status code of the response is higher or equal to 400</li>
 <li>will reject with an instance of AssertionError if one of the mandatory field is falsy</li>
 <li>will reject with an instance of Error if any other error occurs (parsing, etc)</li>
</ul>

**Parameters**

**amount**: number, the amount of the transaction

**cardNumber**: string | number, the card number used for the transaction

**expirationYear**: number, a four digits number for the expiration year of the card

**expirationMonth**: one or two digit for the expiration month of the card

**other**: object, a json object you want to mix with the transactionRequest field before transformation into xml. Note it will override already assigned properties

**Returns**: Promise, 
#### priorAuthCaptureTransaction(refTransId, amount, other) 

<p> submit a transaction request type priorAuthCaptureTransaction. </p>
 <ul>
 <li>will resolve with an json object representing the <em>createTransactionResponse</em> xml field of the web service response it the resultCode is <code>"Ok"</code></li>
 <li>will reject with an instance of AuthorizationNetError whose properties will be json version of the xml field <em>createTransactionResponse</em> if the resultCode is not <code>"Ok"</code></li>
 <li>will reject with an instance of HttpError if the http status code of the response is higher or equal to 400</li>
 <li>will reject with an instance of AssertionError if one of the mandatory field is falsy</li>
 <li>will reject with an instance of Error if any other error occurs (parsing, etc)</li>
</ul>

**Parameters**

**refTransId**: String | number, the transaction reference id returned by the web service after the related authorize only transaction

**amount**: number, the amount of the transaction

**other**: object, a json object you want to mix with the transactionRequest field before transformation into xml. Note it will override already assigned properties

**Returns**: Promise, 
#### voidTransaction(refTransId, other) 

<p> submit a transaction request type voidTransaction. </p>
 <ul>
 <li>will resolve with an json object representing the <em>createTransactionResponse</em> xml field of the web service response it the resultCode is <code>"Ok"</code></li>
 <li>will reject with an instance of AuthorizationNetError whose properties will be json version of the xml field <em>createTransactionResponse</em> if the resultCode is not <code>"Ok"</code></li>
 <li>will reject with an instance of HttpError if the http status code of the response is higher or equal to 400</li>
 <li>will reject with an instance of AssertionError if one of the mandatory field is falsy</li>
 <li>will reject with an instance of Error if any other error occurs (parsing, etc)</li>
</ul>

**Parameters**

**refTransId**: String | number, the transaction reference id (you want to void) returned by the web service.

**other**: object, a json object you want to mix with the transactionRequest field before transformation into xml. Note it will override already assigned properties

**Returns**: Promise, 
#### getTransactionDetails(refTransId) 

<p> submit a getTransactionDetails request </p>
 <ul>
 <li>will resolve with an json object representing the <em>getTransactionDetailResponse</em> xml field of the web service response it the resultCode is <code>"Ok"</code></li>
 <li>will reject with an instance of AuthorizationNetError whose properties will be json version of the xml field <em>createTransactionResponse</em> if the resultCode is not <code>"Ok"</code></li>
 <li>will reject with an instance of HttpError if the http status code of the response is higher or equal to 400</li>
 <li>will reject with an instance of AssertionError if one of the mandatory field is falsy</li>
 <li>will reject with an instance of Error if any other error occurs (parsing, etc)</li>
</ul>

**Parameters**

**refTransId**: String | number, the transaction reference id (you want to void) returned by the web service.

**Returns**: Promise, 
#### getUnsettledTransactionList() 

<p> submit a getTransactionDetails request </p>
 <ul>
 <li>will resolve with an json object representing the <em>getUnsettledTransactionListResponse</em> xml field of the web service response it the resultCode is <code>"Ok"</code></li>
 <li>will reject with an instance of AuthorizationNetError whose properties will be json version of the xml field <em>createTransactionResponse</em> if the resultCode is not <code>"Ok"</code></li>
 <li>will reject with an instance of HttpError if the http status code of the response is higher or equal to 400</li>
 <li>will reject with an instance of AssertionError if one of the mandatory field is falsy</li>
 <li>will reject with an instance of Error if any other error occurs (parsing, etc)</li>
</ul>

**Returns**: Promise, 
#### getSettledBatchList(withStats, startDate, lastDate) 

<p> get a batch list of already settled transactions </p>
 <ul>
 <li>will resolve with an json object representing the <em>getBatchListResponse</em> xml field of the web service response it the resultCode is <code>"Ok"</code></li>
 <li>will reject with an instance of AuthorizationNetError whose properties will be json version of the xml field <em>createTransactionResponse</em> if the resultCode is not <code>"Ok"</code></li>
 <li>will reject with an instance of HttpError if the http status code of the response is higher or equal to 400</li>
 <li>will reject with an instance of AssertionError if one of the mandatory field is falsy</li>
 <li>will reject with an instance of Error if any other error occurs (parsing, etc)</li>
</ul>

**Parameters**

**withStats**: boolean, if true the response will include detailed view of the statistics

**startDate**: Date, a date object to define the lower bound of the time window requested

**lastDate**: Date, a date object to define the higher bound of the time window requested

**Returns**: Promise, 
#### getBatchStatistics(batchId) 

<p> get statistics for a particular batch </p>
 <ul>
 <li>will resolve with an json object representing the <em>getBatchStatisticsResponse</em> xml field of the web service response it the resultCode is <code>"Ok"</code></li>
 <li>will reject with an instance of AuthorizationNetError whose properties will be json version of the xml field <em>createTransactionResponse</em> if the resultCode is not <code>"Ok"</code></li>
 <li>will reject with an instance of HttpError if the http status code of the response is higher or equal to 400</li>
 <li>will reject with an instance of AssertionError if one of the mandatory field is falsy</li>
 <li>will reject with an instance of Error if any other error occurs (parsing, etc)</li>
</ul>

**Parameters**

**batchId**: string | number, the batch id requested

**Returns**: Promise, 


---









## License

node-authorize-net module is under MIT license:

> Copyright (C) 2014 Laurent Renard.
>
> Permission is hereby granted, free of charge, to any person
> obtaining a copy of this software and associated documentation files
> (the "Software"), to deal in the Software without restriction,
> including without limitation the rights to use, copy, modify, merge,
> publish, distribute, sublicense, and/or sell copies of the Software,
> and to permit persons to whom the Software is furnished to do so,
> subject to the following conditions:
>
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
> BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
> ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

