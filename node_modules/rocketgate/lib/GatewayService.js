"use strict";

var _request = require('request');
var GatewayRequest = require('./GatewayRequest.js');
var GatewayResponse = require('./GatewayResponse.js');

module.exports = GatewayService;

GatewayService.ROCKETGATE_SERVLET = "/gateway/servlet/ServiceDispatcherAccess";
GatewayService.ROCKETGATE_CONNECT_TIMEOUT = 10;
GatewayService.ROCKETGATE_READ_TIMEOUT = 90;
GatewayService.ROCKETGATE_PROTOCOL = "https";
GatewayService.ROCKETGATE_PORTNO = "443";
GatewayService.ROCKETGATE_USER_AGENT = "RG Client - Node 1.0";
GatewayService.LIVE_HOST = "gw.rocketgate.com";
GatewayService.LIVE_HOST_16 = "gw-16.rocketgate.com";
GatewayService.LIVE_HOST_17 = "gw-17.rocketgate.com";
GatewayService.TEST_HOST = "dev-gw.rocketgate.com";

function GatewayService() {
  this.testMode = false;
  this.rocketGateDNS = GatewayService.LIVE_HOST;
  this.rocketGateHost = [GatewayService.LIVE_HOST_16, GatewayService.LIVE_HOST_17];
  this.rocketGateServlet = GatewayService.ROCKETGATE_SERVLET;
  this.rocketGateProtocol = GatewayService.ROCKETGATE_PROTOCOL;
  this.rocketGatePortNo = GatewayService.ROCKETGATE_PORTNO;
  this.rocketGateConnectTimeout = GatewayService.ROCKETGATE_CONNECT_TIMEOUT;
  this.rocketGateReadTimeout = GatewayService.ROCKETGATE_READ_TIMEOUT;
}

GatewayService.prototype.SetTestMode = function(yesNo) {
  if (yesNo) {
    this.testMode = true;
    this.rocketGateHost = [ GatewayService.TEST_HOST ];
    this.rocketGateDNS = GatewayService.TEST_HOST;
  }
  else {
    this.testMode = false;
    this.rocketGateHost = [
      GatewayService.LIVE_HOST_16,
      GatewayService.LIVE_HOST_17
    ];
    this.rocketGateDNS = GatewayService.LIVE_HOST;
  }
};

GatewayService.prototype.SetHost = function(hostName) {
  this.rocketGateHost = hostName;
  this.rocketGateDNS = hostName;
};

GatewayService.prototype.SetProtocol = function(protocol) {
  this.rocketGateProtocol = protocol;
};

GatewayService.prototype.SetPortNo = function(portNo) {
  this.rocketGatePortNo = portNo;
};

GatewayService.prototype.SetServlet = function(servlet) {
  this.rocketGateServlet = servlet;
};

GatewayService.prototype.SetConnectTimeout = function(timeout) {
  if (parseInt(timeout) > 0)
    this.rocketGateConnectTimeout = parseInt(timeout);
};

GatewayService.prototype.SendTransaction =
  function(serverName, request, response, callback) {
    var urlServlet = request.Get("gatewayServlet");
    var urlProtocol = request.Get("gatewayProtocol");
    var urlPortNo = request.Get("portNo");

    if (urlServlet == null)
      urlServlet = this.rocketGateServlet;
    if (urlProtocol == null)
      urlProtocol = this.rocketGateProtocol;
    if (urlPortNo == null)
      urlPortNo = this.rocketGatePortNo;

    var connectTimeout = request.Get("gatewayConnectTimeout");
    if (connectTimeout == null || parseInt(connectTimeout) <= 0)
      connectTimeout = this.rocketGateConnectTimeout;

    var readTimeout = request.Get("gatewayReadTimeout");
    if (readTimeout == null || parseInt(readTimeout) <= 0)
      readTimeout = this.rocketGateReadTimeout;

    response.Reset();
    var requestXML = request.ToXML();
    var options = {
      method: "POST",
      uri: urlProtocol + "://" + serverName + urlServlet,
      body: requestXML,
      headers: {
        'Content-Type': 'text/xml',
        'User-Agent': GatewayService.ROCKETGATE_USER_AGENT
      },
      timeout: connectTimeout * 1000
    };
    _request(options, function(err, res, body) {
      var responseCode = null;
      if (err) {
        console.log(err);
        console.log(options);
      }
      else {
        response.SetFromXML(body);
        responseCode = response.Get(GatewayResponse.RESPONSE_CODE);
      }
      // TODO: Exception, response code, reason code
      if (responseCode == null) {
        responseCode = "3";
        response.Set(GatewayResponse.EXCEPTION, body);
        response.Set(GatewayResponse.RESPONSE_CODE, "3");
        response.Set(GatewayResponse.REASON_CODE, "400");
      }
      callback && callback(responseCode, request, response);
    });
  };

GatewayService.prototype.PerformTransaction = function(request, response, callback) {
  var index = null;
  var swapper = null;
  var serverName = request.Get("gatewayServer");
  serverName = (serverName != null) ? [serverName] : this.rocketGateHost;
  request.Clear(GatewayRequest.FAILED_SERVER);
  request.Clear(GatewayRequest.FAILED_RESPONSE_CODE);
  request.Clear(GatewayRequest.FAILED_REASON_CODE);
  request.Clear(GatewayRequest.FAILED_GUID);
  if (serverName.length > 1) {
    index = Math.floor(Math.random() * (serverName.length + 1));
    if (index > 0) {
      swapper = serverName[0];
      serverName[0] = serverName[index];
      serverName[index] = swapper;
    }
  }
  index = 0;
  while (index < serverName.length) {
    this.SendTransaction(serverName[index], request, response, function(results, request, response) {
      if (results == "0")
        return callback && callback(true, request, response);
      if (results != "3")
        return callback && callback(false, request, response);
      request.Set(GatewayRequest.FAILED_SERVER, serverName[index]);
      request.Set(GatewayRequest.FAILED_RESPONSE_CODE,
                  response.Get(GatewayResponse.RESPONSE_CODE));
      request.Set(GatewayRequest.FAILED_REASON_CODE,
                  response.Get(GatewayResponse.REASON_CODE));
      request.Set(GatewayRequest.FAILED_GUID,
                  response.Get(GatewayResponse.TRANSACT_ID));
      return callback && callback(false, request, response);
      // TODO: Check ruby version
    });
    index++;
  }
};

GatewayService.prototype.PerformTargetedTransaction = function(request, response, callback) {
  request.Clear(GatewayRequest.FAILED_SERVER);
  request.Clear(GatewayRequest.FAILED_RESPONSE_CODE);
  request.Clear(GatewayRequest.FAILED_REASON_CODE);
  request.Clear(GatewayRequest.FAILED_GUID);
  var referenceGUID = String(request.Get(GatewayRequest.REFERENCE_GUID));
  if (referenceGUID == null) {
    response.Set(GatewayResponse.RESPONSE_CODE, "4");
    response.Set(GatewayResponse.REASON_CODE, "410");
    return callback && callback(false, request, response);
  }
  var siteString = "0x";
  if (referenceGUID.length > 15)
    siteString += referenceGUID.substring(0,2);
  else
    siteString += referenceGUID.substring(0,1);
  try {
    var siteNo = Number(siteString);
  }
  catch (e) {
    response.Set(GatewayResponse.RESPONSE_CODE, "4");
    response.Set(GatewayResponse.REASON_CODE, "410");
    return callback && callback(false, request, response);
  }
  var serverName = request.Get("gatewayServer");
  if (serverName == null) {
    serverName = this.rocketGateDNS;
    var separator = serverName.indexOf('.');
    if (separator != -1) {
      var prefix = serverName.substring(0, separator);
      prefix += "-";
      prefix += siteNo;
      prefix += serverName.substring(separator, serverName.length);
      serverName = prefix;
    }
  }
  this.SendTransaction(serverName, request, response, function(results, request, response) {
    if (results == 0)
      callback && callback(true, request, response);
    else
      callback && callback(false, request, response);
  });
};

GatewayService.prototype.PerformConfirmation = function(request, response, callback) {
  var confirmResponse = new GatewayResponse();
  var confirmGUID = response.Get(GatewayResponse.TRANSACT_ID);
  if (confirmGUID == null) {
    response.Set(GatewayResponse.EXCEPTION,
                 "BUG-CHECK - Missing confirmation GUID");
    response.Set(GatewayResponse.RESPONSE_CODE, "3");
    response.Set(GatewayResponse.REASON_CODE, "307");
    callback && callback(false, request, response);
  }
  else {
    request.Set(GatewayRequest.TRANSACTION_TYPE, "CC_CONFIRM");
    request.Set(GatewayRequest.REFERENCE_GUID, confirmGUID);
    this.PerformTargetedTransaction(request, confirmResponse, function(results, request, response) {
      if (results)
        callback && callback(true, request, response);
      else {
        response.Set(GatewayResponse.RESPONSE_CODE,
                     confirmResponse.Get(GatewayResponse.RESPONSE_CODE));
        response.Set(GatewayResponse.REASON_CODE,
                     confirmResponse.Get(GatewayResponse.REASON_CODE));
        callback && callback(false, request, response);
      }
    });
  }
};

GatewayService.prototype.PerformAuthOnly = function(request, response, callback) {
  request.Set(GatewayRequest.TRANSACTION_TYPE, "CC_AUTH");
  var _this = this;
  this.PerformTransaction(request, response, function(results, request, response) {
    if (results)
      _this.PerformConfirmation(request, response, function(results, request, response) {
        callback && callback(results, request, response);
      });
    else
      callback && callback(results, request, response);
  });
};

GatewayService.prototype.PerformTicket = function(request, response, callback) {
  request.Set(GatewayRequest.TRANSACTION_TYPE, "CC_TICKET");
  this.PerformTargetedTransaction(request, response, function(results, request, response) {
    callback && callback(results, request, response);
  });
};

GatewayService.prototype.PerformPurchase = function(request, response, callback) {
  request.Set(GatewayRequest.TRANSACTION_TYPE, "CC_PURCHASE");
  var _this = this;
  this.PerformTransaction(request, response, function(results, request, response) {
    if (results)
      _this.PerformConfirmation(request, response, function(results, request, response) {
        callback && callback(results, request, response);
      });
    else
      callback && callback(results, request, response);
  });
};

GatewayService.prototype.PerformCredit = function(request, response, callback) {
  request.Set(GatewayRequest.TRANSACTION_TYPE, "CC_CREDIT");
  var referenceGUID = request.Get(GatewayRequest.REFERENCE_GUID);
  if (referenceGUID)
    this.PerformTargetedTransaction(request, response, function(results, request, response) {
      callback && callback(results, request, response);
    });
  else
    results = this.PerformTransaction(request, response, function(results, request, response) {
      callback && callback(results, request, response);
    });
};

GatewayService.prototype.PerformVoid = function(request, response, callback) {
  request.Set(GatewayRequest.TRANSACTION_TYPE, "CC_VOID");
  this.PerformTargetedTransaction(request, response, function(results) {
    callback && callback(results, request, response);
  });
};

GatewayService.prototype.PerformCardScrub = function(request, response, callback) {
  request.Set(GatewayRequest.TRANSACTION_TYPE, "CARDSCRUB");
  this.PerformTransaction(request, response, function(results, request, response) {
    callback && callback(results, request, response);
  });
};

GatewayService.prototype.PerformRebillCancel = function(request, response, callback) {
  request.Set(GatewayRequest.TRANSACTION_TYPE, "REBILL_CANCEL");
  this.PerformTransaction(request, response, function(results, request, response) {
    callback && callback(results, request, response);
  });
};

GatewayService.prototype.PerformRebillUpdate = function(request, response, callback) {
  request.Set(GatewayRequest.TRANSACTION_TYPE, "REBILL_UPDATE");
  var amount = request.Get(GatewayRequest.AMOUNT);
  if (amount == null || parseFloat(amount) <= 0.0) {
    this.PerformTransaction(request, response, function(results, request, response) {
      callback && callback(results, request, response);
    });
  }
  else {
    this.PerformTransaction(request, response, function(results) {
      if (results)
        this.PerformConfirmation(request, response, function(results, request, response) {
          callback && callback(results, request, response);
        });
      callback && callback(results, request, response);
    });
  }
};
