[![David](https://img.shields.io/david/continuous-software/42-cent.svg)](https://img.shields.io/david/continuous-software/42-cent.svg) [![npm](https://img.shields.io/npm/dm/42-cent.svg)](https://github.com/continuous-software/42-cent)

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

[![Build Status](https://travis-ci.org/continuous-software/node-authorize-net.svg?branch=master)](https://travis-ci.org/continuous-software/node-authorize-net) [Authorize.net](https://github.com/continuous-software/node-authorize-net)  
[![Build Status](https://travis-ci.org/continuous-software/42-cent-braintree.svg?branch=master)](https://travis-ci.org/continuous-software/42-cent-braintree) [Braintree](https://github.com/continuous-software/42-cent-braintree)  
[![Build Status](https://travis-ci.org/continuous-software/node-nmi.svg?branch=master)](https://travis-ci.org/continuous-software/node-nmi) [NMI](https://github.com/continuous-software/node-nmi)  
[![Build Status](https://travis-ci.org/continuous-software/42-cent-omise.svg?branch=master)](https://travis-ci.org/continuous-software/42-cent-omise) [Omise](https://github.com/continuous-software/42-cent-omise)  
[![Build Status](https://travis-ci.org/continuous-software/node-payflow.svg?branch=master)](https://travis-ci.org/continuous-software/node-payflow) [Payflow](https://github.com/continuous-software/node-payflow)  
[![Build Status](https://travis-ci.org/continuous-software/node-rocketgate.svg?branch=master)](https://travis-ci.org/continuous-software/node-rocketgate) [RocketGate](https://github.com/continuous-software/node-rocketgate)  
[![Build Status](https://travis-ci.org/continuous-software/42-cent-stripe.svg?branch=master)](https://travis-ci.org/continuous-software/42-cent-stripe) [Stripe](https://github.com/continuous-software/42-cent-stripe)  
[![Build Status](https://travis-ci.org/continuous-software/node-virtualmerchant.svg?branch=master)](https://travis-ci.org/continuous-software/node-virtualmerchant) [VirtualMerchant](https://github.com/continuous-software/node-virtualmerchant)  
[![Build Status](https://travis-ci.org/continuous-software/42-cent-paypal.svg?branch=master)](https://travis-ci.org/continuous-software/42-cent-paypal) [PayPal](https://github.com/continuous-software/42-cent-paypal)  
[![Build Status](https://travis-ci.org/continuous-software/node-worldpay.svg?branch=master)](https://travis-ci.org/continuous-software/node-worldpay) [WorldPay](https://github.com/continuous-software/node-worldpay)
[![Build Status](https://travis-ci.org/continuous-software/node-beanstream.svg?branch=master)](https://travis-ci.org/continuous-software/node-beanstream) [Beanstream](https://github.com/continuous-software/node-beanstream)
