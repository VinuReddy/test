
// terminal

"use strict";

var TerminalCtrl = angular
  .module("weCarePlusApp")
  .controller("TerminalCtrl", [
    "$rootScope",
    "$interval",
    "$scope",
    "$location",
    "$modal",
    "$log",
    "$timeout",
    "SocketTrafficHandler",
    "Request",
    "PatientFactory",
    "CONFIG",
    "BasketFactory",
    "OrderFactory",
    "DialogService",
    "MessageFactory",
    "ESignFactory",
    "PseFactory",
    "FastpassBarcode",
    "HipaaService",
    "$modalStack",
    "BasketService",
    "MessageService",
    "PatientService",
    "FormValidationService",
    "PunchService",
    "ExtraCareEnrollmentService",
    "OrderService",
    "POSSimplificationFactory",
    "PosSimplificationTimeStampService",
    "SocketInitializer",
    "CustomerPriceDisplayService",
    "ClearTransactionService",
    "NavigationService",
    "SocketFactory",
    "PrepayBarcodeLookupService",
    "PHRExtracareFactory",
    function(
      $rootScope,
      $interval,
      $scope,
      $location,
      $modal,
      $log,
      $timeout,
      SocketTrafficHandler,
      Request,
      PatientFactory,
      CONFIG,
      BasketFactory,
      OrderFactory,
      DialogService,
      MessageFactory,
      ESignFactory,
      PseFactory,
      FastpassBarcode,
      HipaaService,
      $modalStack,
      BasketService,
      MessageService,
      PatientService,
      FormValidationService,
      PunchService,
      ExtraCareEnrollmentService,
      OrderService,
      POSSimplificationFactory,
      PosSimplificationTimeStampService,
      SocketInitializer,
      CustomerPriceDisplayService,
      ClearTransactionService,
      NavigationService,
      SocketFactory,
      PrepayBarcodeLookupService,
      PHRExtracareFactory
    ) {
      LOGGER.info("TerminalCtrl - Entering TerminalCtrl");

      var date = new Date();
      $scope.CONFIG = CONFIG;

      $scope.sourceRoute = "";

      function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;
        return strTime;
      }

      function getFullDateDisplay(date) {
        return (
          date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
        );
      }

      $scope.currentDate = getFullDateDisplay(date);
      $scope.currentTime = formatAMPM(date);
      $scope.currentFocus = {};
      $scope.bridge = {};
      $scope.showDoB = false;
      $scope.loggedInUser = CONFIG.loggedInUser;
      $scope.registerData = CONFIG.registerData;
      $scope.unBinders = {};
      $scope.eccData = {
        eccNumber: null
      };

      // this property has to be modified by every page when it is changed.
      $scope.CONFIG.pageTitle = "CVS Health";

      /*To update the time and date in the footer every 19 seconds.
            Every 19 seconds because it will be triggered at least 3 times.*/
      $interval(function() {
        $scope.currentDate = getFullDateDisplay(new Date());
        $scope.currentTime = formatAMPM(new Date());
        // appUtils.log($scope.currentTime);
      }, 19 * 1000);

      $rootScope.$on("$routeChangeSuccess", function(
        event,
        current,
        previous,
        rejection
      ) {
        var previousURI = $scope.currentURI ? $scope.currentURI : "";
        var transactionId = CONFIG.txnInfo.transactionId;
        var associateId = CONFIG.loggedInUser.id;
        $scope.CONFIG.headerTitleImageUrl = current.params.headerTitleImageUrl;
        $scope.currentURI = $location.path();
        if ($scope.currentURI == "/home" && previousURI == "/home") {
          return;
        }
        $modalStack.dismissAll();
        appUtils.log(
          "ROUTE:" +
            $scope.currentURI +
            " #TXN-ID:" +
            (transactionId ? transactionId : "NA") +
            " #ASSOCIATE-ID:" +
            (associateId ? associateId : "NA")
        );
      });

      $rootScope.$on("CLEAR_TRANSACTION", function(originator) {
        ClearTransactionService.clearAllFactories();
        LOGGER.info("Clear transaction initiated by - " + originator);
      });

      // Verify PoS Terminal Logged in by an User
      $scope.isLoggedIn = function() {};

      // Set Logged in User Information
      $scope.setLoggedInUser = function(loggedInUser) {
        $scope.loggedInUser = loggedInUser;
      };

      // Set Current PoS Register ID
      $scope.setRegisterID = function(registerID) {
        $scope.registerID = registerID;
      };

      $scope.onScreenKeyClick = function(keyType, keyValue) {
        LOGGER.info("TerminalCtrl - Entering onScreenKeyClick method");
        LOGGER.info("TerminalCtrl - User keyValue - " + keyValue);
        $scope.bridge.updateModel(keyType, keyValue);
      };

      $rootScope.$on("IdleTimeout", function() {
        appUtils.log("User timed out. Clearing session.");
        // $scope.clearAllFactories();
        // CONFIG.storeData.isOffline = false;
        delete CONFIG.loggedInUser.id;
      });

      $scope.enableRootScanListeners = function() {
        $scope.unBinders.unbindEccListener = $scope.$on(
          "SCANNED_DATA_ECC",
          eccScanListener
        );
      };

      $scope.disableRootScanListeners = function() {
        if ($scope.unBinders.unbindEccListener)
          $scope.unBinders.unbindEccListener();
      };

      $rootScope.goOffLine = function() {
        ClearTransactionService.goOffLine();
        $scope.disableRootScanListeners();
        $scope.enableRootScanListeners();
      };

      $scope.goHome = function(shouldConfirm) {
        ClearTransactionService.goHome(shouldConfirm);
      };

      $scope.doCancel = function() {
        LOGGER.info("TerminalCtrl - Entering doCancel method");
        var modalOptions = {
          buttons: ["Yes", "No"],
          headerText: "Return to POS",
          bodyText: "Are you sure you want to cancel the operation?"
        };
        DialogService.showDialog({}, modalOptions).then(function(result) {
          if (result && result === "Yes") {
            ClearTransactionService.goHome(true);
          }
        });
      };

      $scope.patientLookup = function(event) {
        event.preventDefault();
        $location.url("/patient-lookup");
      };

      $scope.updateSecDispPriceList = function() {
        CustomerPriceDisplayService.updateSecDispPriceList();
      };

      $rootScope.$on("ENABLE_SCANNER", function(evt, options) {
        $scope.disableRootScanListeners && $scope.disableRootScanListeners();
        $scope.enableRootScanListeners && $scope.enableRootScanListeners();
      });

      $scope.$on("BARCODE_SCAN", function(evt, options) {
        var SCANNED_BARCODE_TYPE = "SCANNED_DATA_GENERIC";
        /**
                 * Barcode symbologies at the very end of the page.
                 */
        var barcodeData = window.atob(options.scanData);
        appUtils.log("Barcode Scanned... " + barcodeData);
        if (!CONFIG.loggedInUser.id && barcodeData) {
          if (barcodeData.length == 3) {
            //Only fire barcode scan event for new employee which has barcode length 3, Since user will not be loggedin
            $scope.$broadcast("SCANNED_DATA_GENERIC", barcodeData);
          } else {
            return;
          }
        }

        if (!SocketFactory.getScannerState()) {
          appUtils.log("Scanner disabled.");
          return;
        }
        switch (options.scanDataType) {
          case "101":
          case "102":
          case "103":
          case "104":
            if (
              barcodeData.match("^4871") ||
              barcodeData.match("^4872") ||
              barcodeData.match("^4873") ||
              barcodeData.match("^4878") ||
              barcodeData.match("^4879") ||
              barcodeData.match("^911") ||
              barcodeData.match("^912") ||
              barcodeData.match("^476") ||
              barcodeData.match("^470") ||
              barcodeData.match("^202")
            ) {
              SCANNED_BARCODE_TYPE = "SCANNED_DATA_ECC";
              $scope.$broadcast("SCANNED_DATA_ECC", barcodeData);
            } else {
              SCANNED_BARCODE_TYPE = "SCANNED_DATA_OTC";
              $scope.$broadcast("SCANNED_DATA_OTC", barcodeData);
            }
            break;
          case "111":
          case "112":
          case "113":
          case "114":
          case "115":
          case "116":
          case "117":
          case "118":
          case "119":
          case "120":
            //UPC and EAN type barcodes
            //Check if ECC else process Item lookup.

            if (
              barcodeData.match("^4871") ||
              barcodeData.match("^4872") ||
              barcodeData.match("^4873") ||
              barcodeData.match("^4878") ||
              barcodeData.match("^4879") ||
              barcodeData.match("^911") ||
              barcodeData.match("^912") ||
              barcodeData.match("^476") ||
              barcodeData.match("^470") ||
              barcodeData.match("^202")
            ) {
              SCANNED_BARCODE_TYPE = "SCANNED_DATA_ECC";
              $scope.$broadcast("SCANNED_DATA_ECC", barcodeData);
            } else {
              SCANNED_BARCODE_TYPE = "SCANNED_DATA_OTC";
              $scope.$broadcast("SCANNED_DATA_OTC", barcodeData);
            }
            break;
          case "110":
            //CODE 128
            // First Set of ECC were Code 128 - Need to handle - TODO
            // could be RX, Special Rx or PHR barcode
            if (barcodeData.match("^27")) {
              SCANNED_BARCODE_TYPE = "SCANNED_DATA_RX";
              $scope.$broadcast("SCANNED_DATA_RX", barcodeData);
            } else if (barcodeData.match("^37")) {
              SCANNED_BARCODE_TYPE = "SCANNED_DATA_SPLRX";
              $scope.$broadcast("SCANNED_DATA_SPLRX", barcodeData);
            } else if (barcodeData.match("^19") && barcodeData.length == 22) {
              SCANNED_BARCODE_TYPE = "SCANNED_DATA_PHR";
              $scope.$broadcast("SCANNED_DATA_PHR", barcodeData);
            } else if (barcodeData.match("^30000")) {
              //MedB Form Barcode
              SCANNED_BARCODE_TYPE = "SCANNED_DATA_FORM";
              BARCODE_SCAN_HANDLER.SCANNED_DATA_FORM.listener &&
                BARCODE_SCAN_HANDLER.SCANNED_DATA_FORM.listener(barcodeData);
            } else if (barcodeData.length == 30) {
              SCANNED_BARCODE_TYPE = "SCANNED_DATA_OTC";
              $scope.$broadcast("SCANNED_DATA_OTC", barcodeData);
            } else if (FormValidationService.validateRphBarcode(barcodeData)) {
              //RPH barcode
              SCANNED_BARCODE_TYPE = "SCANNED_RPH_CRED";
            }

            break;

          case "131":
          case "132":
          case "134":
            // trail offer  barcode
            if (barcodeData.match("^91")) {
              SCANNED_BARCODE_TYPE = "SCANNED_DATA_TRIAL_COUPON";
              $scope.$broadcast("SCANNED_DATA_TRIAL_COUPON", barcodeData);
            }
            break;
          case "143":
            // MSI code
            // check if starts with 8000 - ECC. Else error.
            if (barcodeData.match("^8000")) {
              SCANNED_BARCODE_TYPE = "SCANNED_DATA_ECC";
              $scope.$broadcast("SCANNED_DATA_ECC", barcodeData);
            }
            break;

          case "201":
            // PDF417 code - Fastpass
            if (FastpassBarcode.isFastPass(barcodeData)) {
              var result = FastpassBarcode.parseBarcode(barcodeData);
              if (
                ($scope.currentURI === "/home" ||
                  $scope.currentURI === "/patient-lookup") &&
                result &&
                result.fastPassID &&
                result.fastPassID !== "0" &&
                result.version
              ) {
                SCANNED_BARCODE_TYPE = "SCANNED_DATA_FASTPASS";
                LOGGER.info("Fastpass ID: " + result.fastPassID);
                OrderFactory.setFastpassVersion(result.version);
                OrderFactory.setMobileConnectivity(result.connectivity);
                $scope.$broadcast(
                  "SCANNED_DATA_FASTPASS",
                  barcodeData,
                  "FASTPASS"
                );
              } else if (
                ($scope.currentURI === "/home" ||
                  $scope.currentURI === "/patient-lookup") &&
                result &&
                result.userID
              ) {
                OrderFactory.setFastpassVersion(result.version);
                OrderFactory.setMobileConnectivity(result.connectivity);
                PrepayBarcodeLookupService.handlePrepayBarcodeScan(result);
              }
              if (
                result &&
                result.extraCareCard &&
                result.extraCareCard.length > 2
              ) {
                SCANNED_BARCODE_TYPE = "SCANNED_DATA_ECC";
                LOGGER.info(
                  "Extracare Card Number: " + result.extraCareCard,
                  "FASTPASS"
                );
                $scope.$broadcast("SCANNED_DATA_ECC", result.extraCareCard);
              }
            } else {
              $scope.$broadcast("SCANNED_DATA_LICENSE", barcodeData);
            }
            break;
          case "900":
            SCANNED_BARCODE_TYPE = "SCANNED_DATA_IMAGE";
            BARCODE_SCAN_HANDLER.SCANNED_DATA_IMAGE.listener &&
              BARCODE_SCAN_HANDLER.SCANNED_DATA_IMAGE.listener(options);
            break;
          default:
            //other code
            if (barcodeData.length == 9) {
              SCANNED_BARCODE_TYPE = "SCANNED_DATA_ECC";
              $scope.$broadcast("SCANNED_DATA_ECC", barcodeData);
            } else appUtils.log("Invalid barcode scanned - " + barcodeData);
            break;
        }
        //Broadcast a generic data
        $scope.$broadcast(
          "SCANNED_DATA_GENERIC",
          barcodeData,
          SCANNED_BARCODE_TYPE,
          options.scanDataType
        );
      });

      $scope.displayNextMessage = function() {
        LOGGER.info("TerminalCtrl - Entering displayNextMessage method");

        if (!CONFIG.offline) {
          $location.url("/messages/");
        }
      };

      /*
            Below is the code that identifies if the system is being tested
            on a development environment or a local testing. The environment
            is evalutated by using the address bar location to cvsstore.cvs.com
            */
      $scope.isLocalTesting = $location.host().match("cvsstore.cvs.com")
        ? false
        : true;
      // console.log("isLocalTesting = " + $scope.isLocalTesting);
      if ($scope.isLocalTesting) {
        CONFIG.socket.endpoint = "wss://localhost:9900/associate";
        // LOGGER.settings.console = true;
        angular
          .element(document.querySelector("body"))
          .css("cursor", "default");
        window.setInterval(function() {
          CONFIG.workstationID = "wcp-wks01";
          CONFIG.registerId = "01";
          CONFIG.registerData.id = "01";
          // $(".btn").css("cursor", "pointer");
          angular
            .element(document.querySelectorAll(".btn"))
            .css("cursor", "pointer");
        }, 1000);

        /**
                 * Setup the environment for Local Testing
                 */
        $scope.showBarcodePopup = function() {
          var esigModel = $modal.open({
            templateUrl: "views/modals/barcode-entry.html",
            keyboard: false,
            backdrop: "static",
            size: "md",
            controller: "BarcodeDevEntry"
          });
        };
      }

      $scope.$watch(
        function() {
          CONFIG.isEccInOrder = OrderFactory.getEccNumber();
          return OrderFactory.eccNumber;
        },
        function(newValue, oldValue) {
          CONFIG.isEccInOrder = OrderFactory.getEccNumber();
        }
      );

      //Fastpass callback
      $scope.fastPassListner = function(barcode, pickupID) {
        if (PrepayBarcodeLookupService.checkIfFastPassTransactionInProgress()) {
          PrepayBarcodeLookupService.showErrorMessageModal(
            "fastPassTransactionInProgress"
          );
          return;
        }

        var fastPassPatientPromise;
        var parsedBarcode = FastpassBarcode.parseBarcode(barcode);
        var version = OrderFactory.getFastpassVersion();
        var fastPassID = parsedBarcode.fastPassID;
        var userID = parsedBarcode.userID;
        var transId = parsedBarcode.transId;
        var connectivity = parsedBarcode.connectivity;
        var mcxflag = parsedBarcode.mcxflag;
        var fastPassData = {};
        if (barcode) {
          //setting barcode data
          fastPassData.transactionID = transId;
          fastPassData.fastPassID = fastPassID;
          fastPassData.userID = userID;
          fastPassData.version = version;
          fastPassData.barCodeScanTime = appUtils.getCurrentTimestamp(
            CONFIG.barCodeTimeFormat
          );
          fastPassData.mcxflag = mcxflag;
          var encodedTransId = encodeURIComponent(transId);
          var encodedUserId = encodeURIComponent(userID);
          fastPassPatientPromise = Request.invoke({
            url:
              appConfig.store.services.API.fastPassPatient +
              version +
              "?scannedId=" +
              fastPassID +
              "&transID=" +
              encodedTransId +
              "&userID=" +
              encodedUserId +
              "&connectivityFlag=" +
              connectivity +
              "&payFlag=" +
              mcxflag,
            method: "GET"
          });
        } else {
          fastPassData.pickupCode = pickupID;
          fastPassData.barCodeScanTime = appUtils.getCurrentTimestamp(
            CONFIG.barCodeTimeFormat
          );
          fastPassPatientPromise = Request.invoke({
            loadMessage: "Looking up pickup number...",
            url:
              appConfig.store.services.API.fastPassPatient +
              "0" +
              "?pickupCode=" +
              pickupID,
            method: "GET"
          });
        }
        // setting the fastpassTxn data
        OrderFactory.setFastpassTransactionData(fastPassData);
        fastPassPatientPromise.then(
          function(data) {
            var transactionID = data.transactionID;
            var fastPassID = data.fastPassID;
            var pickupCode = data.pickupCode;
            var extraCareID = data.extraCareID;
            if (data.version) {
              var version = ("00" + data.version).slice(-2);
              OrderFactory.setFastpassVersion(version);
            }

            if (userID == null) {
              userID = data.userID;
            }
            // setting fastPassTxnData for recordProcessedTransaction
            var fastPassData = {};
            fastPassData.transactionID = transactionID;
            fastPassData.fastPassID = fastPassID;
            fastPassData.pickupCode = pickupCode;
            fastPassData.extraCareID = extraCareID;
            fastPassData.userID = userID;
            fastPassData.mcxflag = mcxflag;
            var fastPassTxnData = OrderFactory.getFastpassTransactionData();
            fastPassData.barCodeScanTime = fastPassTxnData.barCodeScanTime;
            OrderFactory.setFastpassTransactionData(fastPassData);
            var patientIdList = [];
            var options = {};
            if (
              (data.patientList && data.patientList.length) ||
              (data.orderDetails && data.orderDetails.length)
            ) {
              var newPatientIdList = [];
              if (data.orderDetails && data.orderDetails.length) {
                var orderDetailsPatientList = PrepayBarcodeLookupService.checkIfPatientsAlreadyAddedtoBasketWithFastPassOrderPatientList(
                  newPatientIdList,
                  data.orderDetails
                );
                if (orderDetailsPatientList && orderDetailsPatientList.length) {
                  newPatientIdList = newPatientIdList.concat(
                    orderDetailsPatientList
                  );
                }
              } else {
                newPatientIdList = PrepayBarcodeLookupService.checkIfPatientsAlreadyAddedtoBasketWithFastPassPatientList(
                  data.patientList
                );
              }
              if (newPatientIdList && newPatientIdList.length) {
                patientIdList = newPatientIdList;
                options = {
                  patientId: patientIdList.join(","),
                  relationship: "All"
                };
              } else {
                PrepayBarcodeLookupService.showErrorMessageModal(
                  "patientsAlreadyAddedToBasket"
                );
                return;
              }
            } else {
              PrepayBarcodeLookupService.voidFastPassTransaction();
              PrepayBarcodeLookupService.showErrorMessageModal();
              return;
            }

            var fastPassScanPromise = PatientService.fetchPatientProfileList(
              options
            );
            fastPassScanPromise.then(
              function(result) {
                var data = {
                  patientProfileList: result
                };
                if (data && data.patientProfileList.length) {
                  var scriptsFound = false;
                  data.patientProfileList.map(function(pprItem) {
                    if (pprItem.patientFillInfoList.length) {
                      scriptsFound = true;
                    }
                  });
                  if (!scriptsFound) {
                    PrepayBarcodeLookupService.showErrorMessageModal(
                      "orderCompleted"
                    );
                    return;
                  }
                  data.transactionID = transactionID;
                  data.fastPassID = fastPassID;
                  data.pickupCode = pickupCode;
                  data.extraCareID = extraCareID;
                  data.userID = userID;
                  OrderFactory.setFastpassData(data);
                  // setting fastPassTxnData for recordProcessedTransaction
                  var fastPassTxnData = OrderFactory.getFastpassTransactionData();
                  data.barCodeScanTime = fastPassTxnData.barCodeScanTime;
                  OrderFactory.setFastpassTransactionData(data);
                  angular.forEach(data.patientProfileList, function(pprItem) {
                    PatientFactory.addToSelectedPatientList(
                      pprItem.patientDetails
                    );
                    BasketService.updateBasketData(
                      pprItem.patientDetails.rxCPatientId,
                      pprItem
                    );
                    PatientService.handlePostProfileFetchAction(pprItem);
                  });
                  OrderFactory.setFastpass(true);
                  if (data.patientProfileList.length === patientIdList.length) {
                    $location.url("/basket");
                  } else {
                    // Show error that some patient are not found.
                    var modalOptions = {
                      buttons: ["OK"],
                      headerText: "Information",
                      bodyText:
                        "Some of the patients are not found in this store."
                    };
                    DialogService.showDialog({}, modalOptions).then(function(
                      result
                    ) {
                      $location.url("/basket");
                    });
                  }
                } else {
                  var eventDetails = {
                    eventStatusDesc:
                      "No Prescriptions Available at this location",
                    eventStatusCode: "109",
                    eventTime: appUtils.getCurrentTimestamp(
                      CONFIG.barCodeTimeFormat
                    ),
                    eventName: "BARCODE_SCAN_EVENT"
                  };
                  OrderFactory.addFastpassEventDetailsList(eventDetails);
                  var modalOptions = {
                    buttons: ["OK"],
                    headerText: "Information",
                    bodyText: "No Prescriptions Available at this location"
                  };
                  DialogService.showDialog({}, modalOptions).then(function(
                    result
                  ) {
                    //Close window
                    // call recordProcessedTransaction service
                    OrderFactory.recordProcessedTransaction("Void");
                  });
                }
              },
              function(data) {
                var code = "";
                if (data.code != null && data.code != undefined) {
                  code = data.code.toString();
                }
                var eventDetails = {
                  eventStatusDesc: data.message != null ? data.message : "",
                  eventStatusCode: code,
                  eventTime: appUtils.getCurrentTimestamp(
                    CONFIG.barCodeTimeFormat
                  ),
                  eventName: "BARCODE_SCAN_EVENT"
                };
                OrderFactory.addFastpassEventDetailsList(eventDetails);
                var modalOptions = {
                  buttons: ["OK"],
                  headerText: "Error",
                  bodyText: "Mobile Pick Up ID not valid"
                };
                DialogService.showDialog({}, modalOptions).then(function(
                  result
                ) {
                  //Close window
                  // call recordProcessedTransaction service
                  OrderFactory.recordProcessedTransaction("Void");
                });
              }
            );
          },
          function(data) {
            var code = "";
            if (data.code != null && data.code != undefined) {
              code = data.code.toString();
            }
            var eventDetails = {
              eventStatusDesc: data.message != null ? data.message : "",
              eventStatusCode: code,
              eventTime: appUtils.getCurrentTimestamp(CONFIG.barCodeTimeFormat),
              eventName: "BARCODE_SCAN_EVENT"
            };
            OrderFactory.addFastpassEventDetailsList(eventDetails);
            if (!barcode) {
              var fastPassTxnData = OrderFactory.getFastpassTransactionData();
              fastPassTxnData.transactionID = pickupID;
              fastPassTxnData.userID = pickupID;
              OrderFactory.setFastpassTransactionData(fastPassTxnData);
            }
            var modalOptions = {
              buttons: ["OK"],
              headerText: "Error",
              bodyText: "Mobile Pick Up ID not valid"
            };
            DialogService.showDialog({}, modalOptions).then(function(result) {
              //Close window
              // call recordProcessedTransaction service
              OrderFactory.recordProcessedTransaction("Void");
            });
          }
        );
      };

      $scope.clearAllFactories = function(fromGoHomeAction) {
        ClearTransactionService.clearAllFactories(fromGoHomeAction);
        fromGoHomeAction && $scope.updateSecDispPriceList();
        $scope.disableRootScanListeners();
        $scope.enableRootScanListeners();
        // OpportunityFactory.clearOpportunityData();
      };

      $scope.signOff = function(signOffType) {
        LOGGER.info("Button Pressed - Sign Off", "TerminalCtrl");

        var modalOptions = {
          buttons: ["Yes", "No"],
          headerText: "Confirm Sign Off",
          bodyText: "Are you sure you want to sign off?"
        };
        DialogService.showDialog({}, modalOptions).then(function(result) {
          if (result == "Yes") {
            $scope.clearAllFactories();
            CONFIG.storeData.isOffline = false;
            delete CONFIG.loggedInUser.id;
            if (SocketFactory.getIsTargetStore()) {
              $location.url("/login");
            } else {
              SocketTrafficHandler.send(
                JSON.stringify({
                  options: {
                    event: signOffType,
                    payload: {}
                  }
                }),
                true
              ).then(function() {});
              NavigationService.navigateToPOS();
            }
          }
        });
      };

      $scope.buildRxBarcode = function(rxInfo, specialtyOrderNum) {
        var rxnum = specialtyOrderNum
          ? appUtils.prepandZeros(rxInfo.rxNum, 7)
          : appUtils.prepandZeros(rxInfo.rxNum, 7);
        var reFillNum = appUtils.prepandZeros(rxInfo.refillNum || 0, 3);
        var editVerNum = appUtils.prepandZeros(rxInfo.editVersionNum || 0, 3);
        var parFillSeqNum = appUtils.prepandZeros(
          rxInfo.partialFillSeqNum || 0,
          2
        );
        var priceAmt = appUtils.prepandZeros(
          Math.round(rxInfo.patPayAmt * 100) || 0,
          7
        );
        if (specialtyOrderNum) {
          return "37" + "003" + rxnum + priceAmt;
        } else {
          return (
            "27" + rxnum + reFillNum + editVerNum + parFillSeqNum + priceAmt
          );
        }
      };

      $scope.buildPartialRxbarcode = function(rxInfo) {
        var rxnum = appUtils.prepandZeros(rxInfo.rxNum, 7);
        var reFillNum = appUtils.prepandZeros(rxInfo.refillNum || 0, 3);
        var editVerNum = appUtils.prepandZeros(rxInfo.editVersionNum || 0, 3);
        var parFillSeqNum = appUtils.prepandZeros(
          rxInfo.partialFillSeqNum || 0,
          2
        );
        return rxnum + reFillNum + editVerNum + parFillSeqNum;
      };
      $scope.buildPartialRxbarcodeMsgItem = function(msgItem) {
        var rxnum = appUtils.prepandZeros(msgItem.rxNum, 7);
        var reFillNum = appUtils.prepandZeros(msgItem.refillNum || 0, 3);
        var editVerNum = appUtils.prepandZeros(msgItem.editVersionNum || 0, 3);
        var parFillSeqNum = appUtils.prepandZeros(
          msgItem.partialFillSeqNum || 0,
          2
        );
        return rxnum + reFillNum + editVerNum + parFillSeqNum;
      };
      $scope.agentPunch = function(data) {
        LOGGER.info("Button Pressed - Punch in/out", "TerminalCtrl");

        if (
          CONFIG.storeAttributes.workbrain &&
          CONFIG.storeAttributes.workbrain.toUpperCase() === "YES"
        ) {
          PunchService.doPunch();
        } else {
          $scope.sourceRoute = data;
          $location.url("/agent-punch");
        }
      };
      // method to check for new AutoFill changes are ON/OFF on Esig based on pharmacyInfo  - Vinuthna
      $scope.isAutoFillEnabled = function() {
        var autoFillEnabled = null;
        if (
          DAILY_CONFIG.pharmacyInfo &&
          DAILY_CONFIG.pharmacyInfo.pharmacyInfo &&
          DAILY_CONFIG.pharmacyInfo.pharmacyInfo.applicationOptionConfig &&
          DAILY_CONFIG.pharmacyInfo.pharmacyInfo.applicationOptionConfig.length
        ) {
          DAILY_CONFIG.pharmacyInfo.pharmacyInfo.applicationOptionConfig.map(
            function(applicationOptionObj) {
              if (
                applicationOptionObj.applicationOption ===
                "Rfill.CaptureReadyFillESig"
              ) {
                autoFillEnabled = applicationOptionObj.value;
              }
            }
          );
        }
        if (autoFillEnabled) {
          return true;
        } else {
          return false;
        }
      };

      // method to check for new ReadyFill changes are ON/OFF on Esig based on pharmacyInfo  - Vinuthna
      $scope.readyFill2Enabled = function() {
        var readyFillEnabled = null;
        if (
          DAILY_CONFIG.pharmacyInfo &&
          DAILY_CONFIG.pharmacyInfo.pharmacyInfo &&
          DAILY_CONFIG.pharmacyInfo.pharmacyInfo.applicationOptionConfig &&
          DAILY_CONFIG.pharmacyInfo.pharmacyInfo.applicationOptionConfig.length
        ) {
          DAILY_CONFIG.pharmacyInfo.pharmacyInfo.applicationOptionConfig.map(
            function(applicationOptionObj) {
              if (
                applicationOptionObj.applicationOption ===
                "Readyfill.EnhancedReadyFillEnrollAll"
              ) {
                readyFillEnabled = applicationOptionObj.value;
              }
            }
          );
        }
        if (readyFillEnabled) {
          return true;
        } else {
          return false;
        }
      };
      var eccScanListener = function(evt, barcode) {
        LOGGER.info("eccScanListener event triggered");

        if (ExtraCareEnrollmentService.getExtraCareEnrollmentProgress()) {
          $rootScope.$broadcast("SCANNED_DATA_ECC_ENROLLMENT", barcode);
          return;
        }

        if (PHRExtracareFactory.getPHREnrollmentInProgress()) {
          $rootScope.$broadcast("SCANNED_DATA_ECC_HIPAA", barcode);
          return;
        }

        var q = "card_nbr=" + barcode;
        if (!OrderFactory.getEccNumber()) {
          LOGGER.info("Extracare lookup for card " + barcode);
          var eccLookupPromise = Request.invoke({
            url: appConfig.store.services.API.extraCareLookUp + "?" + q,
            method: "GET"
          });
          eccLookupPromise.then(
            function(result) {
              OrderFactory.setEccNumber(barcode);
              OrderFactory.setEccData(result);
              $scope.$broadcast("SCANNED_DATA_ECC_CARD", barcode);

              LOGGER.info("Extracare lookup for card Success");
              // var modalOptions = {
              //     buttons: ['OK'],
              //     headerText: 'Extracare Card Scanned',
              //     bodyText: 'Extracare Card has been scanned'
              // };
              // DialogService.showDialog({}, modalOptions).then(function(result) {});
            },
            function(error) {
              LOGGER.info("Extracare lookup for card failed");

              var modalOptions = {
                buttons: ["OK"],
                headerText: "Error",
                bodyText: "Invalid Extracare Card Scanned"
              };
              DialogService.showDialog({}, modalOptions).then(function(
                result
              ) {});
            }
          );
        } else {
          LOGGER.info("Extracare card already added");

          var modalOptions = {
            buttons: ["OK"],
            headerText: "Information",
            bodyText: "EXTRACARE CARD WAS<br/>ALREADY SELECTED"
          };
          DialogService.showDialog({}, modalOptions).then(function(result) {});
        }
      };
      $scope.$on("SCANNED_DATA_TRIAL_COUPON", function(
        evt,
        barcode,
        SCANNED_BARCODE_TYPE
      ) {
        var couponInfo = appUtils.parseBarcode(
          barcode,
          "SCANNED_DATA_TRIAL_COUPON"
        );
        if (
          CONFIG.storeAttributes.trailOfferGiftCardEnabled === "Y" &&
          SocketFactory.getIsTargetStore()
        ) {
          OrderService.applyWelcomeRxCoupon(couponInfo);
        }
      });
    }
  ])
  .run(function(
    $timeout,
    $document,
    $location,
    OrderFactory,
    CONFIG,
    BasketFactory,
    PosSimplificationTimeStampService,
    SocketTrafficHandler,
    NavigationService,
    SocketFactory
  ) {
    // Timeout timer value
    var idleTimeoutValue =
      parseInt(CONFIG.storeAttributes.idleTimeoutValue) || 900000;

    // Start a timeout
    var timeoutThread = $timeout(function() {
      lockWeCarePlusApp();
    }, idleTimeoutValue);
    var bodyElement = angular.element($document);

    /// Keyboard Events
    // bodyElement.bind('keydown', function(e) { resetLockTimer(e) });
    // bodyElement.bind('keyup', function(e) { resetLockTimer(e) });

    /// Mouse Events
    bodyElement.bind("click", function(e) {
      resetLockTimer(e);
    });
    // bodyElement.bind('mousemove', function(e) { resetLockTimer(e) });
    // bodyElement.bind('DOMMouseScroll', function(e) { resetLockTimer(e) });
    // bodyElement.bind('mousewheel', function(e) { resetLockTimer(e) });
    // bodyElement.bind('mousedown', function(e) { resetLockTimer(e) });

    /// Touch Events
    // bodyElement.bind('touchstart', function(e) { resetLockTimer(e) });
    // bodyElement.bind('touchmove', function(e) { resetLockTimer(e) });

    /// Common Events
    // bodyElement.bind('scroll', function(e) { resetLockTimer(e) });
    // bodyElement.bind('focus', function(e) { resetLockTimer(e) });

    function lockWeCarePlusApp() {
      if (
        $location.path() !== "/login" &&
        $location.path() !== "/password" &&
        $location.path() !== "/agent-punch" &&
        OrderFactory.getNoItemsInOrder() &&
        (BasketFactory.getRxItemsInOrder() &&
          !Object.keys(BasketFactory.getRxItemsInOrder()).length)
      ) {
        LOGGER.info(
          "IDLE Activity Found from " + idleTimeoutValue / 60,
          "IdleLockTimer"
        );
        PosSimplificationTimeStampService.resetEvent();
        if (!SocketFactory.getIsTargetStore()) {
          SocketTrafficHandler.send(
            JSON.stringify({
              options: {
                event: "SESSION_TIME_OUT",
                payload: {}
              }
            })
          ).then(function(response) {});
          NavigationService.navigateToPOS();
        }
        appUtils.idleTimerLogout = true;
        CONFIG.storeData.isOffline = false;
        delete CONFIG.loggedInUser.id;
        $location.url("/login");
      }
    }

    function resetLockTimer(e) {
      LOGGER.debug(
        "Activity Found :: Page > " +
          $location.path() +
          " Event > " +
          (e && e.target && e.target.outerText),
        "IdleLockTimer"
      );

      /// Stop the pending timeout
      $timeout.cancel(timeoutThread);

      /// Reset the timeout
      timeoutThread = $timeout(function() {
        lockWeCarePlusApp();
      }, idleTimeoutValue);
    }
  });

TerminalCtrl.loadData = function(Request, PollingFactory, CONFIG) {
  PollingFactory.dailyConfigPolling();
  Request.invoke({
    url: appConfig.store.services.API.rdyFillLiteConfirmationFlag,
    method: "GET"
  }).then(function(data) {
    if (data.value) {
      CONFIG.storeData.rdyFillLiteConfirmationFlagCheck = data.value;
    }
  });
};

angular
  .module("weCarePlusApp")
  .controller("BarcodeDevEntry", function($scope, $modalInstance, $rootScope) {
    LOGGER.info("BarcodeDevEntry - Entering BarcodeDevEntry");

    $scope.code = "";
    $scope.codetype = "101";
    $scope.sendEvent = function() {
      $rootScope.$broadcast("BARCODE_SCAN", {
        scanData: window.btoa($scope.code),
        scanDataType: $scope.codetype
      });
      $modalInstance.close();
    };

    $scope.dismiss = function() {
      LOGGER.info("BarcodeDevEntry - Entering dismiss method");
      $modalInstance.close();
    };
  });

//
// SCAN_SDT_UPCA        = 101;  // Digits
// SCAN_SDT_UPCE        = 102;  // Digits
// SCAN_SDT_JAN8        = 103;  // = EAN 8
// SCAN_SDT_EAN8        = 103;  // = JAN 8
// SCAN_SDT_JAN13       = 104;  // = EAN 13
// SCAN_SDT_EAN13       = 104;  // = JAN 13
// SCAN_SDT_TF          = 105;  // (Discrete 2 of 5)
// SCAN_SDT_ITF         = 106;  // (Interleaved 2 of 5)
// SCAN_SDT_Codabar     = 107;  // Digits, -, $, :, /, .,
// SCAN_SDT_Code39      = 108;  // Alpha, Digits, Space,
// SCAN_SDT_Code93      = 109;  // Same characters as
// SCAN_SDT_Code128     = 110;  // 128 data characters
// SCAN_SDT_UPCA_S      = 111;  // UPC-A with
// SCAN_SDT_UPCE_S      = 112;  // UPC-E with
// SCAN_SDT_UPCD1       = 113;  // UPC-D1
// SCAN_SDT_UPCD2       = 114;  // UPC-D2
// SCAN_SDT_UPCD3       = 115;  // UPC-D3
// SCAN_SDT_UPCD4       = 116;  // UPC-D4
// SCAN_SDT_UPCD5       = 117;  // UPC-D5
// SCAN_SDT_EAN8_S      = 118;  // EAN 8 with
// SCAN_SDT_EAN13_S     = 119;  // EAN 13 with
// SCAN_SDT_EAN128      = 120;  // EAN 128
// SCAN_SDT_OCRA        = 121;  // OCR "A"
// SCAN_SDT_OCRB        = 122;  // OCR "B"
// SCAN_SDT_RSS14       = 131;  // Reduced Space Symbology - 14 digit GTIN
// SCAN_SDT_RSS_EXPANDED= 132;  // RSS - 14 digit GTIN plus additional fields
// SCAN_SDT_GS1DATABAR  = 131;  // GS1 DataBar Omnidirectional (normal or stacked)
// SCAN_SDT_GS1DATABAR_E= 132;  // GS1 DataBar Expanded (normal or stacked)
// SCAN_SDT_ITF_CK           = 133;  // Interleaved 2 of 5 check digit verified and
// SCAN_SDT_GS1DATABAR_TYPE2 = 134; // GS1 DataBar Limited
// SCAN_SDT_AMES             = 135;  // Ames Code
// SCAN_SDT_TFMAT            = 136;  // Matrix 2 of 5
// SCAN_SDT_Code39_CK        = 137;  // Code 39 with check character verified and
// SCAN_SDT_Code32           = 138;  // Code 39 with Mod 32 check character
// SCAN_SDT_CodeCIP          = 139;  // Code 39 CIP
// SCAN_SDT_TRIOPTIC39       = 140;  // Tri-Optic Code 39
// SCAN_SDT_ISBT128          = 141;  // ISBT-128
// SCAN_SDT_Code11           = 142;  // Code 11
// SCAN_SDT_MSI              = 143;  // MSI Code
// SCAN_SDT_PLESSEY          = 144;  // Plessey Code
// SCAN_SDT_TELEPEN          = 145;  // Telepen
// SCAN_SDT_CCA         = 151;  // Composite Component A.
// SCAN_SDT_CCB         = 152;  // Composite Component B.
// SCAN_SDT_CCC         = 153;  // Composite Component C.
// SCAN_SDT_TLC39       = 154;  // TLC-39
// SCAN_SDT_PDF417      = 201;
// SCAN_SDT_MAXICODE    = 202;
// SCAN_SDT_DATAMATRIX  = 203;  // Data Matrix
// SCAN_SDT_QRCODE      = 204;  // QR Code
// SCAN_SDT_UQRCODE     = 205;  // Micro QR Code
// SCAN_SDT_AZTEC       = 206;  // Aztec
// SCAN_SDT_UPDF417     = 207;  // Micro PDF 417
// SCAN_SDT_GS1DATAMATRIX = 208;  // GS1 DataMatrix
// SCAN_SDT_GS1QRCODE     = 209;  // GS1 QR Code
// SCAN_SDT_Code49        = 210;  // Code 49
// SCAN_SDT_Code16k       = 211;  // Code 16K
// SCAN_SDT_CodablockA    = 212;  // Codablock A
// SCAN_SDT_CodablockF    = 213;  // Codablock F
// SCAN_SDT_Codablock256  = 214;  // Codablock 256
// SCAN_SDT_HANXIN        = 215;  // Han Xin Code
// SCAN_SDT_AusPost       = 301;  // Australian Post
// SCAN_SDT_CanPost       = 302;  // Canada Post
// SCAN_SDT_ChinaPost     = 303;  // China Post
// SCAN_SDT_DutchKix      = 304;  // Dutch Post
// SCAN_SDT_InfoMail      = 305;  // InfoMail
// SCAN_SDT_JapanPost     = 306;  // Japan Post
// SCAN_SDT_KoreanPost    = 307;  // Korean Post
// SCAN_SDT_SwedenPost    = 308;  // Sweden Post
// SCAN_SDT_UkPost        = 309;  // UK Post BPO
// SCAN_SDT_UsIntelligent = 310;  // US Intelligent Mail
// SCAN_SDT_UsPlanet      = 311;  // US Planet Code
// SCAN_SDT_PostNet       = 312;  // US Postnet
// SCAN_SDT_OTHER       = 501;  // Start of Scanner-
// SCAN_SDT_UNKNOWN     =   0;  // Cannot determine the