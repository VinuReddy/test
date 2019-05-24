// modal

<div class="parallel-path-wrapper" ng-init="init()">
    <div class="parallel-path-component-wrapper parallel-path-height">
        <div class="parallel-flow-header"><span>Patient View</span></div>
        <posbasketflushotsimplification ng-if="parallelData.screenData.flushot" flushot-data="parallelData" sub-screen-action="parallelTechAction(options)"></posbasketflushotsimplification>
        <br/>
        <br/>
        <posbasketextracaresimplification ng-if="parallelData.screenData.extracare" extracare-data="parallelData" sub-screen-action="parallelTechAction(options)"></posbasketextracaresimplification>
    </div>
</div>

//
<div ng-class="{'blur-text': extracareData.screenData.extracare.activeFlushotSocket}">
    <p ng-class="{'blur-text': isActionCompleted()}" class="flushot-text modal-width" ng-if="!extracareData.screenData.extracare.extracareState.showNoResults"
        ng-bind-html="getFormattedText(extracareData.screenData.extracare.screeenText)"></p>
    <p ng-class="{'blur-text': isActionCompleted()}" class="flushot-text" ng-if="extracareData.screenData.extracare.extracareState.showNoResults">Zero results obtained for phone lookup</p>
    <div ng-class="{'blur-text': isActionCompleted()}" ng-if="!extracareData.screenData.extracare.extracareState.phone && extracareData.screenData.extracare.extracareState.name"
        class="flushot-btn-wrapper modal-width">
        <p class="flushot-text phn-margin">Cardholder: {{extracareData.screenData.extracare.extracareState.name}}</p>
    </div>
    <div ng-class="{'blur-text': isActionCompleted()}" ng-if="extracareData.screenData.extracare.extracareState.phone" class="flushot-btn-wrapper modal-width">
        <p class="flushot-text phn-margin">{{extracareData.screenData.extracare.extracareState.phone | tel}}</p>
    </div>
    <div class="flushot-btn-wrapper modal-width" ng-if="!extracareData.screenData.extracare.buttonList && !extracareData.screenData.extracare.extracareState.showNoResults && !extracareData.screenData.extracare.extracareState.showViewResults">
        <span data-ng-repeat="text in extracareData.screenData.extracare.textList" ng-class="isTextActive(text)" class="completed-text modal-width">{{getDisplayText(text)}}</span>
    </div>
    <div ng-if="!isActionCompleted() && !extracareData.screenData.extracare.extracareState.showViewResults" class="flushot-btn-wrapper modal-width">
        <button data-ng-repeat="button in extracareData.screenData.extracare.buttonList" ng-class="getButtonColour(button)" class="btn extracare-btn"
            ng-click="extraCareAction('extracare', button, 'handleExtracareAction')">{{button}}</button>
    </div>
    <div ng-if="extracareData.screenData.extracare.extracareState.showViewResults" class="flushot-btn-wrapper modal-width">
        <button class="btn extracare-viewresults-btn btn-bg-green" ng-click="extraCareAction('extracare', 'viewResults', 'handleExtracareAction')">View Results</button>
    </div>
    <div ng-if="extracareData.screenData.extracare.extracareState.showNoResults" class="flushot-btn-wrapper modal-width">
        <button class="btn extracare-viewresults-btn btn-bg-green" ng-click="extraCareAction('extracare', 'retry', 'handleExtracareAction')">Re-try</button>
        <button class="btn extracare-viewresults-btn btn-bg-red" ng-click="extraCareAction('extracare', 'Skip', 'handleExtracareAction')">Skip</button>
    </div>
</div>




// ena-ref

angular.module('weCarePlusApp')
    .service('EnableRefillAtPickupService', ['ModalService',
        'BasketFactory',
        'CONFIG',
        'MessageService',
        'DialogService',
        'PatientFactory',
        'PosSimplificationTimeStampService',
        function(ModalService,
            BasketFactory,
            CONFIG,
            MessageService,
            DialogService,
            PatientFactory,
            PosSimplificationTimeStampService) {

            var self = this;

            this.displaySourceMap = {
                'system': '3'
            }

            //This method is used to check if there are refill messages in available for display in the basket
            this.isRefillEligibleAtPickup = function() {
                var basketData = BasketFactory.getBasketData();
                var refillMessageCount = 0;
                angular.forEach(basketData, function(patientProfile, patientId) {
                    if (!self.isPatientAlreadyAbsent(patientId)) {
                        if (patientProfile.patientMessageInfo &&
                            patientProfile.patientMessageInfo['rxCentrMsg'] &&
                            patientProfile.patientMessageInfo['rxCentrMsg'].length) {
                            patientProfile.patientMessageInfo['rxCentrMsg'].map(function(rxCentrMsg) {
                                if (rxCentrMsg.messageType === 5 &&
                                    rxCentrMsg.progType === '16' &&
                                    !rxCentrMsg.outcome) {
                                    refillMessageCount++;
                                }
                            })
                        }
                    }
                });
                return refillMessageCount;
            }


            this.invokeEnableRefillMessages = function(displaySource) {
                self.displaySourceMap['user'] = displaySource;
                var enableRefillMessagesPromise = MessageService.invokeGeneralMessageProcessing('general', CONFIG.enableRefillAtPickup.categoryType);
                return enableRefillMessagesPromise;
            }

            this.screenAction = function(options) {
                switch (options.screenAction) {
                    case 'clear':
                        self.clear(options);
                        break;
                    case 'continue':
                        self.continue(options);
                        break;
                    case 'back':
                        self.goBack(options);
                        break;
                    case 'disposition':
                        self.handleAction(options);
                        break;
                    default:
                        self.continue(options);
                        break;
                }
            }


            //This method is used to construct screen data based on type of messages recived from the the service
            this.constructScreenData = function(options) {
                var screenData = {};
                var patientMessageProgSubtypeMap = self.handlePatientMessageProgSubtype(options);
                var defaultMessage = patientMessageProgSubtypeMap.defaultMessage;
                var patientMessageConfig = defaultMessage.messageConfig;
                var configInfo = defaultMessage.messageConfig.configInfo['1'];
                screenData.refillMessages = patientMessageProgSubtypeMap.refillMessages;
                screenData.errorMessage = patientMessageProgSubtypeMap.errorMessage;
                screenData.pickupTimeMessage = patientMessageProgSubtypeMap.pickupTimeMessage;
                screenData.configInfo = configInfo;
                screenData.patientIdRxInfoPatMsgListMap = self.fetchPatientIdRxInfoPatMsgListMap(patientMessageProgSubtypeMap.refillMessages)
                screenData.descTxt = configInfo.descTxt;
                screenData.intrTxt = configInfo.intrTxt;
                screenData.dispTitle = configInfo.dispTitle;
                screenData.scrButton = patientMessageConfig.scrButton;
                screenData.screenType = options.typeOfInitiation;
                screenData.continueButtonGridValue = screenData.screenType === 'user' ? 'col-xs-4' : 'col-xs-12';
                screenData.dispositionMap = {};
                options.screenData = screenData;
                self.initialContinueBtnState(options);
                if (screenData.errorMessage) {
                    self.showRxcCommunicationError(options);
                }
            }

            //This helper method and is used to group the messages by original refill messages and error messages.
            this.handlePatientMessageProgSubtype = function(options) {
                var patientMessageProgSubtypeMap = {};
                var templateKey = options.patientMessageList[0].messageType + '-' +
                    options.patientMessageList[0].progType
                if (options.patientMessageList[0].messageConfig.progSubType) {
                    templateKey += '-' + options.patientMessageList[0].messageConfig.progSubType;
                }
                LOGGER.info('Type of Enable Refill screen is - ' + templateKey);
                switch (templateKey) {
                    case '0-5-16-2-2':
                        patientMessageProgSubtypeMap.refillMessages = [];
                        patientMessageProgSubtypeMap.pickupTimeMessage = options.patientMessageList[0];
                        patientMessageProgSubtypeMap.defaultMessage = options.patientMessageList[1];
                        options.patientMessageList.map(function(patientMessage, index) {
                            if (index > 0) {
                                patientMessageProgSubtypeMap.refillMessages.push(patientMessage);
                            }
                        });
                        break;
                    case '0-5-16-5':
                        patientMessageProgSubtypeMap.refillMessages = [];
                        patientMessageProgSubtypeMap.errorMessage = options.patientMessageList[0];
                        patientMessageProgSubtypeMap.defaultMessage = options.patientMessageList[1];
                        options.patientMessageList.map(function(patientMessage, index) {
                            if (index > 0) {
                                patientMessageProgSubtypeMap.refillMessages.push(patientMessage);
                            }
                        });
                        break;
                    default:
                        patientMessageProgSubtypeMap.refillMessages = options.patientMessageList;
                        patientMessageProgSubtypeMap.defaultMessage = options.patientMessageList[0];
                        break;
                }
                return patientMessageProgSubtypeMap
            }

            //This method helps to group the messages by patient and get all the patient information required for display
            this.fetchPatientIdRxInfoPatMsgListMap = function(patientMessageList) {
                var basketData = BasketFactory.getBasketData();
                var patientIdRxMap = {};
                patientMessageList.map(function(patientMessage) {
                    if (!patientIdRxMap[patientMessage.rxPatientId]) {
                        patientIdRxMap[patientMessage.rxPatientId] = {};
                        patientIdRxMap[patientMessage.rxPatientId].patientMessageList = [];
                        patientIdRxMap[patientMessage.rxPatientId].patientInformation = basketData[patientMessage.rxPatientId].patientDetails;
                    }
                    patientIdRxMap[patientMessage.rxPatientId].patientMessageList.push(patientMessage)
                })
                return patientIdRxMap;
            }

            this.isPatientAlreadyAbsent = function(patientId) {
                var patientPresentMap = PatientFactory.getPatientPresentMap();
                if (patientPresentMap &&
                    Object.keys(patientPresentMap).length !== 0 &&
                    patientPresentMap.hasOwnProperty(patientId) &&
                    patientPresentMap[patientId] === 0) {
                    return true
                } else {
                    return false
                }
            }

            this.continue = function(options) {
                LOGGER.info('ER@PU - Continue button clicked');
                if (options.typeOfInitiation === 'user') {
                    if (Object.keys(options.screenData.dispositionMap).length > 0) {
                        self.updateDisplayedInUIScenarioFlag(options);
                        self.showPromiseTimePopup(options);
                    } else {
                        self.goBack(options);
                    }
                } else if (options.screenData.continueActive) {
                    self.showPromiseTimePopup(options);
                }
            }

            this.initialContinueBtnState = function(options) {
                options.screenData.refillMessages.map(function(refillMessage) {
                    if (refillMessage.outcome) {
                        options.screenData.dispositionMap[refillMessage.msgSeq] = refillMessage.outcome;
                    }
                });
                self.isContinueButtonActive(options);
            }

            //Clears all selection on ER@PU screen
            this.clear = function(options) {
                LOGGER.info('ER@PU - Clear button clicked');
                options.screenData.refillMessages.map(function(refillMessage) {
                    refillMessage.outcome = null;
                });
                options.screenData.dispositionMap = {};
                self.isContinueButtonActive(options);
            }

            //Clears all selction on ER@PU screen and closes the ER@PU screen
            this.goBack = function(options) {
                LOGGER.info('ER@PU - Back button clicked');
                self.clear(options);
                options.modalInstance.close();
                options.deferred.resolve('unResolvedRefillMessages');
                var displayedTo = [{
                    "displayedToValue": CONFIG.TIME_STAMPS_CONSTANTS.STAFF
                }]
                var dispositionedBy = CONFIG.TIME_STAMPS_CONSTANTS.STAFF;

                PosSimplificationTimeStampService.selectEventMethod({ programs: "enable_refill_at_pos", displayedTo: displayedTo, dispositionedBy: dispositionedBy, "eventType": "screen_exited", screenName:"enable_refill_at_pos" });
            }

            //This method updates the disposition map with correct disposition values
            this.updateDispositionMap = function(options, disposition) {
                LOGGER.info('ER@PU - message disposition updated for message with msgSeq - ' + options.patientMessage.msgSeq);
                LOGGER.info('ER@PU - message disposition is  - ' + disposition);
                if (disposition) {
                    options.screenData.dispositionMap[options.patientMessage.msgSeq] = disposition;
                } else {
                    if (options.screenData.dispositionMap[options.patientMessage.msgSeq]) {
                        delete options.screenData.dispositionMap[options.patientMessage.msgSeq]
                    }
                }
            }

            //This method use to handle user action based on User Initiated or System Initiated  screens
            this.handleAction = function(options) {
                if (options.typeOfInitiation === 'user') {
                    if (self.isThresholdReached(options)) {
                        LOGGER.info('ER@PU - Combined threshold reached.');
                        self.showThresholdReachedPopup();
                        return;
                    }
                    if (options.patientMessage.outcome !== options.actionId) {
                        options.patientMessage.outcome = options.actionId;
                        self.updateDispositionMap(options, options.actionId);
                    } else {
                        options.patientMessage.outcome = null;
                        self.updateDispositionMap(options, null);
                    }
                } else {
                    options.patientMessage.outcome = options.actionId;
                    self.updateDispositionMap(options, options.actionId);
                }
                self.isContinueButtonActive(options);
            }

            //Used to check if the threshold is reached for accepted refills in case of User initiation
            this.isThresholdReached = function(options) {
                if (options.typeOfInitiation === 'user') {
                    var threshold = self.enableRefillCombinedThreshold();
                    var acceptedRefills = 0;
                    angular.forEach(options.screenData.dispositionMap, function(disposition, msgSeq) {
                        if (disposition === options.screenData.configInfo.lnItmButton.button2.id) {
                            acceptedRefills++;
                        }
                    });
                    if (acceptedRefills == threshold &&
                        options.actionId === options.screenData.configInfo.lnItmButton.button2.id &&
                        options.patientMessage.outcome !== options.screenData.configInfo.lnItmButton.button2.id) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false
                }
            }

            this.showThresholdReachedPopup = function() {
                var modalOptions = {
                    buttons: CONFIG.enableRefillAtPickup.en.thresholdReached.buttons,
                    headerText: CONFIG.enableRefillAtPickup.en.thresholdReached.headerText,
                    bodyText: CONFIG.enableRefillAtPickup.en.thresholdReached.bodyText
                };
                DialogService.showDialog({}, modalOptions).then(function() {

                });
            }

            //This method is used to check if the continue button should be enabled
            this.isContinueButtonActive = function(options) {
                if (options.typeOfInitiation === 'user') {
                    options.screenData.continueActive = true;
                } else {
                    if (options.screenData.dispositionMap && (Object.keys(options.screenData.dispositionMap).length === options.patientMessageList.length - 1)) {
                        options.screenData.continueActive = true;
                    } else {
                        options.screenData.continueActive = false;
                    }
                }
            }

            //This method is used to show the promise time pop up and handle the user input accordingly
            this.showPromiseTimePopup = function(options) {
                self.updateDisplaySource(options);
                if (self.isNotEligibleforPromiseTimePopup(options)) {
                    if (options.typeOfInitiation === 'user') {
                        options.deferred.resolve();
                        options.modalInstance.close();
                    } else {
                        MessageService.displayMessage();
                    }
                    self.handleTimeStampExitEvents(options);
                    return;
                }
                LOGGER.info('ER@PU - Promise time pop up shown.');
                var pickupTimeMessage = options.screenData.pickupTimeMessage;
                var modalOptions = {
                    templateUrl: 'views/modals/enable-refill-at-pickup-time.html',
                    windowClass: 'minor-popup',
                    controller: 'EnableRefillAtPickupTimeCtrl',
                    resolve: {
                        data: function() {
                            return pickupTimeMessage;
                        }
                    }
                };
                var customOptions = {
                    promise: true
                };
                var pickupTimeMessagePromise = ModalService.showModal(modalOptions, customOptions);
                pickupTimeMessagePromise.then(function(result) {
                    LOGGER.info('ER@PU - Promise time popup  user action - ' + result);
                    if (result) {
                        options.screenData.refillMessages.map(function(refillMessage) {
                            if (refillMessage.outcome &&
                                refillMessage.outcome === options.screenData.configInfo.lnItmButton.button2.id) {
                                refillMessage.promiseTimevalue = result;
                            }
                        });
                        if (options.typeOfInitiation === 'user') {
                            options.deferred.resolve();
                            options.modalInstance.close();
                        } else {
                            MessageService.displayMessage();
                        }
                        self.handleTimeStampExitEvents(options);
                    }
                });
            }

            this.isNotEligibleforPromiseTimePopup = function(options) {
                var acceptedRefills = 0;
                if (options.screenData.refillMessages && options.screenData.refillMessages.length) {
                    options.screenData.refillMessages.map(function(refillMessage) {
                        if (refillMessage.outcome === options.screenData.configInfo.lnItmButton.button2.id) {
                            acceptedRefills++
                        }
                    });
                }

                if (acceptedRefills > 0) {
                    return false;
                } else {
                    return true;
                }
            }

            this.updateDisplaySource = function(options) {
                options.screenData.pickupTimeMessage.displaySource = self.displaySourceMap[options.typeOfInitiation]
            }

            this.showRxcCommunicationError = function(options) {
                var modalOptions = {
                    buttons: CONFIG.enableRefillAtPickup.en.rxcCommunicationError.buttons,
                    headerText: CONFIG.enableRefillAtPickup.en.rxcCommunicationError.headerText,
                    bodyText: CONFIG.enableRefillAtPickup.en.rxcCommunicationError.bodyText
                };
                DialogService.showDialog({}, modalOptions).then(function() {
                    if (options.typeOfInitiation === 'user') {
                        options.deferred.resolve();
                        options.modalInstance.close();
                    } else {
                        MessageService.displayMessage();
                    }
                    self.handleTimeStampExitEvents(options);
                });
            }

            this.enableRefillCombinedThreshold = function() {
                var thresholdValue = null;
                if (DAILY_CONFIG.pharmacyInfo && DAILY_CONFIG.pharmacyInfo.pharmacyInfo &&
                    DAILY_CONFIG.pharmacyInfo.pharmacyInfo.applicationOptionConfig &&
                    DAILY_CONFIG.pharmacyInfo.pharmacyInfo.applicationOptionConfig.length) {
                    DAILY_CONFIG.pharmacyInfo.pharmacyInfo.applicationOptionConfig.map(function(applicationOptionObj) {
                        if (applicationOptionObj.applicationOption === 'ERatPU.CombinedRxThresholdMaxRefillsSubmission') {
                            thresholdValue = applicationOptionObj.value;
                        }
                    })
                }

                if (thresholdValue) {
                    return thresholdValue
                } else {
                    return false;
                }
            }

            this.updateDisplayedInUIScenarioFlag = function(options) {
                var patientMsgList = options.screenData.refillMessages;
                if (patientMsgList && patientMsgList.length) {
                    patientMsgList.map(function(refillMessage) {
                        refillMessage.displayedInUIScenario = true;
                    });
                    var msgSeqMsgItemMapTemp = BasketFactory.getMsgSeqMsgItemMap();
                    angular.forEach(patientMsgList, function(patientMsgItem) {
                        var messageItem = msgSeqMsgItemMapTemp[patientMsgItem.msgSeq];
                        if (messageItem) {
                            messageItem.displayedInUIScenario = true;
                        }
                    });
                }
            }

            this.handleTimeStampExitEvents = function(options) {
                var displayedTo = [{
                    "displayedToValue": "staff"
                }];
                var dispositionedBy = "staff";
                PosSimplificationTimeStampService.selectEventMethod({ programs: "enable_refill_at_pos", displayedTo: displayedTo, displayedFor: PosSimplificationTimeStampService.getDisplayedForPayloadFromMessageList(options.screenData.refillMessages, "enable_refill_at_pos"), dispositionedBy: dispositionedBy, "eventType": "screen_exited", screenName: "enable_refill_at_pos" });
            }
        }
    ]);

// basket-serv

"use strict";

angular.module("weCarePlusApp").service("BasketService", [
  "CONFIG",
  "Request",
  "$q",
  "BasketFactory",
  "OrderFactory",
  "PatientFactory",
  "MessageSuppressionService",
  "ESignFactory",
  "CustomerPriceDisplayService",
  "PosSimplificationTimeStampService",
  function(
    CONFIG,
    Request,
    $q,
    BasketFactory,
    OrderFactory,
    PatientFactory,
    MessageSuppressionService,
    ESignFactory,
    CustomerPriceDisplayService,
    PosSimplificationTimeStampService
  ) {
    var _this = this;
    var basketData = BasketFactory.getBasketData();
    var dependentMessageListMap = {
      "5-10": "rxCentrMsg"
    };
    
    var msgTypeProgTypeMessageListKeyMap = {};

    var suppressionEligibleMessageItemMap = {
      "0-0-0-18": true,
      "0-0-0-19": true
    };

    this.updateBasketData = function(key, data) {
      basketData = BasketFactory.getBasketData();
      if (key !== "0") {
        delete basketData["0"];
      }
      // Start time should be RESET every time we add a new patient - PHANI
      PosSimplificationTimeStampService.addPatientProfileForTimestampEvents(
        key,
        data
      );
      CONFIG.messages.txnStartTimestamp = appUtils.getCurrentTimestamp();
      CONFIG.opportunity.txnStartTimestamp = appUtils.getCurrentTimestamp(
        CONFIG.opportunityTimestampFormat
      );
      basketData[key] = data;
      _this.buildPartialBarcodeRxInfoMap();
      _this.buildMsgSeqMsgItemMap();
    };

    this.buildPartialBarcodeRxInfoMap = function() {
      basketData = BasketFactory.getBasketData();
      var partialBarcodeRxInfoMapTemp = {};
      angular.forEach(basketData, function(patientProfile, patientId) {
        angular.forEach(patientProfile.patientFillInfoList, function(fillInfo) {
          var rxInfoPartialBarcode = _this.buildPartialBarcode(fillInfo);
          // if(rxInfoPartialBarcode)
          partialBarcodeRxInfoMapTemp[rxInfoPartialBarcode] = fillInfo;
        });
      });
      BasketFactory.setPartialBarcodeRxInfoMap(partialBarcodeRxInfoMapTemp);
    };

    this.buildPartialBarcodeRxScanMsgMap = function() {
      basketData = BasketFactory.getBasketData();
      //Action Notes, TP Compliance, MedB - Method Not Used Yet
      var rxScanMessages = {
        eanMsg: ["ALL"],
        tpComplianceMsg: ["ALL"],
        rxCentrMsg: ["10", "11"]
      };
      var partialBarcodeRxInfoMapTemp = {};
      angular.forEach(basketData, function(patientProfile, patientId) {
        angular.forEach(rxScanMessages, function(progTypeArr, messageListKey) {
          angular.forEach(
            patientProfile.patientMessageInfo[messageListKey],
            function(messageItem) {
              if (
                progTypeArr[0] === "ALL" ||
                progTypeArr.indexOf(messageItem.progType) > -1
              ) {
                var msgItemPartialBarcode = _this.buildPartialBarcode(
                  messageItem
                );
                partialBarcodeRxInfoMapTemp[
                  msgItemPartialBarcode
                ] = messageItem;
              }
            }
          );
        });
      });
    };

    this.buildMsgSeqMsgItemMap = function() {
      basketData = BasketFactory.getBasketData();
      var msgSeqMsgItemMapTemp = {};
      angular.forEach(basketData, function(patientProfile, patientId) {
        angular.forEach(patientProfile.patientMessageInfo, function(
          messageList,
          patientMessageInfoKey
        ) {
          angular.forEach(messageList, function(messageItem) {
            msgSeqMsgItemMapTemp[messageItem.msgSeq] = messageItem;
          });
        });
      });
      BasketFactory.setMsgSeqMsgItemMap(msgSeqMsgItemMapTemp);
    };

    this.buildPartialBarcodeMessageListMap = function() {
      var partialBarcodeMessageListMap = {};
      basketData = BasketFactory.getBasketData();
      angular.forEach(basketData, function(patientProfile, patientId) {
        angular.forEach(patientProfile.patientMessageInfo, function(
          messageList,
          messageListKey
        ) {
          angular.forEach(messageList, function(messageItem) {
            var partialBarcode = _this.buildPartialBarcode(messageItem);
            if (messageItem.rxNum) {
              if (partialBarcodeMessageListMap[partialBarcode]) {
                partialBarcodeMessageListMap[partialBarcode].push(messageItem);
              } else {
                partialBarcodeMessageListMap[partialBarcode] = [messageItem];
              }
            }
          });
        });
      });
    };

    this.getFillInfoByMessageItem = function(messageItem) {
      var partialBarcodeRxInfoMap = BasketFactory.getPartialBarcodeRxInfoMap();
      var msgItemPartialBarcode = _this.buildPartialBarcode(messageItem);
      return partialBarcodeRxInfoMap[msgItemPartialBarcode];
    };

    //Update Message Disposition will be invoked when we click continue - Not Used (PHANI)
    this.updateMessageDispostion = function(obj) {
      basketData = BasketFactory.getBasketData();
      if (obj && obj.messageDispositionMap) {
        angular.forEach(obj.messageDispositionMap, function(
          messageDispostionObj,
          patientId
        ) {
          var patientProfile = basketData[patientId];
          if (patientProfile) {
            angular.forEach(messageDispostionObj, function(
              msgSeqMsgDispostionMap,
              messageType
            ) {
              var msgInfoKey =
                CONFIG.messages.patientMessageInfoKeyMap[messageType];
              var messageList = patientProfile.patientMessageInfo[msgInfoKey];
              if (messageList && messageList.length) {
                angular.forEach(messageList, function(messageItem) {
                  var messageDispostionObjByMsgSeq =
                    msgSeqMsgDispostionMap[messageItem.msgSeq];
                  if (
                    messageDispostionObjByMsgSeq &&
                    messageDispostionObjByMsgSeq.actualDispostion
                  ) {
                    angular.merge(
                      messageItem,
                      messageDispostionObjByMsgSeq.actualDispostion
                    );
                  }
                });
              }
            });
          }
        });
      }
    };

    //
    this.updatePatientMessageDispostion = function(patientMsgList) {
      if (patientMsgList && patientMsgList.length) {
        var msgSeqMsgItemMapTemp = BasketFactory.getMsgSeqMsgItemMap();
        angular.forEach(patientMsgList, function(patientMsgItem) {
          //For Custom build message we update common attributes
          patientMsgItem.disposition = "1"; //Messaged displayed disposition
          patientMsgItem.timestamp = appUtils.getCurrentTimestamp();
          patientMsgItem.markDisplayed = true;
          var messageItem = msgSeqMsgItemMapTemp[patientMsgItem.msgSeq];
          if (messageItem) {
            if (patientMsgItem.messageConfig) {
              patientMsgItem.mandatory = patientMsgItem.messageConfig.msgInd;
            }
            var patientMsgDisposition = angular.copy(patientMsgItem);
            delete patientMsgDisposition.messageConfig;
            if (
              patientMsgItem.messageType === 5 &&
              patientMsgItem.progType === "4"
            ) {
              //'AutoFill Scripts'
              delete patientMsgDisposition.progType;
              delete patientMsgDisposition.employeeID;
              delete patientMsgDisposition.presentIndicator;
              delete patientMsgDisposition.viewMoreInd;
              delete patientMsgDisposition.printReport;
              delete patientMsgDisposition.rxDisplayed;
              delete patientMsgDisposition.inBasketInd;
            }
            angular.merge(messageItem, patientMsgDisposition);
            _this.updateDependentPatientMessageDispostion(messageItem);
          }
        });
      }
    };

    //
    this.updateSuppressedMessageListDispostion = function(suppressedMsgList) {
      if (suppressedMsgList && suppressedMsgList.length) {
        var msgSeqMsgItemMapTemp = BasketFactory.getMsgSeqMsgItemMap();
        angular.forEach(suppressedMsgList, function(suppressedMsgItem) {
          var messageItem = msgSeqMsgItemMapTemp[suppressedMsgItem.msgSeq];
          if (messageItem) {
            angular.merge(messageItem, suppressedMsgItem);
            messageItem.markDisplayed = false;
            messageItem.disposition = "0";
            messageItem.timestamp = appUtils.getCurrentTimestamp();
            messageItem.notDisplayedReason =
              suppressedMsgItem.notDisplayedReason;
            MessageSuppressionService.handleProgramSpecificSuppresssion(
              messageItem
            );
          }
          if (_this.suppressionEligibleMessageItem(suppressedMsgItem)) {
            MessageSuppressionService.handleProgramSpecificSuppresssion(
              suppressedMsgItem
            );
          }
        });
      }
    };

    this.removeAllForgedNonDisplayableEntries = function() {
      basketData = BasketFactory.getBasketData();
      angular.forEach(basketData, function(patientProfile, patientId) {
        patientProfile.patientMessageInfo.offerToCounselMsg = [];
      });
    };

    this.forgeNonDisplayableEntries = function(masterMessageList) {
      _this.removeAllForgedNonDisplayableEntries();
      if (masterMessageList && masterMessageList.length) {
        var basketDataTemp = BasketFactory.getBasketData();
        angular.forEach(masterMessageList, function(patientMessageList) {
          angular.forEach(patientMessageList, function(patientMessage) {
            var messageListKey =
              msgTypeProgTypeMessageListKeyMap[
                patientMessage.messageType + "-" + patientMessage.progType
              ];
            if (messageListKey) {
              patientMessage.msgSeq =
                patientMessage.rxPatientId +
                "-" +
                appUtils.prepandZeros(patientMessage.rxNum, 7) +
                appUtils.prepandZeros(patientMessage.refillNum || 0, 2);
              var patientProfile = basketDataTemp[patientMessage.rxPatientId];
              if (patientProfile) {
                patientProfile.patientMessageInfo[messageListKey].push(
                  patientMessage
                );
              }
            }
          });
        });
      }
    };

    //For now used only for MedB AOB
    this.updateDependentPatientMessageDispostion = function(patientMessage) {
      var dependentKey =
        patientMessage.messageType + "-" + patientMessage.progType;
      var messageListKey = dependentMessageListMap[dependentKey];
      if (messageListKey) {
        var basketData = BasketFactory.getBasketData();
        var patientProfile = basketData[patientMessage.rxPatientId];
        if (patientProfile) {
          angular.forEach(
            patientProfile.patientMessageInfo.rxCentrMsg,
            function(messageItem) {
              var messageItemKey =
                messageItem.messageType + "-" + messageItem.progType;
              if (
                dependentKey === messageItemKey &&
                patientMessage.msgSeq != messageItem.msgSeq
              ) {
                angular.merge(messageItem, patientMessage);
              }
            }
          );
        }
      }
    };

    //RxInfo or Message Item - Input
    this.buildPartialBarcode = function(data) {
      if (data && data.refillNum === null) {
        return;
      }
      var rxnum = appUtils.prepandZeros(data.rxNum, 7);
      var reFillNum = appUtils.prepandZeros(data.refillNum || 0, 3);
      /*  Not including edit version number,
                    Since to determine a unique barcode we will always have only one edit version number in patient profile data
                */
      // var editVerNum = appUtils.prepandZeros((data.editVersionNum || 0), 3);
      var parFillSeqNum = appUtils.prepandZeros(data.partialFillSeqNum || 0, 2);
      return rxnum + reFillNum + parFillSeqNum;
    };

    this.buildExactPartialBarcode = function(data) {
      var rxnum = appUtils.prepandZeros(data.rxNum, 7);
      var reFillNum =
        data.refillNum != null
          ? appUtils.prepandZeros(data.refillNum || 0, 3)
          : "";
      /*  Not including edit version number,
                    Since to determine a unique barcode we will always have only one edit version number in patient profile data
                */
      // var editVerNum = appUtils.prepandZeros((data.editVersionNum || 0), 3);
      var parFillSeqNum =
        data.partialFillSeqNum != null
          ? appUtils.prepandZeros(data.partialFillSeqNum || 0, 2)
          : "";
      return rxnum + reFillNum + parFillSeqNum;
    };

    //RxInfo or Message Item - Input
    this.buildCompleteBarcode = function(data) {
      if (data && data.refillNum === null) {
        return;
      }
      var rxnum = appUtils.prepandZeros(data.rxNum, 7);
      var reFillNum = appUtils.prepandZeros(data.refillNum || 0, 3);
      var editVerNum = appUtils.prepandZeros(data.editVersionNum || 0, 3);
      var parFillSeqNum = appUtils.prepandZeros(data.partialFillSeqNum || 0, 2);
      return rxnum + reFillNum + editVerNum + parFillSeqNum;
    };

    this.checkForAdditionalRxInfo = function(patientList) {
      var additionalFillInfoPatientList = _this.checkForDriveReadyFillOr90DayMsg(
        patientList
      );
      var deferred = $q.defer();
      if (additionalFillInfoPatientList.length > 0) {
        var isAdditionalRxInfoCounter = 0;
        var additionalInfoURL = "";
        additionalFillInfoPatientList.map(function(queryParam, index) {
          var dispositionId =
            basketData[queryParam.rxPatientId].patientProfileTransactionInfo
              .dispositionId;
          var isFirstPatient = index === 0 ? "?id=patient_id=" : "&patient_id=";
          additionalInfoURL +=
            isFirstPatient +
            queryParam.rxPatientId +
            ",disposition_id=" +
            dispositionId +
            ",readyfill=" +
            queryParam.isDriveReadyFill +
            ",ninetyday=" +
            queryParam.isNinetyDay;
        });
        var additionalRxInfoPromise = Request.invoke({
          url: appConfig.store.services.API.additionalRx + additionalInfoURL,
          method: "GET",
          triggerOffline: "NO"
        });
        additionalRxInfoPromise.then(
          function(result) {
            if (result) {
              result.additionalRxInfoResponse.additionalRxInfoList.map(function(
                additionalInfo
              ) {
                if (
                  additionalInfo.rxCentrMsgList &&
                  additionalInfo.patientFillInfoList.length > 0
                ) {
                  _this.updateAdditionalRxinfo(
                    additionalInfo.patientId,
                    additionalInfo
                  );
                  isAdditionalRxInfoCounter++;
                }
              });
              if (isAdditionalRxInfoCounter > 0) {
                deferred.resolve(true);
              } else {
                deferred.resolve(false);
              }
            } else {
              deferred.resolve(false);
            }
          },
          function(error) {
            LOGGER.error(
              "FUNCTION:checkForAdditionalRxInfo > END > API:ERROR",
              error.message
            );
            deferred.resolve(false);
          }
        );
      } else {
        deferred.resolve(false);
      }
      return deferred.promise;
    };

    this.checkForDriveReadyFillOr90DayMsg = function(patientList) {
      var additionalFillInfoPatientList = [];
      patientList.map(function(patientId) {
        var queryParams = {
          rxPatientId: patientId,
          isNinetyDay: "N",
          isDriveReadyFill: "N"
        };
        var driveReadyFillCount = 0;
        var ninetyDayMessageCount = 0;
        if (basketData[patientId]) {
          basketData[patientId].patientMessageInfo["rxCentrMsg"].map(function(
            rxCentrMsg
          ) {
            if (rxCentrMsg.messageType === 5 && rxCentrMsg.progType === "8") {
              driveReadyFillCount++;
            }

            if (rxCentrMsg.messageType === 5 && rxCentrMsg.progType === "9") {
              ninetyDayMessageCount++;
            }
          });
          basketData[patientId].patientMessageInfo[
            "patCentricMsg"
          ].map(function(patCentricMsg) {
            if (
              patCentricMsg.messageType === 6 &&
              patCentricMsg.progType === "6"
            ) {
              ninetyDayMessageCount++;
            }
          });

          if (driveReadyFillCount > 0) {
            queryParams.isDriveReadyFill = "Y";
          }

          if (ninetyDayMessageCount > 0) {
            queryParams.isNinetyDay = "Y";
          }

          if (ninetyDayMessageCount > 0 || driveReadyFillCount > 0) {
            additionalFillInfoPatientList.push(queryParams);
          }
        }
      });
      return additionalFillInfoPatientList;
    };

    this.updateAdditionalRxinfo = function(patientId, additionalInfo) {
      var additionalMessageList = [];
      var additionalFillList = [];

      if (additionalInfo.rxCentrMsgList) {
        additionalInfo.rxCentrMsgList.map(function(newRxMsg) {
          var tempFlag = false;
          var tempMsgList = basketData[patientId].patientFillInfoList;
          for (var i = 0; i <= tempMsgList.length - 1; i++) {
            if (
              tempMsgList[i].msgSeq === newRxMsg.msgSeq ||
              tempMsgList[i].rxNum === newRxMsg.rxNum
            ) {
              tempFlag = true;
              break;
            }
          }
          if (!tempFlag) {
            additionalMessageList.push(newRxMsg);
          }
        });
      }

      additionalInfo.patientFillInfoList.map(function(fillInfo) {
        var tempFlag = false;
        var tempFillInfoList = basketData[patientId].patientFillInfoList;
        for (var i = 0; i <= tempFillInfoList.length - 1; i++) {
          if (tempFillInfoList[i].rxNum === fillInfo.rxNum) {
            tempFlag = true;
            break;
          }
        }
        if (!tempFlag) {
          additionalFillList.push(fillInfo);
        }
      });
      basketData[patientId].patientFillInfoList = basketData[
        patientId
      ].patientFillInfoList.concat(additionalFillList);
      basketData[patientId].patientMessageInfo["rxCentrMsg"] = basketData[
        patientId
      ].patientMessageInfo["rxCentrMsg"].concat(additionalMessageList);
      //ReadyFill Outreach
      additionalInfo.countRFEnroll =
        additionalInfo.countRFEnroll === null && additionalInfo.countRFEligible
          ? 0
          : additionalInfo.countRFEnroll;
      var readyfill_outreach_count = {
        properties: {
          countRFEnroll: additionalInfo.countRFEnroll,
          countRFEligible: additionalInfo.countRFEligible
        }
      };
      angular.merge(
        basketData[patientId].patientDetails,
        readyfill_outreach_count
      );
      _this.buildPartialBarcodeRxInfoMap();
      _this.buildMsgSeqMsgItemMap();
    };

    //If AutoFill message is forged it needs to be added to the patient profile.
    this.addForgedAutoFillMsg = function(patientMsg) {
      var autoFillMsg = angular.copy(patientMsg);
      autoFillMsg.messageConfig = null;
      basketData[autoFillMsg.rxPatientId].patientMessageInfo["rxCentrMsg"].push(
        autoFillMsg
      );
      _this.buildMsgSeqMsgItemMap();
    };

    //Complete Rx Order Disposition Only
    this.updateDispositionOnly = function(patientId) {
      basketData = BasketFactory.getBasketData();
      if (patientId) {
        angular.forEach(basketData[patientId].patientMessageInfo, function(
          messageList,
          messageKey
        ) {
          angular.forEach(messageList, function(messageItem) {
            if (!messageItem.markDisplayed) {
              messageItem.notDisplayedReason = "6";
              messageItem.disposition = 0;
            }
          });
        });
        basketData[patientId].patientFillInfoList.map(function(fillInfo) {
          angular.forEach(fillInfo.fillDisposition, function(value, key) {
            fillInfo.fillDisposition[key] = null;
          });
        });
      } else {
        angular.forEach(basketData, function(patientProfile, patientId) {
          angular.forEach(patientProfile.patientMessageInfo, function(
            messageList,
            messageKey
          ) {
            angular.forEach(messageList, function(messageItem) {
              if (!messageItem.markDisplayed) {
                messageItem.timestamp = appUtils.getCurrentTimestamp();
                messageItem.notDisplayedReason = "1";
                if (
                  messageItem.messageType == "6" &&
                  messageItem.progType == "3"
                ) {
                  messageItem.notDisplayedReason = "12";
                }
              }
            });
          });
        });
      }
    };

    this.updateOfferToCounselDispostion = function(showAcceptDecline) {
      var basketData = BasketFactory.getBasketData();
      var esigCounselData = ESignFactory.getEsigCounselData();
      var esigTechnicianData = ESignFactory.getEsignAgentConfigData();
      var offerToCounselSelectionMap = {};
      if (
        showAcceptDecline &&
        esigCounselData &&
        esigCounselData.dispositionMap
      ) {
        angular.forEach(esigCounselData.dispositionMap, function(
          fillList,
          patientId
        ) {
          fillList.map(function(fillInfo) {
            var dispositionKey =
              patientId +
              "-" +
              appUtils.prepandZeros(fillInfo.rxNum, 7) +
              appUtils.prepandZeros(fillInfo.refillNum || 0, 2);
            offerToCounselSelectionMap[dispositionKey] = fillInfo;
          });
        });
      }
      if (
        showAcceptDecline &&
        esigTechnicianData.COUNSELING &&
        esigTechnicianData.COUNSELING.patientRxFillListMap
      ) {
        angular.forEach(
          esigTechnicianData.COUNSELING.patientRxFillListMap,
          function(counsellingInfo, patientId) {
            var offerToCounselMsgList = [];
            if (counsellingInfo && counsellingInfo.rxInfoList) {
              counsellingInfo.rxInfoList.map(function(counsellingInfo) {
                var dispositionKey =
                  patientId +
                  "-" +
                  appUtils.prepandZeros(counsellingInfo.rxNum, 7) +
                  appUtils.prepandZeros(counsellingInfo.refillNum || 0, 2);
                var counsellingMessage = {
                  type: "OfferToCounselMessage",
                  disposition: "1",
                  mandatory: null,
                  notDisplayedReason: null,
                  timestamp: appUtils.getCurrentTimestamp(),
                  messageType: 11,
                  rxNum: counsellingInfo.rxNum,
                  refillNum: counsellingInfo.refillNum,
                  partialFillSeqNum: counsellingInfo.partialFillSeqNum,
                  editVersionNum: counsellingInfo.editVersionNum,
                  rxPatientId: patientId,
                  msgSeq: null,
                  messageConfig: {
                    type: "Configtype",
                    msgInd: "N",
                    msgRank: 0,
                    displayOrder: 1,
                    promptIndicator: null,
                    usrEntryTool: null,
                    scrButton: null,
                    msgType: "11",
                    progType: "1",
                    progSubType: null,
                    talkingPoints: null,
                    configInfo: {}
                  },
                  markDisplayed: true,
                  patientFillInfo: counsellingInfo,
                  consolidatedCounseling: true,
                  shownByProxy: false,
                  navigateIndicator: null,
                  progType: "1",
                  outcome: null
                };
                if (offerToCounselSelectionMap[dispositionKey]) {
                  counsellingMessage.outcome = "1";
                } else {
                  counsellingMessage.outcome = "2";
                }
                offerToCounselMsgList.push(counsellingMessage);
              });
            }
            basketData[
              patientId
            ].patientMessageInfo.offerToCounselMsg = offerToCounselMsgList;
          }
        );
      }
    };

    this.updateEmptyPatientDisposition = function() {
      var notCommittedPatientMap = BasketFactory.getScannedButNotCommittedPatientsMap();
      angular.forEach(notCommittedPatientMap, function(
        patientProfile,
        patientId
      ) {
        _this.updateDispositionOnly(patientId);
      });
    };

    this.updateScannedButNotCommittedPatients = function() {
      var basketData = BasketFactory.getBasketData();
      var esignCommittedList = ESignFactory.getCommittedPatientList();
      angular.forEach(basketData, function(patientProfile, patientId) {
        if (!esignCommittedList[patientId]) {
          BasketFactory.setScannedButNotCommittedPatientsMap(
            patientId,
            basketData[patientId]
          );
        }
      });
    };

    // modified patient activation logic based on new api sunctionality - Vinuthna
    this.buildPatientIdWelcomeRxList = function() {
      var basketDataArr = BasketFactory.getRxOrderData();
      var payload = {
        patientRewardsEligibilityRequest: {
          patientProfileList: []
        }
      };
      // sorting to push the welcomecounsel -N object to first in array - Vinuthna
      basketDataArr.sort(function(patientObj, secondPatientObj) {
        var welcomeCounselIndForPatientOne =
          (patientObj.patientDetails.welcomeCounselInd &&
            patientObj.patientDetails.welcomeCounselInd.toUpperCase()) ||
          "";
        var welcomeCounselIndForPatientTwo =
          (secondPatientObj.patientDetails.welcomeCounselInd &&
            secondPatientObj.patientDetails.welcomeCounselInd.toUpperCase()) ||
          "";
        if (welcomeCounselIndForPatientOne > welcomeCounselIndForPatientTwo) {
          return 1;
        }
        if (welcomeCounselIndForPatientOne < welcomeCounselIndForPatientTwo) {
          return -1;
        }
        return 0;
      });
      payload.patientRewardsEligibilityRequest.patientProfileList = basketDataArr;
      var patientActivationCouponPromise = Request.invoke({
        url: appConfig.store.services.API.patientActivationCouponEligibility,
        method: "POST",
        data: payload,
        timeout: 20000,
        rejectPromiseOnTimeout: true,
        triggerOffline: "no"
      });

      patientActivationCouponPromise.then(
        function(data) {
          var rewardsEligibility = {};
          angular.forEach(data, function(value, index) {
            var patientId = value.patientId;
            var eligibilityReasonCode = value.rewards[0].eligibilityReasonCode;
            var eligible = value.rewards[0].eligible;
            var ineligiblePatientFillInfoList =
              value.rewards[0].ineligiblePatientFillInfoList;
            rewardsEligibility[patientId] = {
              eligibilityReasonCode: eligibilityReasonCode,
              eligible: eligible,
              ineligiblePatientFillInfoList: ineligiblePatientFillInfoList
            };
          });

          var patientIdWelcomeRxListMapTemp = {};
          var patientIdRejectionRxListMapTemp = {};
          var basketData = BasketFactory.getBasketData();
          var patientIdWelcomeCouponRxInfoMapTemp = BasketFactory.getPatientIdWelcomeCouponRxInfoMap();
          angular.forEach(basketDataArr, function(patientProfile) {
            var patientId = patientProfile.patientDetails.rxCPatientId;
            if (!patientIdWelcomeCouponRxInfoMapTemp[patientId]) {
              var welcomeRxList = [];
              var forceWelcomeRxList = [];
              var govBenfRejectionList = [];
              var ctrlSubstanceRejectionList = [];
              var govCtrlSubstanceRejctionList = [];
              var otherRejectionList = [];

              angular.forEach(patientProfile.patientFillInfoList, function(
                fillInfo
              ) {
                angular.forEach(rewardsEligibility, function(
                  patientData,
                  rewardsPatientId
                ) {
                  if (rewardsPatientId == patientId) {
                    if (fillInfo.fillDisposition.dispositionKey === "SLD") {
                      if (
                        _this.hasCtrlSubInInelgibleFillInfo(
                          patientData.ineligiblePatientFillInfoList
                        )
                      ) {
                        if (
                          patientData.eligible &&
                          fillInfo.rxNum !==
                            patientData.ineligiblePatientFillInfoList[0].rxNum
                        ) {
                          welcomeRxList.push(fillInfo);
                        } else if (
                          fillInfo.rxNum ==
                          patientData.ineligiblePatientFillInfoList[0].rxNum
                        ) {
                          ctrlSubstanceRejectionList.push(fillInfo);
                        }
                      } else if (
                        patientData.eligible &&
                        !patientData.eligibilityReasonCode
                      ) {
                        // when coupon eligible flag is true in rewards-eligibilty API
                        welcomeRxList.push(fillInfo);
                      } else if (patientData.eligibilityReasonCode == "1") {
                        // when welcounsel indicator is "N" in patient profile
                        forceWelcomeRxList.push(fillInfo);
                      } else if (patientData.eligibilityReasonCode == "3") {
                        // when patient has government benefiary in patient profile
                        govBenfRejectionList.push(fillInfo);
                      } else if (patientData.eligibilityReasonCode == "2") {
                        // when patient has controlled substance in patient profile
                        ctrlSubstanceRejectionList.push(fillInfo);
                      } else if (patientData.eligibilityReasonCode == "4") {
                        // when patient has controlled substance and government benefiary in patient profile
                        govCtrlSubstanceRejctionList.push(fillInfo);
                      }
                    }
                  }
                });
              });
              if (welcomeRxList.length && govBenfRejectionList.length) {
                patientIdRejectionRxListMapTemp[patientId] = {
                  rejectionRxList: govBenfRejectionList,
                  patientDetails: basketData[patientId].patientDetails,
                  patActivatationRejected: true,
                  rejectionType: "govBenfRejectionList"
                };
              } else if (welcomeRxList.length) {
                patientIdWelcomeRxListMapTemp[patientId] = {
                  welcomeRxList: welcomeRxList,
                  patientDetails: basketData[patientId].patientDetails
                };
              } else if (forceWelcomeRxList.length) {
                patientIdWelcomeRxListMapTemp[patientId] = {
                  welcomeRxList: forceWelcomeRxList,
                  patientDetails: basketData[patientId].patientDetails,
                  forceWelcomeRxCheck: true
                };
              } else if (
                govBenfRejectionList.length &&
                ctrlSubstanceRejectionList.length
              ) {
                patientIdRejectionRxListMapTemp[patientId] = {
                  rejectionRxList: govCtrlSubstanceRejctionList,
                  patientDetails: basketData[patientId].patientDetails,
                  patActivatationRejected: true,
                  rejectionType: "govCtrlSubstanceRejctionList"
                };
              } else if (govBenfRejectionList.length) {
                patientIdRejectionRxListMapTemp[patientId] = {
                  rejectionRxList: govBenfRejectionList,
                  patientDetails: basketData[patientId].patientDetails,
                  patActivatationRejected: true,
                  rejectionType: "govBenfRejectionList"
                };
              } else if (ctrlSubstanceRejectionList.length) {
                patientIdRejectionRxListMapTemp[patientId] = {
                  rejectionRxList: ctrlSubstanceRejectionList,
                  patientDetails: basketData[patientId].patientDetails,
                  patActivatationRejected: true,
                  rejectionType: "ctrlSubstanceRejectionList"
                };
              } else if (govCtrlSubstanceRejctionList.length) {
                patientIdRejectionRxListMapTemp[patientId] = {
                  rejectionRxList: govCtrlSubstanceRejctionList,
                  patientDetails: basketData[patientId].patientDetails,
                  patActivatationRejected: true,
                  rejectionType: "govCtrlSubstanceRejctionList"
                };
              }
            }
          });
          BasketFactory.setPatientIdWelcomeRxListMap(
            patientIdWelcomeRxListMapTemp
          );
          BasketFactory.setPatientIdRejectionRxListMap(
            patientIdRejectionRxListMapTemp
          );
        },
        function(error) {}
      );
      return patientActivationCouponPromise;
    };

    this.hasCtrlSubInInelgibleFillInfo = function(
      ineligiblePatientFillInfoList
    ) {
      var exists = false;
      angular.forEach(ineligiblePatientFillInfoList, function(data) {
        if (data.welcomeTrialOfferIneligibleReasonCode == "2") {
          exists = true;
        }
      });
      return exists;
    };

    this.updateFillDisposition = function(patientId, durFillInfo, action) {
      var dispostionMap = {
        "4": {
          disposition: 4,
          dispositionKey: "RTS"
        },
        "3": {
          disposition: 3,
          dispositionKey: "HWB"
        },
        "1": {
          disposition: 1,
          dispositionKey: "SLD"
        }
      };
      var basketData = BasketFactory.getBasketData();
      var esignCommittedList = ESignFactory.getCommittedPatientList();
      if (basketData[patientId]) {
        angular.forEach(basketData[patientId].patientFillInfoList, function(
          fillInfo
        ) {
          if (
            durFillInfo.rxNum === fillInfo.rxNum &&
            durFillInfo.refillNum === fillInfo.refillNum
          ) {
            fillInfo.fillDisposition.disposition =
              dispostionMap[action].disposition;
            fillInfo.fillDisposition.dispositionKey =
              dispostionMap[action].dispositionKey;
            _this.updateRxItemsInorder(patientId, durFillInfo, action);
          }
        });
      }
    };

    this.updateRxItemsInorder = function(patientId, fillInfo, action) {
      var rxItemsInOrder = BasketFactory.getRxItemsInOrder();
      var selectedPatientList = PatientFactory.getSelectedPatientList();
      var basketData = BasketFactory.getBasketData();
      var barcode = fillInfo.fillDisposition.barcode;
      var currentFillInfo = {};
      if (basketData[patientId]) {
        angular.forEach(basketData[patientId].patientFillInfoList, function(
          currentFill
        ) {
          if (
            fillInfo.rxNum === currentFill.rxNum &&
            fillInfo.refillNum === currentFill.refillNum
          ) {
            currentFillInfo = currentFill;
          }
        });
      }
      if (action === 1) {
        rxItemsInOrder[barcode] = {
          patientInfo: selectedPatientList[patientId],
          basketItemInfo: currentFillInfo
        };
      } else {
        currentFillInfo.inOrder && delete currentFillInfo.inOrder;
        rxItemsInOrder[barcode] && delete rxItemsInOrder[barcode];
      }
      CustomerPriceDisplayService.updateSecDispPriceList();
    };

    this.addForgedMessagesToPatientProfile = function(patientMessageList) {
      var typeMap = {
        PatCentricMsg: "patCentricMsg",
        PatDemoMsg: "patDemoMsg"
      };
      var basketData = BasketFactory.getBasketData();
      var msgSeqMapTemp = BasketFactory.getMsgSeqMsgItemMap();
      if (patientMessageList && patientMessageList.length) {
        patientMessageList.map(function(patientMessage) {
          if (
            patientMessage.properties &&
            patientMessage.properties.FORGED_MESSAGE &&
            !msgSeqMapTemp[patientMessage.msgSeq]
          ) {
            LOGGER.info(
              "Patient message with msgSeq - " +
                patientMessage.msgSeq +
                " and patientId " +
                patientMessage.rxPatientId +
                " is added to basket"
            );
            basketData[patientMessage.rxPatientId].patientMessageInfo[
              typeMap[patientMessage.type]
            ].push(patientMessage);
          }
        });
      }
      _this.buildMsgSeqMsgItemMap();
    };

    this.fetchPatientIdDispositionIdMap = function() {
      var basketData = BasketFactory.getBasketData();
      var patientIdDispositionIdMap = {};
      angular.forEach(basketData, function(patientProfile, patientId) {
        if (patientProfile.patientProfileTransactionInfo) {
          patientIdDispositionIdMap[patientId] =
            patientProfile.patientProfileTransactionInfo.dispositionId;
        }
      });
      return patientIdDispositionIdMap;
    };
    this.suppressionEligibleMessageItem = function(messageItem) {
      var messageType = messageItem.messageType;
      var progType = messageItem.progType;
      var templateKey = messageItem.messageType + "-" + progType;
      if (suppressionEligibleMessageItemMap[templateKey]) {
        return true;
      } else {
        return false;
      }
    };
  }
]);

// modal-ctrl

angular
  .module("weCarePlusApp")
  .controller("BasketParallelPathCtrl", function(
    $scope,
    $modalInstance,
    deferred,
    data,
    CONFIG,
    BasketFluShotService,
    POSSimplificationFactory,
    BasketExtracareService,
    BasketParallelPathService,
    SocketTrafficHandler
  ) {
    $scope.$watch(
      function() {
        return POSSimplificationFactory.currentView;
      },
      function(newValue, oldValue) {
        $scope.constructModalDataOnly();
        console.log($scope.posSimplificationData);
      }
    );

    $scope.init = function() {
      if ($scope.checkIfSocketConnectionActive()) {
        $scope.constructModalDataOnly();
        return;
      }
      if (BasketParallelPathService.isPOSSimplificationEnabled()) {
        if (BasketParallelPathService.isFlushotEnabled()) {
          BasketFluShotService.handleFlushotDefaultView();
        } else {
          var completionStatus = {
            actionEvent: null,
            completed: true
          };
          POSSimplificationFactory.setParallelPathStatus(
            completionStatus,
            "flushot"
          );
        }
        var currentView = POSSimplificationFactory.getCurrentView();
        var parallelPathStatus = POSSimplificationFactory.getParallelPathStatus();
        if (
          currentView &&
          currentView.screenData &&
          currentView.screenData.extracare &&
          currentView.screenData.extracare.screeenText &&
          parallelPathStatus.extracare &&
          parallelPathStatus.extracare.completed
        ) {
          BasketExtracareService.persistPerviousExtracareState();
        } else {
          BasketExtracareService.handleExtracareDefaultView();
        }
      }
    };

    $scope.constructFlushotData = function() {
      $scope.parallelData = $scope.posSimplificationData;
    };

    $scope.parallelTechAction = function(options) {
      if (options.actionType === "flushot") {
        BasketFluShotService.handleFlushotAction(options);
      } else {
        BasketExtracareService.handleExtracareAction(options);
      }
    };

    $scope.constructModalDataOnly = function() {
      $scope.posSimplificationData = POSSimplificationFactory.getCurrentView();
      $scope.constructFlushotData($scope.posSimplificationData);
    };

    $scope.checkIfSocketConnectionActive = function() {
      var deferredMap = SocketTrafficHandler.getActiveSocketConnections();
      if (
        deferredMap["BASKET_FLUSHOT_EVENT"] ||
        deferredMap["BASKET_EXTRACARE"]
      ) {
        return true;
      } else {
        return false;
      }
    };
  });
