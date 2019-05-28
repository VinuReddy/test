
"use strict";

angular
  .module("weCarePlusApp")
  .service("Request", function Request(
    $rootScope,
    $http,
    $q,
    $location,
    $modal,
    CONFIG,
    DialogService,
    BasketFactory,
    MonitorService
  ) {
    var loadingDefaults = {
      backdrop: "static",
      keyboard: true,
      modalFade: false,
      windowClass: "minor-popup",
      templateUrl: "views/dialogs/loading.html"
    };
    var loggerName = "Request";
    var loadingMessages = [];
    var loadingCount = 0;
    var loadingInstance = null;
    var loadingScope = null;
    var lastUrlInvoked = "";
    var failAttemptCount = 0;
    var deferredMap = {};
    var service = {
      cancelInvoke: function(deferredKey) {
        if (deferredMap[deferredKey]) {
          deferredMap[deferredKey].resolve();
        }
      },
      invoke: function(args, deferredKey) {
        $rootScope.blockUI = true;
        params = args.params || {};
        args = args || {};
        args.headers = args.headers || {};
        args.headers.accept = args.headers.accept || "application/json";
        var deferred = $q.defer(),
          url = args.url || this.url,
          method = args.method || "GET",
          params = params,
          triggerOffline = args.triggerOffline || "yes",
          data = args.data || {},
          timeout = args.timeout || 150000,
          rejectPromiseOnTimeout = args.rejectPromiseOnTimeout, //Only used for Total API for now - PHANI
          headers = {
            "CVS-REGISTER-ID": CONFIG.registerId,
            "CVS-VERSION-NO": CONFIG.versionNo,
            "CVS-TIMESTAMP": appUtils.getCurrentTimestamp(
              CONFIG.timestampFormat
            ),
            "CVS-SCREEN-ID": CONFIG.screenId,
            "CVS-TRANSACTION-ID":
              args.headers.transactionId || CONFIG.txnInfo.transactionId,
            "CVS-WORKSTATION-ID": CONFIG.workstationID,
            "CVS-AUTH-TOKEN": CONFIG.headerData.token,
            "CVS-EMPLOYEE-ID": CONFIG.loggedInUser.id,
            "CVS-TRANSACTION-NUMBER":
              args.headers.transactionNumber ||
              CONFIG.txnInfo.transactionNumber,
            "CVS-DEVICE-TYPE": "wcworkstation",
            "CVS-STORE-NUMBER": CONFIG.storeAttributes.storeNumber,
            "CVS-REGISTER-TYPE": "FS",
            "CVS-OFFLINE-STATUS": CONFIG.storeData.isOffline,
            "CVS-IN-TRANSACTION-TYPE": "Y",
            "CVS-REGISTER-TYPE-CODE": "FS",
            "CVS-TXN-START-TIMESTAMP": CONFIG.messages.txnStartTimestamp,
            "CVS-CURRENT-TIMESTAMP": appUtils.getCurrentTimestamp(),
            "CVS-TRANSACTION-LOCATION":
              CONFIG.headers["CVS-TRANSACTION-LOCATION"],
            "CVS-RX-TRANSACTION-TYPE": CONFIG.headers["CVS-RX-TRANSACTION-TYPE"],
            "CVS-STORE-CODE": CONFIG.storeType,
            "CVS-COUPON-REDEMPTION-VERSION": "6",
            Accept: args.headers.accept,
            "CVS-CONTENT-VERSION-NO": "3",
            "CVS-USER-GROUP": "pharmacy_user",
            "CVS-APPLICATION-NAME": "POS"
          };
        if (args.timeoutByPromise) {
          timeout = deferred.promise;
        }

        if (deferredKey) {
          deferredMap[deferredKey] = deferred;
        }
        if (lastUrlInvoked !== url) {
          failAttemptCount = 0;
          lastUrlInvoked = url;
        }

        var msgID = {
          stamp: new Date().getTime(),
          msg: args.loadMessage,
          hideLoading: args.hideLoading,
          showCancelButton: args.showCancelButton
        };
        service.startLoading(msgID);

        var withcred = false;
        LOGGER.debug("invoke > URL:" + url, loggerName);
        var now = new Date();
        var startTime = now.format("HH:MM:ss");
        var now = new Date();
        var startTime = now.format("HH:MM:ss");
        var now = new Date();
        var startTime = now.format("HH:MM:ss");
        $http({
          url: url,
          withCredentials: withcred,
          method: method.toUpperCase(),
          params: params,
          data: data,
          timeout: timeout,
          headers: headers
        })
          .success(
            angular.bind(this, function(data, status, headers, config) {
              service.stopLoading(msgID);

              if (data) {
                var storeResponse = data.StoreResponse || data.storeResponse;
                CONFIG.lastCallResponse = storeResponse;
                var statusCode = storeResponse && storeResponse.code;
                if (
                  (storeResponse &&
                    storeResponse.offlineStatus === true &&
                    CONFIG.storeData.isOffline === false) ||
                  statusCode === "1099" ||
                  statusCode === "0001"
                ) {
                  LOGGER.error(
                    "URL:" +
                      url +
                      " > OFFLINE:" +
                      storeResponse.offlineStatus +
                      " > STATUS:" +
                      status +
                      " > RESPONSE:" +
                      JSON.stringify(data),
                    loggerName
                  );
                  if (triggerOffline.toUpperCase() === "NO") {
                    deferred.reject(storeResponse);
                  } else {
                    $rootScope.goOffLine();
                  }
                  return;
                }

                if (statusCode === "200" || statusCode === "0000") {
                  LOGGER.debug(
                    ":SUCCESS >  URL:" +
                      url +
                      " > OFFLINE:" +
                      storeResponse.offlineStatus +
                      " > STORE_RES_CODE:" +
                      statusCode,
                    loggerName
                  );
                  deferred.resolve(storeResponse.payload);
                } else {
                  if (args.customResponse) {
                    deferred.resolve(data);
                  } else {
                    LOGGER.error(
                      ":FAILURE >  URL:" +
                        url +
                        " > STORE_RES_CODE:" +
                        statusCode +
                        " > RESPONSE:" +
                        JSON.stringify(data),
                      loggerName
                    );
                    storeResponse.httpStatusCode = status;
                    deferred.reject(storeResponse);
                  }
                }
              } else {
                LOGGER.error(
                  ":FAILURE >  URL:" + url + " > RESPONSE:EMPTY",
                  loggerName
                );
                var errorData = {
                  httpStatusCode: status
                };
                deferred.reject(errorData);
              }
            })
          )
          .error(
            angular.bind(this, function(data, status, headers, config) {
              var nowtime = new Date();
              var endTime = nowtime.format("HH:MM:ss");
              var errorMessage =
                "ERROR > START_TIME: " +
                startTime +
                "; END_TIME: " +
                endTime +
                " URL:" +
                url +
                " > STATUS_CODE:" +
                status +
                "> DATA:" +
                JSON.stringify(data);
              LOGGER.error(errorMessage, loggerName);
              if (status === 0) {
                MonitorService.sendAlert({
                  message: "Timed out: " + url,
                  detailMessages: [errorMessage]
                });
              }
              service.stopLoading(msgID);
              service.reset();
              if (lastUrlInvoked === url) {
                failAttemptCount++;
              }
              if (failAttemptCount > 3) {
                LOGGER.error(
                  "Failed Attempt Threshold Reached > Count: " +
                    failAttemptCount +
                    " > Logged In User: " +
                    CONFIG.loggedInUser.id,
                  loggerName
                );
                if (CONFIG.loggedInUser.id) {
                  $location.url("home");
                }
                return;
              }
              var urlSplit = url ? url.split("?") : "";
              if (
                urlSplit.length &&
                urlSplit[0] === "/service/bsl/fastpass/transaction/signature"
              ) {
                return;
              }
              if (triggerOffline.toUpperCase() === "YES") {
                var modalOptions = {
                  buttons: ["Ok"],
                  headerText: "Connection Error",
                  bodyText: msgID.msg
                    ? "Couldn't reach server while " + msgID.msg
                    : "Couldn't reach server"
                };
                DialogService.showDialog({}, modalOptions).then(function(
                  result
                ) {
                  if (rejectPromiseOnTimeout && status === 0) {
                    deferred.reject(data);
                  } else {
                    // added for CVS Pay Backend changes
                    var isFastPassTxn =
                      urlSplit[0].indexOf("fastpass") != -1 ? true : false;
                    if (isFastPassTxn) {
                      if (status == 404) {
                        data = {
                          code: 404,
                          message: "No service was found."
                        };
                      }
                      var responseJSONData = data;
                      if (responseJSONData == null || responseJSONData == "") {
                        responseJSONData = {
                          code: status,
                          message:
                            modalOptions.headerText +
                            ":" +
                            modalOptions.bodyText
                        };
                      }
                      deferred.reject(responseJSONData);
                    }
                  }
                  $rootScope.goOffLine();
                });
              } else {
                var errorData = data || {};
                errorData.httpStatusCode = status;
                deferred.reject(errorData);
              }
            })
          );
        return deferred.promise;
      }
    };

    service.startLoading = function(msgID) {
      msgID.msg && loadingMessages.push(msgID);
      if (loadingCount === 0) {
        loadingDefaults.controller = function($scope, $modalInstance) {
          $scope.messages = loadingMessages;
          loadingInstance = $modalInstance;
          loadingScope = $scope;
          $scope.showCancelButton = msgID.showCancelButton;
          $scope.cancelInvoke = function() {
            loadingCount = 0;
            loadingMessages = [];
            $modalInstance && $modalInstance.close();
          };
        };
        if (!msgID.hideLoading) {
          $modal.open(loadingDefaults);
        }
      }
      loadingCount++;
    };

    service.stopLoading = function(msgID) {
      if (loadingCount > 0) loadingCount--;
      if (msgID.msg) {
        angular.forEach(loadingMessages, function(val, key) {
          if (val.stamp === msgID.stamp) {
            loadingMessages.splice(key, 1);
          }
        });
      }
      if (loadingCount <= 0 && loadingInstance) {
        loadingInstance.close();
        loadingCount = 0;
        loadingMessages.splice(0, loadingMessages.length);
      }
    };

    service.reset = function() {
      loadingMessages = [];
      loadingCount = 0;
      loadingInstance = null;
      loadingScope = null;
    };
    return service;
  });

