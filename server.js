
// server

var express = require('express');
var path = require('path');
var qs = require('querystring');
var url = require('url');
var bodyParser = require('body-parser');
var app = express();
var messageToggle = true;
var fs = require('fs');

app.use(bodyParser());

app.use(express.static(path.join(__dirname, '../main')));

app.get('/service/patients/patientSearch', function(req, res) {

    res.json({
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "offlineStatus": false,
            "payload": {
                "patientDetails": [{
                    "rxCPatientId": 11214300119,
                    "exactMatchIndicator": true,
                    "firstName": "TWO",
                    "lastName": "TAS",
                    "address": {
                        "streetAddress": "1",
                        "city": "ASHLAND",
                        "state": "MA"
                    },
                    "patientCntctInfo": {
                        "phone": {
                            "home": "8638456835",
                            "mobile": "2358158356",
                            "work": ""
                        },
                        "email": null,
                        "prefContact": "1"
                    },
                    "birthday": "1970-01-01",
                    "promiseDate": null,
                    "promiseTime": null,
                    "topCustomerTypeCode": null,
                    "topCustomerMessageIndicator": null,
                    "textMessagingEnrollmentIndicator": null,
                    "preferredLanguageCode": null,
                    "safetyCapIndicator": null,
                    "rpaocIndicator": null,
                    "rpaocTriggerReason": null,
                    "pediatricIndicator": null,
                    "rpaocindicator": null,
                    "rpaoctriggerReason": null
                }]
            }
        }
    });
});

app.get('/service/stores/attributes/', function(req, res) {
    res.json({});
});

app.get('/service/stores/attributes/statecode', function(req, res) {
    res.json({
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "offlineStatus": false,
            "payload": "HI"
        }
    });
});

app.get('/service/patients/waiters', function(req, res) {
    res.json({
        "StoreResponse": {
            "code": "200",
            "message": "Success",
            "payload": {
                "patientDetails": [{
                    "rxCPatientId": 11180701009,
                    "exactMatchIndicator": true,
                    "firstName": "SIGMA",
                    "lastName": "SUPER",
                    "address": {
                        "streetAddress": "9",
                        "city": "N.BOROUGH",
                        "state": "MA"
                    },
                    "patientCntctInfo": {
                        "phone": {
                            "home": "3753477667",
                            "mobile": "4747657656",
                            "work": "2147535621"
                        },
                        "email": null,
                        "prefContact": "3"
                    },
                    "birthday": "Feb-01",
                    "promiseDate": null,
                    "promiseTime": null,
                    "topCustomerTypeCode": null,
                    "topCustomerMessageIndicator": null,
                    "textMessagingEnrollmentIndicator": null,
                    "preferredLanguageCode": null,
                    "safetyCapIndicator": null,
                    "rpaocindicator": null,
                    "rpaoctriggerReason": null
                }, {
                    "rxCPatientId": 11180699231,
                    "exactMatchIndicator": true,
                    "firstName": "VINU",
                    "lastName": "REDDY",
                    "address": {
                        "streetAddress": "2",
                        "city": "NORTHBOROUGH",
                        "state": "MA"
                    },
                    "patientCntctInfo": {
                        "phone": {
                            "home": "3753477667",
                            "mobile": "4747657656",
                            "work": "2147535621"
                        },
                        "email": null,
                        "prefContact": "3"
                    },
                    "birthday": "Nov-23",
                    "promiseDate": null,
                    "promiseTime": null,
                    "topCustomerTypeCode": null,
                    "topCustomerMessageIndicator": null,
                    "textMessagingEnrollmentIndicator": null,
                    "preferredLanguageCode": null,
                    "safetyCapIndicator": null,
                    "rpaocindicator": null,
                    "rpaoctriggerReason": null
                }, {
                    "rxCPatientId": 11180699232,
                    "exactMatchIndicator": true,
                    "firstName": "CASEY",
                    "lastName": "GRANT",
                    "address": {
                        "streetAddress": "9",
                        "city": "NORTHBOROUGH",
                        "state": "MA"
                    },
                    "patientCntctInfo": {
                        "phone": {
                            "home": "3753477667",
                            "mobile": "4747657656",
                            "work": "2147535621"
                        },
                        "email": null,
                        "prefContact": "3"
                    },
                    "birthday": "Dec-3",
                    "promiseDate": null,
                    "promiseTime": null,
                    "topCustomerTypeCode": null,
                    "topCustomerMessageIndicator": null,
                    "textMessagingEnrollmentIndicator": null,
                    "preferredLanguageCode": null,
                    "safetyCapIndicator": null,
                    "rpaocindicator": null,
                    "rpaoctriggerReason": null
                }]
            }
        }
    });
});

app.get('/service/patients/patientProfile', function(req, res) {
    var data = fs.readFileSync(path.join(__dirname, 'testJson/patientProfile.json'), 'utf8');
    var obj = JSON.parse(data);
    res.json(obj);
});
app.post('/service/messages/compileMessages', function(req, res) {
    var data = {
        "StoreResponse": {
            "code": "200",
            "message": "success"
        }
    };
    res.json(data);
});

app.post('/service/messages/displayMessages', function(req, res) {

    var data = {
        "StoreResponse": {
            "code": "200",
            "message": "success"
        }
    };
    res.json(data);
});

app.post('/service/messages/rxScan/displayMessages', function(req, res) {
    var data = {
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "payload": {
                "terminalNumber": 0,
                "storeNumber": 0,
                "listOfListOfEntries": [
                    [{
                        "type": "TPComplianceMsg",
                        "disposition": null,
                        "mandatory": null,
                        "notDisplayedReason": null,
                        "timestamp": null,
                        "messageType": 9,
                        "rxNum": 100032,
                        "refillNum": 0,
                        "partialFillSeqNum": 0,
                        "editVersionNum": 0,
                        "rxPatientId": "11214300122",
                        "msgSeq": "3809580",
                        "messageConfig": {
                            "type": "PatientFormsType",
                            "patientForms": {
                                "dispTitle": "Medicare Forms",
                                "intrTxt": "Please have the patient sign the following form(s). Retain a signed copy in the pharmacy and provide a \"Customer Copy\" to the patient.",
                                "intrTxt2": "Ensure to provide the following form to the patient",
                                "scrButton": {
                                    "button1": {
                                        "id": 14,
                                        "value": "Home Delivery"
                                    },
                                    "button2": {
                                        "id": 15,
                                        "value": "Continue"
                                    },
                                    "button3": null,
                                    "button4": null
                                },
                                "lnItmButton": {
                                    "button1": {
                                        "id": 6,
                                        "value": "Signed"
                                    },
                                    "button2": {
                                        "id": 9,
                                        "value": "Not Signed"
                                    },
                                    "button3": {
                                        "id": 8,
                                        "value": "OK"
                                    },
                                    "button4": null
                                }
                            },
                            "msgType": "9",
                            "progType": "1"
                        },
                        "markDisplayed": false,
                        "patientFillInfo": null,
                        "formsSigned": { "formType": ["ABN"] },
                        "formsProvided": "NIL",
                        "rltnToBenfcryReq": "N",
                        "patSigReq": "Y",
                        "prntdNameReq": "N",
                        "progType": "1",
                        "formSignedMap": null
                    }]
                ],
                "suppressedEntries": [{
                    "type": "TPComplianceMsg",
                    "disposition": null,
                    "mandatory": null,
                    "notDisplayedReason": "1",
                    "timestamp": null,
                    "messageType": 9,
                    "rxNum": 100032,
                    "refillNum": 0,
                    "partialFillSeqNum": 0,
                    "editVersionNum": 0,
                    "rxPatientId": "11214300122",
                    "msgSeq": "3809579",
                    "messageConfig": null,
                    "markDisplayed": false,
                    "patientFillInfo": null,
                    "formsSigned": { "formType": ["NIL"] },
                    "formsProvided": "NIL",
                    "rltnToBenfcryReq": "N",
                    "patSigReq": "Y",
                    "prntdNameReq": "N",
                    "progType": "1",
                    "formSignedMap": null
                }],
                "indexToBeProcessed": 0,
                "transactionsAlreadyProcessedCount": 0,
                "endOfEntriesReached": false
            }
        },
    }
    res.json(data);
})
app.post('/service/scripts/scan', function(req, res) {
    var data = {
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "moreInfo": "sellscript",
            "offlineStatus": false,
            "payload": {
                "patientId": "11214300122",
                "patientFillInfo": {
                    "rxNum": 100032,
                    "refillNum": 0,
                    "partialFillSeqNum": 0,
                    "editVersionNum": 0,
                    "drugDesc": "TENORMIN 25 MG TABLET",
                    "fillRem": 3,
                    "prescName": {
                        "firstName": "ONE",
                        "lastName": "TEST"
                    },
                    "itemStatus": {
                        "statusVal": "WB",
                        "itemStat": "Waiting bin",
                        "actionable": "Y",
                        "fillConfigCode": "WB",
                        "unScannedRxStatus": false,
                        "disposition": null,
                        "dispositionKey": null
                    },
                    "patPayAmt": 153.99,
                    "expeditedFillInd": "N",
                    "readyFillInd": "Y",
                    "readyFillUnenrollmentInd": "N",
                    "readyFillPatientConfirmationIndicatorFirstAttempt": null,
                    "readyFillPatientConfirmationIndicatorSecondAttempt": null,
                    "partialFillInd": null,
                    "canceLRxInd": "N",
                    "soldRTSDate": null,
                    "promiseTimeCode": 2,
                    "specialtyOrderNum": null,
                    "specialtySourceId": null,
                    "specialtySourceType": null,
                    "fsaInd": null,
                    "doNotDispenseAfterDate": null,
                    "immunizationRxInd": null,
                    "hipaaNoticePrintedIndicator": "Y",
                    "cashPrescriptionIndicator": "Y",
                    "scriptSyncIndicator": "N",
                    "ssUnenrollmentIndicator": "N",
                    "afUnenrollmentReason": null,
                    "ssAlignmentFillInd": null,
                    "prePackIndicator": null,
                    "ssEarlyPickupIndicator": null,
                    "ssPickupDateWindow": null,
                    "rxExpiredIndicator": null,
                    "readyFillEnrollmentStatus": null,
                    "nextPickUpDate": null,
                    "priorityRankIndicator": null,
                    "promisedDateAndTime": null,
                    "scriptSyncEnrollmentDate": null,
                    "readyFillEnrollmentDate": null,
                    "notInWaitingBinExclusionInd": null,
                    "fillSeq": "2256536",
                    "totalItemsCount": null,
                    "actionNote": null,
                    "patientCounselInd": null,
                    "pharmacyCounselInd": null,
                    "patientCareCounselInd": null,
                    "hipaaPrivacy": null,
                    "nonSafetyCap": null,
                    "couponEligibleInd": null,
                    "topCustomerTypeCode": null,
                    "topCustomerMessageIndicator": null,
                    "stateCode": null,
                    "patientCaptureIndicator": null,
                    "patientLanguage": null,
                    "patientID": 0,
                    "sequence": 100,
                    "aBNUnassignedInd": null,
                    "rxCPayer": null,
                    "tPBCConsultRxProgramSrNo": null,
                    "tPBCConsultPOSMessageSrNo": null,
                    "combo": {
                        "indicatorsFromRxC": false,
                        "patSigReq": false,
                        "prntdNameReq": false,
                        "promiseTimeCode": 0,
                        "isBeingEdited": false,
                        "readyFillConfSig": false,
                        "beingEdited": false
                    },
                    "fillDisposition": {
                        "dispositionKey": null,
                        "disposition": null,
                        "taxCollected": null,
                        "userId": null,
                        "lineVoidedLater": null,
                        "modifiedPrice": null,
                        "fillLevel": null,
                        "locationOfRx": null,
                        "voidedTransactionNumber": null,
                        "priceSource": null,
                        "barcode": null,
                        "priceModify": false,
                        "scanInd": null
                    },
                    "abnunassignedInd": null
                },
                "rxScanServicePayLoad": {
                    "terminalNumber": 0,
                    "storeNumber": 0,
                    "listOfListOfEntries": [
                        [{
                            "type": "EANMsg",
                            "disposition": null,
                            "mandatory": null,
                            "notDisplayedReason": null,
                            "timestamp": null,
                            "messageType": 1,
                            "rxNum": 100082,
                            "refillNum": 0,
                            "partialFillSeqNum": 1,
                            "editVersionNum": 0,
                            "rxPatientId": "11214300122",
                            "msgSeq": "3809568",
                            "messageConfig": {
                                "type": "Configtype",
                                "msgInd": "Y",
                                "msgRank": 5,
                                "displayOrder": 1,
                                "promptIndicator": null,
                                "usrEntryTool": {
                                    "tool1": null,
                                    "tool2": null,
                                    "tool3": null,
                                    "tool4": null
                                },
                                "scrButton": {
                                    "button1": null,
                                    "button2": null,
                                    "button3": null,
                                    "button4": null
                                },
                                "msgType": "1",
                                "progType": "2",
                                "progSubType": null,
                                "talkingPoints": null,
                                "configInfo": {
                                    "1": {
                                        "dispTitle": "Action notes",
                                        "descTxt": "Unfortunately we do not have enough of the medication to fill the entire prescription for you at this time.",
                                        "intrTxt": "Explain to the patient the reason their prescription may not be ready.  Protect Patient Privacy: Discuss prescription information with the patient ONLY.",
                                        "lnItmButton": {
                                            "button1": null,
                                            "button2": null,
                                            "button3": null,
                                            "button4": null
                                        }
                                    }
                                }
                            },
                            "markDisplayed": false,
                            "patientFillInfo": null,
                            "progType": "2",
                            "cntctNum": "1236882535",
                            "rsnAcnote": "OOS - Partial Fill",
                            "rstPatCntct": "Phone busy/no answer",
                            "commInd": "N",
                            "acnoteDate": "2016-05-16",
                            "acnoteTime": "13:56:00",
                            "employee": "R,RXCO",
                            "promiseDate": "2016-05-17",
                            "promiseTime": "08:00:00"
                        }],
                        [{
                            "type": "EANMsg",
                            "disposition": null,
                            "mandatory": null,
                            "notDisplayedReason": null,
                            "timestamp": null,
                            "messageType": 1,
                            "rxNum": 100081,
                            "refillNum": 0,
                            "partialFillSeqNum": 0,
                            "editVersionNum": 0,
                            "rxPatientId": "11214300122",
                            "msgSeq": "3809570",
                            "messageConfig": {
                                "type": "Configtype",
                                "msgInd": "Y",
                                "msgRank": 5,
                                "displayOrder": 1,
                                "promptIndicator": null,
                                "usrEntryTool": {
                                    "tool1": null,
                                    "tool2": null,
                                    "tool3": null,
                                    "tool4": null
                                },
                                "scrButton": {
                                    "button1": null,
                                    "button2": null,
                                    "button3": null,
                                    "button4": null
                                },
                                "msgType": "1",
                                "progType": "4",
                                "progSubType": null,
                                "talkingPoints": null,
                                "configInfo": {
                                    "1": {
                                        "dispTitle": "Action notes",
                                        "descTxt": "Unfortunately we do not have enough of the medication to fill the entire prescription for you at this time.",
                                        "intrTxt": "Explain to the patient the reason their prescription may not be ready.  Protect Patient Privacy: Discuss prescription information with the patient ONLY.",
                                        "lnItmButton": {
                                            "button1": null,
                                            "button2": null,
                                            "button3": null,
                                            "button4": null
                                        }
                                    }
                                }
                            },
                            "markDisplayed": false,
                            "patientFillInfo": null,
                            "progType": "4",
                            "cntctNum": "1236882535",
                            "rsnAcnote": "OOS - Partial Fill",
                            "rstPatCntct": "Phone busy/no answer",
                            "commInd": "N",
                            "acnoteDate": "2016-05-16",
                            "acnoteTime": "13:55:00",
                            "employee": "R,RXCO",
                            "promiseDate": "2016-05-17",
                            "promiseTime": "08:00:00"
                        }],
                        [{
                            "type": "TPComplianceMsg",
                            "disposition": null,
                            "mandatory": null,
                            "notDisplayedReason": null,
                            "timestamp": null,
                            "messageType": 9,
                            "rxNum": 100032,
                            "refillNum": 0,
                            "partialFillSeqNum": 0,
                            "editVersionNum": 0,
                            "rxPatientId": "11214300122",
                            "msgSeq": "3809580",
                            "messageConfig": {
                                "type": "PatientFormsType",
                                "patientForms": {
                                    "dispTitle": "Medicare Forms",
                                    "intrTxt": "Please have the patient sign the following form(s). Retain a signed copy in the pharmacy and provide a \"Customer Copy\" to the patient.",
                                    "intrTxt2": "Ensure to provide the following form to the patient",
                                    "scrButton": {
                                        "button1": {
                                            "id": 14,
                                            "value": "Home Delivery"
                                        },
                                        "button2": {
                                            "id": 15,
                                            "value": "Continue"
                                        },
                                        "button3": null,
                                        "button4": null
                                    },
                                    "lnItmButton": {
                                        "button1": {
                                            "id": 6,
                                            "value": "Signed"
                                        },
                                        "button2": {
                                            "id": 9,
                                            "value": "Not Signed"
                                        },
                                        "button3": {
                                            "id": 8,
                                            "value": "OK"
                                        },
                                        "button4": null
                                    }
                                },
                                "msgType": "9",
                                "progType": "1"
                            },
                            "markDisplayed": false,
                            "patientFillInfo": null,
                            "formsSigned": { "formType": ["ABN"] },
                            "formsProvided": "NIL",
                            "rltnToBenfcryReq": "N",
                            "patSigReq": "Y",
                            "prntdNameReq": "N",
                            "progType": "1",
                            "formSignedMap": null
                        }]
                    ],
                    "suppressedEntries": [{
                        "type": "TPComplianceMsg",
                        "disposition": null,
                        "mandatory": null,
                        "notDisplayedReason": "1",
                        "timestamp": null,
                        "messageType": 9,
                        "rxNum": 100032,
                        "refillNum": 0,
                        "partialFillSeqNum": 0,
                        "editVersionNum": 0,
                        "rxPatientId": "11214300122",
                        "msgSeq": "3809579",
                        "messageConfig": null,
                        "markDisplayed": false,
                        "patientFillInfo": null,
                        "formsSigned": { "formType": ["NIL"] },
                        "formsProvided": "NIL",
                        "rltnToBenfcryReq": "N",
                        "patSigReq": "Y",
                        "prntdNameReq": "N",
                        "progType": "1",
                        "formSignedMap": null
                    }],
                    "indexToBeProcessed": 0,
                    "transactionsAlreadyProcessedCount": 0,
                    "endOfEntriesReached": false
                }
            }
        }
    }

    res.json(data);
});

app.post('/service/sales/esignature', function(req, res) {
    var data = {
        "StoreResponse": {
            "code": "200",
            "message": "success"
        }
    };
    res.json(data);
});

app.post('/service/compliance/pse/license', function(req, res) {
    res.json({
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "payload": {
                "responseCode": "0000",
                "pseReturnCode": null,
                "message": null,
                "messageId": null,
                "parseRequestId": "b7dbf189-f657-4c43-a4c0-e59de404c02c",
                "transactionId": null,
                "transactionTime": "2015-09-29:12:09:436",
                "driversLicense": {
                    "licenseClass": null,
                    "jurisdiction": 636000,
                    "documentNumber": "PSEDEMO1",
                    "issuingAuthority": "VA",
                    "firstName": "FIRSTNAME",
                    "middleName": "FIRSTNAME",
                    "lastName": "LASTNAME",
                    "suffix": null,
                    "birthDate": "1957-07-02",
                    "residenceAddress": {
                        "address1": "123 MAIN STREET",
                        "address2": null,
                        "city": "FAIRFAX STATION",
                        "stateCode": "VA",
                        "postalCode": "22039-3314"
                    },
                    "issueDate": null,
                    "expirationDate": "2007-05-16",
                    "gender": "M",
                    "height": "600",
                    "weight": null,
                    "eyeColor": null
                },
                "errorDetail": null
            }
        }
    });
});

app.post('/service/compliance/pse/inquiry', function(req, res) {
    res.json({
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "payload": {
                "responseCode": "0000",
                "pseReturnCode": null,
                "message": null,
                "messageId": null,
                "externalResultCode": "0",
                "inquirySid": 0,
                "inquiryTime": "2015-09-29:11:09:595",
                "inquiryValidation": {
                    "resultCode": 0,
                    "errorMessage": null
                },
                "warnings": {
                    "warning": {
                        "value": "Data for product CLARITIN-D 12 HOUR (10 CNT) (004110080208) [grams: 10] conflicts with the MethCheck database [grams: 1,200]",
                        "code": "PRODUCT_CONFLICT"
                    }
                },
                "personinfo": {
                    "id": "PSEDEMO1",
                    "idType": "DL_ID",
                    "issuingAgency": "VA",
                    "expiration": "2015-12-12",
                    "lastName": "LASTNAME",
                    "firstName": "FIRSTNAME",
                    "middleName": "FIRSTNAME",
                    "birthDate": "1957-07-02",
                    "address1": "123 MAIN STREET",
                    "city": "FAIRFAX STATION",
                    "state": "VA",
                    "zip": "22039-3314"
                },
                "compliance": {
                    "lstAgent": [{
                        "lstAgentCheck": [{
                            "value": "3.6g per day",
                            "result": null
                        }, {
                            "value": "9g in 30 days",
                            "result": null
                        }]
                    }, {
                        "lstAgentCheck": [{
                            "value": "3.6g Per Day",
                            "result": null
                        }, {
                            "value": "9g Per 30 Days",
                            "result": null
                        }]
                    }],
                    "result": null
                }
            }
        }
    });
});

app.post('/service/compliance/pse/purchase', function(req, res) {
    var data = {
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "payload": {
                "responseCode": "0005",
                "message": "Success"
            }
        }
    }
    setTimeout(function() {
        if (!res.headersSent)
            res.json(data);

    }, 31000);

});

app.get('/service/config/basket', function(req, res) {
    var data = {
        "StoreResponse": {
            "code": "200",
            "message": "Success",
            "payload": {
                "BasketConfig": {
                    "scenarios": [{
                        "type": 22,
                        "instruction": "Inform customer that script was already sold.\t\t\t\tProvide date.",
                        "configButtons": {
                            "button1": null,
                            "button2": {
                                "id": 8,
                                "label": "Okay"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 51,
                        "instruction": "Confirm that customer will come back later for\t\t\t\tRx. Otherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue \nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 17,
                        "instruction": "Confirm that customer does not want Rx.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 3,
                                "label": "Okay"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Hold in \nWaiting Bin"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Confirm \nReturn to Stock"
                            }
                        }
                    }, {
                        "type": 62,
                        "instruction": "Inform customer that request was sent to\t\t\t\tprescriber",
                        "configButtons": {
                            "button1": null,
                            "button2": {
                                "id": 8,
                                "label": "Okay"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 77,
                        "instruction": "Expedite script. Otherwise, determine\t\t\t\tcustomer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue without Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return to Stock Report"
                            }
                        }
                    }, {
                        "type": 28,
                        "instruction": "Confirm Expediting Rx with patient. Otherwise,\t\t\t\tdetermine customer's needs",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Confirm \nExpedite"
                            },
                            "button2": null,
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 31,
                        "instruction": "Confirm Expediting Rx with patient. Otherwise,\t\t\t\tdetermine customer's needs",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Confirm \nExpedite"
                            },
                            "button2": null,
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 32,
                        "instruction": "Confirm Expediting Rx with patient. Otherwise,\t\t\t\tdetermine customer's needs",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Confirm \nExpedite"
                            },
                            "button2": null,
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 34,
                        "instruction": "Confirm that customer needs RPh consult.  ",
                        "configButtons": {
                            "button1": {
                                "id": 4,
                                "label": "Cancel \nHand-off to RPH"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 38,
                        "instruction": "Confirm that customer needs RPh consult.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "hold on"
                            },
                            "button3": {
                                "id": 9,
                                "label": "hand off"
                            },
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 54,
                        "instruction": "Confirm that customer will come back later for\t\t\t\tRx. Otherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue \nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 7,
                        "instruction": "Expedite script. Otherwise, determine\t\t\t\tcustomer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue \nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 15,
                        "instruction": "Confirm that customer does not want Rx.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 3,
                                "label": "Okay"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Hold in \nWaiting Bin"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Confirm \nReturn to Stock"
                            }
                        }
                    }, {
                        "type": 82,
                        "instruction": "Inform customer that current exceptions/ issue\t\t\t\tmust be resolved before prescription can be filed",
                        "configButtons": {
                            "button1": {
                                "id": 4,
                                "label": "Cancel"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Hand-off to RPh"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 66,
                        "instruction": "Instruct customer to go to the Drop-Off.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": null,
                            "button2": {
                                "id": 8,
                                "label": "Okay"
                            },
                            "button3": {
                                "id": 9,
                                "label": "Resolve in RxConnect"
                            },
                            "button4": null
                        }
                    }, {
                        "type": 79,
                        "instruction": "Confirm Expediting Rx with patient. Otherwise,\t\t\t\tdetermine customer's needs",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Confirm Expedite"
                            },
                            "button2": null,
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return to Stock Report"
                            }
                        }
                    }, {
                        "type": 23,
                        "instruction": "Expedite script. Otherwise, determine\t\t\t\tcustomer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue \nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 26,
                        "instruction": "Confirm Expediting Rx with patient. Otherwise,\t\t\t\tdetermine customer's needs",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Confirm \nExpedite"
                            },
                            "button2": null,
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 40,
                        "instruction": "Confirm that customer needs RPh consult.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off   to RPH"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 44,
                        "instruction": "Confirm that customer needs RPh consult.  ",
                        "configButtons": {
                            "button1": {
                                "id": 4,
                                "label": "Cancel \nHand-off to RPH"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off   to RPH"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 46,
                        "instruction": "Confirm that customer needs RPh consult.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off   to RPH"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 56,
                        "instruction": "Confirm that customer will come back later for\t\t\t\tRx. Otherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue \nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 57,
                        "instruction": "Confirm that customer will come back later for\t\t\t\tRx. Otherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue \nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 58,
                        "instruction": "Confirm that customer will come back later for\t\t\t\tRx. Otherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue \nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 8,
                        "instruction": "Expedite script. Otherwise, determine\t\t\t\tcustomer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue\nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 9,
                        "instruction": "Expedite script. Otherwise, determine\t\t\t\tcustomer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue\nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 11,
                        "instruction": "Confirm that customer does not want Rx.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 3,
                                "label": "Okay"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Hold in \nWaiting Bin"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Confirm \nReturn to Stock"
                            }
                        }
                    }, {
                        "type": 68,
                        "instruction": "Continue Purchase. Otherwise, determine\t\t\t\tcustomer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 1,
                                "label": "Continue and Scan RX"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue without Selling"
                            },
                            "button3": {
                                "id": 9,
                                "label": "Hand-off to RPh"
                            },
                            "button4": {
                                "id": 7,
                                "label": "Add to Return to Stock Report"
                            }
                        }
                    }, {
                        "type": 72,
                        "instruction": "Pharmacist consultation required for RPh to\t\t\t\ttransition patient.",
                        "configButtons": {
                            "button1": {
                                "id": 4,
                                "label": "Cancel Hand-off to RPH"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm Hand-off to RPH"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 63,
                        "instruction": "Confirm that customer needs RPh consult.",
                        "configButtons": {
                            "button1": {
                                "id": 4,
                                "label": "Cancel \nHand-off to RPH"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 64,
                        "instruction": "Instruct customer to go to Drop-Off.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": null,
                            "button2": {
                                "id": 8,
                                "label": "Okay"
                            },
                            "button3": {
                                "id": 9,
                                "label": "Resolve in RxConnect"
                            },
                            "button4": null
                        }
                    }, {
                        "type": 76,
                        "instruction": "Confirm that customer needs RPh consult.",
                        "configButtons": {
                            "button1": {
                                "id": 4,
                                "label": "Cancel Hand-Off"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm Hand-Off"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 24,
                        "instruction": "Expedite script. Otherwise, determine\t\t\t\tcustomer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue \nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 27,
                        "instruction": "Confirm Expediting Rx with patient. Otherwise,\t\t\t\tdetermine customer's needs",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Confirm \nExpedite"
                            },
                            "button2": null,
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 35,
                        "instruction": "Confirm that customer needs RPh consult.  ",
                        "configButtons": {
                            "button1": {
                                "id": 4,
                                "label": "Cancel \nHand-off to RPH"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 43,
                        "instruction": "Confirm that customer needs RPh consult",
                        "configButtons": {
                            "button1": {
                                "id": 4,
                                "label": "Cancel\nHand-off to RPH"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off   to RPH"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 53,
                        "instruction": "Confirm that customer will come back later for\t\t\t\tRx. Otherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue\nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 55,
                        "instruction": "Confirm that customer will come back later for\t\t\t\tRx. Otherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue \nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 3,
                        "instruction": "Inform customer that request was sent to\t\t\t\tprescriber ",
                        "configButtons": {
                            "button1": null,
                            "button2": {
                                "id": 8,
                                "label": "Okay"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 69,
                        "instruction": "Obtain prescription from refrigerator and\t\t\t\tContinue Purchase. Otherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 1,
                                "label": "Refrigerator Continue and Scan"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue without Selling"
                            },
                            "button3": {
                                "id": 9,
                                "label": "Hand-off to RPh"
                            },
                            "button4": {
                                "id": 7,
                                "label": "Add to Return to Stock Report"
                            }
                        }
                    }, {
                        "type": 14,
                        "instruction": "Confirm that customer does not want Rx.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 3,
                                "label": "Okay"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Hold in \nWaiting Bin"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Confirm \nReturn to Stock"
                            }
                        }
                    }, {
                        "type": 65,
                        "instruction": "Instruct customer to go to the Drop-Off.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": null,
                            "button2": {
                                "id": 8,
                                "label": "Okay"
                            },
                            "button3": {
                                "id": 9,
                                "label": "Resolve in RxConnect"
                            },
                            "button4": null
                        }
                    }, {
                        "type": 67,
                        "instruction": "Instruct customer to go to the Drop-Off.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": null,
                            "button2": {
                                "id": 8,
                                "label": "Okay"
                            },
                            "button3": {
                                "id": 9,
                                "label": "Resolve in RxConnect"
                            },
                            "button4": null
                        }
                    }, {
                        "type": 81,
                        "instruction": "Confirm that customer willcome back later for\t\t\t\tRx. Otherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue without Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return to Stock Report"
                            }
                        }
                    }, {
                        "type": 18,
                        "instruction": "Confirm that customer does not want Rx.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 3,
                                "label": "Okay"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Hold in \nWaiting Bin"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Confirm \nReturn to Stock"
                            }
                        }
                    }, {
                        "type": 29,
                        "instruction": "Confirm Expediting Rx with patient. Otherwise,\t\t\t\tdetermine customer's needs",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Confirm \nExpedite"
                            },
                            "button2": null,
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 39,
                        "instruction": "Confirm that customer needs RPh consult.  ",
                        "configButtons": {
                            "button1": {
                                "id": 4,
                                "label": "Cancel \nHand-off to RPH"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 45,
                        "instruction": "Confirm that customer needs RPh consult.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off   to RPH"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 13,
                        "instruction": "Confirm that customer does not want Rx.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 3,
                                "label": "Okay"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Hold in \nWaiting Bin"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Confirm \nReturn to Stock"
                            }
                        }
                    }, {
                        "type": 71,
                        "instruction": "Pharmacist consultation required for RPh to\t\t\t\ttransition patient.",
                        "configButtons": {
                            "button1": null,
                            "button2": {
                                "id": 9,
                                "label": "Okay"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 83,
                        "instruction": "Confirm that customer needs RPh consult.",
                        "configButtons": {
                            "button1": {
                                "id": 4,
                                "label": "Cancel Hand-off"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm Hand-off  "
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 78,
                        "instruction": "Confirm that customer does not want Rx.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 3,
                                "label": "Okay"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Hold in Waiting Bin"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Confirm  Return to Stock"
                            }
                        }
                    }, {
                        "type": 21,
                        "instruction": "Expedite script. Otherwise, determine\t\t\t\tcustomer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue \nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 41,
                        "instruction": "Confirm that customer needs RPh consult.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off   to RPH"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 42,
                        "instruction": "Confirm that customer needs RPh consult.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off   to RPH"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 48,
                        "instruction": "Confirm that customer needs RPh consult.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off   to RPH"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 50,
                        "instruction": "Confirm that customer needs RPh consult.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 3,
                                "label": "Continue \nand Scan RX"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off   to RPH"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 52,
                        "instruction": "Confirm that customer will come back later for\t\t\t\tRx. Otherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue \nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 59,
                        "instruction": "Confirm that customer will come back later for\t\t\t\tRx. Otherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 3,
                                "label": "Continue \nand Scan RX"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue \nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 61,
                        "instruction": "Determine customer needs or hand-off to\t\t\t\tpharmacist ",
                        "configButtons": {
                            "button1": null,
                            "button2": {
                                "id": 8,
                                "label": "Okay"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 1,
                        "instruction": "Inform customer script is being filled\t\t\t\toffsite. Provide Promise Date.",
                        "configButtons": {
                            "button1": null,
                            "button2": {
                                "id": 8,
                                "label": "Okay"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 2,
                        "instruction": "Inform customer that request was sent to\t\t\t\tprescriber",
                        "configButtons": {
                            "button1": null,
                            "button2": {
                                "id": 8,
                                "label": "Okay"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 4,
                        "instruction": "Inform customer that we're waiting on the\t\t\t\tproduct to be delivered. Provide date.",
                        "configButtons": {
                            "button1": null,
                            "button2": {
                                "id": 8,
                                "label": "Okay"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 6,
                        "instruction": "Inform customer that request was sent to\t\t\t\tprescriber",
                        "configButtons": {
                            "button1": null,
                            "button2": {
                                "id": 8,
                                "label": "Okay"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 16,
                        "instruction": "Confirm that customer does not want Rx.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 3,
                                "label": "Okay"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Hold in \nWaiting Bin"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Confirm Return to Stock"
                            }
                        }
                    }, {
                        "type": 73,
                        "instruction": "Inform customer that request was sent to\t\t\t\tprescriber",
                        "configButtons": {
                            "button1": null,
                            "button2": {
                                "id": 8,
                                "label": "Okay"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 86,
                        "instruction": "Confirm Expediting Rx with patient. Otherwise,\t\t\t\tdetermine customer's needs",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Confirm Expedite"
                            },
                            "button2": null,
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 20,
                        "instruction": "Expedite script. Otherwise, determine\t\t\t\tcustomer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue \nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return\nto Stock Report"
                            }
                        }
                    }, {
                        "type": 25,
                        "instruction": "Continue Purchase. Otherwise, determine\t\t\t\tcustomer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 3,
                                "label": "Continue \nand Scan RX"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue \nwithout Selling"
                            },
                            "button3": {
                                "id": 9,
                                "label": "Hand-off \nto RPH"
                            },
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 30,
                        "instruction": "Confirm Expediting Rx with patient. Otherwise,\t\t\t\tdetermine customer's needs",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Confirm \nExpedite"
                            },
                            "button2": null,
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 33,
                        "instruction": "Confirm Expediting Rx with patient. Otherwise,\t\t\t\tdetermine customer's needs",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Confirm \nExpedite"
                            },
                            "button2": null,
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 36,
                        "instruction": "Confirm that customer needs RPh consult.  ",
                        "configButtons": {
                            "button1": {
                                "id": 4,
                                "label": "Cancel \nHand-off to RPH"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 60,
                        "instruction": "Confirm that customer does not want Rx.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 3,
                                "label": "Okay"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Hold in \nWaiting Bin"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Confirm \nReturn to Stock"
                            }
                        }
                    }, {
                        "type": 5,
                        "instruction": "Expedite script. Otherwise, determine\t\t\t\tcustomer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Continue\nwithout Selling"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return\nto Stock Report"
                            }
                        }
                    }, {
                        "type": 10,
                        "instruction": "Inform customer script was already Returned to\t\t\t\tStock. Provide date.",
                        "configButtons": {
                            "button1": null,
                            "button2": {
                                "id": 8,
                                "label": "Okay"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 12,
                        "instruction": "Confirm that customer does not want Rx.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 3,
                                "label": "Okay"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Hold in \nWaiting Bin"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Confirm \nReturn to Stock"
                            }
                        }
                    }, {
                        "type": 74,
                        "instruction": "Confirm that customer needs RPh consult.",
                        "configButtons": {
                            "button1": {
                                "id": 4,
                                "label": "Cancel"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm Hand-off to RPH"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 75,
                        "instruction": "Inform customer that Rx must be clarified by\t\t\t\tthe prescriber before it can be filled.",
                        "configButtons": {
                            "button1": {
                                "id": 4,
                                "label": "Cancel Hand Off"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Okay"
                            },
                            "button3": {
                                "id": 9,
                                "label": "Hand Off to Rph"
                            },
                            "button4": {
                                "id": 7,
                                "label": "Return to Stock"
                            }
                        }
                    }, {
                        "type": 80,
                        "instruction": "Confirm that customer needs RPh consult.\t\t\t\tOtherwise, determine customer's needs",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm Hand-off"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return to Stock Report"
                            }
                        }
                    }, {
                        "type": 85,
                        "instruction": "Confirm that customer needs RPh consult.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm Hand-off"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 19,
                        "instruction": "Inform customer that Rx request was sent to\t\t\t\tprescriber",
                        "configButtons": {
                            "button1": null,
                            "button2": {
                                "id": 8,
                                "label": "Okay"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 37,
                        "instruction": "Confirm that customer needs RPh consult.  ",
                        "configButtons": {
                            "button1": {
                                "id": 4,
                                "label": "Cancel \nHand-off to RPH"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off   to RPH"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 47,
                        "instruction": "Confirm that customer needs RPh consult.  ",
                        "configButtons": {
                            "button1": {
                                "id": 4,
                                "label": "Cancel \nHand-off to RPH"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off   to RPH"
                            },
                            "button3": null,
                            "button4": null
                        }
                    }, {
                        "type": 49,
                        "instruction": "Confirm that customer needs RPh consult.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 2,
                                "label": "Expedite"
                            },
                            "button2": {
                                "id": 4,
                                "label": "Confirm \nHand-off"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Add to Return \nto Stock Report"
                            }
                        }
                    }, {
                        "type": 70,
                        "instruction": "Confirm that customer does not want Rx.\t\t\t\tOtherwise, determine customer's needs.",
                        "configButtons": {
                            "button1": {
                                "id": 3,
                                "label": "Okay"
                            },
                            "button2": {
                                "id": 8,
                                "label": "Hold in Waiting Bin"
                            },
                            "button3": null,
                            "button4": {
                                "id": 7,
                                "label": "Confirm Return to Stock"
                            }
                        }
                    }]
                }
            }
        }
    };

    res.json(data);
});

app.post('/service/customers/ecc/enrollment', function(req, res) {
    var data = {
        "StoreResponse": {
            "code": "200",
            "message": "success"
        }
    };
    res.json(data);
});

app.post('/service/agent/login', function(req, res) {

    var agentId = req.body.userId;
    console.log(agentId);
    var data;
    if (agentId == '123456') {
        data = {
            "StoreResponse": {
                "code": "200",
                "message": "success",
                "payload": {
                    "loginDetails": {
                        "userId": "123455",
                        "authToken": "12345ADSFASDF1322342ASFASF",
                        "result": "ok"
                    }
                }
            }
        };
    } else {
        data = {
            "StoreResponse": {
                "code": "200",
                "message": "success",
                "payload": {
                    "loginDetails": {
                        "message": "agent name is wrong"
                    }
                }
            }
        };
    };
    res.json(data);
});

app.post('/service/agent/password', function(req, res) {

    var password = req.body.password;
    console.log(password);
    var data;
    if (password == '123456') {
        data = {
            "StoreResponse": {
                "code": "200",
                "message": "success",
                "payload": {
                    "loginDetails": {
                        "userId": "1234",
                        "authToken": "12345ADSFASDF1322342ASFASF",
                        "result": "ok"
                    }
                }
            }
        };
    } else {
        data = {
            "StoreResponse": {
                "code": "200",
                "message": "success",
                "payload": {
                    "loginDetails": {
                        "message": "agent password is wrong"
                    }
                }
            }
        };
    };
    res.json(data);
});

app.get('/service/customers/ecc/accounts', function(req, res) {

    var data;
    //by phone
    if (req.query.phone) {
        data = {
            "StoreResponse": {
                "code": "200",
                "message": "success",
                "payload": [{
                    "extra_card_nbr": "308024719",
                    "encoded_extra_card_nbr": "4763080247197",
                    "custom_id": "133319666",
                    "first_name": "leizheng35",
                    "last_name": "",
                    "address_1": "n45ull",
                    "address_2": "add2",
                    "city_name": "CITY1",
                    "state_code": "MA",
                    "zip_code": "02379",
                    "phone_number": "5621236666",
                    "email_address": "KFCLOVER@KFC.COM"
                }, {
                    "extra_card_nbr": "298146126",
                    "encoded_extra_card_nbr": "4879981461263",
                    "custom_id": "133320156",
                    "first_name": "leizheng3",
                    "last_name": "",
                    "address_1": "n45ull",
                    "address_2": "add2",
                    "city_name": "CITY1",
                    "state_code": "MA",
                    "zip_code": "02379",
                    "phone_number": "5621236666",
                    "email_address": "KFCLOVER@KFC.COM"
                }, {
                    "extra_card_nbr": "298146139",
                    "encoded_extra_card_nbr": "4879981461393",
                    "custom_id": "133320170",
                    "first_name": "leizheng3",
                    "last_name": "",
                    "address_1": "n45ull",
                    "address_2": "add2",
                    "city_name": "CITY1",
                    "state_code": "MA",
                    "zip_code": "02379",
                    "phone_number": "5621236666",
                    "email_address": "KFCLOVER@KFC.COM"
                }, {
                    "extra_card_nbr": "298146140",
                    "encoded_extra_card_nbr": "4879981461409",
                    "custom_id": "133320171",
                    "first_name": "leizheng3",
                    "last_name": "",
                    "address_1": "n45ull",
                    "address_2": "add2",
                    "city_name": "CITY1",
                    "state_code": "MA",
                    "zip_code": "02379",
                    "phone_number": "5621236666",
                    "email_address": "KFCLOVER@KFC.COM"
                }, {
                    "extra_card_nbr": "298146153",
                    "encoded_extra_card_nbr": "4879981461539",
                    "custom_id": "133320186",
                    "first_name": "leizheng3",
                    "last_name": "",
                    "address_1": "n45ull",
                    "address_2": "add2",
                    "city_name": "CITY1",
                    "state_code": "MA",
                    "zip_code": "02379",
                    "phone_number": "5621236666",
                    "email_address": "KFCLOVER@KFC.COM"
                }, {
                    "extra_card_nbr": "298146154",
                    "encoded_extra_card_nbr": "4879981461546",
                    "custom_id": "133320187",
                    "first_name": "leizheng35",
                    "last_name": "",
                    "address_1": "n45ull",
                    "address_2": "add2",
                    "city_name": "CITY1",
                    "state_code": "MA",
                    "zip_code": "02379",
                    "phone_number": "5621236666",
                    "email_address": "KFCLOVER@KFC.COM"
                }]
            }
        }
    } else if (req.query.card_nbr) {

        data = data = {
            "StoreResponse": {
                "code": "200",
                "message": "success",
                "payload": {
                    "firstName": "leizheng35",
                    "lastName": "",
                    "pfxTxt": "",
                    "surName": "",
                    "primaryPhoneNumber": {
                        "type": "",
                        "phoneNumber": "5621236666",
                        "entryMethodCdCustPhone": ""
                    },
                    "primaryCustomerAddress": {
                        "address1": "n45ull",
                        "address2": "add2",
                        "city": "CITY1",
                        "state": "MA",
                        "zipCode": "02379",
                        "entryMethodCdCustAdd": ""
                    },
                    "primaryCustomerEmail": {
                        "type": "",
                        "emailAddress": "KFCLOVER@KFC.COM",
                        "emailStatusDesc": "Active",
                        "emailStatusCode": "A",
                        "entryMethodCdCustEmail": ""
                    },
                    "noPersonalizedOffersEmail": false,
                    "noPersonalizedOffersAddress": false,
                    "custOptCode": "false",
                    "gender": "",
                    "extraCareCardNumberShort": "308024719",
                    "entryMethodCdCust": "",
                    "phoneNumbersByPreference": [{
                        "type": "",
                        "phoneNumber": "5621236666",
                        "entryMethodCdCustPhone": ""
                    }],
                    "emailAddressesByPreference": [{
                        "type": "",
                        "emailAddress": "KFCLOVER@KFC.COM",
                        "emailStatusDesc": "Active",
                        "emailStatusCode": "A",
                        "entryMethodCdCustEmail": ""
                    }],
                    "customerAddressesByPreference": [{
                        "address1": "n45ull",
                        "address2": "add2",
                        "city": "CITY1",
                        "state": "MA",
                        "zipCode": "02379",
                        "entryMethodCdCustAdd": ""
                    }]
                }
            }
        }
    }

    res.json(data);
});

app.post('/service/punch', function(req, res) {
    var data;

    if (req.body.mgr_over_flag == true) {
        data = {
            "StoreResponse": {
                "code": "200",
                "message": "success"
            }
        };

    } else {
        data = {
            "StoreResponse": {
                "code": "404",
                "message": "success"
            }
        };

    }

    res.json(data);
});

app.post('/service/stores/employees/punchinout', function(req, res) {
    var data;

    data = {
        "StoreResponse": {
            "code": "200",
            "message": "success"
        }
    };
    res.json(data);
});

app.get('/service/items/front-stores', function(req, res) {
    var data = {
        "storeResponse": {
            "code": "200",
            "message": "success",
            "offlineStatus": false,
            "payload": {
                "upc": "079936620554",
                "retailPrice": 19.99,
                "cost": 15,
                "priceChangeDate": "12-30-2015",
                "tax1Flag": true,
                "tax2Flag": false,
                "tax3Flag": false,
                "tax4Flag": false,
                "facings": "99",
                "fsaFlag": true,
                "pseFlag": false,
                "pseGramsPerBox": 0,
                "department": 26,
                "familyNumber": 0,
                "minPresentation": 0,
                "createTimestamp": "12-30-2015",
                "updateTimestamp": "12-30-2015",
                "major": 86,
                "minor": 59,
                "odds": "J",
                "liftFactor": "0",
                "description": "HUMANA BILL PAY        EACH",
                "returnFlag": "N",
                "doNotSell": false,
                "sku": "972226"
            }
        }
    }
    res.json(data);
});



app.get('/service/sales/esignconfig', function(req, res) {
    var data = {
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "payload": [{
                "esigType": "SafetyCap",
                "RegisterPrompt": {
                    "MessageContent": "Please be aware that one or more of these prescriptions have been dispensed with a non-safety cap per customer request.",
                    "_PromptForFills": "0"
                },
                "PaymentTerminalPrompt": {
                    "MessageContent": {
                        "en": "- Am aware that one/more of the prescriptions I am picking up have a non-safety cap per customer request.",
                        "es": ""
                    },
                    "_PromptForFills": "0"
                }
            }, {
                "esigType": "HIPAANoticeOfPrivacy",
                "RegisterPrompt": {
                    "MessageContent": "The CVS notice of privacy practices is attached to your prescription.",
                    "_PromptForFills": "ALL"
                },
                "PaymentTerminalPrompt": {
                    "MessageContent": {
                        "en": "- Acknowledge receipt of CVS's Notice of Privacy Practices.",
                        "es": ""
                    },
                    "_PromptForFills": "ALL"
                }
            }]
        }
    };
    res.json(data);
});
app.post('/service/messages/esig', function(req, res) {
    var data;
    data = {
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "offlineStatus": false,
            "payload": {
                "versionId": "201509291436.OHIO",
                "description": "COUNSEL_ON_DOCUMENT_ON_PAYMENT_ON",
                "esigMessage": [{
                    "messageType": "COUNSELING",
                    "registerPrompt": {
                        "messageContent": "Would you like to speak with the Pharmacist about any of the other prescriptions you are picking up today?",
                        "messageBContent": "Would you like to speak with the Pharmacist about any of the other prescriptions you are picking up today?",
                        "promptForFills": "ALL"
                    },
                    "paymentTerminalPrompt": {
                        "messageContent": {
                            "en": [""],
                            "es": [""]
                        },
                        "messageContentForAccept": {
                            "en": ["- Have accepted counseling on one/more prescriptions I am picking up today "],
                            "es": ["- He aceptado asesoramiento en una / varias de las recetas que estoy recogiendo hoy"]
                        },
                        "messageContentForDecline": {
                            "en": ["- Have declined counseling on the prescriptions I am picking up today"],
                            "es": ["- He declinado recibir asesoramiento en las recetas que estoy recogiendo hoy"]
                        },
                        "promptForFills": "ALL"
                    },
                    "acceptDecline": {
                        "value": "",
                        "captureAcceptDeclineRequired": "Y",
                        "declineReasonCodesRequired": "N"
                    },
                    "credentials": {
                        "value": "",
                        "captureCredentialsRequired": "N"
                    },
                    "rxNumInfo": [{
                        "rxNumber": 8378776,
                        "fillSeqNum": 0
                    }]
                }, {
                    "messageType": "HIPAA",
                    "registerPrompt": {
                        "messageContent": "The CVS notice of privacy practices is attached to your prescription.",
                        "messageBContent": null,
                        "promptForFills": "ALL"
                    },
                    "paymentTerminalPrompt": {
                        "messageContent": {
                            "en": ["- Acknowledge receipt of CVS’s Notice of Privacy Practices."],
                            "es": ["- Recibí la notificación informándome sobre las Prácticas de Privacidad de CVS"]
                        },
                        "messageContentForAccept": null,
                        "messageContentForDecline": null,
                        "promptForFills": "ALL"
                    },
                    "acceptDecline": null,
                    "credentials": null,
                    "rxNumInfo": [{
                        "rxNumber": 8378776,
                        "fillSeqNum": 0
                    }]
                }],
                "scripts": "Rx8378776"
            }
        }
    };
    res.json(data);
});

app.post('/service/sales/completeorder', function(req, res) {
    var data;
    data = {
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "offlineStatus": false,
            "payload": {
                "extraCare": false,
                "totalAmount": 0.36,
                "controlledDrugList": []
            }
        }
    };
    res.json(data);
});
app.post('/service/sales/completetransaction', function(req, res) {
    var data;
    data = {
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "moreInfo": "63480670898369394",
            "offlineStatus": false,
            "payload": {
                "description": "QRCode PNG Image",
                "image": "iVBORw0KGgoAAAANSUhEUgAAASwAAAEsAQAAAABRBrPYAAABWElEQVR42u3a7RXDIAhAUTdzdUbq\nBrQxgJIEmwFee04/zP1FVcC06ZvHp8FgMBhMpY1HV+ky3o8PPUZhFevxKu13eXxdR2EF+4XyCGg/\nQ31KH4X9Y0csZUzPmKOwN0xnmBX2gtnr2P3suVn1sJw+JD+rLAO7lCuySMshT1UNbIb3DGaalWcK\ngdVMbfFK5N4ehV6HlSzKFF2WsqfhDitZzrke4hlf2COLBZ1NFC6wmi3X1HKHRR1Ws1yyLOFNuyUs\nM9/0xti6Ez5kZ5imbbAokGEb5jk313mjj13bWNiFzSx7HpZEC3v5FWC3+dZTpp1VnuZfAXY777Xy\n2A6GfQC2YWv775lkHgzDKjZLFb8NYTviNcvAbtug1ym2tOM44OG2F+x2+8YLYlvgXvrBtkytb/V2\nzJc1bM9mLzEnpcA2TDV1/9HPSmuwmqX0kQ+bBFYy/mgEg8Fgf9gXbF/pF59zWYcAAAAASUVORK5C\nYII="
            }
        }
    };
    res.json(data);
});
app.post('/service/patients/fastpass', function(req, res) {
    var data;
    data = {
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "payload": [{
                "patientFillList": {
                    "patientProfileFillInfoAndSummaryRollUpInfo": [{
                        "itemStatus": {
                            "statusVal": "REQ",
                            "itemStat": "PA/RRR/GenSub/Mchoice/HCR/DCR/PCR/HDR",
                            "actionable": "N"
                        },
                        "sumRollup": 2
                    }, {
                        "rxnum": 100163,
                        "reFillNum": 0,
                        "parFillSeqNum": 0,
                        "editVerNum": 0,
                        "drugDesc": "LYRICA 25 MG CAPSULE",
                        "fillRem": 0,
                        "prescName": {
                            "firstName": "NEW",
                            "lastName": "TEST"
                        },
                        "itemStatus": {
                            "statusVal": "WB",
                            "itemStat": "Waiting bin",
                            "actionable": "Y",
                            "fillConfigCode": "WB"
                        },
                        "patPayAmt": 2.84,
                        "expeditedFillInd": "N",
                        "readyFillInd": "N",
                        "readyFillUnenrollmentInd": "N",
                        "readyFillPatientConfirmationIndicatorFirstAttempt": null,
                        "readyFillPatientConfirmationIndicatorSecondAttempt": null,
                        "partialFillInd": null,
                        "canceLRxInd": "N",
                        "soldRTSDate": null,
                        "promiseTimeCode": 2,
                        "specialtyOrderNum": null,
                        "specialtySourceId": null,
                        "specialtySourceType": null,
                        "doNotDispenseAfterDate": null,
                        "immunizationRxInd": null,
                        "cashPrescriptionIndicator": "Y",
                        "scriptSyncIndicator": "N",
                        "prePackIndicator": null,
                        "fillSeq": "1460438",
                        "totalItemsCount": null,
                        "fsaind": null,
                        "hipaanoticePrintedIndicator": "N",
                        "ssearlyPickupIndicator": null,
                        "ssunenrollmentIndicator": "N",
                        "afunenrollmentReason": null,
                        "ssalignmentFillInd": null,
                        "sspickupDateWindow": null
                    }, {
                        "rxnum": 100041,
                        "reFillNum": 0,
                        "parFillSeqNum": 0,
                        "editVerNum": 0,
                        "drugDesc": "GIAZO 1.1 GM TABLET",
                        "fillRem": 0,
                        "prescName": {
                            "firstName": "NEW",
                            "lastName": "TEST"
                        },
                        "itemStatus": {
                            "statusVal": "WB",
                            "itemStat": "Waiting bin",
                            "actionable": "Y",
                            "fillConfigCode": "WB"
                        },
                        "patPayAmt": 23.34,
                        "expeditedFillInd": "N",
                        "readyFillInd": "N",
                        "readyFillUnenrollmentInd": "N",
                        "readyFillPatientConfirmationIndicatorFirstAttempt": null,
                        "readyFillPatientConfirmationIndicatorSecondAttempt": null,
                        "partialFillInd": null,
                        "canceLRxInd": "N",
                        "soldRTSDate": null,
                        "promiseTimeCode": 2,
                        "specialtyOrderNum": null,
                        "specialtySourceId": null,
                        "specialtySourceType": null,
                        "doNotDispenseAfterDate": null,
                        "immunizationRxInd": true,
                        "cashPrescriptionIndicator": "Y",
                        "scriptSyncIndicator": "N",
                        "prePackIndicator": null,
                        "fillSeq": "1460438",
                        "totalItemsCount": null,
                        "fsaind": null,
                        "hipaanoticePrintedIndicator": "N",
                        "ssearlyPickupIndicator": null,
                        "ssunenrollmentIndicator": "N",
                        "afunenrollmentReason": null,
                        "ssalignmentFillInd": null,
                        "sspickupDateWindow": null,
                        "dispositionKey": "SLD",
                        "processed": true
                    }, {
                        "rxnum": 100200,
                        "reFillNum": 0,
                        "parFillSeqNum": 0,
                        "editVerNum": 0,
                        "drugDesc": "TENORMIN 25 MG TABLET",
                        "fillRem": 0,
                        "prescName": {
                            "firstName": "NEW",
                            "lastName": "TEST"
                        },
                        "itemStatus": {
                            "statusVal": "WB",
                            "itemStat": "Waiting bin",
                            "actionable": "Y",
                            "fillConfigCode": "WB"
                        },
                        "patPayAmt": 22.8,
                        "expeditedFillInd": "N",
                        "readyFillInd": "N",
                        "readyFillUnenrollmentInd": "N",
                        "readyFillPatientConfirmationIndicatorFirstAttempt": null,
                        "readyFillPatientConfirmationIndicatorSecondAttempt": null,
                        "partialFillInd": null,
                        "canceLRxInd": "N",
                        "soldRTSDate": null,
                        "promiseTimeCode": 2,
                        "specialtyOrderNum": null,
                        "specialtySourceId": null,
                        "specialtySourceType": null,
                        "doNotDispenseAfterDate": null,
                        "immunizationRxInd": null,
                        "cashPrescriptionIndicator": "Y",
                        "scriptSyncIndicator": "N",
                        "prePackIndicator": null,
                        "fillSeq": "1460438",
                        "totalItemsCount": null,
                        "fsaind": null,
                        "hipaanoticePrintedIndicator": "N",
                        "ssearlyPickupIndicator": null,
                        "ssunenrollmentIndicator": "N",
                        "afunenrollmentReason": null,
                        "ssalignmentFillInd": null,
                        "sspickupDateWindow": null
                    }]
                },
                "posPatientProfileTransactionInfo": {
                    "profileResult": "01",
                    "dispositionId": "1192228",
                    "respTimeStamp": "2015-08-03T13:01:44.448-04:00",
                    "posmsgHeader": {
                        "msgName": "POSPatientProfileRsp",
                        "msgID": "20150701152500429",
                        "version": 1,
                        "sourceID": "00121.00",
                        "destinationID": "RxConnect",
                        "timeStamp": 1438621304152,
                        "sendCount": 0,
                        "registerNumber": 1,
                        "screenId": 3
                    }
                },
                "patientMessageList": {
                    "patCounslMsg": [{
                        "rxNum": 100193,
                        "refilNum": 0,
                        "editVersionNum": 0,
                        "rxPatientId": "11180699230",
                        "msgSeq": "1936746",
                        "reasnCounsl": "1",
                        "pfillSeqNum": 0
                    }],
                    "rxCentrMsg": [],
                    "patDemoMsg": [],
                    "patCentricMsg": [{
                        "progType": "2",
                        "rxPatientId": 11180699230,
                        "msgSeq": "1936745"
                    }],
                    "msgCentrMsg": [],
                    "patientCareMessage": [],
                    "eanmsg": [{
                        "rxNum": 100193,
                        "refilNum": 0,
                        "editVersionNum": 0,
                        "rxPatientId": "11180699230",
                        "msgSeq": "1936749",
                        "progType": 0,
                        "cntctNum": "",
                        "rsnAcnote": "",
                        "rstPatCntct": "",
                        "commInd": true,
                        "acnoteDate": "",
                        "acnoteTime": "",
                        "employee": "",
                        "promiseDate": "",
                        "promiseTime": "",
                        "pfillSeqNum": 0
                    }, {}],
                    "srdmsg": [],
                    "pcicounslMsg": [],
                    "tpcomplianceMsg": [{
                        "rxNum": 100193,
                        "refilNum": 0,
                        "editVersionNum": 0,
                        "rxPatientId": "11180699230",
                        "msgSeq": "1936749",
                        "formsSigned": {
                            "formType": ["NIL"]
                        },
                        "formsProvided": "NIL",
                        "rltnToBenfcryReq": "N",
                        "patSigReq": "Y",
                        "prntdNameReq": "N",
                        "pfillSeqNum": 0
                    }]
                },
                "patientDetails": {
                    "rxCPatientId": 11180701009,
                    "exactMatchIndicator": true,
                    "firstName": "SIGMA",
                    "lastName": "SUPER",
                    "address": {
                        "streetAddress": "9",
                        "city": "NORTHBOROUGH",
                        "state": "MA"
                    },
                    "patientCntctInfo": {
                        "phone": {
                            "home": "3753477667",
                            "mobile": "4747657656",
                            "work": "2147535621"
                        },
                        "email": "YUYU@UYTUI.COM",
                        "prefContact": "3"
                    },
                    "birthday": "1970-07-07",
                    "promiseDate": null,
                    "promiseTime": null,
                    "topCustomerTypeCode": "null",
                    "topCustomerMessageIndicator": "Y",
                    "textMessagingEnrollmentIndicator": "NotAsked",
                    "preferredLanguageCode": "ENG",
                    "safetyCapIndicator": "Y",
                    "rpaocindicator": null,
                    "rpaoctriggerReason": null
                }
            }, {
                "patientFillList": {
                    "patientProfileFillInfoAndSummaryRollUpInfo": [{
                        "itemStatus": {
                            "statusVal": "REQ",
                            "itemStat": "PA/RRR/GenSub/Mchoice/HCR/DCR/PCR/HDR",
                            "actionable": "N"
                        },
                        "sumRollup": 2
                    }, {
                        "rxnum": 100163,
                        "reFillNum": 0,
                        "parFillSeqNum": 0,
                        "editVerNum": 0,
                        "drugDesc": "LYRICA 25 MG CAPSULE",
                        "fillRem": 0,
                        "prescName": {
                            "firstName": "NEW",
                            "lastName": "TEST"
                        },
                        "itemStatus": {
                            "statusVal": "WB",
                            "itemStat": "Waiting bin",
                            "actionable": "Y",
                            "fillConfigCode": "WB"
                        },
                        "patPayAmt": 2.84,
                        "expeditedFillInd": "N",
                        "readyFillInd": "N",
                        "readyFillUnenrollmentInd": "N",
                        "readyFillPatientConfirmationIndicatorFirstAttempt": null,
                        "readyFillPatientConfirmationIndicatorSecondAttempt": null,
                        "partialFillInd": null,
                        "canceLRxInd": "N",
                        "soldRTSDate": null,
                        "promiseTimeCode": 2,
                        "specialtyOrderNum": null,
                        "specialtySourceId": null,
                        "specialtySourceType": null,
                        "doNotDispenseAfterDate": null,
                        "immunizationRxInd": null,
                        "cashPrescriptionIndicator": "Y",
                        "scriptSyncIndicator": "N",
                        "prePackIndicator": null,
                        "fillSeq": "1460438",
                        "totalItemsCount": null,
                        "fsaind": null,
                        "hipaanoticePrintedIndicator": "N",
                        "ssearlyPickupIndicator": null,
                        "ssunenrollmentIndicator": "N",
                        "afunenrollmentReason": null,
                        "ssalignmentFillInd": null,
                        "sspickupDateWindow": null
                    }, {
                        "rxnum": 100041,
                        "reFillNum": 0,
                        "parFillSeqNum": 0,
                        "editVerNum": 0,
                        "drugDesc": "GIAZO 1.1 GM TABLET",
                        "fillRem": 0,
                        "prescName": {
                            "firstName": "NEW",
                            "lastName": "TEST"
                        },
                        "itemStatus": {
                            "statusVal": "WB",
                            "itemStat": "Waiting bin",
                            "actionable": "Y",
                            "fillConfigCode": "WB"
                        },
                        "patPayAmt": 23.34,
                        "expeditedFillInd": "N",
                        "readyFillInd": "N",
                        "readyFillUnenrollmentInd": "N",
                        "readyFillPatientConfirmationIndicatorFirstAttempt": null,
                        "readyFillPatientConfirmationIndicatorSecondAttempt": null,
                        "partialFillInd": null,
                        "canceLRxInd": "N",
                        "soldRTSDate": null,
                        "promiseTimeCode": 2,
                        "specialtyOrderNum": null,
                        "specialtySourceId": null,
                        "specialtySourceType": null,
                        "doNotDispenseAfterDate": null,
                        "immunizationRxInd": true,
                        "cashPrescriptionIndicator": "Y",
                        "scriptSyncIndicator": "N",
                        "prePackIndicator": null,
                        "fillSeq": "1460438",
                        "totalItemsCount": null,
                        "fsaind": null,
                        "hipaanoticePrintedIndicator": "N",
                        "ssearlyPickupIndicator": null,
                        "ssunenrollmentIndicator": "N",
                        "afunenrollmentReason": null,
                        "ssalignmentFillInd": null,
                        "sspickupDateWindow": null,
                        "dispositionKey": "SLD",
                        "processed": true
                    }, {
                        "rxnum": 100200,
                        "reFillNum": 0,
                        "parFillSeqNum": 0,
                        "editVerNum": 0,
                        "drugDesc": "TENORMIN 25 MG TABLET",
                        "fillRem": 0,
                        "prescName": {
                            "firstName": "NEW",
                            "lastName": "TEST"
                        },
                        "itemStatus": {
                            "statusVal": "WB",
                            "itemStat": "Waiting bin",
                            "actionable": "Y",
                            "fillConfigCode": "WB"
                        },
                        "patPayAmt": 22.8,
                        "expeditedFillInd": "N",
                        "readyFillInd": "N",
                        "readyFillUnenrollmentInd": "N",
                        "readyFillPatientConfirmationIndicatorFirstAttempt": null,
                        "readyFillPatientConfirmationIndicatorSecondAttempt": null,
                        "partialFillInd": null,
                        "canceLRxInd": "N",
                        "soldRTSDate": null,
                        "promiseTimeCode": 2,
                        "specialtyOrderNum": null,
                        "specialtySourceId": null,
                        "specialtySourceType": null,
                        "doNotDispenseAfterDate": null,
                        "immunizationRxInd": null,
                        "cashPrescriptionIndicator": "Y",
                        "scriptSyncIndicator": "N",
                        "prePackIndicator": null,
                        "fillSeq": "1460438",
                        "totalItemsCount": null,
                        "fsaind": null,
                        "hipaanoticePrintedIndicator": "N",
                        "ssearlyPickupIndicator": null,
                        "ssunenrollmentIndicator": "N",
                        "afunenrollmentReason": null,
                        "ssalignmentFillInd": null,
                        "sspickupDateWindow": null
                    }]
                },
                "posPatientProfileTransactionInfo": {
                    "profileResult": "01",
                    "dispositionId": "1192228",
                    "respTimeStamp": "2015-08-03T13:01:44.448-04:00",
                    "posmsgHeader": {
                        "msgName": "POSPatientProfileRsp",
                        "msgID": "20150701152500429",
                        "version": 1,
                        "sourceID": "00121.00",
                        "destinationID": "RxConnect",
                        "timeStamp": 1438621304152,
                        "sendCount": 0,
                        "registerNumber": 1,
                        "screenId": 3
                    }
                },
                "patientMessageList": {
                    "patCounslMsg": [{
                        "rxNum": 100193,
                        "refilNum": 0,
                        "editVersionNum": 0,
                        "rxPatientId": "11180699230",
                        "msgSeq": "1936746",
                        "reasnCounsl": "1",
                        "pfillSeqNum": 0
                    }],
                    "rxCentrMsg": [],
                    "patDemoMsg": [],
                    "patCentricMsg": [{
                        "progType": "2",
                        "rxPatientId": 11180699230,
                        "msgSeq": "1936745"
                    }],
                    "msgCentrMsg": [],
                    "patientCareMessage": [],
                    "eanmsg": [{
                        "rxNum": 100193,
                        "refilNum": 0,
                        "editVersionNum": 0,
                        "rxPatientId": "11180699230",
                        "msgSeq": "1936749",
                        "progType": 0,
                        "cntctNum": "",
                        "rsnAcnote": "",
                        "rstPatCntct": "",
                        "commInd": true,
                        "acnoteDate": "",
                        "acnoteTime": "",
                        "employee": "",
                        "promiseDate": "",
                        "promiseTime": "",
                        "pfillSeqNum": 0
                    }, {}],
                    "srdmsg": [],
                    "pcicounslMsg": [],
                    "tpcomplianceMsg": [{
                        "rxNum": 100193,
                        "refilNum": 0,
                        "editVersionNum": 0,
                        "rxPatientId": "11180699230",
                        "msgSeq": "1936749",
                        "formsSigned": {
                            "formType": ["NIL"]
                        },
                        "formsProvided": "NIL",
                        "rltnToBenfcryReq": "N",
                        "patSigReq": "Y",
                        "prntdNameReq": "N",
                        "pfillSeqNum": 0
                    }]
                },
                "patientDetails": {
                    "rxCPatientId": 11180701010,
                    "exactMatchIndicator": true,
                    "firstName": "SIGMA",
                    "lastName": "SUPER",
                    "address": {
                        "streetAddress": "9",
                        "city": "NORTHBOROUGH",
                        "state": "MA"
                    },
                    "patientCntctInfo": {
                        "phone": {
                            "home": "3753477667",
                            "mobile": "4747657656",
                            "work": "2147535621"
                        },
                        "email": "YUYU@UYTUI.COM",
                        "prefContact": "3"
                    },
                    "birthday": "1970-07-07",
                    "promiseDate": null,
                    "promiseTime": null,
                    "topCustomerTypeCode": "null",
                    "topCustomerMessageIndicator": "Y",
                    "textMessagingEnrollmentIndicator": "NotAsked",
                    "preferredLanguageCode": "ENG",
                    "safetyCapIndicator": "Y",
                    "rpaocindicator": null,
                    "rpaoctriggerReason": null
                }
            }]
        }
    }
    res.json(data);
});

app.get('/service/customers/phr/enroll-status', function(req, res) {
    console.log(req.query['patient-id']);
    res.json({
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "payload": {
                "xtracareCardNumber": "4763080247197",
                "enrollmentStatus": "N",
                "hippaExpiryDateTime": "2016-11-22T03:10:38-04:00",
                "targetIndicator": "N",
                "enrollPromptIndicator": "N",
                "couponValue": "12.95",
                "couponExpiryDateTime": "2015-11-22T03:10:38-04:00"
            }
        }
    });

});

app.get('/service/stores/login/isEmpPinValid/emp/:empId/pin/:empPin', function(req, res) {
    var employeeId = req.params.empId;
    var empPwd = req.params.empPin;
    console.log(employeeId + " " + empPwd);
    if (employeeId == "111111") {
        //Manager Test Data
        res.json({
            "StoreResponse": {
                "code": "200",
                "message": "success",
                "payload": {
                    "validToken": false,
                    "empId": "2014626",
                    "roles": "P",
                    "isValidToken": false
                }
            }
        });
    } else if (employeeId == "222222") {
        //Employee fail test data
        res.json({
            "StoreResponse": {
                "code": "403",
                "message": "failure"
            }
        });
    } else {
        //Else valid employee
        res.json({
            "StoreResponse": {
                "code": "200",
                "message": "success",
                "payload": {
                    "validToken": false,
                    "empId": "2014626",
                    "roles": "T",
                    "isValidToken": false
                }
            }
        });

    }

});

app.get('/service/stores/configs/POSBasket', function(req, res) {
    var data = fs.readFileSync(path.join(__dirname, 'testJson/basketConfig.json'), 'utf8');
    var obj = JSON.parse(data);
    res.json(obj);
});

app.get('/service/stores/configs/posMessage', function(req, res) {
    var data = fs.readFileSync(path.join(__dirname, 'testJson/posmessageconfig.json'), 'utf8');
    var obj = JSON.parse(data);
    res.json(obj);
});

app.get('/service/stores/configs/pharmacy', function(req, res) {
    var data = fs.readFileSync(path.join(__dirname, 'testJson/pharmacyInfoConfig.json'), 'utf8');
    var obj = JSON.parse(data);
    res.json(obj);
});

app.get('/service/stores/configs/POSScreen', function(req, res) {
    var data = fs.readFileSync(path.join(__dirname, 'testJson/screenConfig.json'), 'utf8');
    var obj = JSON.parse(data);
    res.json(obj);
});

app.get('/service/stores/configs/srdRules', function(req, res) {
    var data = fs.readFileSync(path.join(__dirname, 'testJson/SRDRulesConfig.json'), 'utf8');
    var obj = JSON.parse(data);
    res.json(obj);
});

app.get('/service/stores/configs/patientForms', function(req, res) {
    var data = fs.readFileSync(path.join(__dirname, 'testJson/patientFormsConfig.json'), 'utf8');
    var obj = JSON.parse(data);
    res.json(obj);
});

app.get('/service/stores/configs/actionNote', function(req, res) {
    var data = fs.readFileSync(path.join(__dirname, 'testJson/actionNoteConfig.json'), 'utf8');
    var obj = JSON.parse(data);
    res.json(obj);
});

app.post('/service/sales/transaction/', function(req, res) {
    var data = {
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "payload": {
                "description": "QRCode PNG Image",
                "image": "iVBORw0KGgoAAAANSUhEUgAAASwAAAEsAQAAAABRBrPYAAACNUlEQVR42u2aMY7EIAxFTcUxuClJ\nbsoRtkyFl//tZJXMFNtiEUWjEXlTrDHf386K/uf6kYUtbGELW1gErAuu7ZQquCWrnmXPTex7JAzf\nW8268z503C1p2/xRJKxJbgiFlBGcmgHsXKkRsbH121mOs4x9t4BExcZKRygak1wkh8SY5FJ2kYQF\nkPzJt7MwNUbhqojJ4/6qb1NjdvURkCFc+ETCG/BZs6bGBuDnNyM4m7pKjzxP0TDk9ohDOiWdQ6XL\nWDwoYq8knx6jXiW1aCC3x9HuXpJiYdh6CwieJvookEz7SJiSEUo0E/sic5NYWKdeHcYj4Z3sH/Z4\ndkxhoniQydsRPrhYY2Gd+czii7Awt5Hk0C4NhanSKyLJxyNsN6KBQD0kOgqm/Nu9Hu3ZKhTWQ2Gj\nzaE9PviJLoAiRusYCuuZ9YijCbms1J0GkTDFdpubuj0G+1nPh1gYDRXbHHOMHFPkcJjPl7yf3Tia\nsIP8FK7pMWsElEmevNmhh3wKVwgMrnhsdrrmpSZZXV6d0fSY9wIUaqFEV1ReanUszA7ybYk3a9Xh\nMV7FaHrMLNN1lpEAnPwXN1SBsG7pjSlT4bgJ+77TLWss7M5zmwbzXNM3PsdNATAfloqX2s4R4u0Y\nQ2F/1RZekcLFGfi3Uf/kGF/fXCM1awe6D2QCYpXinKy/86r07OujYJtXIrW2LvnALRhmL6poGk+T\naLrH9wB8fsxfVMEY36+oqk2GY2HrX1wWtrCFLSw+9gtzd7AEF8gAJgAAAABJRU5ErkJggg=="
            }
        }
    };
    res.json(data);
});

app.post('/service/scripts/expedite', function(req, res) {
    var data = {

        "StoreResponse": {
            "code": "200",
            "message": "success"
        }
    };

    res.json(data);
});

app.get('/service/stores/login/isEmpExist/:empId', function(req, res) {
    var employeeId = req.params.empId;
    if (employeeId == "222222") {
        res.json({
            "StoreResponse": {
                "code": "400",
                "message": "failure"
            }
        });
    } else {
        res.json({
            StoreResponse: {
                code: "200",
                message: "success",
                payload: {
                    validToken: false,
                    empId: employeeId,
                    empStatus: "exitWithPIN",
                    isValidToken: false
                }
            }
        });
    }

});

app.get('/service/stores/login/isEmpPinExist/emp/:empId/pin/:empPwd', function(req, res) {
    var employeeId = req.params.empId;
    var employeePwd = req.params.empPwd;
    if (employeeId == "333333") {
        res.json({
            "StoreResponse": {
                "code": "400",
                "message": "failure"
            }
        });
    } else {
        res.json({
            StoreResponse: {
                code: "200",
                message: "success",
                payload: {
                    validToken: true,
                    empId: employeeId,
                    roles: "T",
                    token: "4e9dd795-9325-4d32-b428-ad48d0902446",
                    isValidToken: true
                }
            }
        });
    }

});

app.get('/service/bsl/transaction-start', function(req, res) {
    res.json({
        StoreResponse: {
            code: "200",
            message: "success",
            payload: {
                transactionId: 70,
                transactionNumber: 32,
                offline: false
            }
        }
    });
});

app.post('/service/devices/printer/PHR_enrollment/', function(req, res) {
    var data = {
        "StoreResponse": {
            "code": "200",
            "message": "success"
        }
    };
    res.json(data);
});

app.get('/service/stores/employees', function(req, res) {
    res.json({
        StoreResponse: {
            code: "200",
            message: "success",
            payload: [{
                "empId": "1000",
                "roles": "Admin",
                "extracareCard": "1000000",
                "pin": "1000",
                "tokenNum": "917e4551-b4aa-4b37-a0c2-6c2afee73406",
                "tokenGenStmp": 1439761418000,
                "createUserStmp": "USER",
                "updateUserStmp": "USER",
                "updateTokenStmp": 1439761595000,
                "initials": "MR",
                "firstName": "FIRST",
                "lastName": "LAST"
            }, {
                "empId": "1001",
                "roles": "Admin",
                "extracareCard": "10000001",
                "pin": "1001",
                "tokenNum": "917e4551-b4aa-4b37-a0c2-6c2afee73406",
                "tokenGenStmp": 1439761418000,
                "createUserStmp": "USER",
                "updateUserStmp": "USER",
                "updateTokenStmp": 1439761595000,
                "initials": "MR",
                "firstName": "SECOND",
                "lastName": "LAST"
            }]

        }
    });
});

app.delete('/service/stores/employees/:employee_id', function(req, res) {
    console.log(req.params.employee_id);
    var data = {
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "payload": "Employee <1001> deleted successfully"
        }
    }
    res.json(data);
});

app.get('/service/bsl/fastpass/transaction/01', function(req, res) {
    res.json({
        "StoreResponse": {
            "code": "200",
            "message": "Success",
            "payload": {
                "transactionID": "qwewreww87987hsdsdnoi28476sdn",
                "fastPassID": "12345678",
                "pickupCode": "12345",
                "extraCareID": "2433352",
                "patientList": [{
                    "id": "11180691601",
                    "firstName": "TEST",
                    "lastName": "ONE",
                    "dateOfBirth": "01/09/1980",
                    "relationship": "Cousin",
                    "phoneNumber": null,
                    "address": "54 King Street",
                    "zipCode": null,
                    "city": "Woonsocket",
                    "state": "RI"
                }, {
                    "id": "11180691210",
                    "firstName": "PATIENT",
                    "lastName": "TWO",
                    "dateOfBirth": "01/09/1980",
                    "relationship": "Wife",
                    "phoneNumber": null,
                    "address": "54 King Street",
                    "zipCode": null,
                    "city": "Woonsocket",
                    "state": "RI"
                }]
            }
        }
    });
});

app.get('/service/patients/profiles', function(req, res) {
    res.json({
            "StoreResponse": {
                "code": "0000",
                "message": "success",
                "payload": {
                    "patientProfileList": [{
                        "patientProfileTransactionInfo": {
                            "posMsgHeader": {
                                "msgName": "POSPatientProfileRsp",
                                "msgID": "20151017160256886",
                                "version": 1,
                                "sourceID": "68630.12",
                                "destinationID": "RxConnect",
                                "timeStamp": 1445112179449,
                                "sendCount": 0,
                                "registerNumber": 12,
                                "screenId": 2
                            },
                            "profileResult": "01",
                            "dispositionId": "760643",
                            "respTimeStamp": 1445112178395
                        },
                        "summaryRollUpInfoType": null,
                        "patientFillInfoList": [{
                            "rxnum": 100001,
                            "reFillNum": 0,
                            "parFillSeqNum": 0,
                            "editVerNum": 0,
                            "drugDesc": "EXCEDRIN EXTRA STRENGTH CAPLET",
                            "fillRem": 0,
                            "prescName": {
                                "firstName": "DEVPROVIDER",
                                "lastName": "TESTER"
                            },
                            "itemStatus": {
                                "statusVal": "WB",
                                "itemStat": "Waiting bin",
                                "actionable": "Y",
                                "fillConfigCode": "WB",
                                "unScannedRxStatus": false,
                                "disposition": null,
                                "dispositionKey": null
                            },
                            "patPayAmt": 1.93,
                            "expeditedFillInd": "N",
                            "readyFillInd": "N",
                            "readyFillUnenrollmentInd": "N",
                            "readyFillPatientConfirmationIndicatorFirstAttempt": null,
                            "readyFillPatientConfirmationIndicatorSecondAttempt": null,
                            "partialFillInd": null,
                            "canceLRxInd": "N",
                            "soldRTSDate": null,
                            "promiseTimeCode": 2,
                            "specialtyOrderNum": null,
                            "specialtySourceId": null,
                            "specialtySourceType": null,
                            "fsaInd": null,
                            "doNotDispenseAfterDate": null,
                            "immunizationRxInd": null,
                            "hipaaNoticePrintedIndicator": "Y",
                            "cashPrescriptionIndicator": "Y",
                            "scriptSyncIndicator": null,
                            "ssUnenrollmentIndicator": null,
                            "afUnenrollmentReason": null,
                            "ssAlignmentFillInd": null,
                            "prePackIndicator": null,
                            "ssEarlyPickupIndicator": null,
                            "ssPickupDateWindow": null,
                            "rxExpiredIndicator": "N",
                            "readyFillEnrollmentStatus": null,
                            "nextPickUpDate": null,
                            "priorityRankIndicator": null,
                            "promisedDateAndTime": null,
                            "scriptSyncEnrollmentDate": null,
                            "readyFillEnrollmentDate": null,
                            "notInWaitingBinExclusionInd": null,
                            "fillSeq": "984669",
                            "totalItemsCount": null,
                            "combo": {
                                "indicatorsFromRxC": false,
                                "patSigReq": false,
                                "prntdNameReq": false,
                                "promiseTimeCode": 0,
                                "isBeingEdited": false,
                                "beingEdited": false
                            },
                            "fillDisposition": {
                                "dispositionKey": null,
                                "disposition": null,
                                "taxCollected": null,
                                "userId": null,
                                "lineVoidedLater": null,
                                "modifiedPrice": null,
                                "fillLevel": null,
                                "locationOfRx": null,
                                "voidedTransactionNumber": null,
                                "priceSource": null
                            }
                        }],
                        "patientDetails": {
                            "rxCPatientId": 11180691210,
                            "exactMatchIndicator": true,
                            "firstName": "DEV",
                            "lastName": "TESTTWO",
                            "address": {
                                "streetAddress": "123 CVS DR",
                                "city": "FRAMINGHAM",
                                "state": "MA"
                            },
                            "birthday": "2010-10-10",
                            "topCustomerTypeCode": "null",
                            "topCustomerMessageIndicator": "Y",
                            "textMessagingEnrollmentIndicator": "NotAsked",
                            "preferredLanguageCode": "ENG",
                            "safetyCapIndicator": "Y"
                        },
                        "patientMessageInfo": {
                            "eanMsg": [],
                            "patCounslMsg": [{
                                "disposition": null,
                                "mandatory": null,
                                "notDisplayedReason": null,
                                "timestamp": null,
                                "messageType": 4,
                                "rxNum": 100001,
                                "refilNum": 0,
                                "pFillSeqNum": 0,
                                "editVersionNum": 0,
                                "rxPatientId": "11180691210",
                                "msgSeq": "1070786",
                                "messageConfig": null,
                                "markDisplayed": false,
                                "reasnCounsl": "1",
                                "progType": "1"
                            }],
                            "srdMsg": [],
                            "rxCentrMsg": [],
                            "patDemoMsg": [{
                                "disposition": null,
                                "mandatory": null,
                                "notDisplayedReason": null,
                                "timestamp": null,
                                "messageType": 7,
                                "rxNum": null,
                                "refilNum": 0,
                                "pFillSeqNum": 0,
                                "editVersionNum": 0,
                                "rxPatientId": "11180691210",
                                "msgSeq": "1070787",
                                "messageConfig": null,
                                "markDisplayed": false,
                                "contactPreference": null,
                                "email": null,
                                "workPhone": null,
                                "homePhone": null,
                                "mobilePhone": null,
                                "smsEnrolled": null,
                                "outcome": null,
                                "progType": "1"
                            }],
                            "patCentricMsg": [],
                            "msgCentrMsg": [],
                            "pciCounslMsg": [],
                            "tpComplianceMsg": [],
                            "patientCareMessage": []
                        }
                    }, {
                        "patientProfileTransactionInfo": {
                            "posMsgHeader": {
                                "msgName": "POSPatientProfileRsp",
                                "msgID": "20151017160256886",
                                "version": 1,
                                "sourceID": "68630.12",
                                "destinationID": "RxConnect",
                                "timeStamp": 1445112179449,
                                "sendCount": 0,
                                "registerNumber": 12,
                                "screenId": 2
                            },
                            "profileResult": "01",
                            "dispositionId": "760644",
                            "respTimeStamp": 1445112178634
                        },
                        "summaryRollUpInfoType": null,
                        "patientFillInfoList": [{
                            "rxnum": 100004,
                            "reFillNum": 0,
                            "parFillSeqNum": 0,
                            "editVerNum": 0,
                            "drugDesc": "BAND-AID BUTTERFLY CLOSURE",
                            "fillRem": 1,
                            "prescName": {
                                "firstName": "CHRIS",
                                "lastName": "BRIAN"
                            },
                            "itemStatus": {
                                "statusVal": "QP",
                                "itemStat": "Print Ready",
                                "actionable": "Y",
                                "fillConfigCode": "PR",
                                "unScannedRxStatus": false,
                                "disposition": null,
                                "dispositionKey": null
                            },
                            "patPayAmt": 0.12,
                            "expeditedFillInd": "N",
                            "readyFillInd": "N",
                            "readyFillUnenrollmentInd": "N",
                            "readyFillPatientConfirmationIndicatorFirstAttempt": null,
                            "readyFillPatientConfirmationIndicatorSecondAttempt": null,
                            "partialFillInd": null,
                            "canceLRxInd": "N",
                            "soldRTSDate": null,
                            "promiseTimeCode": 2,
                            "specialtyOrderNum": null,
                            "specialtySourceId": null,
                            "specialtySourceType": null,
                            "fsaInd": null,
                            "doNotDispenseAfterDate": null,
                            "immunizationRxInd": null,
                            "hipaaNoticePrintedIndicator": "Y",
                            "cashPrescriptionIndicator": "Y",
                            "scriptSyncIndicator": null,
                            "ssUnenrollmentIndicator": null,
                            "afUnenrollmentReason": null,
                            "ssAlignmentFillInd": null,
                            "prePackIndicator": null,
                            "ssEarlyPickupIndicator": null,
                            "ssPickupDateWindow": null,
                            "rxExpiredIndicator": null,
                            "readyFillEnrollmentStatus": null,
                            "nextPickUpDate": null,
                            "priorityRankIndicator": null,
                            "promisedDateAndTime": null,
                            "scriptSyncEnrollmentDate": null,
                            "readyFillEnrollmentDate": null,
                            "notInWaitingBinExclusionInd": null,
                            "fillSeq": "984670",
                            "totalItemsCount": null,
                            "combo": {
                                "indicatorsFromRxC": false,
                                "patSigReq": false,
                                "prntdNameReq": false,
                                "promiseTimeCode": 0,
                                "isBeingEdited": false,
                                "beingEdited": false
                            },
                            "fillDisposition": {
                                "dispositionKey": null,
                                "disposition": null,
                                "taxCollected": null,
                                "userId": null,
                                "lineVoidedLater": null,
                                "modifiedPrice": null,
                                "fillLevel": null,
                                "locationOfRx": null,
                                "voidedTransactionNumber": null,
                                "priceSource": null
                            }
                        }],
                        "patientDetails": {
                            "rxCPatientId": 11180691603,
                            "exactMatchIndicator": true,
                            "firstName": "DEEP",
                            "lastName": "TEST",
                            "address": {
                                "streetAddress": "SFD",
                                "city": "SCHENECTADY",
                                "state": "NY"
                            },
                            "birthday": "1987-12-10",
                            "topCustomerTypeCode": "null",
                            "topCustomerMessageIndicator": "Y",
                            "textMessagingEnrollmentIndicator": "NotAsked",
                            "preferredLanguageCode": "ENG",
                            "safetyCapIndicator": "Y"
                        },
                        "patientMessageInfo": {
                            "eanMsg": [],
                            "patCounslMsg": [{
                                "disposition": null,
                                "mandatory": null,
                                "notDisplayedReason": null,
                                "timestamp": null,
                                "messageType": 4,
                                "rxNum": 100004,
                                "refilNum": 0,
                                "pFillSeqNum": 0,
                                "editVersionNum": 0,
                                "rxPatientId": "11180691603",
                                "msgSeq": "1070789",
                                "messageConfig": null,
                                "markDisplayed": false,
                                "reasnCounsl": "1",
                                "progType": "1"
                            }],
                            "srdMsg": [],
                            "rxCentrMsg": [],
                            "patDemoMsg": [{
                                "disposition": null,
                                "mandatory": null,
                                "notDisplayedReason": null,
                                "timestamp": null,
                                "messageType": 7,
                                "rxNum": null,
                                "refilNum": 0,
                                "pFillSeqNum": 0,
                                "editVersionNum": 0,
                                "rxPatientId": "11180691603",
                                "msgSeq": "1070790",
                                "messageConfig": null,
                                "markDisplayed": false,
                                "contactPreference": null,
                                "email": null,
                                "workPhone": null,
                                "homePhone": null,
                                "mobilePhone": null,
                                "smsEnrolled": null,
                                "outcome": null,
                                "progType": "1"
                            }],
                            "patCentricMsg": [],
                            "msgCentrMsg": [],
                            "pciCounslMsg": [],
                            "tpComplianceMsg": [],
                            "patientCareMessage": []
                        }
                    }],
                    "failedPatientList": null
                }
            }
        }

    );
});

app.get('/service/stores/attributes/store_number', function(req, res) {
    var data = {
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "payload": {
                "name": "store_number",
                "value": "68630",
                "description": "store number",
                "createdUser": "system",
                "updatedUser": "system",
                "createdTimsStamp": 1442267875000,
                "updatedTimsStamp": 1442267875000
            }
        }
    };
    //setInterval(function(){
    //    if(!res.headersSent)
    res.json(data);
    //}, 20000);
});

app.get('/service/stores/attributes/pse_rph_id_req', function(req, res) {
    res.json({
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "payload": {
                "name": "pse_rph_id_req",
                "value": "N",
                "description": "store number",
                "createdUser": "system",
                "updatedUser": "system",
                "createdTimsStamp": 1442267875000,
                "updatedTimsStamp": 1442267875000
            }
        }
    });
});

app.get('/service/stores/attributes/pse_emp_tracking', function(req, res) {
    res.json({
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "payload": {
                "name": "pse_emp_tracking",
                "value": "N",
                "description": "store number",
                "createdUser": "system",
                "updatedUser": "system",
                "createdTimsStamp": 1442267875000,
                "updatedTimsStamp": 1442267875000
            }
        }
    });
});

app.get('/service/customers/phr/enroll-status', function(req, res) {
    res.json({
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "offlineStatus": false,
            "payload": {
                "points": {
                    "points": []
                },
                "coupons": {
                    "coupons": []
                },
                "xtracareCardNumber": "4872000002263",
                "enrollmentStatus": "E",
                "hippaExpiryDateTime": "12/22/2016",
                "targetIndicator": "N"
            }
        }
    });
});

app.get('/service/stores/attributes/ninety_day_payment_terminal_confirmation', function(req, res) {
    res.json({
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "offlineStatus": false,
            "payload": {
                "name": "ninety_day_payment_terminal_confirmation",
                "value": "Y",
                "createdUser": "SYSTEM",
                "updatedUser": "BLADEBATCH",
                "createdTimsStamp": 1464114993000,
                "updatedTimsStamp": 1464114993000
            }
        }
    });
});
app.get('/service/stores/attributes/srdId_scan_allowed', function(req, res) {
    res.json({
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "offlineStatus": false,
            "payload": {
                "name": "srdId_scan_allowed",
                "value": "N",
                "createdUser": "BLADEBATCH",
                "updatedUser": "BLADEBATCH",
                "createdTimsStamp": 1455966157000,
                "updatedTimsStamp": 1465327055000,
                "effectiveDate": 1452574800000
            }
        }
    });
});

app.get('/service/stores/attributes/pse_block_refund', function(req, res) {
    res.json({
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "payload": {
                "name": "pse_block_refund",
                "value": "Y",
                "description": "store number",
                "createdUser": "system",
                "updatedUser": "system",
                "createdTimsStamp": 1442267875000,
                "updatedTimsStamp": 1442267875000
            }
        }
    });
});

app.post('/service/devices/printers/CVS_Survey', function(req, res) {
    res.json({
        "StoreResponse": {
            "offlineStatus": false
        }
    });
});

app.get('/service/bsl/rxconnect/facility', function(req, res) {
    res.json({
        "StoreResponse": {
            "code": "200",
            "message": "success",
            "offlineStatus": false,
            "payload": {
                "responseCode": "200",
                "pseReturnCode": null,
                "message": "success",
                "messageId": null,
                "externalFaultCode": null,
                "externalFaultMessaage": null,
                "offline": false,
                "pharmacyClosed": false
            }
        }
    });
});




app.post('/service/devices/printers/Esig_Refuse', function(req, res) {
    res.json({
        "StoreResponse": {
            "code": "200",
            "message": "success"
        }
    });
});
app.post('/service/stores/esig/esig-compression', function(req, res) {
    res.json({
        storeResponse: {
            code: "200",
            message: "success",
            payload: {
                base64TIFFEsig: " kj;hdfasdkfnasdfnapsdfanspdsfsafasdfsdfasmdnm9phmdsafmsdoppohdiasofasdpofasdofsjmsdofjasmdfasdfsoadmfasjdfasfsdf "
            }
        }
    });

});

app.post('/service/sales/billpayauth/preauth', function(req, res) {
    res.json({
        "storeResponse": {
            "code": "200",
            "message": "success",
            "offlineStatus": false,
            "payload": {
                "responseCode": "0000",
                "message": "SUCCESS",
                "statusCode": "000",
                "billPayRes": "\u0000\u0000\u0000w6863020161011155836312210000KS026863007387391000000000686300075015583510110100079936620554 216371681500100004=4912K"
            }
        }
    });

});
app.post('/service/sales/billpay/generateqrcode', function(req, res) {
    res.json({
        "storeResponse": {
            "code": "200",
            "message": "success",
            "offlineStatus": false,
            "payload": {
                "description": "QRCode PNG Image",
                "image": "iVBORw0KGgoAAAANSUhEUgAAASwAAAEsAQAAAABRBrPYAAACFUlEQVR42u2aQXLDIAxF8crH8E2N\nfVOO0CUrVOl/2U4cp9MtGphMh5iXRUH8LylJ8p/xkwY2sIENbGARsJZsZClrSlNddn1J0bf2dI6F\n2bysc8lVnyu82Af1rS9Fwoo/TLoVIjWt/GDiJBqGh2XCnuS6bHNYTJd0vs3CCM8SEuNB6ybg3P++\nC11jEC4999vrUd+6xnzUNJl8yYYT3795Vs8YDzq9qFaz06crhcJ0SeN5p+3qBKpltzsc1ijO4HVb\ndLXZ1VY1u1/n3rFTmVc7ffUj0+q9Wlq1xcL472e6km6OCdbiXhwLu40dAY8gt5iPhB0hbVG9QbIa\nhPrDdgNgiGdTLb3UVg44cA/yAJiF9IRDh+eaMW1Pd6F3TKBRNKNMyRLPlm+e1T0GwGr26n+tWv8o\neSJgyCXkxYwsEh7ykP4xXOHVw/t7kPePNXguqleYEdtNMKMUC0MqhTifBYkxc8jylHH1jvkR78JV\nq4BO7YqEWYIB4Zq8KHhLOWJhPHSb0IyyXN2nUJjXOzAjZFDINzzsw2G80eY+KNi9uHsr2ENgZLy4\nY2KMzsytWdo7xqFX2Iu76gBrn0jY0SxlgwKZFbx4/RSu3jE0wDOdCEHe2Gu6bUgEjGn/chR3V5Cn\nkNh8FXfJW/3vBXsg7DSjsw4Kh/kXVfia1VKLZg1hVnmxsEO4Xs0Ihvusb/1i4ycuAxvYwAYWH/sF\nWKkV9fm1z80AAAAASUVORK5CYII=",
                "qrdata": "CVS11196863016120716301270017993662055410112Bill Pay Ite0000222212799366205541019111"
            }
        }
    })
});
app.post('/service/sales/billpay/confirmtxn', function(req, res) {
    res.json({
        "storeResponse": {
            "code": "500",
            "message": "success",
            "offlineStatus": false,
            "payload": {
                "statusCode": "C97",
                "refundStatus": "Y",
                "surveyId": "13925396919768990"
            }
        }
    })
});
app.post('/service/sales/billpay/refundtxn', function(req, res) {
    res.json({
        "storeResponse": {
            "code": "200",
            "message": "success",
            "offlineStatus": false,
            "payload": {
                "statusCode": "C97",
                "refundStatus": "Y",
                "surveyId": "13925396919768990",
                "description": "QRCode PNG Image",
                "image": "iVBORw0KGgoAAAANSUhEUgAAASwAAAEsAQAAAABRBrPYAAACFUlEQVR42u2aQXLDIAxF8crH8E2N\nfVOO0CUrVOl/2U4cp9MtGphMh5iXRUH8LylJ8p/xkwY2sIENbGARsJZsZClrSlNddn1J0bf2dI6F\n2bysc8lVnyu82Af1rS9Fwoo/TLoVIjWt/GDiJBqGh2XCnuS6bHNYTJd0vs3CCM8SEuNB6ybg3P++\nC11jEC4999vrUd+6xnzUNJl8yYYT3795Vs8YDzq9qFaz06crhcJ0SeN5p+3qBKpltzsc1ijO4HVb\ndLXZ1VY1u1/n3rFTmVc7ffUj0+q9Wlq1xcL472e6km6OCdbiXhwLu40dAY8gt5iPhB0hbVG9QbIa\nhPrDdgNgiGdTLb3UVg44cA/yAJiF9IRDh+eaMW1Pd6F3TKBRNKNMyRLPlm+e1T0GwGr26n+tWv8o\neSJgyCXkxYwsEh7ykP4xXOHVw/t7kPePNXguqleYEdtNMKMUC0MqhTifBYkxc8jylHH1jvkR78JV\nq4BO7YqEWYIB4Zq8KHhLOWJhPHSb0IyyXN2nUJjXOzAjZFDINzzsw2G80eY+KNi9uHsr2ENgZLy4\nY2KMzsytWdo7xqFX2Iu76gBrn0jY0SxlgwKZFbx4/RSu3jE0wDOdCEHe2Gu6bUgEjGn/chR3V5Cn\nkNh8FXfJW/3vBXsg7DSjsw4Kh/kXVfia1VKLZg1hVnmxsEO4Xs0Ihvusb/1i4ycuAxvYwAYWH/sF\nWKkV9fm1z80AAAAASUVORK5CYII=",
                "qrdata": "CVS11196863016120716301270017993662055410112Bill Pay Ite0000222212799366205541019111"
            }
        }
    })
})

app.listen(3000, function() {
    console.log('SERVER STARTED on 3000');
});
