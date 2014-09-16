42-cent
=======

Abstraction of various nodejs implementation of payment gateways sdk's.


## getting started

`npm install 42-cent`

Then use one of the existing adaptors.

```Javascript

var cent42=require('42-cent');

var credentials={..} //credentials related to a specific payment gateway
var order={...} // some order info
var creditCard= {...} //some credit card info
var prospect={...} //some prospect info

cent42.use('Authorize.Net', credentials).submitTransaction(order, creditCard, prospect).then(function (result){
    //use record
});
```

You can register other adaptor ( or replace an existing one) 

```Javascript

cent42.registerGateway('a key', factoryFunction);

```
 
the factory function must return an instance of the abstract [BaseGateway](http://example.com) so that the specificity of the gateway remains hidden when using the module.
You can see existing adaptors for more details.

## Existing adaptors

** 42-cent ** is shipped with these following adaptors
 
..
..
..

## Adaptors

As mentioned before adaptors must implement a particular version of the [BaseGateway](http://example.com). The version of `42-cent-base` set in the package.json of the adaptor defines a contract the adaptor intends to fulfill.
You can see the "contract" (API) the adaptor intends to fulfill by looking the [BaseGateway readme](http://example.com) with the version tag of the related BaseGateway API.

## [Semantic Versioning](http://semver.org/)
  
It is important to note that the BaseGateway API will follow the semantic versioning rules so that 

* Any change on already defined property will define a new contract and therefore will result on a different first digit of the BaseGateway version
* New supported parameters/methods will define a new functionality and therefore will result in a different second digit of the BaseGateway version
* Bug fixes/patches should not impact adaptor implementation and will result in a different third digit of the BaseGateway version

So be cautious with the BaseGateway version the adaptor depends on as it defines a contract the adaptor is supposed to fulfill 

## licence

42-cent module is under MIT license:

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


