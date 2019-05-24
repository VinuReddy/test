
// specs

describe('DUR-Mandatory/Forced/Prescriber-approved Controller', function() {
    var scope, controller, mockBasketService, deferred, mockDialogService;
    var mandatoryForcedStub = [{ "type": "PatCounslMsg", "disposition": null, "mandatory": null, "notDisplayedReason": null, "timestamp": null, "messageType": 4, "rxNum": 101062, "refillNum": 0, "partialFillSeqNum": 0, "editVersionNum": 0, "rxPatientId": "10000000312", "msgSeq": "2062030", "messageConfig": { "type": "Configtype", "msgInd": "Y", "msgRank": 0, "displayOrder": 1, "promptIndicator": null, "usrEntryTool": null, "scrButton": null, "msgType": "4", "progType": "4", "progSubType": null, "talkingPoints": "Comments to Communicate to Patient", "configInfo": { "1": { "dispTitle": "DUR Mandatory Counsel", "descTxt": "Notify the pharmacist that this patient has unresolved DUR Mandatory Counsel / Pharmacist Forced Counsel.</br>Please respect the PRIVACY of the patient. Do not share sensitive information in a public area.", "intrTxt": null, "lnItmButton": { "lineInstructions": null, "button1": null, "button2": null, "button3": { "id": 11, "value": "Void" }, "button4": { "id": "10", "value": "Continue" } } }, "2": { "dispTitle": null, "descTxt": null, "intrTxt": null, "lnItmButton": { "lineInstructions": null, "button1": { "id": 4, "value": "Add to Return to Stock Report" }, "button2": { "id": 3, "value": "Continue Without Selling" }, "button3": { "id": 1, "value": "Counseled: Credential and Shell" }, "button4": null } }, "3": { "dispTitle": null, "descTxt": "Notify the pharmacist that this patient has unresolved DUR Mandatory Counsel / Pharmacist Forced Counsel.</br>Please respect the PRIVACY of the patient. Do not share sensitive information in a public area.", "intrTxt": null, "lnItmButton": { "lineInstructions": null, "button1": null, "button2": null, "button3": null, "button4": null } }, "4": { "dispTitle": null, "descTxt": null, "intrTxt": null, "lnItmButton": { "lineInstructions": null, "button1": null, "button2": null, "button3": null, "button4": null } } } }, "markDisplayed": false, "patientFillInfo": { "rxNum": 101062, "refillNum": 0, "partialFillSeqNum": 0, "editVersionNum": 0, "drugDesc": "MARPLAN ZINC COATED 10 MG TABLET", "fillRem": 3, "prescName": { "firstName": "PRESCRIBER", "lastName": "ADD TATAGIRI" }, "itemStatus": { "statusVal": "WB", "itemStat": "Waiting bin", "actionable": "Y", "fillConfigCode": "WB", "unScannedRxStatus": false, "disposition": null, "dispositionKey": null }, "patPayAmt": 173.99, "expeditedFillInd": "N", "readyFillInd": "N", "readyFillEsigInd": "N", "readyFillUnenrollmentInd": "N", "readyFillPatientConfirmationIndicatorFirstAttempt": null, "readyFillPatientConfirmationIndicatorSecondAttempt": null, "partialFillInd": null, "canceLRxInd": "N", "soldRTSDate": null, "promiseTimeCode": 2, "specialtyOrderNum": null, "specialtySourceId": null, "specialtySourceType": null, "fsaInd": null, "doNotDispenseAfterDate": null, "immunizationRxInd": null, "hipaaNoticePrintedIndicator": "N", "cashPrescriptionIndicator": "Y", "scriptSyncIndicator": "Y", "ssUnenrollmentIndicator": "N", "afUnenrollmentReason": null, "ssAlignmentFillInd": null, "prePackIndicator": null, "ssEarlyPickupIndicator": null, "ssPickupDateWindow": null, "rxExpiredIndicator": null, "readyFillEnrollmentStatus": "NeverAsked", "nextPickUpDate": null, "priorityRankIndicator": null, "promisedDateAndTime": null, "scriptSyncEnrollmentDate": null, "readyFillEnrollmentDate": null, "notInWaitingBinExclusionInd": "N", "fillSeq": "1548862", "totalItemsCount": null, "actionNote": null, "patientCounselInd": null, "pharmacyCounselInd": null, "patientCareCounselInd": null, "hipaaPrivacy": null, "nonSafetyCap": null, "couponEligibleInd": null, "topCustomerTypeCode": null, "topCustomerMessageIndicator": null, "stateCode": null, "patientCaptureIndicator": null, "patientLanguage": null, "patientID": 10000000312, "sequence": 100, "aBNUnassignedInd": "N", "ninetyDayLastFillPrice": 12, "ninetyDayPrice": 7, "ninetyDaySavings": 1, "rxCPayer": "1", "tPBCConsultRxProgramSrNo": null, "tPBCConsultPOSMessageSrNo": null, "drugSchedule": null, "immunizationDisplayInd": false, "combo": { "indicatorsFromRxC": false, "patSigReq": false, "prntdNameReq": false, "promiseTimeCode": 0, "isBeingEdited": false, "readyFillConfSig": false, "beingEdited": false }, "fillDisposition": { "dispositionKey": "SLD", "disposition": "1", "taxCollected": 0, "userId": "333", "lineVoidedLater": "N", "modifiedPrice": null, "fillLevel": "N", "locationOfRx": "WB", "voidedTransactionNumber": null, "priceSource": "B", "barcode": "270101062000000000017399", "priceModify": false, "scanInd": "Y", "returnReason": null, "posOverrideUserId": null, "posOverrideTimestamp": null }, "abnunassignedInd": "N" }, "consolidatedCounseling": false, "shownByProxy": false, "reasnCounsl": "4", "specialtyOrderNum": null, "progType": "4", "outcome": null, "rphinitials": null, "navigateIndicator": null, "pageText": "Page 1 of 1", "comments": "DUR Mandatory counsel Comments captured in QV. Comment is the maximum length allowed (240) characters AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCCDDDDDDDDDDDDEEEEEEEEEEEEEEEEFFFFFF ----     END COMMENT", "counselByPharmName": "ATEST", "counselDateTime": 1483465265927, "dURWarningList": { "durWarning": [{ "durWarningDetails": [{ "durWarningNumber": "1", "durTitle": "Duplicate Therapy", "durDesc": "LIPITOR 10 MG TABLET" }, { "durWarningNumber": "2", "durTitle": "High Dose", "durDesc": "Total daily dose 30 mg recommended, daily does 20 mg" }, { "durWarningNumber": "3", "durTitle": "Pediatric Patient", "durDesc": "Sev Level 3 warning COUNSEL ADOLESCENT FEMALES ON APPROPRIATE AAAAAA BBBBB CCCCC DDDDD" }] }] }, "pharmaNameForDisposition": null, "rphInitials": null, "displayTimeStamp": null, "dispositionTimeStamp": null, "continueButtonStatus": 1, "counselOptionChosenTimeAtPos": null, "counselProgramDisplayTimeAtPos": null, "pharmNameCounselAtPos": null, "pharmCredentialCounselAtPos": null, "pharmCredentialTimeAtPos": null, "empId": null }, { "type": "PatCounslMsg", "disposition": null, "mandatory": null, "notDisplayedReason": null, "timestamp": null, "messageType": 4, "rxNum": 101062, "refillNum": 0, "partialFillSeqNum": 0, "editVersionNum": 0, "rxPatientId": "10000000312", "msgSeq": "2062029", "messageConfig": { "type": "Configtype", "msgInd": "Y", "msgRank": 0, "displayOrder": 1, "promptIndicator": null, "usrEntryTool": null, "scrButton": null, "msgType": "4", "progType": "5", "progSubType": null, "talkingPoints": "Forced Counsel Notes", "configInfo": { "1": { "dispTitle": "Pharmacist Forced Counsel", "descTxt": "Notify the pharmacist that this patient has unresolved DUR Mandatory Counsel / Pharmacist Forced Counsel.</br>Please respect the PRIVACY of the patient. Do not share sensitive information in a public area.", "intrTxt": null, "lnItmButton": { "lineInstructions": null, "button1": null, "button2": null, "button3": { "id": 11, "value": "Void" }, "button4": { "id": "10", "value": "Continue" } } }, "2": { "dispTitle": null, "descTxt": null, "intrTxt": null, "lnItmButton": { "lineInstructions": null, "button1": { "id": 4, "value": "Add to Return to Stock Report" }, "button2": { "id": 3, "value": "Continue Without Selling" }, "button3": { "id": 1, "value": "Counseled: Credential and Shell" }, "button4": null } }, "3": { "dispTitle": null, "descTxt": "Notify the pharmacist that this patient has unresolved DUR Mandatory Counsel / Pharmacist Forced Counsel.</br>Please respect the PRIVACY of the patient. Do not share sensitive information in a public area.", "intrTxt": null, "lnItmButton": { "lineInstructions": null, "button1": null, "button2": null, "button3": null, "button4": null } }, "4": { "dispTitle": null, "descTxt": null, "intrTxt": null, "lnItmButton": { "lineInstructions": null, "button1": null, "button2": null, "button3": null, "button4": null } } } }, "markDisplayed": false, "patientFillInfo": { "rxNum": 101062, "refillNum": 0, "partialFillSeqNum": 0, "editVersionNum": 0, "drugDesc": "MARPLAN ZINC COATED 10 MG TABLET", "fillRem": 3, "prescName": { "firstName": "PRESCRIBER", "lastName": "ADD TATAGIRI" }, "itemStatus": { "statusVal": "WB", "itemStat": "Waiting bin", "actionable": "Y", "fillConfigCode": "WB", "unScannedRxStatus": false, "disposition": null, "dispositionKey": null }, "patPayAmt": 173.99, "expeditedFillInd": "N", "readyFillInd": "N", "readyFillEsigInd": "N", "readyFillUnenrollmentInd": "N", "readyFillPatientConfirmationIndicatorFirstAttempt": null, "readyFillPatientConfirmationIndicatorSecondAttempt": null, "partialFillInd": null, "canceLRxInd": "N", "soldRTSDate": null, "promiseTimeCode": 2, "specialtyOrderNum": null, "specialtySourceId": null, "specialtySourceType": null, "fsaInd": null, "doNotDispenseAfterDate": null, "immunizationRxInd": null, "hipaaNoticePrintedIndicator": "N", "cashPrescriptionIndicator": "Y", "scriptSyncIndicator": "Y", "ssUnenrollmentIndicator": "N", "afUnenrollmentReason": null, "ssAlignmentFillInd": null, "prePackIndicator": null, "ssEarlyPickupIndicator": null, "ssPickupDateWindow": null, "rxExpiredIndicator": null, "readyFillEnrollmentStatus": "NeverAsked", "nextPickUpDate": null, "priorityRankIndicator": null, "promisedDateAndTime": null, "scriptSyncEnrollmentDate": null, "readyFillEnrollmentDate": null, "notInWaitingBinExclusionInd": "N", "fillSeq": "1548862", "totalItemsCount": null, "actionNote": null, "patientCounselInd": null, "pharmacyCounselInd": null, "patientCareCounselInd": null, "hipaaPrivacy": null, "nonSafetyCap": null, "couponEligibleInd": null, "topCustomerTypeCode": null, "topCustomerMessageIndicator": null, "stateCode": null, "patientCaptureIndicator": null, "patientLanguage": null, "patientID": 10000000312, "sequence": 100, "aBNUnassignedInd": "N", "ninetyDayLastFillPrice": 12, "ninetyDayPrice": 7, "ninetyDaySavings": 1, "rxCPayer": "1", "tPBCConsultRxProgramSrNo": null, "tPBCConsultPOSMessageSrNo": null, "drugSchedule": null, "immunizationDisplayInd": false, "combo": { "indicatorsFromRxC": false, "patSigReq": false, "prntdNameReq": false, "promiseTimeCode": 0, "isBeingEdited": false, "readyFillConfSig": false, "beingEdited": false }, "fillDisposition": { "dispositionKey": "SLD", "disposition": "1", "taxCollected": 0, "userId": "333", "lineVoidedLater": "N", "modifiedPrice": null, "fillLevel": "N", "locationOfRx": "WB", "voidedTransactionNumber": null, "priceSource": "B", "barcode": "270101062000000000017399", "priceModify": false, "scanInd": "Y", "returnReason": null, "posOverrideUserId": null, "posOverrideTimestamp": null }, "abnunassignedInd": "N" }, "consolidatedCounseling": false, "shownByProxy": false, "reasnCounsl": "5", "specialtyOrderNum": null, "progType": "5", "outcome": null, "rphinitials": null, "navigateIndicator": null, "pageText": "Page 1 of 1", "comments": "Forced counsel Comments captured in QV. Comment is the maximum length allowed (240) characters AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDDDDDEEEEEEEEEEEEEEEEFFFFFF ----     END COMMENT", "counselByPharmName": "ATEST", "counselDateTime": 1483724465927, "dURWarningList": null, "pharmaNameForDisposition": null, "rphInitials": null, "displayTimeStamp": null, "dispositionTimeStamp": null, "continueButtonStatus": 1, "counselOptionChosenTimeAtPos": null, "counselProgramDisplayTimeAtPos": null, "pharmNameCounselAtPos": null, "pharmCredentialCounselAtPos": null, "pharmCredentialTimeAtPos": null, "empId": null }];
    var mandatorystub = [{ "type": "PatCounslMsg", "disposition": null, "mandatory": null, "notDisplayedReason": null, "timestamp": null, "messageType": 4, "rxNum": 101062, "refillNum": 0, "partialFillSeqNum": 0, "editVersionNum": 0, "rxPatientId": "10000000312", "msgSeq": "2062030", "messageConfig": { "type": "Configtype", "msgInd": "Y", "msgRank": 0, "displayOrder": 1, "promptIndicator": null, "usrEntryTool": null, "scrButton": null, "msgType": "4", "progType": "4", "progSubType": null, "talkingPoints": "Comments to Communicate to Patient", "configInfo": { "1": { "dispTitle": "DUR Mandatory Counsel", "descTxt": "Notify the pharmacist that this patient has unresolved DUR Mandatory Counsel / Pharmacist Forced Counsel.</br>Please respect the PRIVACY of the patient. Do not share sensitive information in a public area.", "intrTxt": null, "lnItmButton": { "lineInstructions": null, "button1": null, "button2": null, "button3": { "id": 11, "value": "Void" }, "button4": { "id": "10", "value": "Continue" } } }, "2": { "dispTitle": null, "descTxt": null, "intrTxt": null, "lnItmButton": { "lineInstructions": null, "button1": { "id": 4, "value": "Add to Return to Stock Report" }, "button2": { "id": 3, "value": "Continue Without Selling" }, "button3": { "id": 1, "value": "Counseled: Credential and Shell" }, "button4": null } }, "3": { "dispTitle": null, "descTxt": "Notify the pharmacist that this patient has unresolved DUR Mandatory Counsel / Pharmacist Forced Counsel.</br>Please respect the PRIVACY of the patient. Do not share sensitive information in a public area.", "intrTxt": null, "lnItmButton": { "lineInstructions": null, "button1": null, "button2": null, "button3": null, "button4": null } }, "4": { "dispTitle": null, "descTxt": null, "intrTxt": null, "lnItmButton": { "lineInstructions": null, "button1": null, "button2": null, "button3": null, "button4": null } } } }, "markDisplayed": false, "patientFillInfo": { "rxNum": 101062, "refillNum": 0, "partialFillSeqNum": 0, "editVersionNum": 0, "drugDesc": "MARPLAN ZINC COATED 10 MG TABLET", "fillRem": 3, "prescName": { "firstName": "PRESCRIBER", "lastName": "ADD TATAGIRI" }, "itemStatus": { "statusVal": "WB", "itemStat": "Waiting bin", "actionable": "Y", "fillConfigCode": "WB", "unScannedRxStatus": false, "disposition": null, "dispositionKey": null }, "patPayAmt": 173.99, "expeditedFillInd": "N", "readyFillInd": "N", "readyFillEsigInd": "N", "readyFillUnenrollmentInd": "N", "readyFillPatientConfirmationIndicatorFirstAttempt": null, "readyFillPatientConfirmationIndicatorSecondAttempt": null, "partialFillInd": null, "canceLRxInd": "N", "soldRTSDate": null, "promiseTimeCode": 2, "specialtyOrderNum": null, "specialtySourceId": null, "specialtySourceType": null, "fsaInd": null, "doNotDispenseAfterDate": null, "immunizationRxInd": null, "hipaaNoticePrintedIndicator": "N", "cashPrescriptionIndicator": "Y", "scriptSyncIndicator": "Y", "ssUnenrollmentIndicator": "N", "afUnenrollmentReason": null, "ssAlignmentFillInd": null, "prePackIndicator": null, "ssEarlyPickupIndicator": null, "ssPickupDateWindow": null, "rxExpiredIndicator": null, "readyFillEnrollmentStatus": "NeverAsked", "nextPickUpDate": null, "priorityRankIndicator": null, "promisedDateAndTime": null, "scriptSyncEnrollmentDate": null, "readyFillEnrollmentDate": null, "notInWaitingBinExclusionInd": "N", "fillSeq": "1548862", "totalItemsCount": null, "actionNote": null, "patientCounselInd": null, "pharmacyCounselInd": null, "patientCareCounselInd": null, "hipaaPrivacy": null, "nonSafetyCap": null, "couponEligibleInd": null, "topCustomerTypeCode": null, "topCustomerMessageIndicator": null, "stateCode": null, "patientCaptureIndicator": null, "patientLanguage": null, "patientID": 10000000312, "sequence": 100, "aBNUnassignedInd": "N", "ninetyDayLastFillPrice": 12, "ninetyDayPrice": 7, "ninetyDaySavings": 1, "rxCPayer": "1", "tPBCConsultRxProgramSrNo": null, "tPBCConsultPOSMessageSrNo": null, "drugSchedule": null, "immunizationDisplayInd": false, "combo": { "indicatorsFromRxC": false, "patSigReq": false, "prntdNameReq": false, "promiseTimeCode": 0, "isBeingEdited": false, "readyFillConfSig": false, "beingEdited": false }, "fillDisposition": { "dispositionKey": "SLD", "disposition": "1", "taxCollected": 0, "userId": "333", "lineVoidedLater": "N", "modifiedPrice": null, "fillLevel": "N", "locationOfRx": "WB", "voidedTransactionNumber": null, "priceSource": "B", "barcode": "270101062000000000017399", "priceModify": false, "scanInd": "Y", "returnReason": null, "posOverrideUserId": null, "posOverrideTimestamp": null }, "abnunassignedInd": "N" }, "consolidatedCounseling": false, "shownByProxy": false, "reasnCounsl": "4", "specialtyOrderNum": null, "progType": "4", "outcome": null, "rphinitials": null, "navigateIndicator": null, "pageText": "Page 1 of 1", "comments": "DUR Mandatory counsel Comments captured in QV. Comment is the maximum length allowed (240) characters AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCCDDDDDDDDDDDDEEEEEEEEEEEEEEEEFFFFFF ----     END COMMENT", "counselByPharmName": "ATEST", "counselDateTime": 1483465265927, "dURWarningList": { "durWarning": [{ "durWarningDetails": [{ "durWarningNumber": "1", "durTitle": "Duplicate Therapy", "durDesc": "LIPITOR 10 MG TABLET" }, { "durWarningNumber": "2", "durTitle": "High Dose", "durDesc": "Total daily dose 30 mg recommended, daily does 20 mg" }, { "durWarningNumber": "3", "durTitle": "Pediatric Patient", "durDesc": "Sev Level 3 warning COUNSEL ADOLESCENT FEMALES ON APPROPRIATE AAAAAA BBBBB CCCCC DDDDD" }] }] }, "pharmaNameForDisposition": null, "rphInitials": null, "displayTimeStamp": null, "dispositionTimeStamp": null, "continueButtonStatus": 1, "counselOptionChosenTimeAtPos": null, "counselProgramDisplayTimeAtPos": null, "pharmNameCounselAtPos": null, "pharmCredentialCounselAtPos": null, "pharmCredentialTimeAtPos": null, "empId": null }];
    var forcedStub = [{ "type": "PatCounslMsg", "disposition": null, "mandatory": null, "notDisplayedReason": null, "timestamp": null, "messageType": 4, "rxNum": 101062, "refillNum": 0, "partialFillSeqNum": 0, "editVersionNum": 0, "rxPatientId": "10000000312", "msgSeq": "2062029", "messageConfig": { "type": "Configtype", "msgInd": "Y", "msgRank": 0, "displayOrder": 1, "promptIndicator": null, "usrEntryTool": null, "scrButton": null, "msgType": "4", "progType": "5", "progSubType": null, "talkingPoints": "Forced Counsel Notes", "configInfo": { "1": { "dispTitle": "Pharmacist Forced Counsel", "descTxt": "Notify the pharmacist that this patient has unresolved DUR Mandatory Counsel / Pharmacist Forced Counsel.</br>Please respect the PRIVACY of the patient. Do not share sensitive information in a public area.", "intrTxt": null, "lnItmButton": { "lineInstructions": null, "button1": null, "button2": null, "button3": { "id": 11, "value": "Void" }, "button4": { "id": "10", "value": "Continue" } } }, "2": { "dispTitle": null, "descTxt": null, "intrTxt": null, "lnItmButton": { "lineInstructions": null, "button1": { "id": 4, "value": "Add to Return to Stock Report" }, "button2": { "id": 3, "value": "Continue Without Selling" }, "button3": { "id": 1, "value": "Counseled: Credential and Shell" }, "button4": null } }, "3": { "dispTitle": null, "descTxt": "Notify the pharmacist that this patient has unresolved DUR Mandatory Counsel / Pharmacist Forced Counsel.</br>Please respect the PRIVACY of the patient. Do not share sensitive information in a public area.", "intrTxt": null, "lnItmButton": { "lineInstructions": null, "button1": null, "button2": null, "button3": null, "button4": null } }, "4": { "dispTitle": null, "descTxt": null, "intrTxt": null, "lnItmButton": { "lineInstructions": null, "button1": null, "button2": null, "button3": null, "button4": null } } } }, "markDisplayed": false, "patientFillInfo": { "rxNum": 101062, "refillNum": 0, "partialFillSeqNum": 0, "editVersionNum": 0, "drugDesc": "MARPLAN ZINC COATED 10 MG TABLET", "fillRem": 3, "prescName": { "firstName": "PRESCRIBER", "lastName": "ADD TATAGIRI" }, "itemStatus": { "statusVal": "WB", "itemStat": "Waiting bin", "actionable": "Y", "fillConfigCode": "WB", "unScannedRxStatus": false, "disposition": null, "dispositionKey": null }, "patPayAmt": 173.99, "expeditedFillInd": "N", "readyFillInd": "N", "readyFillEsigInd": "N", "readyFillUnenrollmentInd": "N", "readyFillPatientConfirmationIndicatorFirstAttempt": null, "readyFillPatientConfirmationIndicatorSecondAttempt": null, "partialFillInd": null, "canceLRxInd": "N", "soldRTSDate": null, "promiseTimeCode": 2, "specialtyOrderNum": null, "specialtySourceId": null, "specialtySourceType": null, "fsaInd": null, "doNotDispenseAfterDate": null, "immunizationRxInd": null, "hipaaNoticePrintedIndicator": "N", "cashPrescriptionIndicator": "Y", "scriptSyncIndicator": "Y", "ssUnenrollmentIndicator": "N", "afUnenrollmentReason": null, "ssAlignmentFillInd": null, "prePackIndicator": null, "ssEarlyPickupIndicator": null, "ssPickupDateWindow": null, "rxExpiredIndicator": null, "readyFillEnrollmentStatus": "NeverAsked", "nextPickUpDate": null, "priorityRankIndicator": null, "promisedDateAndTime": null, "scriptSyncEnrollmentDate": null, "readyFillEnrollmentDate": null, "notInWaitingBinExclusionInd": "N", "fillSeq": "1548862", "totalItemsCount": null, "actionNote": null, "patientCounselInd": null, "pharmacyCounselInd": null, "patientCareCounselInd": null, "hipaaPrivacy": null, "nonSafetyCap": null, "couponEligibleInd": null, "topCustomerTypeCode": null, "topCustomerMessageIndicator": null, "stateCode": null, "patientCaptureIndicator": null, "patientLanguage": null, "patientID": 10000000312, "sequence": 100, "aBNUnassignedInd": "N", "ninetyDayLastFillPrice": 12, "ninetyDayPrice": 7, "ninetyDaySavings": 1, "rxCPayer": "1", "tPBCConsultRxProgramSrNo": null, "tPBCConsultPOSMessageSrNo": null, "drugSchedule": null, "immunizationDisplayInd": false, "combo": { "indicatorsFromRxC": false, "patSigReq": false, "prntdNameReq": false, "promiseTimeCode": 0, "isBeingEdited": false, "readyFillConfSig": false, "beingEdited": false }, "fillDisposition": { "dispositionKey": "SLD", "disposition": "1", "taxCollected": 0, "userId": "333", "lineVoidedLater": "N", "modifiedPrice": null, "fillLevel": "N", "locationOfRx": "WB", "voidedTransactionNumber": null, "priceSource": "B", "barcode": "270101062000000000017399", "priceModify": false, "scanInd": "Y", "returnReason": null, "posOverrideUserId": null, "posOverrideTimestamp": null }, "abnunassignedInd": "N" }, "consolidatedCounseling": false, "shownByProxy": false, "reasnCounsl": "5", "specialtyOrderNum": null, "progType": "5", "outcome": null, "rphinitials": null, "navigateIndicator": null, "pageText": "Page 1 of 1", "comments": "Forced counsel Comments captured in QV. Comment is the maximum length allowed (240) characters AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDDDDDEEEEEEEEEEEEEEEEFFFFFF ----     END COMMENT", "counselByPharmName": "ATEST", "counselDateTime": 1483724465927, "dURWarningList": null, "pharmaNameForDisposition": null, "rphInitials": null, "displayTimeStamp": null, "dispositionTimeStamp": null, "continueButtonStatus": 1, "counselOptionChosenTimeAtPos": null, "counselProgramDisplayTimeAtPos": null, "pharmNameCounselAtPos": null, "pharmCredentialCounselAtPos": null, "pharmCredentialTimeAtPos": null, "empId": null }];
    var prescriberApprovedStub = [{"type":"PatCounslMsg","disposition":null,"mandatory":null,"notDisplayedReason":null,"timestamp":null,"messageType":4,"rxNum":101062,"refillNum":0,"partialFillSeqNum":0,"editVersionNum":0,"rxPatientId":"10000000312","msgSeq":"2062029","messageConfig":{"type":"Configtype","msgInd":"Y","msgRank":0,"displayOrder":1,"promptIndicator":null,"usrEntryTool":null,"scrButton":null,"msgType":"4","progType":"5","progSubType":null,"talkingPoints":"Forced Counsel Notes","configInfo":{"1":{"dispTitle":"Pharmacist Forced Counsel","descTxt":"Notify the pharmacist that this patient has unresolved DUR Mandatory Counsel / Pharmacist Forced Counsel.</br>Please respect the PRIVACY of the patient. Do not share sensitive information in a public area.","intrTxt":null,"lnItmButton":{"lineInstructions":null,"button1":null,"button2":null,"button3":{"id":11,"value":"Void"},"button4":{"id":"10","value":"Continue"}}},"2":{"dispTitle":null,"descTxt":null,"intrTxt":null,"lnItmButton":{"lineInstructions":null,"button1":{"id":4,"value":"Add to Return to Stock Report"},"button2":{"id":3,"value":"Continue Without Selling"},"button3":{"id":1,"value":"Counseled: Credential and Shell"},"button4":null}},"3":{"dispTitle":null,"descTxt":"Notify the pharmacist that this patient has unresolved DUR Mandatory Counsel / Pharmacist Forced Counsel.</br>Please respect the PRIVACY of the patient. Do not share sensitive information in a public area.","intrTxt":null,"lnItmButton":{"lineInstructions":null,"button1":null,"button2":null,"button3":null,"button4":null}},"4":{"dispTitle":null,"descTxt":null,"intrTxt":null,"lnItmButton":{"lineInstructions":null,"button1":null,"button2":null,"button3":null,"button4":null}}}},"markDisplayed":false,"patientFillInfo":{"rxNum":101062,"refillNum":0,"partialFillSeqNum":0,"editVersionNum":0,"drugDesc":"MARPLAN ZINC COATED 10 MG TABLET","fillRem":3,"prescName":{"firstName":"PRESCRIBER","lastName":"ADD TATAGIRI"},"itemStatus":{"statusVal":"WB","itemStat":"Waiting bin","actionable":"Y","fillConfigCode":"WB","unScannedRxStatus":false,"disposition":null,"dispositionKey":null},"patPayAmt":173.99,"expeditedFillInd":"N","readyFillInd":"N","readyFillEsigInd":"N","readyFillUnenrollmentInd":"N","readyFillPatientConfirmationIndicatorFirstAttempt":null,"readyFillPatientConfirmationIndicatorSecondAttempt":null,"partialFillInd":null,"canceLRxInd":"N","soldRTSDate":null,"promiseTimeCode":2,"specialtyOrderNum":null,"specialtySourceId":null,"specialtySourceType":null,"fsaInd":null,"doNotDispenseAfterDate":null,"immunizationRxInd":null,"hipaaNoticePrintedIndicator":"N","cashPrescriptionIndicator":"Y","scriptSyncIndicator":"Y","ssUnenrollmentIndicator":"N","afUnenrollmentReason":null,"ssAlignmentFillInd":null,"prePackIndicator":null,"ssEarlyPickupIndicator":null,"ssPickupDateWindow":null,"rxExpiredIndicator":null,"readyFillEnrollmentStatus":"NeverAsked","nextPickUpDate":null,"priorityRankIndicator":null,"promisedDateAndTime":null,"scriptSyncEnrollmentDate":null,"readyFillEnrollmentDate":null,"notInWaitingBinExclusionInd":"N","fillSeq":"1548862","totalItemsCount":null,"actionNote":null,"patientCounselInd":null,"pharmacyCounselInd":null,"patientCareCounselInd":null,"hipaaPrivacy":null,"nonSafetyCap":null,"couponEligibleInd":null,"topCustomerTypeCode":null,"topCustomerMessageIndicator":null,"stateCode":null,"patientCaptureIndicator":null,"patientLanguage":null,"patientID":10000000312,"sequence":100,"aBNUnassignedInd":"N","ninetyDayLastFillPrice":12,"ninetyDayPrice":7,"ninetyDaySavings":1,"rxCPayer":"1","tPBCConsultRxProgramSrNo":null,"tPBCConsultPOSMessageSrNo":null,"drugSchedule":null,"immunizationDisplayInd":false,"combo":{"indicatorsFromRxC":false,"patSigReq":false,"prntdNameReq":false,"promiseTimeCode":0,"isBeingEdited":false,"readyFillConfSig":false,"beingEdited":false},"fillDisposition":{"dispositionKey":"SLD","disposition":"1","taxCollected":0,"userId":"333","lineVoidedLater":"N","modifiedPrice":null,"fillLevel":"N","locationOfRx":"WB","voidedTransactionNumber":null,"priceSource":"B","barcode":"270101062000000000017399","priceModify":false,"scanInd":"Y","returnReason":null,"posOverrideUserId":null,"posOverrideTimestamp":null},"abnunassignedInd":"N"},"consolidatedCounseling":false,"shownByProxy":false,"reasnCounsl":"3","specialtyOrderNum":null,"progType":"3","outcome":null,"rphinitials":null,"navigateIndicator":null,"pageText":"Page 1 of 1","comments":"Forced counsel Comments captured in QV. Comment is the maximum length allowed (240) characters AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDDDDDEEEEEEEEEEEEEEEEFFFFFF ----     END COMMENT","counselByPharmName":"ATEST","counselDateTime":1483724465927,"dURWarningList":null,"pharmaNameForDisposition":null,"rphInitials":null,"displayTimeStamp":null,"dispositionTimeStamp":null,"continueButtonStatus":1,"counselOptionChosenTimeAtPos":null,"counselProgramDisplayTimeAtPos":null,"pharmNameCounselAtPos":null,"pharmCredentialCounselAtPos":null,"pharmCredentialTimeAtPos":null,"empId":null}];
    var basketData = { "10000000312": { "patientProfileTransactionInfo": { "posMsgHeader": { "msgName": "POSPatientProfileRsp", "msgID": "20160225054105msgID", "version": 1, "sourceID": "68561.99", "destinationID": "RxConnect", "timeStamp": 1456422065632, "sendCount": 0, "registerNumber": 99, "screenId": 3 }, "profileResult": "01", "dispositionId": "1280230", "respTimeStamp": 1456422065927 }, "summaryRollUpInfoType": null, "patientFillInfoList": [{ "rxNum": 101062, "refillNum": 0, "partialFillSeqNum": 0, "editVersionNum": 0, "drugDesc": "MARPLAN ZINC COATED 10 MG TABLET", "fillRem": 3, "prescName": { "firstName": "PRESCRIBER", "lastName": "ADD TATAGIRI" }, "itemStatus": { "statusVal": "WB", "itemStat": "Waiting bin", "actionable": "Y", "fillConfigCode": "WB", "unScannedRxStatus": false, "disposition": null, "dispositionKey": null }, "patPayAmt": 173.99, "expeditedFillInd": "N", "readyFillInd": "N", "readyFillEsigInd": "N", "readyFillUnenrollmentInd": "N", "readyFillPatientConfirmationIndicatorFirstAttempt": null, "readyFillPatientConfirmationIndicatorSecondAttempt": null, "partialFillInd": null, "canceLRxInd": "N", "soldRTSDate": null, "promiseTimeCode": 2, "specialtyOrderNum": null, "specialtySourceId": null, "specialtySourceType": null, "fsaInd": null, "doNotDispenseAfterDate": null, "immunizationRxInd": null, "hipaaNoticePrintedIndicator": "N", "cashPrescriptionIndicator": "Y", "scriptSyncIndicator": "Y", "ssUnenrollmentIndicator": "N", "afUnenrollmentReason": null, "ssAlignmentFillInd": null, "prePackIndicator": null, "ssEarlyPickupIndicator": null, "ssPickupDateWindow": null, "rxExpiredIndicator": null, "readyFillEnrollmentStatus": "NeverAsked", "nextPickUpDate": null, "priorityRankIndicator": null, "promisedDateAndTime": null, "scriptSyncEnrollmentDate": null, "readyFillEnrollmentDate": null, "notInWaitingBinExclusionInd": "N", "fillSeq": "1548862", "totalItemsCount": null, "actionNote": null, "patientCounselInd": null, "pharmacyCounselInd": null, "patientCareCounselInd": null, "hipaaPrivacy": null, "nonSafetyCap": null, "couponEligibleInd": null, "topCustomerTypeCode": null, "topCustomerMessageIndicator": null, "stateCode": null, "patientCaptureIndicator": null, "patientLanguage": null, "patientID": 0, "sequence": 100, "aBNUnassignedInd": "N", "ninetyDayLastFillPrice": 12, "ninetyDayPrice": 7, "ninetyDaySavings": 1, "rxCPayer": "1", "tPBCConsultRxProgramSrNo": null, "tPBCConsultPOSMessageSrNo": null, "drugSchedule": null, "immunizationDisplayInd": false, "combo": { "indicatorsFromRxC": false, "patSigReq": false, "prntdNameReq": false, "promiseTimeCode": 0, "isBeingEdited": false, "readyFillConfSig": false, "beingEdited": false }, "fillDisposition": { "dispositionKey": null, "disposition": null, "taxCollected": null, "userId": null, "lineVoidedLater": null, "modifiedPrice": null, "fillLevel": null, "locationOfRx": null, "voidedTransactionNumber": null, "priceSource": null, "barcode": null, "priceModify": false, "scanInd": null, "returnReason": null, "posOverrideUserId": null, "posOverrideTimestamp": null }, "abnunassignedInd": "N" }], "patientDetails": { "rxCPatientId": 10000000312, "exactMatchIndicator": true, "firstName": "HARRY", "lastName": "BOYLES", "address": { "streetAddress": "1 CVS DRIVE", "city": "WOONSOCKET", "state": "RI", "zip": null }, "patientCntctInfo": { "phone": { "home": "4017704621", "mobile": null, "work": null }, "email": null, "prefContact": "1" }, "birthday": "1998-01-01", "topCustomerTypeCode": "null", "topCustomerMessageIndicator": "Y", "textMessagingEnrollmentIndicator": "NotAsked", "preferredLanguageCode": "ENG", "safetyCapIndicator": "Y", "pediatricIndicator": "N" }, "patientMessageInfo": { "eanMsg": [], "patCounslMsg": [{ "type": "PatCounslMsg", "disposition": null, "mandatory": null, "notDisplayedReason": null, "timestamp": null, "messageType": 4, "rxNum": 101062, "refillNum": 0, "partialFillSeqNum": 0, "editVersionNum": 0, "rxPatientId": "10000000312", "msgSeq": "2062029", "messageConfig": null, "markDisplayed": false, "patientFillInfo": null, "consolidatedCounseling": false, "shownByProxy": false, "reasnCounsl": "5", "specialtyOrderNum": null, "progType": "5", "outcome": null, "rphinitials": null, "navigateIndicator": null, "pageText": null, "comments": "Forced counsel Comments captured in QV. Comment is the maximum length allowed (240) characters AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDDDDDEEEEEEEEEEEEEEEEFFFFFF ----     END COMMENT", "counselByPharmName": "ATEST", "counselDateTime": 1483724465927, "dURWarningList": null, "pharmaNameForDisposition": null, "rphInitials": null, "displayTimeStamp": null, "dispositionTimeStamp": null, "continueButtonStatus": 0, "counselOptionChosenTimeAtPos": null, "counselProgramDisplayTimeAtPos": null, "pharmNameCounselAtPos": null, "pharmCredentialCounselAtPos": null, "pharmCredentialTimeAtPos": null, "empId": null }, { "type": "PatCounslMsg", "disposition": null, "mandatory": null, "notDisplayedReason": null, "timestamp": null, "messageType": 4, "rxNum": 101062, "refillNum": 0, "partialFillSeqNum": 0, "editVersionNum": 0, "rxPatientId": "10000000312", "msgSeq": "2062030", "messageConfig": null, "markDisplayed": false, "patientFillInfo": null, "consolidatedCounseling": false, "shownByProxy": false, "reasnCounsl": "4", "specialtyOrderNum": null, "progType": "4", "outcome": null, "rphinitials": null, "navigateIndicator": null, "pageText": null, "comments": "DUR Mandatory counsel Comments captured in QV. Comment is the maximum length allowed (240) characters AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCCDDDDDDDDDDDDEEEEEEEEEEEEEEEEFFFFFF ----     END COMMENT", "counselByPharmName": "ATEST", "counselDateTime": 1483465265927, "dURWarningList": { "durWarning": [{ "durWarningDetails": [{ "durWarningNumber": "1", "durTitle": "Duplicate Therapy", "durDesc": "LIPITOR 10 MG TABLET" }, { "durWarningNumber": "2", "durTitle": "High Dose", "durDesc": "Total daily dose 30 mg recommended, daily does 20 mg" }, { "durWarningNumber": "3", "durTitle": "Pediatric Patient", "durDesc": "Sev Level 3 warning COUNSEL ADOLESCENT FEMALES ON APPROPRIATE AAAAAA BBBBB CCCCC DDDDD" }] }] }, "pharmaNameForDisposition": null, "rphInitials": null, "displayTimeStamp": null, "dispositionTimeStamp": null, "continueButtonStatus": 0, "counselOptionChosenTimeAtPos": null, "counselProgramDisplayTimeAtPos": null, "pharmNameCounselAtPos": null, "pharmCredentialCounselAtPos": null, "pharmCredentialTimeAtPos": null, "empId": null }], "srdMsg": [], "rxCentrMsg": [], "patDemoMsg": [], "patCentricMsg": [], "msgCentrMsg": [], "pciCounslMsg": [], "tpComplianceMsg": [], "patientCareMessage": [], "offerToCounselMsg": [] } } }

    mockBasketService = {
        updateFillDisposition: function() {
            return true
        }
    }

    mockDialogService = {
        showDialog: function() {
            return true;
        }
    }

    LOGGER = {
        info: function(a, b) {
            return true;
        },
        error: function(a, b) {
            return true;
        },
        debug: function(a, b) {
            return true;
        }
    }

    beforeEach(function() {
        module('weCarePlusApp');
    });

    beforeEach(function() {
        module(function($provide) {
            $provide.value('BasketService', mockBasketService);
            $provide.value('DialogService', mockDialogService);
        });
    });

    beforeEach(inject(function($q, $rootScope, $controller, _BasketService_, _DialogService_, _$timeout_, _$httpBackend_, _$location_) {
        scope = $rootScope.$new();
        BasketService = _BasketService_;
        DialogService = _DialogService_;
        $timeout = _$timeout_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        deferred = $q.defer();

        spyOn(DialogService, 'showDialog').and.callFake(function(args) {
            return deferred.promise;
        });

        scope.CONFIG = {
            pageTitle: 'Page title'
        }
        $httpBackend.when('GET', /.*.html$/).respond('');
        scope.basketData = basketData;
        controller = $controller('DURMandatoryCtrl', {
            '$scope': scope
        });
    }));

    afterAll(function() {
        scope = null;
        controller = null;
        basketData = null;
        mandatoryForcedStub = null;
        mockBasketService = null;
        mockDialogService = null;
        deferred = null;
    });

    describe('When DUR Mandatory and Forced message is available', function() {
        it('the messageType should be updated to mandatoryForced', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.constructWarnings = function() {
                return true
            }
            scope.init();
            expect(scope.messageType).toBe('mandatoryForced');
        });
    });

    describe('When DUR Prescriber-approved is available', function() {
        it('the messageType should be updated to prescApproved', function() {
            scope.patientMessageList = prescriberApprovedStub;
            scope.constructWarnings = function() {
                return true
            }
            scope.init();
            expect(scope.messageType).toBe('prescApproved');
        });
    });

    describe('When DUR Mandatory and Forced message is available', function() {
        it('it should display the description text', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.constructWarnings = function() {
                return true
            }
            scope.init();
            expect(scope.descriptionText).not.toBe(undefined);
        });
    });

    describe('When DUR Mandatory and Forced message is available', function() {
        it('it update the screenView accordingly', function() {
            var mandatoryForcedScreenView = {
                dispositionLineButtons: true,
                forcedCounselComments: true,
                prescriberComments: true,
                durWarnings: true,
                gridValue: 'col-md-6',
                commentsHeight: 'dur-comments-half'
            }
            scope.patientMessageList = mandatoryForcedStub;
            scope.constructWarnings = function() {
                return true
            }
            scope.init();
            expect(scope.screenView).toEqual(mandatoryForcedScreenView);
        });
    });

    describe('When DUR Mandatory and Forced message is available', function() {
        it('it should call constructWarnings, constructPrescriberComments and constructForcedCounselComments with patientMessage', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.constructWarnings = function() {
                return true
            }
            spyOn(scope, 'constructWarnings');
            scope.constructPrescriberComments = function() {
                return true
            }
            spyOn(scope, 'constructPrescriberComments');
            scope.constructForcedCounselComments = function() {
                return true
            }
            spyOn(scope, 'constructForcedCounselComments');
            scope.init();
            expect(scope.constructWarnings).toHaveBeenCalled();
            expect(scope.constructPrescriberComments).toHaveBeenCalled();
            expect(scope.constructForcedCounselComments).toHaveBeenCalled();
        });
    });

    describe('When DUR Mandatory message is available', function() {
        it('the messageType should be updated to mandatory', function() {
            scope.patientMessageList = mandatorystub;
            scope.init();
            expect(scope.messageType).toBe('mandatory');
        });
    });

    describe('When DUR Mandatory message is available', function() {
        it('it should display the description text', function() {
            scope.patientMessageList = mandatorystub;
            scope.init();
            expect(scope.descriptionText).not.toBe(undefined);
        });
    });

    describe('When DUR Mandatory message is available', function() {
        it('it update the screenView accordingly', function() {
            var mandatoryView = {
                dispositionLineButtons: true,
                forcedCounselComments: false,
                prescriberComments: true,
                durWarnings: true,
                gridValue: 'col-md-6',
                commentsHeight: 'dur-comments-full'
            }
            scope.patientMessageList = mandatorystub;
            scope.init();
            expect(scope.screenView).toEqual(mandatoryView);
        });
    });

    describe('When DUR Mandatory message is available', function() {
        it('it should call constructWarnings and constructPrescriberComments with patientMessage', function() {
            scope.patientMessageList = mandatorystub;
            scope.constructWarnings = function() {
                return true
            }
            spyOn(scope, 'constructWarnings');
            scope.constructPrescriberComments = function() {
                return true
            }
            spyOn(scope, 'constructPrescriberComments');
            scope.init();
            expect(scope.constructWarnings).toHaveBeenCalled();
            expect(scope.constructPrescriberComments).toHaveBeenCalled();
        });
    });

    describe('When DUR Forced message is available', function() {
        it('the messageType should be updated to forced', function() {
            scope.patientMessageList = forcedStub;
            scope.init();
            expect(scope.messageType).toBe('forced');
        });
    });

    describe('When DUR Forced message is available', function() {
        it('it should display the description text', function() {
            scope.patientMessageList = forcedStub;
            scope.init();
            expect(scope.descriptionText).not.toBe(undefined);
        });
    });

    describe('When DUR Forced message is available', function() {
        it('it update the screenView accordingly', function() {
            var forcedView = {
                dispositionLineButtons: true,
                forcedCounselComments: true,
                prescriberComments: false,
                durWarnings: false,
                gridValue: 'col-md-12',
                commentsHeight: 'dur-comments-full'
            }
            scope.patientMessageList = forcedStub;
            scope.init();
            expect(scope.screenView).toEqual(forcedView);
        });
    });

    describe('When DUR Forced message is available', function() {
        it('it should call constructForcedCounselComments with patientMessage', function() {
            scope.patientMessageList = forcedStub;
            scope.constructForcedCounselComments = function() {
                return true
            }
            spyOn(scope, 'constructForcedCounselComments');
            scope.init();
            expect(scope.constructForcedCounselComments).toHaveBeenCalled();
        });
    });

    describe('When init method is executed', function() {
        it('it should call isContinueActive and isNavigationActive methods', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.isContinueActive = function() {
                return true
            }
            spyOn(scope, 'isContinueActive');
            scope.isNavigationActive = function() {
                return true
            }
            spyOn(scope, 'isNavigationActive');
            scope.init();
            expect(scope.isContinueActive).toHaveBeenCalled();
            expect(scope.isNavigationActive).toHaveBeenCalled();
        });
    });

    describe('When init method is executed', function() {
        it('it should update the disposition of counselProgramDisplayTimeAtPos attribute', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.init();
            scope.patientMessageList.map(function(patientMessage) {
                expect(patientMessage.counselProgramDisplayTimeAtPos).not.toBe(null);
            });
        });
    });

    describe('When the disposition is not selected', function() {
        it('next button should be disabled', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.init();
            scope.dispositionConfig.outcome = null;
            scope.isNavigationActive();
            expect(scope.navigationInfo.next.state).toBe('');
        });
    });

    describe('When the disposition is selected', function() {
        it('next button should be enabled', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.init();
            scope.dispositionConfig.outcome = 'SLD';
            scope.isNavigationActive();
            expect(scope.navigationInfo.next.state).toBe('active');
        });
    });

    describe('When the constructWarnings is executed', function() {
        it('it should update the DUR warnings', function() {
            scope.constructWarnings(mandatoryForcedStub[0]);
            expect(scope.durWarnings).not.toBe(undefined);
        });
    });

    describe('When the constructPrescriberComments is executed', function() {
        it('it should update the prescriberComments', function() {
            scope.constructPrescriberComments(mandatoryForcedStub[0]);
            expect(scope.prescriberComments).not.toBe(undefined);
        });
    });

    describe('When the constructForcedCounselComments is executed', function() {
        it('it should update the forcedCounselComments', function() {
            scope.constructForcedCounselComments(mandatoryForcedStub[0]);
            expect(scope.forcedCounselComments).not.toBe(undefined);
        });
    });

    describe('When the users selects a disposition', function() {
        it('it should update the patientMessage outcome and counselOptionChosenTimeAtPos', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.init();
            scope.updateDisposition(1);
            scope.patientMessageList.map(function(patientMessage) {
                expect(patientMessage.outcome).toBe(1);
                expect(patientMessage.counselOptionChosenTimeAtPos).not.toBe(null);
            })
        });
    });

    describe('When the users selects a disposition', function() {
        it('it should call BasketService updateFillDisposition method', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.init();
            spyOn(BasketService, 'updateFillDisposition');
            scope.updateDisposition(1);
            expect(BasketService.updateFillDisposition).toHaveBeenCalled();
        });
    });

    describe('When the users selects a disposition', function() {
        it('it should call isContinueActive and isNavigationActive methods', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.isContinueActive = function() {
                return true
            }
            spyOn(scope, 'isContinueActive');
            scope.isNavigationActive = function() {
                return true
            }
            spyOn(scope, 'isNavigationActive');
            scope.init();
            spyOn(BasketService, 'updateFillDisposition');
            scope.updateDisposition(1);
            expect(scope.isContinueActive).toHaveBeenCalled();
            expect(scope.isNavigationActive).toHaveBeenCalled();
        });
    });

    describe('When the users selects a HWB disposition', function() {
        it('it should show a pop up', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.init();
            spyOn(BasketService, 'updateFillDisposition');
            scope.updateDisposition(3);
            expect(DialogService.showDialog).toHaveBeenCalled()
        });
    });


    describe('When the users selects a RTS disposition', function() {
        it('it should show a pop up', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.init();
            spyOn(BasketService, 'updateFillDisposition');
            scope.updateDisposition(4);
            expect(DialogService.showDialog).toHaveBeenCalled();
        });
    });

    describe('When the users selects a SLD disposition', function() {
        it('it should not show a pop up', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.init();
            spyOn(BasketService, 'updateFillDisposition');
            scope.updateDisposition(1);
            expect(DialogService.showDialog).not.toHaveBeenCalled();
        });
    });

    describe('When the continueButtonStatus is 0', function() {
        it('it should disable the continue button', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.init();
            scope.continueStatus = 0;
            scope.isContinueActive();
            expect(scope.continueActive).toBe(false)
        });
    });

    describe('When the continueButtonStatus is 2', function() {
        it('it should enable the continue button', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.init();
            scope.continueStatus = 2;
            scope.isContinueActive();
            expect(scope.continueActive).toBe(true)
        });
    });


    describe('When the continueButtonStatus is 1 and disposition is selected', function() {
        it('it should enable the continue button', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.init();
            scope.continueStatus = 1;
            scope.dispositionConfig.outcome = 'SLD';
            scope.isContinueActive();
            expect(scope.continueActive).toBe(true)
        });
    });

    describe('When the user clicks next or previous button', function() {
        it('it should update navigateIndicator', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.displayNextMessage = function() {
                return true;
            }
            scope.init();
            scope.navigate(7);
            scope.patientMessageList.map(function(patientMessage) {
                expect(patientMessage.navigateIndicator).toBe(7);
            })
        });
    });

    describe('When the user clicks next or previous button', function() {
        it('it should display the next message', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.displayNextMessage = function() {
                return true;
            }
            spyOn(scope, 'displayNextMessage');
            scope.init();
            scope.navigate(7);
            expect(scope.displayNextMessage).toHaveBeenCalled();
        });
    });

    describe('When the user clicks Void transaction button', function() {
        it('it should display a pop up', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.init();
            scope.voidTransaction();
            expect(DialogService.showDialog).toHaveBeenCalled()
        });
    });

    describe('When the user confirms Void transaction', function() {
        it('it should clear the transaction', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.clearAllFactories = function() {
                return true;
            }
            spyOn(scope, 'clearAllFactories')
            scope.init();
            scope.voidTransaction();
            deferred.resolve('Yes');
            $timeout.flush();
            expect(scope.clearAllFactories).toHaveBeenCalled();
        });
    });

    describe('When the user confirms Void transaction', function() {
        it('it should clear the transaction and take him to patient lookup page', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.clearAllFactories = function() {
                return true;
            }
            spyOn(scope, 'clearAllFactories');
            spyOn($location, 'url');
            scope.init();
            scope.voidTransaction();
            deferred.resolve('Yes');
            $timeout.flush();
            expect(scope.clearAllFactories).toHaveBeenCalled();
            expect($location.url).toHaveBeenCalledWith('/patient-lookup')
        });
    });

    describe('When the user clicks continue button', function() {
        it('it should update navigateIndicator', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.displayNextMessage = function() {
                return true;
            }
            scope.init();
            scope.continue(7);
            scope.patientMessageList.map(function(patientMessage) {
                expect(patientMessage.navigateIndicator).toBe(7);
            })
        });
    });

    describe('When the user clicks continue button', function() {
        it('it should display the next message', function() {
            scope.patientMessageList = mandatoryForcedStub;
            scope.displayNextMessage = function() {
                return true;
            }
            spyOn(scope, 'displayNextMessage');
            scope.init();
            scope.continue(7);
            expect(scope.displayNextMessage).toHaveBeenCalled();
        });
    });
});