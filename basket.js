// bas factory

"use strict";

angular.module("weCarePlusApp").factory("BasketFactory", function(CONFIG) {
  var factory = {
    currentOrder: [],
    basketData: {},
    basketDataClone: {},
    rxItemsInOrder: {},
    otcItemsInOrder: [],
    controlledItem: {},
    driveThru: false,
    tpCompliancePatESign: false,
    basketPageMsgAlert: false,
    newPhrEnrollment: false,
    tpComplianceMsgSignedActionMAP: {
      formSignedMap: {
        AOB: "N",
        ABN: "N",
        RRP: "N"
      }
    },
    patientPresentMap: {},
    partialBarcodeRxInfoMap: {},
    msgSeqMsgItemMap: {},
    scanedBarcode: null,
    selectedRxItemFillInfo: null,
    scannedButNotCommittedPatientsMap: {},
    priceSource: "T",
    posOverrideValues: {},
    patientIdWelcomeRxListMap: {},
    patientIdRejectionRxListMap: {},
    patientIdWelcomeCouponRxInfoMap: {},
    langChange: false,
    langSupressionReason: false,
    langChangeMap: {},
    isIncorrectPerson: false,
    readyFillTime: "",
    readyFillOutcome: "",
    autoFillEnabled: false,
    esigUpdateButtonStatus: "N",
    actionId: "",
    readyFillMessageDisplayed: false,
    eCCardNumber: "",
    newEccCardStatus: false,
    firstECCAttempt: {},
    cardStatus: "",
    setPartialBarcodeRxInfoMap: function(data) {
      factory.partialBarcodeRxInfoMap = data;
    },
    getPartialBarcodeRxInfoMap: function() {
      return factory.partialBarcodeRxInfoMap;
    },
    setScanedBarcode: function(data) {
      factory.scanedBarcode = data;
    },
    getScanedBarcode: function() {
      return factory.scanedBarcode;
    },
    setPricesource: function(data) {
      factory.priceSource = data;
    },
    getPricesource: function() {
      return factory.priceSource;
    },
    setMsgSeqMsgItemMap: function(data) {
      factory.msgSeqMsgItemMap = data;
    },
    getMsgSeqMsgItemMap: function() {
      return factory.msgSeqMsgItemMap;
    },
    // Created a new function will be using this in new message
    getPatientProfileList: function() {
      return Object.values(factory.basketData || {});
    },
    updatePatientPresntMap: function(patientId, data) {
      factory.patientPresentMap[patientId] = data;
    },
    getPatientPresentMap: function() {
      return factory.patientPresentMap;
    },
    setTpCompliancePatESign: function(data) {
      if (data && factory.tpCompliancePatESign) {
        factory.tpCompliancePatESign = false;
      } else {
        factory.tpCompliancePatESign = data;
      }
    },
    getTpCompliancePatESign: function() {
      return factory.tpCompliancePatESign;
    },
    updateBasketData: function(key, data) {
      if (Object.keys(factory.basketData).length === 0) {
        CONFIG.messages.txnStartTimestamp = appUtils.getCurrentTimestamp();
      }
      factory.basketData[key] = data;
      factory.basketDataClone[key] = angular.copy(data);
    },
    getBasketData: function() {
      return factory.basketData;
    },
    getOfflineProfile: function() {
      if (factory.basketData["0"]) {
        return factory.basketData["0"];
      } else {
        appUtils.log("WARN: accessing Offline profile when not initialized.");
        factory.updateBasketData("0", {});
        return factory.basketData["0"];
      }
    },
    getBasketDataClone: function() {
      return factory.basketDataClone;
    },
    setRxItemsInOrder: function(key, data) {
      factory.rxItemsInOrder[key] = data;
    },
    getRxItemsInOrder: function() {
      return factory.rxItemsInOrder;
    },
    addRxItemToOrder: function(barcode, rxItemDetails) {
      var tempRxitemsInorder = factory.rxItemsInOrder;
      tempRxitemsInorder[barcode] = rxItemDetails;
      factory.rxItemsInOrder = tempRxitemsInorder;
    },
    clearRxItemsInOrder: function() {
      angular.forEach(factory.rxItemsInOrder, function(val, key) {
        delete factory.rxItemsInOrder[key];
      });
    },
    deleteRxItemInOrder: function(key) {
      var tempRxitemsInorder = factory.rxItemsInOrder;
      if (tempRxitemsInorder[key]) {
        delete tempRxitemsInorder[key];
        factory.rxItemsInOrder = tempRxitemsInorder;
      }
    },
    clearOtcItemsInOrder: function() {
      for (var i = factory.otcItemsInOrder.length - 1; i >= 0; i--) {
        factory.otcItemsInOrder.pop();
      }
    },
    getOtcItemsInOrder: function() {
      return factory.otcItemsInOrder;
    },
    setOtcItemsInOrder: function(data) {
      factory.otcItemsInOrder = data;
    },
    setControlledItem: function(item) {
      factory.controlledItem = item;
    },
    getControlledItem: function() {
      return factory.controlledItem;
    },
    addControlledItemToCurrentOrderList: function() {
      if (factory.otcItemsInOrder && factory.controlledItem) {
        factory.otcItemsInOrder.push(factory.controlledItem);
      }
    },
    clearWholeOrder: function() {
      factory.clearOtcItemsInOrder();
      factory.clearRxItemsInOrder();
    },

    getRxOrderData: function() {
      var rxOrderData = [];
      angular.forEach(factory.basketData, function(value, key) {
        rxOrderData.push(value);
      });
      return rxOrderData;
    },

    getRxOrderDataForTransaction: function() {
      var basketDataCopy = angular.copy(factory.basketData);
      var rxOrderData = [];
      angular.forEach(basketDataCopy, function(value, key) {
        var rxItems = [];
        angular.forEach(value.patientFillInfoList, function(rxitemvalue) {
          delete rxitemvalue.itemStatus.unScannedRxStatus;
          rxItems.push(rxitemvalue);
        });

        value.patientFillList = [];

        angular.forEach(rxItems, function(itemdata) {
          value.patientFillList.push(itemdata);
        });

        rxOrderData.push(value);
      });
      return rxOrderData;
    },

    setDriveThru: function(data) {
      factory.driveThru = data;
    },

    isDriveThru: function() {
      return factory.driveThru;
    },

    updateBasketMsgDisp: function(rxPatientId, msgListKey, rxNum) {
      var pprItem = null;
      if (CONFIG.storeData.isOffline) {
        pprItem = factory.getOfflineProfile();
      } else {
        pprItem = factory.basketData[rxPatientId];
      }
      if (pprItem) {
        var patientMessageInfo = pprItem.patientMessageInfo;
        var msgItemList = patientMessageInfo[msgListKey];
        angular.forEach(msgItemList, function(msgItem) {
          if (msgListKey === "eanMsg") {
            if (msgItem.rxNum == rxNum) {
              msgItem.mandatory = "Y";
              msgItem.disposition = "1"; //Message displayed disposition
              msgItem.notDisplayedReason = null; //Not displayed reason null always since we definitely display
              msgItem.timestamp = appUtils.getCurrentTimestamp(
                CONFIG.timestampFormat
              );
              msgItem.markDisplayed = true;
              msgItem.commInd = "Y";
            }
          } else if (msgListKey === "tpComplianceMsg") {
            if (msgItem.rxNum == rxNum) {
              msgItem.mandatory = "Y";
              msgItem.disposition = "1"; //Messaged displayed disposition
              msgItem.notDisplayedReason = null; //Not displayed reason null always since we definitely display
              msgItem.timestamp = appUtils.getCurrentTimestamp(
                CONFIG.timestampFormat
              );
              msgItem.markDisplayed = true;
              msgItem.formSignedMap = {};
              angular.forEach(
                factory.tpComplianceMsgSignedActionMAP.formSignedMap,
                function(value, key) {
                  if (key && value === "Y") {
                    msgItem.formSignedMap[key] = value;
                  }
                }
              );
            }
          }
        });
      }
    },
    removePatientFromBasket: function(patientId) {
      delete factory.basketData[patientId];
    },
    removeAllPatients: function() {
      angular.forEach(factory.basketData, function(profile, profileID) {
        delete factory.basketData[profileID];
      });
    },
    setBasketPageMsgAlert: function(data) {
      factory.basketPageMsgAlert = data;
    },
    getBasketPageMsgAlert: function() {
      return factory.basketPageMsgAlert;
    },
    setNewPhrEnrollment: function(data) {
      factory.newPhrEnrollment = data;
    },
    getNewPhrEnrollment: function() {
      return factory.newPhrEnrollment;
    },
    setTpComplianceMessageFormSigned: function(type) {
      if (type === "AOB" || type === "ABN" || type === "RRP" || type === "SS") {
        factory.tpComplianceMsgSignedActionMAP.formSignedMap[type] = "Y";
      }
    },

    getPatientProfileFillListItem: function(
      patientId,
      rxNum,
      refillNum,
      partialFillSeqNum,
      editVersionNum
    ) {
      var exactMatchRxInfoList = [];
      angular.forEach(
        factory.basketData[patientId].patientFillInfoList,
        function(rxItems) {
          if (
            rxItems.rxNum == rxNum &&
            rxItems.refillNum == refillNum &&
            rxItems.partialFillSeqNum == partialFillSeqNum
          ) {
            exactMatchRxInfoList.push(rxItems);
          }
        }
      );

      if (!exactMatchRxInfoList.length) {
        angular.forEach(basketData[patientId].patientFillInfoList, function(
          rxItems
        ) {
          if (rxItems.rxNum == rxNum && rxItems.refillNum == refillNum) {
            exactMatchRxInfoList.push(rxItems);
          }
        });
      }
      if (!exactMatchRxInfoList.length) {
        angular.forEach(basketData[patientId].patientFillInfoList, function(
          rxItems
        ) {
          if (rxItems.rxNum == rxNum) {
            exactMatchRxInfoList.push(rxItems);
          }
        });
      }

      return exactMatchRxInfoList;
    },

    //update Immunization indicator to N once it is displayed.
    updatePatientProfileImmunizationFlag: function(
      patientId,
      rxNum,
      refillNum
    ) {
      angular.forEach(
        factory.basketData[patientId].patientFillInfoList,
        function(rxItems) {
          if (
            rxItems.patientID == patientId &&
            rxItems.rxNum == rxNum &&
            rxItems.refillNum == refillNum
          ) {
            rxItems.immunizationDisplayInd = true;
          }
        }
      );
    },

    getSelectedPatientProfileFillInfo: function() {
      return factory.selectedRxItemFillInfo;
    },

    setSelectedPatientProfileFillInfo: function(fillInfo) {
      factory.selectedRxItemFillInfo = fillInfo;
    },

    setScannedButNotCommittedPatientsMap: function(patientId, patientProfile) {
      factory.scannedButNotCommittedPatientsMap[patientId] = {};
      factory.scannedButNotCommittedPatientsMap[
        patientId
      ].patientProfile = patientProfile;
      patientProfile.patientFillInfoList.map(function(fillInfo) {
        if (fillInfo.fillDisposition.dispositionKey === "SLD") {
          if (scannedButNotCommittedPatientsMap[patientId].rxItemsInOrder) {
            scannedButNotCommittedPatientsMap[patientId].rxItemsInOrder[
              fillInfo.fillDisposition.barcode
            ] =
              rxItemsInOrder[fillInfo.fillDisposition.barcode];
          } else {
            scannedButNotCommittedPatientsMap[patientId].rxItemsInOrder = {};
            scannedButNotCommittedPatientsMap[patientId].rxItemsInOrder[
              fillInfo.fillDisposition.barcode
            ] =
              rxItemsInOrder[fillInfo.fillDisposition.barcode];
          }
          delete rxItemsInOrder[fillInfo.fillDisposition.barcode];
        }
      });
    },

    removeScannedButNotCommittedPatientsMap: function(patientId) {
      if (factory.scannedButNotCommittedPatientsMap[patientId]) {
        delete factory.scannedButNotCommittedPatientsMap[patientId];
      }
    },

    getScannedButNotCommittedPatientsMap: function(patientId, patientProfile) {
      return factory.scannedButNotCommittedPatientsMap;
    },

    setPOSOverrideValues: function(posOverrideObj) {
      factory.posOverrideValues = posOverrideObj;
    },

    getPOSOverrideValues: function() {
      return factory.posOverrideValues;
    },

    setPatientIdWelcomeRxListMap: function(data) {
      factory.patientIdWelcomeRxListMap = data;
    },

    getPatientIdWelcomeRxListMap: function() {
      return factory.patientIdWelcomeRxListMap;
    },

    setPatientIdRejectionRxListMap: function(data) {
      factory.patientIdRejectionRxListMap = data;
    },

    getPatientIdRejectionRxListMap: function() {
      return factory.patientIdRejectionRxListMap;
    },

    setPatientIdWelcomeCouponRxInfoMap: function(data) {
      factory.patientIdWelcomeCouponRxInfoMap = data;
    },

    getPatientIdWelcomeCouponRxInfoMap: function() {
      return factory.patientIdWelcomeCouponRxInfoMap;
    },

    setLangChange: function(data) {
      factory.langChange = data;
    },

    getLangChange: function() {
      return factory.langChange;
    },

    setLangChangeById: function(id, langChange) {
      if (!factory.langChangeMap[id]) {
        factory.langChangeMap[id] = {};
      }
      factory.langChangeMap[id].langChange = langChange;
    },

    getLangChangeById: function(id) {
      return factory.langChangeMap[id] && factory.langChangeMap[id].langChange;
    },

    setLangSupressionReason: function(data) {
      factory.langSupressionReason = data;
    },

    getLangSupressionReason: function() {
      return factory.langSupressionReason;
    },

    setIsIncorrectPerson: function(data) {
      factory.isIncorrectPerson = data;
    },

    getIsIncorrectPerson: function() {
      return factory.isIncorrectPerson;
    },

    setECCardNumber: function(data) {
      factory.eCCardNumber = data;
    },

    getECCardNumber: function() {
      return factory.eCCardNumber;
    },

    setNewEccCardStatus: function(data) {
      factory.newEccCardStatus = data;
    },

    getNewEccCardStatus: function() {
      return factory.newEccCardStatus;
    },

    setFirstECCAttempt: function(data) {
      factory.firstECCAttempt = data;
    },

    getFirstECCAttempt: function() {
      return factory.firstECCAttempt;
    },

    setCardStatus: function(data) {
      factory.cardStatus = data;
    },

    getCardStatus: function() {
      return factory.cardStatus;
    },

    setReadyFillTime: function(data) {
      factory.readyFillTime = data;
    },

    getReadyFillTime: function() {
      return factory.readyFillTime;
    },

    setReadyFillOutcome: function(data) {
      factory.readyFillOutcome = data;
    },

    getReadyFillOutcome: function() {
      return factory.readyFillOutcome; // setting the outcome as we need to show the buttons active on AutoFill screen
    },

    setAutoFillEnabled: function(data) {
      factory.autoFillEnabled = data;
    },

    getAutoFillEnabled: function() {
      return factory.autoFillEnabled;
    },

    setEsigUpdateButtonStatus: function(data) {
      factory.esigUpdateButtonStatus = data;
    },

    getEsigUpdateButtonStatus: function() {
      return factory.esigUpdateButtonStatus;
    },

    setActionId: function(data) {
      factory.actionId = data;
    },

    getActionId: function() {
      return factory.actionId;
    },

    setReadyFillMessageDisplayed: function(data) {
      factory.readyFillMessageDisplayed = data;
    },

    getReadyFillMessageDisplayed: function() {
      return factory.readyFillMessageDisplayed;
    },

    clearBasketData: function() {
      factory.basketData = {};
      factory.basketDataClone = {};
      factory.controlledItem = {};
      factory.currentOrder = [];
      factory.driveThru = false;
      factory.newPhrEnrollment = false;
      factory.otcItemsInOrder = [];
      factory.rxItemsInOrder = {};
      factory.otcItemsInOrder = [];
      factory.tpCompliancePatESign = false;
      factory.newPhrEnrollment = false;
      factory.basketPageMsgAlert = false;
      factory.patientPresentMap = {};
      factory.partialBarcodeRxInfoMap = {};
      factory.msgSeqMsgItemMap = {};
      factory.selectedRxItemFillInfo = null;
      factory.scannedButNotCommittedPatientsMap = {};
      factory.priceSource = "T";
      factory.posOverrideValues = {};
      factory.patientIdWelcomeRxListMap = {};
      factory.patientIdRejectionRxListMap = {};
      factory.patientIdWelcomeCouponRxInfoMap = {};
      factory.langChange = false;
      factory.langChangeMap = {};
      factory.langSupressionReason = false;
      factory.isIncorrectPerson = false;
      factory.readyFillTime = "";
      factory.readyFillOutcome = "";
      factory.autoFillEnabled = false;
      factory.esigUpdateButtonStatus = "N";
      factory.actionId = "";
      factory.readyFillMessageDisplayed = false;
      factory.eCCardNumber = "";
      factory.newEccCardStatus = false;
      factory.cardStatus = "";
    }
  };
  return factory;
});

// order fac

'use strict';

angular.module('weCarePlusApp')
    .factory('OrderFactory', function(Request, TransactionInfo, CONFIG, $timeout, BasketFactory, PatientFactory) {
        var txnObject = {};
        var txnDataMap = {
            txnIdData: 'transactionData',
            txnDetails: 'transactionDetails',
            eccData: 'eccData',
            msgData: 'msgData',
            otcData: 'otcData',
            rxOrderData: 'pprData',
            billPayData: 'billPayData'
        };
        var totalBarcode;
        var obj = {};
        var totalBarcodeTimeout;
        var eccNumber = "";
        var eccData;
        var fastpass = false;
        var fastpassData = {};
        var fastpassVersion = "01";
        var mobileConnectivity = "0";
        var minuteClinicDepositsOrder = [];
        var pHRInfo = null;
        var noItemsInOrder = true;
        var redeemGiftCard = false;
        var phrGiftCardList = [];
        var giftCardBarcode = null;
        var proxyPhrMethodName = null;
        var fastpassEventDetailsList = [];
        var fastpassTransactionData = {};
        var fsConsHealthCare = "N";
        var eccShortCardNum = null;


        obj.getData = function() {
            return PatientFactory.getSelectedPatientList();
        };

        obj.setNoItemsInOrder = function(data) {
            noItemsInOrder = data;
        };

        obj.getNoItemsInOrder = function() {
            return noItemsInOrder;
        };
        
        obj.setMinuteClinicDepositsOrder = function(data) {
            minuteClinicDepositsOrder = data;
        };

        obj.setPHRInfo = function(data) {
            if (data.coupons && data.coupons.coupons && data.coupons.coupons.length) {
                pHRInfo = {
                    maxRedeemAmount: data.coupons.coupons[0].maxRedeemAmount,
                    expireDt: data.coupons.coupons[0].expireDt
                };
            } else {
                pHRInfo = null;
            }
        };

        obj.getPHRInfo = function() {
            return pHRInfo;
        };

        obj.getMinuteClinicDepositsOrder = function() {
            return minuteClinicDepositsOrder;
        };

        obj.getFastpassData = function() {
            return fastpassData;
        };
        obj.setFastpassData = function(data) {
            fastpassData = data;
        };
        obj.setFastpass = function(data) {
            fastpass = data;
        };
        obj.getFastpass = function() {
            return fastpass;
        };
        obj.setFastpassVersion = function(data) {
            fastpassVersion = data;
        };
        obj.getFastpassVersion = function() {
            return fastpassVersion;
        };
        obj.setMobileConnectivity = function(data) {
            mobileConnectivity = data;
        };
        obj.getMobileConnectivity = function() {
            return mobileConnectivity;
        };
        obj.setTxnIdData = function(data) {
            txnObject[txnDataMap.txnIdData] = data;
        };
        obj.getTxnIdData = function() {
            return txnObject[txnDataMap.txnIdData];
        };

        obj.isEccInOrder = function() {
            return (typeof txnObject[txnDataMap.eccData] !== 'undefined' && Object.keys(txnObject[txnDataMap.eccData]).length > 0);
        };
        obj.setEccDataToTxn = function(data, eccNo) {
            txnObject[txnDataMap.eccData] = data;
            eccNumber = eccNo;
        };
        obj.setMessageDataToTxn = function(data) {
            txnObject[txnDataMap.msgData] = data;
        };
        obj.setOtcDataToTxn = function(data) {
            txnObject[txnDataMap.otcData] = data;
        };

        obj.addOtcItemToTxn = function(otcItem) {
            txnObject[txnDataMap.otcData].push(otcItem);
        };

        obj.setRxOrderDataToTxn = function(data) {
            txnObject[txnDataMap.rxOrderData] = data;
        };

        obj.getTxnObject = function() {
            return txnObject;
        };
        obj.getEccDataFromTxn = function() {
            if (!txnObject[txnDataMap.eccData]) {
                txnObject[txnDataMap.eccData] = {};
            }
            return txnObject[txnDataMap.eccData];
        };
        obj.getMessageDataFromTxn = function() {
            if (!txnObject[txnDataMap.msgData]) {
                txnObject[txnDataMap.msgData] = {};
            }
            return txnObject[txnDataMap.msgData];
        };
        obj.getOtcDataFromTxn = function() {
            if (!txnObject[txnDataMap.otcData]) {
                txnObject[txnDataMap.otcData] = [];
            }
            return txnObject[txnDataMap.otcData];
        };
        obj.getRxOrderDataFromTxn = function() {
            if (!txnObject[txnDataMap.rxOrderData]) {
                txnObject[txnDataMap.rxOrderData] = [];
            }
            return txnObject[txnDataMap.rxOrderData];
        };
        obj.initTxnObject = function() {
            //Will be initiated to new transaction
            txnObject = {};
            //Invoke all factories and clear the data
        };
        obj.getEccInfoByCardNo = function(eccNo) {
            var q = 'card_nbr=' + eccNo;
            var eccLookupPromise = Request.invoke({
                url: appConfig.store.services.API.extraCareLookUp + '?' + q,
                method: 'GET'
            });
            return eccLookupPromise;
        };
        obj.getBillPayItemFromTxn = function() {
            if (!txnObject[txnDataMap.billPayData]) {
                txnObject[txnDataMap.billPayData] = [];
            }
            return txnObject[txnDataMap.billPayData];
        };
        //TODO: need to revalidate the logic, used to find is Controled RX prescription items present
        obj.getControlledItemsListFromSRDMessage = function() {
            var isControlledRxinScript = false;
            angular.forEach(obj.getRxOrderDataFromTxn(), function(patientNumber) {
                angular.forEach(patientNumber.patientMessageInfo.srdMsg, function(srdMessageId) {
                    if (srdMessageId.ProgType == "controled") {
                        isControlledRxinScript = true;
                    }
                });
            });

            return isControlledRxinScript;
        };

        obj.getTotalAmoutOfRxItems = function() {
            var totalRxItems = 0;
            var rxOrderData = obj.getRxOrderDataFromTxn();
            angular.forEach(rxOrderData, function(patient) {
                angular.forEach(patient.patientFillInfoList, function(patientScript) {
                    if (patientScript.fillDisposition.disposition == 1 && patientScript.fillDisposition.dispositionKey == 'SLD') {
                        totalRxItems = totalRxItems + patientScript.patPayAmt;
                    }
                });
            });

            return totalRxItems;
        };

        obj.getRxItemsInOrder = function() {
            var rxItems = [];

            angular.forEach(obj.getRxOrderDataFromTxn(), function(patient) {
                angular.forEach(patient.patientFillInfoList, function(patientScript) {
                    if (patientScript.fillDisposition.disposition == 1 && patientScript.fillDisposition.dispositionKey == 'SLD') {
                        rxItems.push(patientScript);
                    }
                });
            });

            return rxItems;
        };

        obj.setTransactionDetails = function(data) {
            txnObject[txnDataMap.txnDetails] = data;
        };

        obj.getTransactionDetails = function() {
            return txnObject[txnDataMap.txnDetails];
        };

        obj.getTxnDataMap = function(){
            return txnDataMap;
        }

        obj.getTransactionIdData = function() {

            if (!obj.getTxnIdData()) {
                var getTransactionIdDataPromise = Request.invoke({
                    url: appConfig.store.services.API.translationIdService,
                    method: 'GET'
                });

                getTransactionIdDataPromise.then(function(result) {
                    TransactionInfo.setTransactionId(result.transactionId);
                    TransactionInfo.setTransactionNumber(result.transactionNumber);
                    CONFIG.txnInfo = result;
                    obj.setTxnIdData(result);
                    obj.setTotalBarcode(null);
                }, function(result) {
                    appUtils.log('Not able to get transaction id data');
                });
            } else {
                return obj.getTxnIdData();
            }
        };
        obj.startNewTxn = function(returnPromise) {
            var getTransactionIdDataPromise = Request.invoke({
                url: appConfig.store.services.API.translationIdService,
                method: 'GET'
            });

            getTransactionIdDataPromise.then(function(result) {
                TransactionInfo.setTransactionId(result.transactionId);
                TransactionInfo.setTransactionNumber(result.transactionNumber);
                obj.setTxnIdData(result);
                CONFIG.txnInfo = result;
                returnPromise && returnPromise.resolve();
            }, function(result) {
                appUtils.log('Not able to get transaction id data');
            });
        };
        //in order to revert the changes of startNewTxn
        obj.clearTxnDetails = function() {
            TransactionInfo.setTransactionId(null);
            TransactionInfo.setTransactionNumber(null);
            obj.setTxnIdData(null);
            CONFIG.txnInfo = {};
            fsConsHealthCare = "N";
            eccShortCardNum = null;
        };
        obj.clearTxnObject = function(fromGoHomeAction) {
            if (txnObject[txnDataMap.otcData] && !txnObject[txnDataMap.otcData].length) {
                //If no OTC items clear all
                fromGoHomeAction = false;
            }
            fastpass = false;
            fastpassData = {};
            fastpassVersion = "01";
            mobileConnectivity = "0";
            fastpassEventDetailsList = [];
            fastpassTransactionData = {};
            if (!fromGoHomeAction) {
                minuteClinicDepositsOrder = [];
                txnObject = {};
            } else {
                txnObject[txnDataMap.rxOrderData] = [];
                txnObject[txnDataMap.msgData] = {};
                txnObject[txnDataMap.msgData] = {};
                txnObject[txnDataMap.billPayData] = [];
                redeemGiftCard = false;
                phrGiftCardList = [];
            }
            pHRInfo = null;
            proxyPhrMethodName = null;
            fsConsHealthCare = "N";
            eccShortCardNum = null;
            eccData = '';
            eccNumber = "";
        };
        obj.setTotalBarcode = function(data) {
            if (data) {
                totalBarcode = data;
                if (totalBarcodeTimeout) {
                    $timeout.cancel(totalBarcodeTimeout);
                }
                totalBarcodeTimeout = $timeout(function() {
                    totalBarcode = null;
                }, 1800000);
            } else {
                totalBarcode = null;
                giftCardBarcode = null;
            }
        };
        obj.getGiftCardBarcode = function() {
            return giftCardBarcode;
        };
        obj.setGiftCardBarcode = function(data) {
            giftCardBarcode = data;
        };
        obj.getTotalBarcodeData = function() {
            return totalBarcode.qrdata;
        };
        obj.getTotalBarcodeHeaders = function() {
            return totalBarcode.headers;
        }
        obj.getTotalBarcode = function() {
            return (totalBarcode || {}).image;
        };
        obj.setEccNumber = function(data) {
            eccNumber = data;
        };
        obj.getEccNumber = function() {
            return eccNumber || fastpassData.extraCareID;
        };
        obj.setEccData = function(data) {
            eccData = data;
        };
        obj.getEccData = function() {
            return eccData;
        };
        obj.setRedeemGiftCard = function(data) {
            redeemGiftCard = data;
        };
        obj.getRedeemGiftCard = function() {
            return redeemGiftCard;
        };
        obj.setPhrGiftCardList = function(data) {
            phrGiftCardList = data;
        };
        obj.getPhrGiftCardList = function() {
            return phrGiftCardList;
        };
        obj.setProxyPhrMethodName = function(data) {
            proxyPhrMethodName = data;
        };
        obj.getProxyPhrMethodName = function() {
            return proxyPhrMethodName;
        };
        obj.getFastpassEventDetailsList = function() {
            return fastpassEventDetailsList;
        };
        obj.setFastpassEventDetailsList = function(data) {
            fastpassEventDetailsList = data;
        };
        obj.addFastpassEventDetailsList = function(data) {
            fastpassEventDetailsList.push(data);
        };
        obj.getFastpassTransactionData = function() {
            return fastpassTransactionData;
        };
        obj.setFastpassTransactionData = function(data) {
            fastpassTransactionData = data;
        };
        obj.setFsConsHealthCare = function(data) {
            fsConsHealthCare = data;
        };
        obj.getFsConsHealthCare = function() {
            return fsConsHealthCare;
        };
        obj.setEccShortCardNum = function(data) {
            eccShortCardNum = data;
        };
        obj.getEccShortCardNum = function() {
            return eccShortCardNum;
        };


        /**
         * Method to call the recordProcessedTransaction service for fastpass transactions
         */
        obj.recordProcessedTransaction = function(status) {

            if (fastpassTransactionData.transactionID == null) {
                fastpassTransactionData.transactionID = 0;
            }

            var txnIdData = txnObject[txnDataMap.txnIdData].transactionNumber;
            var txnNumber = txnIdData != null && txnIdData != undefined && txnIdData != 'undefined' ? txnIdData.toString() : '';
            var extraCareCard = fastpassTransactionData.extraCareID != null ? fastpassTransactionData.extraCareID : '';

            var recordProcessedTransactionPayload = {
                "processedTransactionRequest": {
                    "transactionID": fastpassTransactionData.transactionID,
                    "transactionTime": appUtils.getCurrentTimestamp(CONFIG.transactionTimeFormat),
                    "payFlag": "",
                    "taxAmt": "",
                    "cashierId": "",
                    "status": status,
                    "usedTenderTypes": "",
                    "regId": CONFIG.registerId,
                    "rxAmt": "",
                    "version": fastpassVersion,
                    "fastPassId": fastpassTransactionData.fastPassID != null ? fastpassTransactionData.fastPassID : '',
                    "rxCount": "",
                    "POSTransactionNumber": txnNumber,
                    "MPPIndicator": "N",
                    "hasNWOnlyOrder": "N",
                    "fsaAmt": "",
                    "frontStoreAmt": "",
                    "ecCardNbr": extraCareCard,
                    "encProfileId": fastpassTransactionData.userID != null ? fastpassTransactionData.userID : '',
                    "RxConnectIDs": "",
                    "savings": "",
                    "eventDetails": fastpassEventDetailsList,
                    "transactionSource": "WeCare",
                    "barcodeScanTime": fastpassTransactionData.barCodeScanTime,
                    "transactionEndTime": appUtils.getCurrentTimestamp(CONFIG.barCodeTimeFormat),
                    "driveThruInd": "N"
                }
            };

            var recordProcessedTransactionPromise =
                Request.invoke({
                    url: appConfig.store.services.API.recordProcessedTransaction,
                    method: 'POST',
                    data: recordProcessedTransactionPayload,
                    rejectPromiseOnTimeout: true,
                    triggerOffline: "no",
                    timeout: 6000
                });

            recordProcessedTransactionPromise.then(
                function(data) {
                    console.log(data);
                });

        };

        obj.clearFactory = function() {
            txnObject = {};
            txnDataMap = {
                txnIdData: 'transactionData',
                txnDetails: 'transactionDetails',
                eccData: 'eccData',
                msgData: 'msgData',
                otcData: 'otcData',
                rxOrderData: 'pprData',
                billPayData: 'billPayData'
            };
            totalBarcode;
            obj = {};
            totalBarcodeTimeout;
            eccNumber = "";
            eccData;
            fastpass = false;
            fastpassData = {};
            fastpassVersion = "01";
            mobileConnectivity = "0";
            minuteClinicDepositsOrder = [];
            pHRInfo = null;
            noItemsInOrder = true;
            redeemGiftCard = false;
            phrGiftCardList = [];
            giftCardBarcode = null;
            proxyPhrMethodName = null;
            fastpassEventDetailsList = [];
            fastpassTransactionData = {};
            fsConsHealthCare = "N";
            eccShortCardNum = null;
        }
        return obj;

    });

    