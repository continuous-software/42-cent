42-cent
=======

> Node.js wrapper for payment gateways. 

## Installation

    $ npm install -s 42-cent

## Usage

```Javascript

var Gateways = require('42-cent');
var client = Gateways.use('Authorize.Net', credentials);
```

You can register other gateways - or replace an existing one:

```Javascript
Gateways.registerGateway('GatewayName', factoryFunction);
```
 
The factory function must return an instance of the abstract [BaseGateway](https://github.com/continuous-software/42-cent-base).

## Gateways API

Gateways must implement a particular version of the [BaseGateway](https://github.com/continuous-software/42-cent-base). The version of `42-cent-base` set in the `package.json` of the gateway defines the API the gateway intends to fulfill.
You can see the API the gateway intends to fulfill by looking at the [BaseGateway](https://github.com/continuous-software/42-cent-base) appropriate version tag.

## Supported Gateways

* [Authorize.net](https://github.com/continuous-software/node-authorize-net)
* [NMI](https://github.com/continuous-software/node-nmi)
* [Payflow](https://github.com/continuous-software/node-payflow)
* [RocketGate](https://github.com/continuous-software/node-rocketgate)
* [VirtualMerchant](https://github.com/continuous-software/node-virtualmerchant)

