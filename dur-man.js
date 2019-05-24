
// dur-man
'use strict';

angular.module('weCarePlusApp').controller('DURMandatoryCtrl', function($scope, BasketService, CONFIG, DialogService, $location, PatientFactory, PosSimplificationTimeStampService, POSTimestampFactory) {

    LOGGER.info('DURMandatoryCtrl - Entering DURMandatoryCtrl');
    $scope.continueActive = false;
    $scope.voidActive = false;
    $scope.patientDetailsMap = PatientFactory.getSelectedPatientList();
    $scope.screenName = "";
    var programs = [{
        messageType: $scope.patientMessageList[0].messageType,
        programType: $scope.patientMessageList[0].progType
    }];
    var displayedTo = [{
        "displayedToValue": "staff"
    }]
    var dispositionedBy = "staff";

    $scope.init = function() {

        $scope.patientMessageList.map(function(patientMessage) {
            if (patientMessage.messageType === 4 && patientMessage.progType === '4') {
                $scope.durMessage = patientMessage;
            }
            if (patientMessage.messageType === 4 && patientMessage.progType === '5') {
                $scope.forcedMessage = patientMessage;
            }
            if (patientMessage.messageType === 4 && patientMessage.progType === '3') {
                $scope.prescApprMessage = patientMessage;
            }
        });
        
        if ($scope.durMessage && !$scope.forcedMessage) {
            LOGGER.info('DURMandatoryCtrl - Type of DUR message is Mandatory');
            $scope.screenName = "dur_mandatory_counseling";
            $scope.messageType = "mandatory";
        } else if ($scope.durMessage && $scope.forcedMessage) {
            LOGGER.info('DURMandatoryCtrl - Type of DUR message is Mandatory and Forced');
            $scope.screenName = "dur_and_rph_forced_counsel";
            $scope.messageType = "mandatoryForced";
        } else if (!$scope.durMessage && $scope.forcedMessage) {
            LOGGER.info('DURMandatoryCtrl - Type of DUR message is Forced');
            $scope.screenName = "rph_forced_counseling";
            $scope.messageType = "forced";
        } else if ($scope.prescApprMessage) {
            LOGGER.info('DURMandatoryCtrl - Type of DUR message is Prescriber approved');
            $scope.messageType = "prescApproved";
            $scope.screenName = "dur_prescriber_approv_counsel";
        }

        var durDetails = {
            screenName: $scope.screenName,
            programs: programs
        }
        POSTimestampFactory.setDURScreenDetails(durDetails);
        PosSimplificationTimeStampService.selectEventMethod({ programs: $scope.patientMessageList, eventType: "screen_entered", screenName: $scope.screenName });
        

        if ($scope.messageType) {
            switch ($scope.messageType) {
                case 'prescApproved':
                    $scope.screenView = {
                        dispositionLineButtons: false,
                        forcedCounselComments: false,
                        prescriberComments: true,
                        durWarnings: true,
                        gridValue: 'col-md-6',
                        commentsHeight: 'dur-comments-full'
                    };
                    $scope.constructWarnings($scope.prescApprMessage);
                    $scope.constructPrescriberComments($scope.prescApprMessage);
                    break;
                case 'forced':
                    $scope.screenView = {
                        dispositionLineButtons: true,
                        forcedCounselComments: true,
                        prescriberComments: false,
                        durWarnings: false,
                        gridValue: 'col-md-12',
                        commentsHeight: 'dur-comments-full'
                    };
                    $scope.constructForcedCounselComments($scope.forcedMessage);
                    break;
                case 'mandatory':
                    $scope.screenView = {
                        dispositionLineButtons: true,
                        forcedCounselComments: false,
                        prescriberComments: true,
                        durWarnings: true,
                        gridValue: 'col-md-6',
                        commentsHeight: 'dur-comments-mandatory'
                    };
                    $scope.constructWarnings($scope.durMessage);
                    $scope.constructPrescriberComments($scope.durMessage);
                    break;
                case 'mandatoryForced':
                    $scope.screenView = {
                        dispositionLineButtons: true,
                        forcedCounselComments: true,
                        prescriberComments: true,
                        durWarnings: true,
                        gridValue: 'col-md-6',
                        commentsHeight: 'dur-comments-half'
                    };
                    $scope.constructWarnings($scope.durMessage);
                    $scope.constructPrescriberComments($scope.durMessage);
                    $scope.constructForcedCounselComments($scope.forcedMessage);
                    break;
            }
        }

        $scope.defaultMessage = $scope.patientMessageList[0];
        $scope.patientID = $scope.defaultMessage.rxPatientId;
        $scope.descriptionText = $scope.defaultMessage.messageConfig.configInfo['1'].descTxt;
        $scope.CONFIG.pageTitle = $scope.defaultMessage.messageConfig.configInfo['1'].dispTitle;
        $scope.patientDetails = $scope.patientDetailsMap[$scope.defaultMessage.rxPatientId];
        $scope.dispositionConfig = {
            RTS: $scope.defaultMessage.messageConfig.configInfo['2'].lnItmButton.button1,
            HWB: $scope.defaultMessage.messageConfig.configInfo['2'].lnItmButton.button2,
            SLD: $scope.defaultMessage.messageConfig.configInfo['2'].lnItmButton.button3,
            outcome: $scope.defaultMessage.outcome
        }
        $scope.navigationInfo = {
            prev: {
                config: $scope.defaultMessage.messageConfig.configInfo['1'].lnItmButton.button1
            },
            next: {
                config: $scope.defaultMessage.messageConfig.configInfo['1'].lnItmButton.button2
            },
            paginationText: $scope.defaultMessage.pageText
        };
        $scope.continueButtonConfig = $scope.defaultMessage.messageConfig.configInfo['1'].lnItmButton.button4;
        $scope.voidTransactionButtonConfig = $scope.defaultMessage.messageConfig.configInfo['1'].lnItmButton.button3;
        $scope.continueStatus = $scope.defaultMessage.continueButtonStatus;
        $scope.patientMessageList.map(function(patientMessage) {
            patientMessage.counselProgramDisplayTimeAtPos = appUtils.getCurrentTimestamp()
        });
        $scope.isContinueActive();
        $scope.isNavigationActive();
    }

    $scope.isNavigationActive = function() {
        if ($scope.dispositionConfig.outcome || $scope.messageType === 'prescApproved') {
            $scope.navigationInfo.next.state = 'active';
        } else {
            $scope.navigationInfo.next.state = '';
        }
    }

    $scope.constructWarnings = function(message) {
        $scope.durWarnings = message.dURWarningList && message.dURWarningList.durWarning[0].durWarningDetails && message.dURWarningList.durWarning[0].durWarningDetails.slice(0, 5);       
        $scope.durWarnings = angular.copy($scope.durWarnings);
        if ($scope.durWarnings.length) {
            $scope.durWarnings.map(function(durWarning) {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext("2d");
                ctx.font = "24px Open Sans,sans-serif";
                var newStr = '';
                var existingString = '';
                var len = 550;
                if (durWarning.durDesc) {
                    var lineNumber = 1;
                    var array = durWarning.durDesc.split('');
                    for (var i = 0; i < array.length; i++) {
                        newStr += array[i];
                        existingString += array[i];
                        var width = Math.ceil(ctx.measureText(existingString).width);
                        if (width >= len && lineNumber === 1) {
                            lineNumber++;
                            if (array[i + 1] !== ' ' && array[i] !== ' ' && array[i] !== ',' && array[i - 1] !== ',' && array[i] !== '.' && array[i - 1] !== '.') {
                                newStr += '-\n';
                            }
                        }
                    }
                }
                durWarning.durDesc = newStr;
            })
        }
    }

    $scope.constructPrescriberComments = function(message) {
        $scope.prescriberComments = {
            comments: message.comments,
            rphName: message.counselByPharmName,
            timestamp: message.counselDateTime,
            title: message.messageConfig.talkingPoints
        };
    }

    $scope.constructForcedCounselComments = function(message) {
        $scope.forcedCounselComments = {
            comments: message.comments,
            rphName: message.counselByPharmName,
            timestamp: message.counselDateTime,
            title: message.messageConfig.talkingPoints
        };
    }

    $scope.updateDisposition = function(disposition) {
        LOGGER.info('DURMandatoryCtrl - updateDisposition method - Disposition value is - ' + disposition);

        $scope.dispositionConfig.outcome = disposition;
        $scope.patientMessageList.map(function(patientMessage) {
            patientMessage.outcome = disposition;
            patientMessage.counselOptionChosenTimeAtPos = appUtils.getCurrentTimestamp()
        });
        BasketService.updateFillDisposition($scope.defaultMessage.rxPatientId, $scope.defaultMessage.patientFillInfo, disposition);
        $scope.isContinueActive();
        $scope.isNavigationActive();
        var modalOptions = {
            buttons: CONFIG.durScreenData.en.removePrescription.buttons,
            headerText: CONFIG.durScreenData.en.removePrescription.headerText,
            bodyText: CONFIG.durScreenData.en.removePrescription.bodyText,
            image: CONFIG.durScreenData.en.removePrescription.image
        };
        if (disposition === $scope.defaultMessage.messageConfig.configInfo['2'].lnItmButton.button1.id || disposition === $scope.defaultMessage.messageConfig.configInfo['2'].lnItmButton.button2.id) {
            DialogService.showDialog({}, modalOptions).then(function(result) {

            });
        }
    }

    $scope.isContinueActive = function() {
        if ($scope.continueStatus === 0) {
            $scope.continueActive = false;
        } else if ($scope.continueStatus === 2) {
            $scope.continueActive = true;
        } else if ($scope.continueStatus === 1 && $scope.dispositionConfig.outcome) {
            $scope.continueActive = true;
        }
    }

    $scope.navigate = function(actionId) {
        LOGGER.info('DURMandatoryCtrl - updateDisposition method - Navigate action value is - ' + actionId);
        if (!$scope.dispositionConfig.outcome && actionId === 9 && $scope.messageType !== 'prescApproved') {
            return;
        }
        $scope.patientMessageList.map(function(patientMessage) {
            patientMessage.navigateIndicator = actionId;
        });
        PosSimplificationTimeStampService.selectEventMethod({ programs: $scope.patientMessageList, displayedTo: displayedTo, dispositionedBy: dispositionedBy, "eventType": "screen_exited", screenName: $scope.screenName });
        $scope.displayNextMessage();
    }

    $scope.voidTransaction = function() {
        $scope.voidActive = true;
        LOGGER.info('DURMandatoryCtrl - voidTransaction method');
        var modalOptions = {
            buttons: CONFIG.durScreenData.en.voidTransaction.buttons,
            headerText: CONFIG.durScreenData.en.voidTransaction.headerText,
            bodyText: CONFIG.durScreenData.en.voidTransaction.bodyText,
            image: CONFIG.durScreenData.en.voidTransaction.image
        };
        DialogService.showDialog({}, modalOptions).then(function(result) {
            if (result && result === 'Yes') {
                $scope.clearAllFactories();
                $location.url('/patient-lookup');

                if(POSTimestampFactory.getDURScreenDetails() && POSTimestampFactory.getDURScreenDetails().length){
                    POSTimestampFactory.getDURScreenDetails().map(function(entry){
                        PosSimplificationTimeStampService.selectEventMethod({ programs: entry.programs, displayedTo: displayedTo, dispositionedBy: dispositionedBy, "eventType": "screen_exited", screenName: entry.screenName });
                    })
                }
                PosSimplificationTimeStampService.selectEventMethod({ eventType: "transaction_finalized" });
                PosSimplificationTimeStampService.sendRxDWTimestampDisposition(CONFIG.TIME_STAMPS_CONSTANTS.TIMESTAMP_CANCELLED_KEY);
            }
            $scope.voidActive = false;
        });
    }

    $scope.continue = function(actionId) {

        LOGGER.info('DURMandatoryCtrl - continue method');
        if (!$scope.continueActive) {
            return;
        }
        $scope.patientMessageList.map(function(patientMessage) {
            patientMessage.navigateIndicator = actionId;
        });
        PosSimplificationTimeStampService.selectEventMethod({ programs: $scope.patientMessageList, displayedTo: displayedTo, dispositionedBy: dispositionedBy, "eventType": "screen_exited", screenName: $scope.screenName });
        $scope.displayNextMessage();
    }

    $scope.checkIfAtleastOneSoldScriptAvailableInBasket = function(action) {
      if (action === "4" || action === "3") {
        var basketData = BasketFactory.getBasketData();
        var soldScriptAvailable = false;
        angular.forEach(basketData, function(pprItem, patientId) {
          if (
            pprItem.patientFillInfoList &&
            pprItem.patientFillInfoList.length
          ) {
            pprItem.patientFillInfoList.map(function(fillInfo) {
              if (
                fillInfo.fillDisposition &&
                fillInfo.fillDisposition.dispositionKey === "SLD"
              ) {
                soldScriptAvailable = true;
              }
            });
          }
        });
        if (!soldScriptAvailable) {
          $location.url("/basket");
        }
      }
    };
});

// dur-man
'use strict';

angular.module('weCarePlusApp').controller('DURMandatoryCtrl', function($scope, BasketService, CONFIG, DialogService, $location, PatientFactory, PosSimplificationTimeStampService, POSTimestampFactory) {

    LOGGER.info('DURMandatoryCtrl - Entering DURMandatoryCtrl');
    $scope.continueActive = false;
    $scope.voidActive = false;
    $scope.patientDetailsMap = PatientFactory.getSelectedPatientList();
    $scope.screenName = "";
    var programs = [{
        messageType: $scope.patientMessageList[0].messageType,
        programType: $scope.patientMessageList[0].progType
    }];
    var displayedTo = [{
        "displayedToValue": "staff"
    }]
    var dispositionedBy = "staff";

    $scope.init = function() {

        $scope.patientMessageList.map(function(patientMessage) {
            if (patientMessage.messageType === 4 && patientMessage.progType === '4') {
                $scope.durMessage = patientMessage;
            }
            if (patientMessage.messageType === 4 && patientMessage.progType === '5') {
                $scope.forcedMessage = patientMessage;
            }
            if (patientMessage.messageType === 4 && patientMessage.progType === '3') {
                $scope.prescApprMessage = patientMessage;
            }
        });
        
        if ($scope.durMessage && !$scope.forcedMessage) {
            LOGGER.info('DURMandatoryCtrl - Type of DUR message is Mandatory');
            $scope.screenName = "dur_mandatory_counseling";
            $scope.messageType = "mandatory";
        } else if ($scope.durMessage && $scope.forcedMessage) {
            LOGGER.info('DURMandatoryCtrl - Type of DUR message is Mandatory and Forced');
            $scope.screenName = "dur_and_rph_forced_counsel";
            $scope.messageType = "mandatoryForced";
        } else if (!$scope.durMessage && $scope.forcedMessage) {
            LOGGER.info('DURMandatoryCtrl - Type of DUR message is Forced');
            $scope.screenName = "rph_forced_counseling";
            $scope.messageType = "forced";
        } else if ($scope.prescApprMessage) {
            LOGGER.info('DURMandatoryCtrl - Type of DUR message is Prescriber approved');
            $scope.messageType = "prescApproved";
            $scope.screenName = "dur_prescriber_approv_counsel";
        }

        var durDetails = {
            screenName: $scope.screenName,
            programs: programs
        }
        POSTimestampFactory.setDURScreenDetails(durDetails);
        PosSimplificationTimeStampService.selectEventMethod({ programs: $scope.patientMessageList, eventType: "screen_entered", screenName: $scope.screenName });
        

        if ($scope.messageType) {
            switch ($scope.messageType) {
                case 'prescApproved':
                    $scope.screenView = {
                        dispositionLineButtons: false,
                        forcedCounselComments: false,
                        prescriberComments: true,
                        durWarnings: true,
                        gridValue: 'col-md-6',
                        commentsHeight: 'dur-comments-full'
                    };
                    $scope.constructWarnings($scope.prescApprMessage);
                    $scope.constructPrescriberComments($scope.prescApprMessage);
                    break;
                case 'forced':
                    $scope.screenView = {
                        dispositionLineButtons: true,
                        forcedCounselComments: true,
                        prescriberComments: false,
                        durWarnings: false,
                        gridValue: 'col-md-12',
                        commentsHeight: 'dur-comments-full'
                    };
                    $scope.constructForcedCounselComments($scope.forcedMessage);
                    break;
                case 'mandatory':
                    $scope.screenView = {
                        dispositionLineButtons: true,
                        forcedCounselComments: false,
                        prescriberComments: true,
                        durWarnings: true,
                        gridValue: 'col-md-6',
                        commentsHeight: 'dur-comments-mandatory'
                    };
                    $scope.constructWarnings($scope.durMessage);
                    $scope.constructPrescriberComments($scope.durMessage);
                    break;
                case 'mandatoryForced':
                    $scope.screenView = {
                        dispositionLineButtons: true,
                        forcedCounselComments: true,
                        prescriberComments: true,
                        durWarnings: true,
                        gridValue: 'col-md-6',
                        commentsHeight: 'dur-comments-half'
                    };
                    $scope.constructWarnings($scope.durMessage);
                    $scope.constructPrescriberComments($scope.durMessage);
                    $scope.constructForcedCounselComments($scope.forcedMessage);
                    break;
            }
        }

        $scope.defaultMessage = $scope.patientMessageList[0];
        $scope.patientID = $scope.defaultMessage.rxPatientId;
        $scope.descriptionText = $scope.defaultMessage.messageConfig.configInfo['1'].descTxt;
        $scope.CONFIG.pageTitle = $scope.defaultMessage.messageConfig.configInfo['1'].dispTitle;
        $scope.patientDetails = $scope.patientDetailsMap[$scope.defaultMessage.rxPatientId];
        $scope.dispositionConfig = {
            RTS: $scope.defaultMessage.messageConfig.configInfo['2'].lnItmButton.button1,
            HWB: $scope.defaultMessage.messageConfig.configInfo['2'].lnItmButton.button2,
            SLD: $scope.defaultMessage.messageConfig.configInfo['2'].lnItmButton.button3,
            outcome: $scope.defaultMessage.outcome
        }
        $scope.navigationInfo = {
            prev: {
                config: $scope.defaultMessage.messageConfig.configInfo['1'].lnItmButton.button1
            },
            next: {
                config: $scope.defaultMessage.messageConfig.configInfo['1'].lnItmButton.button2
            },
            paginationText: $scope.defaultMessage.pageText
        };
        $scope.continueButtonConfig = $scope.defaultMessage.messageConfig.configInfo['1'].lnItmButton.button4;
        $scope.voidTransactionButtonConfig = $scope.defaultMessage.messageConfig.configInfo['1'].lnItmButton.button3;
        $scope.continueStatus = $scope.defaultMessage.continueButtonStatus;
        $scope.patientMessageList.map(function(patientMessage) {
            patientMessage.counselProgramDisplayTimeAtPos = appUtils.getCurrentTimestamp()
        });
        $scope.isContinueActive();
        $scope.isNavigationActive();
    }

    $scope.isNavigationActive = function() {
        if ($scope.dispositionConfig.outcome || $scope.messageType === 'prescApproved') {
            $scope.navigationInfo.next.state = 'active';
        } else {
            $scope.navigationInfo.next.state = '';
        }
    }

    $scope.constructWarnings = function(message) {
        $scope.durWarnings = message.dURWarningList && message.dURWarningList.durWarning[0].durWarningDetails && message.dURWarningList.durWarning[0].durWarningDetails.slice(0, 5);       
        $scope.durWarnings = angular.copy($scope.durWarnings);
        if ($scope.durWarnings.length) {
            $scope.durWarnings.map(function(durWarning) {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext("2d");
                ctx.font = "24px Open Sans,sans-serif";
                var newStr = '';
                var existingString = '';
                var len = 550;
                if (durWarning.durDesc) {
                    var lineNumber = 1;
                    var array = durWarning.durDesc.split('');
                    for (var i = 0; i < array.length; i++) {
                        newStr += array[i];
                        existingString += array[i];
                        var width = Math.ceil(ctx.measureText(existingString).width);
                        if (width >= len && lineNumber === 1) {
                            lineNumber++;
                            if (array[i + 1] !== ' ' && array[i] !== ' ' && array[i] !== ',' && array[i - 1] !== ',' && array[i] !== '.' && array[i - 1] !== '.') {
                                newStr += '-\n';
                            }
                        }
                    }
                }
                durWarning.durDesc = newStr;
            })
        }
    }

    $scope.constructPrescriberComments = function(message) {
        $scope.prescriberComments = {
            comments: message.comments,
            rphName: message.counselByPharmName,
            timestamp: message.counselDateTime,
            title: message.messageConfig.talkingPoints
        };
    }

    $scope.constructForcedCounselComments = function(message) {
        $scope.forcedCounselComments = {
            comments: message.comments,
            rphName: message.counselByPharmName,
            timestamp: message.counselDateTime,
            title: message.messageConfig.talkingPoints
        };
    }

    $scope.updateDisposition = function(disposition) {
        LOGGER.info('DURMandatoryCtrl - updateDisposition method - Disposition value is - ' + disposition);

        $scope.dispositionConfig.outcome = disposition;
        $scope.patientMessageList.map(function(patientMessage) {
            patientMessage.outcome = disposition;
            patientMessage.counselOptionChosenTimeAtPos = appUtils.getCurrentTimestamp()
        });
        BasketService.updateFillDisposition($scope.defaultMessage.rxPatientId, $scope.defaultMessage.patientFillInfo, disposition);
        $scope.isContinueActive();
        $scope.isNavigationActive();
        var modalOptions = {
            buttons: CONFIG.durScreenData.en.removePrescription.buttons,
            headerText: CONFIG.durScreenData.en.removePrescription.headerText,
            bodyText: CONFIG.durScreenData.en.removePrescription.bodyText,
            image: CONFIG.durScreenData.en.removePrescription.image
        };
        if (disposition === $scope.defaultMessage.messageConfig.configInfo['2'].lnItmButton.button1.id || disposition === $scope.defaultMessage.messageConfig.configInfo['2'].lnItmButton.button2.id) {
            DialogService.showDialog({}, modalOptions).then(function(result) {

            });
        }
    }

    $scope.isContinueActive = function() {
        if ($scope.continueStatus === 0) {
            $scope.continueActive = false;
        } else if ($scope.continueStatus === 2) {
            $scope.continueActive = true;
        } else if ($scope.continueStatus === 1 && $scope.dispositionConfig.outcome) {
            $scope.continueActive = true;
        }
    }

    $scope.navigate = function(actionId) {
        LOGGER.info('DURMandatoryCtrl - updateDisposition method - Navigate action value is - ' + actionId);
        if (!$scope.dispositionConfig.outcome && actionId === 9 && $scope.messageType !== 'prescApproved') {
            return;
        }
        $scope.patientMessageList.map(function(patientMessage) {
            patientMessage.navigateIndicator = actionId;
        });
        PosSimplificationTimeStampService.selectEventMethod({ programs: $scope.patientMessageList, displayedTo: displayedTo, dispositionedBy: dispositionedBy, "eventType": "screen_exited", screenName: $scope.screenName });
        $scope.displayNextMessage();
    }

    $scope.voidTransaction = function() {
        $scope.voidActive = true;
        LOGGER.info('DURMandatoryCtrl - voidTransaction method');
        var modalOptions = {
            buttons: CONFIG.durScreenData.en.voidTransaction.buttons,
            headerText: CONFIG.durScreenData.en.voidTransaction.headerText,
            bodyText: CONFIG.durScreenData.en.voidTransaction.bodyText,
            image: CONFIG.durScreenData.en.voidTransaction.image
        };
        DialogService.showDialog({}, modalOptions).then(function(result) {
            if (result && result === 'Yes') {
                $scope.clearAllFactories();
                $location.url('/patient-lookup');

                if(POSTimestampFactory.getDURScreenDetails() && POSTimestampFactory.getDURScreenDetails().length){
                    POSTimestampFactory.getDURScreenDetails().map(function(entry){
                        PosSimplificationTimeStampService.selectEventMethod({ programs: entry.programs, displayedTo: displayedTo, dispositionedBy: dispositionedBy, "eventType": "screen_exited", screenName: entry.screenName });
                    })
                }
                PosSimplificationTimeStampService.selectEventMethod({ eventType: "transaction_finalized" });
                PosSimplificationTimeStampService.sendRxDWTimestampDisposition(CONFIG.TIME_STAMPS_CONSTANTS.TIMESTAMP_CANCELLED_KEY);
            }
            $scope.voidActive = false;
        });
    }

    $scope.continue = function(actionId) {

        LOGGER.info('DURMandatoryCtrl - continue method');
        if (!$scope.continueActive) {
            return;
        }
        $scope.patientMessageList.map(function(patientMessage) {
            patientMessage.navigateIndicator = actionId;
        });
        PosSimplificationTimeStampService.selectEventMethod({ programs: $scope.patientMessageList, displayedTo: displayedTo, dispositionedBy: dispositionedBy, "eventType": "screen_exited", screenName: $scope.screenName });
        $scope.displayNextMessage();
    }

    $scope.checkIfAtleastOneSoldScriptAvailableInBasket = function(action) {
      if (action === "4" || action === "3") {
        var basketData = BasketFactory.getBasketData();
        var soldScriptAvailable = false;
        angular.forEach(basketData, function(pprItem, patientId) {
          if (
            pprItem.patientFillInfoList &&
            pprItem.patientFillInfoList.length
          ) {
            pprItem.patientFillInfoList.map(function(fillInfo) {
              if (
                fillInfo.fillDisposition &&
                fillInfo.fillDisposition.dispositionKey === "SLD"
              ) {
                soldScriptAvailable = true;
              }
            });
          }
        });
        if (!soldScriptAvailable) {
          $location.url("/basket");
        }
      }
    };
});


// dur-rph

//programs wrong
//screen exit
'use strict';

angular.module('weCarePlusApp').controller('DURRphInitialsCtrl', function($scope, CONFIG, FormValidationService, MessageService, DialogService, UtilityService, PosSimplificationTimeStampService) {

    LOGGER.info('DURRphInitialsCtrl - Entering DURRphInitialsCtrl');

    $scope.enterKeyActive = false;
    $scope.rPHInitials = $scope.patientMessageList[0].rPHInitials ? $scope.patientMessageList[0].rPHInitials : '';
    $scope.CONFIG.pageTitle = $scope.patientMessageList[0].messageConfig.configInfo['1'].dispTitle;
    $scope.descriptionText = $scope.patientMessageList[0].messageConfig.configInfo['1'].descTxt;
    $scope.rPHInitialMessageList = [];
    $scope.customKeyboardStyle = {
        prev: '',
        next: 'next-button',
        cancel: 'cancel-button'
    }
    $scope.screenName = "dur_rph";
    var displayedTo = [{
        "displayedToValue": "staff"
    }]
    var dispositionedBy = "staff";

    $scope.init = function() {
        PosSimplificationTimeStampService.selectEventMethod({ programs: $scope.screenName, eventType: "screen_entered", screenName: $scope.screenName });
        
        if ($scope.rPHInitials) {
            $scope.enterKeyActive = true;
        }
        $scope.sortPatientMessageList();
        $scope.patientMessageList.map(function(patientMessage) {
            if (patientMessage.properties && patientMessage.properties.msgSeqList) {
                $scope.rPHInitialMessageList.push(patientMessage);
            }
        });

    }

    $scope.sortPatientMessageList = function() {
        $scope.patientMessageList.map(function(patientMessage) {
            patientMessage.firstName = $scope.basketData[patientMessage.rxPatientId].patientDetails.firstName;
            patientMessage.lastName = $scope.basketData[patientMessage.rxPatientId].patientDetails.lastName;
        });
        $scope.patientMessageList = UtilityService.sortArray($scope.patientMessageList, ['lastName', 'firstName', 'rxNum', 'refillNum']);
        $scope.patientMessageList.map(function(patientMessage) {
            delete patientMessage.firstName
            delete patientMessage.lastName
        });
    }

    $scope.$on('SCANNED_DATA_GENERIC', function(evt, barcode, barcodeType) {
        if (barcodeType === "SCANNED_RPH_CRED") {
            $scope.rPHInitials = barcode;
            $scope.enterKeyActive = true;
        } else {
            var modalOptions = {
                buttons: CONFIG.durScreenData.en.invalidBarcode.buttons,
                headerText: CONFIG.durScreenData.en.invalidBarcode.headerText,
                bodyText: CONFIG.durScreenData.en.invalidBarcode.bodyText
            };
            DialogService.showDialog({}, modalOptions).then(function() {});
        }
    });

    $scope.onScreenKeyClick = function(keyType, keyVal) {
        LOGGER.info('DURRphInitialsCtrl - Entering onScreenKeyClick method');
        LOGGER.info('DURRphInitialsCtrl - User keyVal - ' + keyVal);

        if (keyType === 'splKey' && keyVal == 'enter') {
            $scope.validateCredentials();
        } else if (keyType === 'splKey' && keyVal == 'previous') {
            $scope.rPHInitials = null;
            $scope.displayPreviousMessage();
        } else {
            var validInitials = FormValidationService.validateInitials(keyType, keyVal, $scope.rPHInitials, 3);
            $scope.rPHInitials = validInitials;
            $scope.enterKeyActive = validInitials && validInitials.length === 3 ? true : false;
        }
    };

    $scope.nextMessage = function(result) {
        LOGGER.info('DURRphInitialsCtrl - Entering nextMessage');
        $scope.rPHInitialMessageList.map(function(patientMessage) {
            var options = {
                msgSeqList: patientMessage.properties && patientMessage.properties.msgSeqList,
                scanInfo: {
                    scanTime: appUtils.getCurrentTimestamp(),
                    empId: result.empId,
                    rphInitial: $scope.rPHInitials
                }
            }
            MessageService.updatePharmaInformation(options)
        });
        $scope.patientMessageList.map(function(patientMessage) {
            patientMessage.outcome = null;
        });
        var displayedTo = [{
            "displayedToValue": "staff"
        }]
        var dispositionedBy = "staff";

        PosSimplificationTimeStampService.selectEventMethod({ programs: $scope.screenName, displayedTo: displayedTo, dispositionedBy: dispositionedBy, "eventType": "screen_exited", screenName: $scope.screenName });
        $scope.displayNextMessage();
    }

    $scope.displayPreviousMessage = function() {
        LOGGER.info('DURRphInitialsCtrl - Entering displayPreviousMessage');
        $scope.rPHInitialMessageList.map(function(patientMessage) {
            patientMessage.outcome = patientMessage.previousIndex;
        });
        PosSimplificationTimeStampService.selectEventMethod({ programs: $scope.screenName, displayedTo: displayedTo, dispositionedBy: dispositionedBy, "eventType": "screen_exited", screenName: $scope.screenName });
        $scope.displayNextMessage();
    }

    $scope.validateCredentials = function() {
        LOGGER.info('DURRphInitialsCtrl - Entering validateCredentails');
        if (!$scope.enterKeyActive) {
            return;
        }

        MessageService.validateCredentials($scope.rPHInitials).then(function(result) {
            if (result === CONFIG.durConstants.SERVICE_FAILURE) {
                LOGGER.info('DURRphInitialsCtrl - Validation failed');
                var rphInfo = {
                    scanTime: appUtils.getCurrentTimestamp(),
                    empId: 'UNKNOWN',
                    rphInitial: $scope.rPHInitials
                };
                $scope.nextMessage(rphInfo);
            } else {
                if (result && result.roles === 'P') {
                    LOGGER.info('DURRphInitialsCtrl - Valid Credential ' + $scope.rPHInitials);
                    $scope.nextMessage(result);
                } else {
                    LOGGER.info('DURRphInitialsCtrl - Invalid Credential');
                    var modalOptions = {
                        buttons: CONFIG.durScreenData.en.invalidCredentials.buttons,
                        headerText: CONFIG.durScreenData.en.invalidCredentials.headerText,
                        bodyText: CONFIG.durScreenData.en.invalidCredentials.bodyText,
                        image: CONFIG.durScreenData.en.invalidCredentials.image
                    };
                    DialogService.showDialog({}, modalOptions).then(function() {});
                }
            }
        });
    };
});
