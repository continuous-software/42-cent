42-cent
=======

> Node.js wrapper for various payment gateways. 

## Installation

    $ npm install 42-cent

## Usage

```Javascript

var Gateways = require('42-cent');
var client = Gateways.use('Authorize.Net', credentials);
```

You can register other gateways - or replace an existing one:

```Javascript
Gateways.registerGateway('GatewayName', factoryFunction);
```
 
The factory function must return an instance of the abstract [BaseGateway](https://github.com/continuous-software/42-cent-base) so that the specificity of the gateway remains hidden when using the module.

## Gateways API

As mentioned before, gateways must implement a particular version of the [BaseGateway](https://github.com/continuous-software/42-cent-base). The version of `42-cent-base` set in the `package.json` of the gateway defines the API the gateway intends to fulfill.
You can see the API the gateway intends to fulfill by looking at the [BaseGateway](https://github.com/continuous-software/42-cent-base) appropriate version tag.

## Supported Gateways

* [Authorize.net](https://github.com/continuous-software/node-authorize-net)
* [NMI](https://github.com/continuous-software/node-nmi)
* [Payflow](https://github.com/continuous-software/node-payflow)
* [RocketGate](https://github.com/continuous-software/node-rocketgate)
* [VirtualMerchant](https://github.com/continuous-software/node-virtualmerchant)

## [Semantic Versioning](http://semver.org/)
  
It is important to note that the BaseGateway API will follow the semantic versioning rules so that 

* Any change on already defined property will define a new API and therefore will result on a different first digit of the BaseGateway version
* New supported parameters/methods will define a new functionality and therefore will result in a different second digit of the BaseGateway version
* Bug fixes/patches should not impact gateways implementation and will result in a different third digit of the BaseGateway version

So be cautious with the BaseGateway version the gateway depends on as it defines its API.
