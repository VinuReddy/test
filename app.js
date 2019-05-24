"use strict";

// Here, we define our app/module.
angular
  .module("weCarePlusApp", [
    "ngCookies",
    "ngResource",
    "ngRoute",
    "ngSanitize",
    "ui.bootstrap",
    "utf8-base64",
    "angular.filter"
  ])
  .config(function($routeProvider, $provide) {
    // Here we define all of the app routes we'll support.
    $routeProvider
      // Login page
      .when("/login", {
        templateUrl: "views/login.html",
        controller: "LoginCtrl",
        resolve: {
          terminalData: TerminalCtrl.loadData
        }
      })
      .when("/password", {
        templateUrl: "views/password.html",
        controller: "LoginCtrl"
      })
      .when("/", {
        templateUrl: "views/login.html",
        controller: "LoginCtrl",
        resolve: {
          terminalData: TerminalCtrl.loadData
        }
      })
      // Home page
      .when("/home", {
        templateUrl: "views/home.html",
        controller: "HomeCtrl"
      })
      // Patient page
      .when("/patient-lookup", {
        templateUrl: "views/patient/patient-lookup.html",
        controller: "PatientSearchCtrl"
      })
      .when("/patient-list", {
        templateUrl: "views/patient/patient-list.html",
        controller: "PatientListCtrl"
      })
      .when("/patient-match", {
        templateUrl: "views/patient/patient-match.html",
        controller: "PatientMatchCtrl"
      })
      .when("/patient-match-new", {
        templateUrl: "views/patient/patient-match-new.html",
        controller: "PatientMatchCtrl"
      })
      .when("/dob-validation", {
        templateUrl: "views/patient/dob-validation.html",
        controller: "DOBValidationCtrl"
      })
      .when("/dobValidation", {
        templateUrl: "views/patient/dobValidation.html",
        controller: "DOBValidationCtrl"
      })
      .when("/patient-relationship", {
        templateUrl: "views/patient/patient-relationship.html",
        controller: "PatientRelationshipCtrl"
      })
      .when("/caregiving-relationship", {
        templateUrl: "views/patient/caregiving-relationship.html",
        controller: "CaregivingRelationshipCtrl"
      })
      .when("/basket", {
        templateUrl: "views/basket.html",
        controller: "BasketCtrl"
      })
      .when("/esign-log", {
        templateUrl: "views/esign-log.html",
        controller: "EsigLogCtrl"
      })
      .when("/esign-select", {
        templateUrl: "views/esign-select.html",
        controller: "EsigSelectCtrl"
      })
      .when("/license", {
        templateUrl: "views/license.html",
        controller: "PseCtrl"
      })
      .when("/license-entry", {
        templateUrl: "views/license-entry.html",
        controller: "PseCtrl"
      })
      .when("/transaction-details", {
        templateUrl: "views/transaction-details.html",
        controller: "TxnDetailCtrl"
      })
      .when("/messages/:tmplName", {
        templateUrl: function(params) {
          return "views/messages/" + params.tmplName + ".html";
        },
        controller: "MessageCtrl"
      })
      // Error page
      .when("/error", {
        templateUrl: "error.html",
        controller: "HomeCtrl"
      })
      .when("/verify-associate", {
        templateUrl: "views/patient/verify-associate.html",
        controller: "VerfiyAssociateCtrl"
      })
      .when("/verify-associate-pos-sim", {
        templateUrl: "views/patient/verify-associate-pos-sim.html",
        controller: "VerfiyAssociateCtrl"
      })
      .when("/agent-punch", {
        templateUrl: "views/agent-punch.html",
        controller: "PunchCtrl"
      })
      .when("/opportunity/fpadoption", {
        templateUrl: "views/opportunity/fpadoption.html",
        controller: "OpportunityCtrl"
      })
      .when("/update-contact", {
        templateUrl: "views/opportunity/opportunity-update-contact.html",
        controller: "UpdateContactCtrl"
      })
      // Error page
      .otherwise({
        redirectTo: "/error"
      });

    $provide.decorator("$exceptionHandler", [
      "$delegate",
      function($delegate) {
        return function(exception, cause) {
          $delegate(exception, cause);
          var formatted = "";
          var properties = "";
          formatted += 'Exception: "' + exception.toString() + '"\n';
          formatted += "Caused by: " + cause + "\n";

          properties += exception.message
            ? "Message: " + exception.message + "\n"
            : "";
          properties += exception.fileName
            ? "File Name: " + exception.fileName + "\n"
            : "";
          properties += exception.lineNumber
            ? "Line Number: " + exception.lineNumber + "\n"
            : "";
          properties += exception.stack
            ? "Stack Trace: " + exception.stack + "\n"
            : "";

          if (properties) {
            formatted += properties;
            LOGGER.error(formatted, "WeCarePlusApp");
          }
        };
      }
    ]);
  })
  // Cache templates.  When the app loads, Angular will have the
  // browser make a series of requests for these files and store
  // then in the $templateCache service.
  .run(function($templateCache, $http) {
    //dialogs views
    $http.get("views/dialogs/block-ui.html", {
      cache: $templateCache
    });
    $http.get("views/dialogs/loading.html", {
      cache: $templateCache
    });
    //directives views
    $http.get("views/directives/calender.html", {
      cache: $templateCache
    });
    $http.get("views/directives/fourButtons.html", {
      cache: $templateCache
    });
    $http.get("views/directives/keyboard.html", {
      cache: $templateCache
    });
    $http.get("views/directives/numpad.html", {
      cache: $templateCache
    });
    $http.get("views/directives/searching.html", {
      cache: $templateCache
    });
    $http.get("views/directives/singleInputPage.html", {
      cache: $templateCache
    });
    $http.get("views/directives/threeButtons.html", {
      cache: $templateCache
    });
    $http.get("views/directives/descriptiontext.html", {
      cache: $templateCache
    });
    $http.get("views/directives/dispositionbuttons.html", {
      cache: $templateCache
    });
    $http.get("views/directives/durwarnings.html", {
      cache: $templateCache
    });
    $http.get("views/directives/navigationbuttons.html", {
      cache: $templateCache
    });
    $http.get("views/directives/prescribercomments.html", {
      cache: $templateCache
    });
    $http.get("views/directives/patientDetails.html", {
      cache: $templateCache
    });
    $http.get("views/directives/instructiontext.html", {
      cache: $templateCache
    });
    //includes views
    $http.get("views/includes/footer.html", {
      cache: $templateCache
    });
    $http.get("views/includes/header.html", {
      cache: $templateCache
    });
    //messages views
    $http.get("views/messages/modals/popup-select-dropdown.html", {
      cache: $templateCache
    });
    $http.get("views/messages/modals/select-idtype.html", {
      cache: $templateCache
    });
    $http.get("views/messages/modals/select-relation.html", {
      cache: $templateCache
    });
    $http.get("views/messages/1-67.html", {
      cache: $templateCache
    });
    $http.get("views/messages/4-1.html", {
      cache: $templateCache
    });
    $http.get("views/messages/6-2-2.html", {
      cache: $templateCache
    });
    $http.get("views/messages/extra-care.html", {
      cache: $templateCache
    });
    $http.get("views/messages/message-centric.html", {
      cache: $templateCache
    });
    $http.get("views/messages/drug-coupon.html", {
      cache: $templateCache
    });
    $http.get("views/messages/patient-counseling.html", {
      cache: $templateCache
    });
    $http.get("views/messages/patient-demographic.html", {
      cache: $templateCache
    });
    $http.get("views/messages/ready-fill.html", {
      cache: $templateCache
    });
    $http.get("views/messages/ready-fill-unenroll.html", {
      cache: $templateCache
    });
    $http.get("views/messages/ready-fill-lite.html", {
      cache: $templateCache
    });
    $http.get("views/messages/drive-ready-fill.html", {
      cache: $templateCache
    });
    $http.get("views/messages/auto-fill-confirmation.html", {
      cache: $templateCache
    });
    $http.get("views/messages/is-patient-present.html", {
      cache: $templateCache
    });
    $http.get("views/messages/retail-auto.html", {
      cache: $templateCache
    });
    $http.get("views/messages/sms-enrollment.html", {
      cache: $templateCache
    });
    $http.get("views/messages/srd-patient-id.html", {
      cache: $templateCache
    });
    $http.get("views/messages/srd-pickup-id.html", {
      cache: $templateCache
    });
    $http.get("views/messages/tcpa.html", {
      cache: $templateCache
    });
    $http.get("views/messages/pc-notify.html", {
      cache: $templateCache
    });
    $http.get("views/messages/pcps-notify.html", {
      cache: $templateCache
    });
    $http.get("views/messages/first-fill-counsel.html", {
      cache: $templateCache
    });
    $http.get("views/messages/dur-mandatory.html", {
      cache: $templateCache
    });
    $http.get("views/messages/dur-rphInitials.html", {
      cache: $templateCache
    });
    $http.get("views/messages/relationship-action.html", {
      cache: $templateCache
    });
    $http.get("views/messages/patientDetails-include.html", {
      cache: $templateCache
    });
    //modals views
    $http.get("views/modals/active-note.html", {
      cache: $templateCache
    });
    $http.get("views/modals/barcode-entry.html", {
      cache: $templateCache
    });
    $http.get("views/modals/barcode.html", {
      cache: $templateCache
    });
    $http.get("views/modals/basket-rx-item.html", {
      cache: $templateCache
    });
    $http.get("views/modals/contact-update.html", {
      cache: $templateCache
    });
    $http.get("views/modals/emp-mgmt.html", {
      cache: $templateCache
    });
    $http.get("views/modals/enrollment-status.html", {
      cache: $templateCache
    });
    $http.get("views/modals/esig-confirm.html", {
      cache: $templateCache
    });
    $http.get("views/modals/helpBarcodeEntry.html", {
      cache: $templateCache
    });
    $http.get("views/modals/hipaa-form.html", {
      cache: $templateCache
    });
    $http.get("views/modals/medicare_form.html", {
      cache: $templateCache
    });
    $http.get("views/modals/offline_medicare_form.html", {
      cache: $templateCache
    });
    $http.get("views/modals/relationship_to_patient.html", {
      cache: $templateCache
    });
    $http.get("views/modals/unscanned-rx-list.html", {
      cache: $templateCache
    });
    //views pages
    $http.get("views/agent-punch.html", {
      cache: $templateCache
    });
    $http.get("views/basket.html", {
      cache: $templateCache
    });
    $http.get("views/patient/dob-validation.html", {
      cache: $templateCache
    });
    $http.get("views/patient/dobValidation.html", {
      cache: $templateCache
    });
    $http.get("views/esign-log.html", {
      cache: $templateCache
    });
    $http.get("views/esign-select.html", {
      cache: $templateCache
    });
    $http.get("views/home.html", {
      cache: $templateCache
    });
    $http.get("views/license-entry.html", {
      cache: $templateCache
    });
    $http.get("views/license.html", {
      cache: $templateCache
    });
    $http.get("views/login.html", {
      cache: $templateCache
    });
    $http.get("views/password.html", {
      cache: $templateCache
    });
    $http.get("views/patient-list-by-phone.html", {
      cache: $templateCache
    });
    $http.get("views/patient/patient-list.html", {
      cache: $templateCache
    });
    $http.get("views/patient/patient-lookup.html", {
      cache: $templateCache
    });
    $http.get("views/patient/patient-match.html", {
      cache: $templateCache
    });
    $http.get("views/patient/caregiving-relationship.html", {
      cache: $templateCache
    });
    $http.get("views/patient/patient-relationship.html", {
      cache: $templateCache
    });
    $http.get("views/phone-lookup.html", {
      cache: $templateCache
    });
    $http.get("views/transaction-details.html", {
      cache: $templateCache
    });
    $http.get("views/patient/verify-associate.html", {
      cache: $templateCache
    });
    $http.get("views/patient/verify-associate-pos-sim.html", {
      cache: $templateCache
    });
    $http.get("views/opportunity/fpadoption.html", {
      cache: $templateCache
    });
    $http.get("views/opportunity/opportunity-update-contact.html", {
      cache: $templateCache
    });
    $http.get("views/modals/billPay-barcode.html", {
      cache: $templateCache
    });
    $http.get("views/modals/billPay-refundBarcode.html", {
      cache: $templateCache
    });
  });

// confi
"use strict";

var YES_TEXT = "Ok";
var SKIP_TEXT = "Skip";
var NO_TEXT = "No";
var ESP_YES_TEXT = "Si";
var ESP_SKIP_TEXT = "Omitir";
var ESP_NO_TEXT = "No";

angular.module("weCarePlusApp").value("CONFIG", {
  clockFormat: "mediumTime",
  dateFormat: "MM-dd-yyyy",
  birthDayFormat: "MMM-dd",
  workstationID: null,
  registerId: null,
  headers: {
    "CVS-TRANSACTION-LOCATION": "1",
    "CVS-RX-TRANSACTION-TYPE": "1"
  },
  pseConfig: {},
  pseRequestTimeout: 30000,
  componentType: "RXPICKUP_WS_RQST_TIMEOUT",
  registerData: {
    id: null,
    printerQname: "wcp_pr"
  },
  offlinePatId: 0,
  languageMap: {
    ENG: "eng",
    ESP: "esp"
  },
  storeAttributes: {
    paidouts_enabled: "no",
    fluShotsOfferenabled: "no",
    phrEnabled: "Y",
    idleTimeoutValue: 900000,
    billPayInd: "N",
    techOfferCounsel: "N",
    phrGiftCardEnabled: "Y",
    trailOfferGiftCardEnabled: "Y",
    workbrain: "NO",

    patientCareScreenDiffSwitch: "N",

    readyFillTextSwitch: "Y",
    ninetyDayTextSwitch: "Y",
    proactiveTextSwitch: "Y",
    contactInfoTextSwitch: "Y",
    smsEnrollTextSwitch: "Y",
    scriptSyncTextSwitch: "Y",
    rpaocTextSwitch: "Y",
    enableRefillTextSwitch: "Y",

    readyFillColorSwitch: "Y",
    ninetyDayColorSwitch: "Y",
    proactiveColorSwitch: "Y",
    contactInfoColorSwitch: "Y",
    smsEnrollColorSwitch: "Y",
    scriptSyncColorSwitch: "Y",
    rpaocColorSwitch: "Y",
    enableRefillColorSwitch: "Y",
    enableRefillButtonColorSwitch: "N",

    messagesRequirePatientPresent: "5-8",

    //posSimplificationHighlightScriptsEnabled: 'N',

    posSimplificationPatientSearchEnabled: "N",
    posSimplificationScriptLocationEnabled: "N",
    posSimplificationHighlightScriptsEnabled: "N",
    //posSimplificationCombineSignatureEnabled: 'N',
    posSimplificationSuppressIsPatientPresentScreensEnabled: "N",
    posSimplificationRemoveTransactionDetailsScreenEnabled: "N",
    posSimplificationAddEnrollAllEnabled: "N",
    posSimplificationRemoveSignatureVerificationEnabled: "N",
    posSimplificationParallelPath: "N",

    rxRecentlyVerifiedIntervalInMinutes: "30",
    languagePreferencePromptSuppressed: "N",
    languagePreferencePromptDrivethruSuppressed: "N",
    languagePreferencePromptDOBExclusion: "",
    autofillConfirmationScriptDrugNameDisplaySwitch: "N",
    state_specific_accept_verbiage: " ",
    state_specific_decline_verbiage: " ",
    state_specific_verbiage: "N",
    ninetyDayEnrollDisplayOnDebitReaderSwitch: "N",
    ninetyDayDisplayRxAtPOSSwitch: "N",
    stateDisabledforFlushotCoupon: "AR,NY,NJ",
    readyfillEnrollAllButtonsDisplayOnDebitReaderSwitch: "N",
    ETWPrep: "N",
    enableSurveyInfoForMedallia: "N"
  },
  storeData: {
    isOffline: false,
    rdyFillLiteConfirmationFlagCheck: "off"
  },
  txnInfo: {},
  messages: {
    txnStartTimestamp: null
  },
  headerData: {
    token: null
  },
  screenId: 2,
  versionNo: 1,
  timestampFormat: "yyyymmddHHMMss",
  translationTimeFormat: "HHss",
  transactionTimeFormat: "yyyy-mm-dd HH:MM:ss",
  barCodeTimeFormat: "yyyy-mm-dd HH:MM:ss.l",
  storeLocalTimeFormat: "HH:MM:ss",
  opportunityTimestampFormat: "yyyy-mm-dd HH:MM:ss",
  opportunityBirthDateFormat: "MM/dd/yyyy",
  opportunityDateFormat: "yyyymmdd",
  opportunity: {
    txnStartTimestamp: null
  },
  opportunityCustomerData: {
    en: {
      title: "Text me about how I can easily create an online account",
      infoTxt:
        "By clicking yes, you consent to receive a one-time marketing SMS message to learn more about tools and services available through a CVS.com account at the phone number provided above. Consent is not a condition of purchase and may be revoked at any time.Your carrier’s message and data rates apply.",
      oldTitle: "Text me about mobile prescription pickup",
      oldInfoTxt:
        "By clicking yes, you consent to receive a one-time marketing SMS message to learn more about mobile prescription pickup at the phone number provided above. Consent is not a condition of purchase and may be revoked at any time.Your carrier’s message and data rates apply.",
      button1: "Yes",
      button2: "No",
      button3: "Yes & Update #"
    },
    es: {
      title:
        "Me puede enviar un mensaje de texto sobre cómo puedo crear fácilmente una cuenta en",
      infoTxt:
        "Al aceptar, Ud. está dando su consentimiento para recibir un mensaje de texto, solo una vez, para obtener más información sobre productos y servicios disponibles a través de una cuenta de CVS.com al numero de teléfono proporcionado anteriormente.  El consentimiento no es una condición de compra y puede ser revocado en cualquier momento.  Cargos de mensajes y datos aplican.",
      button1: "S?",
      button2: "No",
      button3: "S? & Actualizar #"
    }
  },
  durScreenData: {
    en: {
      voidTransaction: {
        buttons: ["Yes", "No"],
        headerText: "Warning",
        bodyText: "Are you sure you want to cancel?",
        image: "Question.gif"
      },
      removePrescription: {
        buttons: ["OK"],
        headerText: "Warning",
        bodyText: "Remove prescription from the order.",
        image: "Error.gif"
      },
      invalidCredentials: {
        buttons: ["OK"],
        headerText: "Warning",
        bodyText: "Invalid credentials. Please re-enter or re-scan.",
        image: "Error.gif"
      },
      invalidBarcode: {
        buttons: ["OK"],
        headerText: "Error",
        bodyText: "Unexpected Barcode Type Scanned."
      }
    }
  },
  durConstants: {
    SERVICE_FAILURE: "SERVICE_FAILURE"
  },
  demographicScreenData: {
    en: {
      inCorrectPhoneReason: {
        buttons: [
          '<p style="font-size:0.8em">Customer is Incorrect <br/> Person to Contact</p>',
          '<p style="font-size:0.8em">Update Contact <br/> Information</p>'
        ],
        headerText: "Patient Contact",
        bodyText:
          'The customer selected "No" which indicates the phone <br/>number listed is NOT the best number to reach him/her.<br/> Ask the customer which reason applies:<br/>',
        image: "Question.gif"
      }
    }
  },
  relationshipActionData: {
    en: {
      printForm: {
        buttons: ["OK"],
        headerText: "Print Form",
        bodyText: "Forms will print upon the end of sale."
      }
    }
  },
  enableRefillAtPickup: {
    categoryType: "ERatPU",
    en: {
      rxcCommunicationError: {
        buttons: ["OK"],
        headerText: "Unable to communicate to RxConnect",
        bodyText:
          "Unable to communicate to RxConnect. Function can not be performed."
      },
      thresholdReached: {
        buttons: ["OK"],
        headerText: "Maximum Refills",
        bodyText:
          "You have reached the maximum number of refills that can be processed as part of this submission <br><br> <strong>Note:</strong> You may choose to re-access the 'View Eligible Refills' button and submit remaining refills."
      }
    }
  },
  extraCareEnrollment: {
    extraCareOptions: { text: "Choose an option", header: "Enrollment HQ" },
    extraCareEmailLookup: {
      header: "ExtraCare Enrollment",
      text: "Enter customer's email address."
    },
    extraCareEnrollment: {
      header: "ExtraCare Enrollment",
      text:
        "ExtraCare Enrollment is quick and easy. Request customer's name, phone # and email address, then scan a new EC card."
    }
  },
  keyBoardConfig: {
    next: "",
    prev: "",
    cancel: "",
    showAddrLookupButton: false,
    showAltKeyButton: false,
    showEmailKeyBoard: false
  },
  socket: {
    reconnect: true,
    endpoint: "wss://wecare.localhost.stores.cvs.com:9900/associate"
  },
  loggedInUser: {},
  pageTitle: "CVS Health",
  BASKET_SCENARIO: {
    CONSTANT: "scenario",
    DELIMITER: "."
  },
  MONTH_MAX_DAYS: {
    JAN: 31,
    FEB: 29,
    MAR: 31,
    APR: 30,
    MAY: 31,
    JUN: 30,
    JUL: 31,
    AUG: 31,
    SEP: 30,
    OCT: 31,
    NOV: 30,
    DEC: 31
  },
  DATE_DELIMITER: "-",
  DEFAULT_POLL_INTERVAL: 900000,
  ID_TYPES: {
    "01": "Military ID",
    "02": "State ID",
    "05": "Passport",
    "06": "Drivers License",
    "07": "SSN",
    "08": "Tribal ID"
  },
  RELATIONSHIP: {
    "01": "Patient",
    "02": "Patient/ Legal Guardian",
    "03": "Spouse",
    "04": "Caregiver",
    "05": "Other (ASAP-2005)"
  },
  RELATIONSHIP_TO_PATIENT: {
    "01": "Patient",
    "02": "Parent",
    "03": "Spouse",
    "04": "Caregiver",
    "05": "Relative",
    "06": "Friend"
  },
  PATIENT_DETAILS: {
    PREFERRED_CONTACT_HOME: 1,
    PREFERRED_CONTACT_OFFICE: 2,
    PREFERRED_CONTACT_MOBILE: 3,
    PREFERRED_CONTACT_INVALID_HOME: 6,
    PREFERRED_CONTACT_INVALID_OFFICE: 8,
    PREFERRED_CONTACT_INVALID_MOBILE: 7,
    "1": "home",
    "2": "work",
    "3": "mobile",
    "6": "home",
    "8": "work",
    "7": "mobile",
    home: "1",
    work: "2",
    mobile: "3",
    "invalid home": "6",
    "invalid work": "8",
    "invalid mobile": "7",
    LABELS: {
      "1": "Home",
      "2": "Work",
      "3": "Cell",
      "6": "Invalid Home",
      "8": "Invalid Work",
      "7": "Invalid Cell"
    }
  },
  mceSurvey: {
    maxCycleCount: 1,
    currentCount: 0
  },
  PSE_CF_LOG:
    "Pursuant to Federal and certain State Law, when purchasing items containing Pseudoephedrine, purchasers' information must be logged. Section 1001 of Title 18, United States Code, states that whoever, with respect to the logbook, knowingly and willfully falsifies, conceals, or covers up by any trick, scheme, or device a material fact, or makes any materially false, fictitious, or fraudulent statement or representation, or makes or uses any false writing or document knowing the same to contain any materially false, fictitious, or fraudulent statement or entry, shall be fined not more than $250,000 if an individual or $500,000 if an organization, imprisoned not more than five years, or both.",
  THRESHOLD_AMOUNT: {
    priceModify: 10,
    voidTransaction: 10,
    refund: 10
  },
  MAXIMUM_LIMIT: {
    otcAmountLimit: 999.99,
    paidOutsLimit: 200
  },
  LIMIT_BILL_PAY: {
    maxLimit: 999,
    minLimit: 1
  },
  lastCallResponse: {},
  PROG_SUB_TYPE: {
    AOB: {
      AOB_REQUIRED_PT: 1,
      AOB_REQUIRED_REP: 2,
      AOB_SIGN_DATE: 3,
      AOB_REFUSE: 4,
      AOB_REFUSE_MAXDAYS: 5,
      AOB_REFUSE_THRESHOLD: 6,
      AOB_RETURN: 7
    },
    ABN: {
      ABN_REQUIRED: 1,
      ABN_OPTION: 3,
      ABN_OPTION_MISMATCH_1: 4,
      ABN_OPTION_MISMATCH_2: 5,
      ABN_OPTION_MISMATCH_3: 6,
      ABN_REFUSE_UNASSIGNED: 7,
      ABN_REFUSE_ASSIGNED_ITEMS: 9,
      ABN_EMPLOYEE: 10,
      ABN_SIGN_DATE: 11,
      ABN_RETURN: 12
    }
  },
  CONSTANTS: {
    SOLD_KEY: "SLD"
  },
  INFORMATION_SEPERATOR: "\u001c",
  COLOUMN_SEPERATOR: "\u001E",
  parallelPrompt: {
    text: {
      target: {
        eng: {
          phr: {
            screeenText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            customerText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            phone: null,
            customerButtonList: [SKIP_TEXT, NO_TEXT, YES_TEXT],
            textList: [SKIP_TEXT, NO_TEXT, YES_TEXT]
          },
          phrBtn: {
            screeenText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            buttonList: [SKIP_TEXT, NO_TEXT, YES_TEXT],
            phone: null
          },
          preferred: {
            screeenText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            customerText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            phone: null,
            customerButtonList: [SKIP_TEXT, NO_TEXT, YES_TEXT],
            textList: [SKIP_TEXT, NO_TEXT, YES_TEXT]
          },
          preferredBtn: {
            screeenText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            phone: null,
            buttonList: [SKIP_TEXT, NO_TEXT, YES_TEXT]
          },
          customerEntry: {
            screeenText:
              "Enter a 10-digit phone number below to lookup and apply your ExtraCare® card",
            phone: "(   )     -     ",
            customerText:
              "Enter a 10-digit phone number below to lookup and apply your ExtraCare® card",
            textList: [SKIP_TEXT, YES_TEXT]
          },
          customerEntryBtn: {
            screeenText:
              "Enter a 10-digit phone number below to lookup and apply your ExtraCare® card",
            phone: "(   )     -     ",
            textList: [SKIP_TEXT, YES_TEXT],
            buttonList: [SKIP_TEXT, YES_TEXT]
          }
        },
        esp: {
          phr: {
            screeenText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            customerText:
              "Selecciona OK para aplicar la tarjeta ExtraCare®\u001Cvinculada al siguiente número de teléfono\u001C\u001C<PHONE_NAME_PLACEHOLDER>",
            phone: null,
            customerButtonList: [ESP_SKIP_TEXT, ESP_NO_TEXT, ESP_YES_TEXT],
            textList: [SKIP_TEXT, NO_TEXT, YES_TEXT]
          },
          phrBtn: {
            screeenText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            buttonList: [SKIP_TEXT, NO_TEXT, YES_TEXT],
            phone: null
          },
          preferred: {
            screeenText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            customerText:
              "Selecciona OK para aplicar la tarjeta ExtraCare®\u001Cvinculada al siguiente número de teléfono\u001C\u001C<PHONE_NAME_PLACEHOLDER>",
            phone: null,
            customerButtonList: [ESP_SKIP_TEXT, ESP_NO_TEXT, ESP_YES_TEXT],
            textList: [SKIP_TEXT, NO_TEXT, YES_TEXT]
          },
          preferredBtn: {
            screeenText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            phone: null,
            buttonList: [SKIP_TEXT, NO_TEXT, YES_TEXT]
          },
          customerEntry: {
            screeenText:
              "Enter a 10-digit phone number below to lookup and apply your ExtraCare® card",
            phone: "(   )     -     ",
            customerText:
              "Ingrese un número de teléfono de 10 dígitos a continuación para realizar una búsqueda y aplicar su tarjeta ExtraCare®",
            textList: [SKIP_TEXT, YES_TEXT]
          },
          customerEntryBtn: {
            screeenText:
              "Enter a 10-digit phone number below to lookup and apply your ExtraCare® card",
            phone: "(   )     -     ",
            textList: [SKIP_TEXT, YES_TEXT],
            buttonList: [SKIP_TEXT, YES_TEXT]
          }
        }
      },
      core: {
        eng: {
          phr: {
            screeenText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            customerText:
              "ENG\u001CSelect OK to apply the ExtraCare{3} Card linked \u001Cto the <PHONE_NAME_PLACEHOLDER> below\u001C\u001CPHONE_NUMBER\u001C\u001C\u001C\u001C\u001C\u001C\u001C1\u001CNA\u001C200200200\u001CSkip\u001C2\u001CNo\u001C200000000\u001CNo\u001C3\u001CYes\u001C000200000\u001CYes\u001C4\u001C\u001C\u001C\u001C\u001C",
            phone: null,
            customerButtonList: [SKIP_TEXT, NO_TEXT, YES_TEXT],
            textList: [SKIP_TEXT, NO_TEXT, YES_TEXT]
          },
          phrBtn: {
            screeenText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            buttonList: [SKIP_TEXT, NO_TEXT, YES_TEXT],
            phone: null
          },
          preferred: {
            screeenText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            customerText:
              "ENG\u001CSelect OK to apply the ExtraCare{3} Card linked \u001Cto the <PHONE_NAME_PLACEHOLDER> below\u001C\u001CPHONE_NUMBER\u001C\u001C\u001C\u001C\u001C\u001C\u001C1\u001CNA\u001C200200200\u001CSkip\u001C2\u001CNo\u001C200000000\u001CNo\u001C3\u001CYes\u001C000200000\u001CYes\u001C4\u001C\u001C\u001C\u001C\u001C",
            phone: null,
            customerButtonList: [SKIP_TEXT, NO_TEXT, YES_TEXT],
            textList: [SKIP_TEXT, NO_TEXT, YES_TEXT]
          },
          preferredBtn: {
            screeenText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            phone: null,
            buttonList: [SKIP_TEXT, NO_TEXT, YES_TEXT]
          },
          customerEntry: {
            screeenText:
              "Enter a 10-digit phone number below to lookup and apply your ExtraCare® card",
            phone: "(   )     -     ",
            customerText:
              "ENG\u001CEnter a 10-digit phone number below to lookup and\u001Capply your ExtraCare{3} card\u001C\u001C\u001CSkip\u001CClear\u001CYes",
            textList: [SKIP_TEXT, YES_TEXT]
          },
          customerEntryBtn: {
            screeenText:
              "Enter a 10-digit phone number below to lookup and apply your ExtraCare® card",
            phone: "(   )     -     ",
            textList: [SKIP_TEXT, YES_TEXT],
            buttonList: [SKIP_TEXT, YES_TEXT]
          }
        },
        esp: {
          phr: {
            screeenText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            customerText:
              "ESP\u001CSelecciona OK para aplicar la tarjeta ExtraCare{3}\u001Cvinculada al <PHONE_NAME_PLACEHOLDER>\u001C\u001CPHONE_NUMBERu001C\u001C\u001C\u001C\u001C\u001C\u001C1\u001CNA\u001C200200200\u001COmitir\u001C2\u001CNo\u001C200000000\u001CNo\u001C3\u001CYes\u001C000200000\u001CSí\u001C4\u001C\u001C\u001C\u001C\u001C",
            phone: null,
            customerButtonList: [ESP_SKIP_TEXT, ESP_NO_TEXT, ESP_YES_TEXT],
            textList: [SKIP_TEXT, NO_TEXT, YES_TEXT]
          },
          phrBtn: {
            screeenText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            buttonList: [SKIP_TEXT, NO_TEXT, YES_TEXT],
            phone: null
          },
          preferred: {
            screeenText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            customerText:
              "ESP\u001CSelecciona OK para aplicar la tarjeta ExtraCare{3}\u001Cvinculada al <PHONE_NAME_PLACEHOLDER>\u001C\u001CPHONE_NUMBERu001C\u001C\u001C\u001C\u001C\u001C\u001C1\u001CNA\u001C200200200\u001COmitir\u001C2\u001CNo\u001C200000000\u001CNo\u001C3\u001CYes\u001C000200000\u001CSí\u001C4\u001C\u001C\u001C\u001C\u001C",
            phone: null,
            customerButtonList: [ESP_SKIP_TEXT, ESP_NO_TEXT, ESP_YES_TEXT],
            textList: [SKIP_TEXT, NO_TEXT, YES_TEXT]
          },
          preferredBtn: {
            screeenText:
              "Select OK to apply the ExtraCare® Card linked to the <PHONE_NAME_PLACEHOLDER> below",
            phone: null,
            buttonList: [SKIP_TEXT, NO_TEXT, YES_TEXT]
          },
          customerEntry: {
            screeenText:
              "Enter a 10-digit phone number below to lookup and apply your ExtraCare® card",
            phone: "(   )     -     ",
            customerText:
              "ESP\u001CIngrese un número de teléfono de 10 dígitos a\u001Ccontinuación para realizar una búsqueda y\u001Caplicar su tarjeta ExtraCare{3}\u001C\u001COmitir\u001CEliminar\u001CSi",
            textList: [SKIP_TEXT, YES_TEXT]
          },
          customerEntryBtn: {
            screeenText:
              "Enter a 10-digit phone number below to lookup and apply your ExtraCare® card",
            phone: "(   )     -     ",
            textList: [SKIP_TEXT, YES_TEXT],
            buttonList: [SKIP_TEXT, YES_TEXT]
          }
        }
      },
      errorMessage: {
        screeenText: "Error occurred in CRM. Please try again later"
      }
    }
  },

  TIME_STAMPS_CONSTANTS: {
    FLUSHOT_SCREEN_NAME: "flu_shot",
    PARALLEL_PROMPT_ENTERED: "parallel_path_prompt_entered",
    PARALLEL_PROMPT_EXITED: "parallel_path_prompt_exited",
    STAFF: "staff",
    CUSTOMER: "customer",
    EXTRACARE_BY_PHR: "extracare_by_phr_confirmation",
    EXTRACARE_BY_PHONE: "extracare_by_phone_confirm",
    EXTRACARE_BY_CUSTOMER: "extracare_phone_entry",
    TIMESTAMP_CANCELLED_KEY: "cancelled",
    TIMESTAMP_VOIDED_KEY: "voided",
    TIMESTAMP_COMPLETED_KEY: "completed"
  },
  PREPAY_CONSTANTS: {
    new: "NEW",
    cancel: "CANCEL",
    completed: "COMP"
  },
  screenNameMap: {
    preferred: "EXTRACARE_BY_PHONE",
    phr: "EXTRACARE_BY_PHR",
    customerEntry: "EXTRACARE_BY_CUSTOMER"
  },
  SPM: {
    SPM_KEY: "SPM",
    TITLE: "Prescription Savings",
    INSTR:
      "Review details of prescription savings and refer any clinical questions to the pharmacist"
  },
  paidOuts: {
    ESS: {
      viewData: {
        inputText: "Enter the Emergency Store Supplies Amount",
        headerText: "Emergency Store Supplies",
        thresholdValueAlertText: "Amount entered exceeds the allowable limit"
      },
      payloadData: {
        sku: 667121,
        upc: 400000311838,
        description: "TGT-RX - Supplies",
        quantity: 1,
        taxableItem: true,
        major: "400000311838",
        minor: ""
      }
    },
    CE: {
      viewData: {
        inputText: "Enter the Customer Escalation Amount",
        headerText: "Customer Escalation",
        thresholdValueAlertText: "Amount entered exceeds the allowable limit"
      },
      payloadData: {
        sku: 667139,
        upc: 400000311845,
        description: "TGT-RX - Cust. SVC",
        quantity: 1,
        taxableItem: true,
        major: "400000311845",
        minor: ""
      }
    },
    THRESHOLD_AMOUNT: 200
  }
});

//Barcode Scanner Broadcast Flag and Listener Object
var BARCODE_SCAN_HANDLER = {
  BARCODE_SCAN: {
    broadcast: true,
    listener: null
  },
  SCANNED_DATA_GENERIC: {
    broadcast: true,
    listener: null
  },
  SCANNED_DATA_ECC: {
    broadcast: true,
    listener: null
  },
  SCANNED_DATA_OTC: {
    broadcast: true,
    listener: null
  },
  SCANNED_DATA_RX: {
    broadcast: true,
    listener: null
  },
  SCANNED_DATA_SPLRX: {
    broadcast: true,
    listener: null
  },
  SCANNED_DATA_PHR: {
    broadcast: true,
    listener: null
  },
  SCANNED_DATA_FASTPASS: {
    broadcast: true,
    listener: null
  },
  SCANNED_DATA_IMAGE: {
    broadcast: true,
    listener: null
  },
  SCANNED_DATA_FORM: {
    broadcast: true,
    listener: null
  },
  SCANNED_DATA_LICENSE: {
    broadcast: true,
    listener: null
  }
};

var DAILY_CONFIG = {
  basketConfig: {},
  messageConfig: {},
  pharmacyInfo: {},
  screenConfig: {},
  patientFormsConfig: {},
  SRDRulesConfig: {},
  actionNoteButtonConfig: {},
  ninetyDayPaymentTerminal: {
    value: "Y"
  },
  esigConfig: {}
};

var appConfig = {
  pageTitle: "CVS Health",
  dateFormat: "MM/DD/YYYY",
  timeFormat: "MM:ss TT",
  barcodeMinLength: 5,
  idleTimerLogout: false,
  store: {
    services: {
      API: {
        patientSearch: "/service/patients/patientSearch",
        prepayOrder: "/service/deliveries/order_details/register",
        prepayDisposition: "/service/deliveries/disposition",
        cancelPrepayOrder: "/service/deliveries/save_order_details",
        prepayBarcodeScan: "/service/bsl/fastpass/transaction/v2/",
        prepayOrderCount: "/service/orders/neverwait_order_count",
        waiters: "/service/patients/waiters",
        patientBasket: "/service/patients/patientProfile",
        patientProfileList: "/service/patients/patientProfile/caregivees",
        printCaregiveeForm: "/service/patients/caregiverprint/print",
        additionalRx: "/service/patients/additionalRxInfo",
        rxScan: "/service/scripts/scan",
        eSignature: "/service/sales/esignature",
        eSignConfig: "/service/messages/esig",
        eSignConfigPayment: "/service/messages/esig/payment",
        total: "/service/sales/completetransaction",
        refund: "/service/sales/completetransaction/refund",
        minuteClinic: "/service/sales/completetransaction/minitclinic",
        pseInquiry: "/service/compliance/pse/inquiry",
        pseLicense: "/service/compliance/pse/license",
        psePurchase: "/service/compliance/pse/purchase",
        pseReturn: "/service/compliance/pse/return",
        pseVoid: "/service/compliance/pse/void",
        rdyFillLiteConfirmationFlag:
          "/service/stores/attributes/rdyfilllite_confirmation_flag",
        pseDecline: "/service/compliance/pse/purchasedecline",
        pseRefusal: "/service/compliance/pse/refusal",
        phrEnrollment: "/service/customers/phr/hrenrollment",
        extraCareLookUp: "/service/customers/ecc/accounts",
        phrRxDwDisposition: "/service/sales/rxdw-gateway-requests",
        ninetyDayRxDWDisposition: "/service/sales/rxdw-gateway-requests",
        experianEmailValidation: "/service/customers/ecc/email",
        addressLookup: "/service/customers/ecc/address",
        agentlogin: "/service/agent/login",
        agentpassword: "/service/agent/password",
        completeRxOrder: "/service/sales/completeorder",
        completeRxOrderDispositionOnly:
          "/service/sales/completeorder/dispositiononly",
        employees: "/service/stores/employees",
        punchinout: "/service/stores/employees/punchinout",
        punches: "/service/stores/employees/punches",
        itemLookUp: "/service/items/front-stores",
        fastPass: "/service/patients/fastpass",
        phrStatus: "/service/customers/phr/enroll-status",
        redeemGiftcard: "/service/sales/completetransaction/print-coupons",
        expedite: "/service/scripts/expedite",
        translationIdService: "/service/bsl/transaction-start",
        cancelledTransactionnumber: "/service/stores/sequences",
        preAuthentication: "/service/sales/billpay/auth",
        billPayQRCode: "/service/sales/billpay/qrcode",
        confirmBillPay: "/service/sales/billpay/confirm",
        billPayRefund: "/service/sales/billpay/refund",
        patientActivationCouponEligibility:
          "/service/patients/rewards-eligibility",
        compileMessages: {
          inStore: "/service/messages/instore/compileAndDisplayMessages",
          rxScan: "/service/scripts/scan",
          completeRxOrder:
            "/service/messages/completeOrder/compileAndDisplayMessages",
          rxSelect: "/service/messages/rxSelect/compileAndDisplayMessages",
          general: "/service/messages/general/compileMessages"
        },
        displayMessages: {
          inStore: "/service/messages/instore/displayMessages",
          rxScan: "/service/messages/rxScan/displayMessages",
          completeRxOrder: "/service/messages/completeOrder/displayMessages",
          rxSelect: "/service/messages/rxSelect/displayMessages",
          general: "/service/messages/general/displayMessages"
        },
        compileOffLineMessages: "/service/messages/compileOffLineMessages",
        getNextMessage: "/service/messages/instore/displayMessages",
        employeeMgmt: "/service/stores/employees",
        mealWaiver: "/service/stores/employees/employeewaiver",
        fastPassPatient: "/service/bsl/fastpass/transaction/",
        recordProcessedTransaction:
          "/service/bsl/pay/transaction/v2/recordtransaction",
        facility: "/service/bsl/rxconnect/facility",
        fastPassScan: "/service/patients/profiles/v2",
        empDetails: "/service/employees/isEmpCredExist/empid",
        validateCredentials: "/service/stores/employees/isEmpCredExist/cred/",
        esigCompression: "/service/stores/esig/esig-compression",
        imageConversion: "/service/stores/esig/image-conversion",
        monitorService: "/monitor/alert/message",
        getContent: "/service/messages/dep/content",
        getOpportunity: "/service/messages/dep/getOpportunity",
        updateOpportunity: "/service/messages/dep/updateOpportunity",
        printService: {
          phrEnrollment: "/service/devices/printers/PHR_Enrollment",
          patientRefuseToSign: "/service/devices/printers/Esig_Refuse",
          mceSurvey: "/service/devices/printers/CVS_Survey",
          phrConfirmation: "/service/devices/printers/PHR_Confirmation",
          flushot: "/service/devices/printers/flushot",
          phrOfferToEnroll: "/service/devices/printers/PHR_Offer",
          phrRedeem: "/service/devices/printers/PHR_Redeem",
          pseDecline: "/service/devices/printers/PSE_Decline",
          tcpa: "/service/devices/printers/TCPA",
          minitclinicDeposits: "/service/devices/printers/MC",
          totalQRCode: "/service/devices/printers/QRCODE"
        },
        storeAttributes: {
          storeNumber: "/service/stores/attributes/store_number",
          stateCode: "/service/stores/attributes/statecode",
          pseRphIdReqired: "/service/stores/attributes/pse_rph_id_req",
          pseEmpTracking: "/service/stores/attributes/pse_emp_tracking",
          pseRefundBlocked: "/service/stores/attributes/pse_block_refund",
          srdIdScanAllowed: "/service/stores/attributes/srdId_scan_allowed",
          paidouts_enabled: "/service/stores/attributes/paidouts_enabled",
          fluShotsOfferenabled:
            "/service/stores/attributes/fluShotsOfferenabled",
          phrEnabled: "/service/stores/attributes/phrEnabled",
          storeInfo: "/service/stores/store-informations/route",
          idleTimeoutValue: "/service/stores/attributes/idle_timeout_value",
          billPayInd: "/service/stores/attributes/bill_pay_ind",
          techOfferCounsel: "/service/stores/attributes/tech_offer_counsel",
          phrGiftCardEnabled:
            "/service/stores/attributes/phr_gift_card_enabled",
          trailOfferGiftCardEnabled:
            "/service/stores/attributes/trail_offer_gift_card_enabled",
          workbrain: "/service/stores/attributes/workbrain_timed",
          rpaocPatientPresent:
            "/service/stores/attributes/rpaoc_patient_present_prompt_required",
          patientCareScreenDiffSwitch:
            "/service/stores/attributes/patientCareScreenDiffSwitch",

          readyFillTextSwitch: "/service/stores/attributes/readyFillTextSwitch",
          ninetyDayTextSwitch: "/service/stores/attributes/ninetyDayTextSwitch",
          proactiveTextSwitch: "/service/stores/attributes/proactiveTextSwitch",
          contactInfoTextSwitch:
            "/service/stores/attributes/contactInfoTextSwitch",
          smsEnrollTextSwitch: "/service/stores/attributes/smsEnrollTextSwitch",
          scriptSyncTextSwitch:
            "/service/stores/attributes/scriptSyncTextSwitch",
          rpaocTextSwitch: "/service/stores/attributes/rpaocTextSwitch",
          enableRefillTextSwitch:
            "/service/stores/attributes/enableRefillTextSwitch",

          readyFillColorSwitch:
            "/service/stores/attributes/readyFillColorSwitch",
          ninetyDayColorSwitch:
            "/service/stores/attributes/ninetyDayColorSwitch",
          proactiveColorSwitch:
            "/service/stores/attributes/proactiveColorSwitch",
          contactInfoColorSwitch:
            "/service/stores/attributes/contactInfoColorSwitch",
          smsEnrollColorSwitch:
            "/service/stores/attributes/smsEnrollColorSwitch",
          scriptSyncColorSwitch:
            "/service/stores/attributes/scriptSyncColorSwitch",
          rpaocColorSwitch: "/service/stores/attributes/rpaocColorSwitch",
          enableRefillColorSwitch:
            "/service/stores/attributes/enableRefillColorSwitch",
          enableRefillButtonColorSwitch:
            "/service/stores/attributes/enableRefillButtonColorSwitch",

          messagesRequirePatientPresent:
            "/service/stores/attributes/messages_require_patient_present",

          //posSimplificationHighlightScriptsEnabled: '/service/stores/attributes/pos_simplification_highlight_scripts_enabled',
          posSimplificationPatientSearchEnabled:
            "/service/stores/attributes/pos_simplification_reduce_patient_search_screens_enabled",
          posSimplificationScriptLocationEnabled:
            "/service/stores/attributes/pos_simplification_script_location_enabled",
          posSimplificationHighlightScriptsEnabled:
            "/service/stores/attributes/pos_simplification_highlight_scripts_enabled",
          //posSimplificationCombineSignatureEnabled: '/service/stores/attributes/pos_simplification_combine_signature_enabled',
          posSimplificationSuppressIsPatientPresentScreensEnabled:
            "/service/stores/attributes/pos_simplification_suppress_is_patient_present_screens_enabled",
          posSimplificationRemoveTransactionDetailsScreenEnabled:
            "/service/stores/attributes/pos_simplification_remove_transaction_details_screen_enabled",
          posSimplificationAddEnrollAllEnabled:
            "/service/stores/attributes/pos_simplification_add_enroll_all_enabled",
          posSimplificationRemoveSignatureVerificationEnabled:
            "/service/stores/attributes/pos_simplification_remove_signature_verification_enabled",
          posSimplificationParallelPath:
            "/service/stores/attributes/pos_simplification_parallel_path_enabled",

          eventTimestampsCapturedEnabled:
            "/service/stores/attributes/event_timestamps_capture_enabled",

          rxRecentlyVerifiedIntervalInMinutes:
            "/service/stores/attributes/rxRecentlyVerifiedIntervalInMinutes",
          languagePreferencePromptSuppressed:
            "/service/stores/attributes/language_preference_prompt_suppressed",
          languagePreferencePromptDrivethruSuppressed:
            "/service/stores/attributes/language_preference_prompt_drivethru_suppressed",
          languagePreferencePromptDOBExclusion:
            "/service/stores/attributes/language_preference_prompt_dob_exclusion",
          autofillConfirmationScriptDrugNameDisplaySwitch:
            "/service/stores/attributes/autofillConfirmationScriptDrugNameDisplaySwitch",
          state_specific_accept_verbiage:
            "/service/stores/attributes/state_specific_accept_verbiage",
          state_specific_decline_verbiage:
            "/service/stores/attributes/state_specific_decline_verbiage",
          state_specific_verbiage:
            "/service/stores/attributes/state_specific_verbiage",
          ninetyDayEnrollDisplayOnDebitReaderSwitch:
            "/service/stores/attributes/ninetyDayEnrollDisplayOnDebitReaderSwitch",
          ninetyDayDisplayRxAtPOSSwitch:
            "/service/stores/attributes/ninetyDayDisplayRxAtPOSSwitch",
          stateDisabledforFlushotCoupon:
            "/service/stores/attributes/stateDisabledforFlushotCoupon",
          readyfillEnrollAllButtonsDisplayOnDebitReaderSwitch:
            "/service/stores/attributes/readyfillEnrollAllButtonsDisplayOnDebitReaderSwitch",
          ETWPrep: "/service/stores/attributes/ETWPrep",
          enableSurveyInfoForMedallia:
            "/service/stores/attributes/enableSurveyInfoForMedallia"
        },
        dailyConfig: {
          basketConfig: {
            interval: 1800000,
            endpoint: "/service/stores/configs/POSBasket",
            active: true
          },
          messageConfig: {
            interval: 1800000,
            endpoint: "/service/stores/configs/POSMessage",
            active: true
          },
          pharmacyInfo: {
            interval: 1800000,
            endpoint: "/service/stores/configs/pharmacy",
            active: true
          },
          screenConfig: {
            interval: 1800000,
            endpoint: "/service/stores/configs/POSScreen",
            active: true
          },
          SRDRulesConfig: {
            interval: 1800000,
            endpoint: "/service/stores/configs/srdRules",
            active: true
          },
          patientFormsConfig: {
            interval: 1800000,
            endpoint: "/service/stores/configs/patientForms",
            active: true
          },
          actionNoteButtonConfig: {
            interval: 1800000,
            endpoint: "/service/stores/configs/actionNote",
            active: true
          },
          ninetyDayPaymentTerminal: {
            interval: 1800000,
            endpoint:
              "/service/stores/attributes/ninety_day_payment_terminal_confirmation",
            active: true
          },
          esigConfig: {
            interval: 1800000,
            endpoint: "/service/stores/configs/esig",
            active: true
          }
        }
      }
    }
  }
};

var BASKET_SCENARIO = {
  ACTION_STATUS: {
    // ID: DISPOSITION
    "1": "1",
    "8": "3",
    "9": "5",
    "7": "4",
    "2": "2",
    "4": "CANCEL_HANDOFF",
    "3": "OK"
  },
  STATUS_KEY: {
    // DISPOSITION: DISPOSITION KEY
    "1": "SLD",
    "2": "EXP",
    "3": "HWB",
    "4": "RTS",
    "5": "RPH",
    OK: "",
    CANCEL_HANDOFF: "",
    "9": "HLD", // Added as part of HCH for view purpose
    "10": "$HLD" //Added as part of HCH for view purpose
  }
};

var TEMPLATE_MAP = {
  messages: {
    // Instore
    "3-3": "first-fill-counsel",
    "3-3-1": "address-persistence-notify",
    "0-4-0-1": "dur-rphInitials",
    "4-1": "patient-counseling",
    "4-2": "patient-counseling",
    "4-3": "dur-mandatory",
    "4-4": "dur-mandatory",
    "4-5": "dur-mandatory",
    "5-1": "ready-fill",
    "5-3": "ready-fill-unenroll",
    "5-4": "auto-fill-confirmation",
    "0-5-8-1": "auto-fill-confirmation",
    "0-5-5-1": "auto-fill-confirmation",
    "5-5": "script-sync",
    "5-6": "off-cycle-pickup",
    "5-7": "ready-fill-lite",
    "0-5-8-0": "is-patient-present",
    "5-8": "drive-ready-fill",
    "0-5-9-0": "is-patient-present",
    "5-9": "message-90days",
    "5-12": "med-d",
    "5-13": "pcps-notify",
    "5-14": "pcps-notify",
    "0-5-15-0": "is-patient-present",
    "5-15": "pcps-notify",
    "0-5-16-2": "enable-refill-at-pickup",
    "0-5-16-3": "is-patient-present",
    "0-5-16-5": "enable-refill-at-pickup",
    "5-17": "pcps-notify",
    "6-1": "extra-care",
    "6-2": "sms-enrollment",
    "6-3-4": "tcpa-caregiving",
    "6-3": "tcpa",
    "6-4": "relationship-action",
    "6-6": "message-90days",
    "0-6-6-2": "is-patient-present",
    "7-1": "patient-demographic",
    "8-1": "srd-pickup-id",
    "0-10-1-0": "is-patient-present",
    "10-1": "pc-notify",
    "0-10-2-0": "is-patient-present",
    "10-2": "pc-notify",
    "0-0-0-18": "phr-enrollment",
    "0-0-0-19": "phr-enrollment",
    "0-0-0-20": "flushot-enrollment"
  },
  basketLevel: {
    // Complete Order
    "2-2": {
      templateUrl: "views/messages/message-centric.html",
      controller: "MessageCentricCtrl",
      windowClass: "minor-popup"
    },
    "2-4": {
      templateUrl: "views/messages/message-centric.html",
      controller: "MessageCentricCtrl",
      windowClass: "minor-popup"
    },
    "2-10": {
      templateUrl: "views/messages/message-centric.html",
      controller: "MessageCentricCtrl",
      windowClass: "minor-popup"
    },
    "2-11": {
      templateUrl: "views/messages/message-centric.html",
      controller: "MessageCentricCtrl",
      windowClass: "minor-popup"
    },
    "2-12": {
      templateUrl: "views/messages/message-centric.html",
      controller: "MessageCentricCtrl",
      windowClass: "minor-popup"
    },
    "2-13": {
      templateUrl: "views/messages/message-centric.html",
      controller: "MessageCentricCtrl",
      windowClass: "minor-popup"
    },
    "2-16": {
      templateUrl: "views/messages/message-centric.html",
      controller: "MessageCentricCtrl",
      windowClass: "minor-popup"
    },
    "2-17": {
      templateUrl: "views/messages/message-centric.html",
      controller: "MessageCentricCtrl",
      windowClass: "minor-popup"
    },
    "2-18": {
      templateUrl: "views/messages/message-centric.html",
      controller: "MessageCentricCtrl",
      windowClass: "minor-popup"
    },
    "2-19": {
      templateUrl: "views/messages/message-centric.html",
      controller: "MessageCentricCtrl",
      windowClass: "minor-popup"
    },
    "2-21": {
      templateUrl: "views/messages/message-centric.html",
      controller: "MessageCentricCtrl",
      windowClass: "minor-popup"
    },
    "2-22": {
      templateUrl: "views/messages/message-centric.html",
      controller: "MessageCentricCtrl",
      windowClass: "minor-popup"
    },
    "2-23": {
      templateUrl: "views/messages/message-centric.html",
      controller: "MessageCentricCtrl",
      windowClass: "minor-popup"
    },
    "2-24": {
      templateUrl: "views/messages/message-centric.html",
      controller: "MessageCentricCtrl",
      windowClass: "minor-popup"
    },
    "3-2": {
      templateUrl: "views/messages/health-wellness.html",
      controller: "HealthWellnessMsgCtrl",
      windowClass: "minor-popup"
    },
    "1-patientLevel": {
      templateUrl: "views/modals/patient-level-action-note.html",
      controller: "PatientLevelActionNoteMessagesCtrl",
      windowClass: "major-popup"
    }
  },
  rxScanMessages: {
    "0-0-0-2": {
      templateUrl: "views/messages/basket/ipledge.html",
      modalCtrl: "IPledgeMessageModalCtrl",
      windowClass: "minor-popup"
    },
    "0-0-0-6": {
      templateUrl: "views/messages/basket/cancelrx.html",
      modalCtrl: "cancelRxModalCtrl",
      windowClass: "minor-popup"
    },
    "1-*": {
      templateUrl: "views/modals/active-note.html", //Add template to show action-notes
      modalCtrl: "ActionNoteMessagesCtrl", //add controller that handles action-notes
      windowClass: "major-popup"
    },
    "9-1": {
      templateUrl: "views/modals/medicare_form.html",
      modalCtrl: "tpComplianceController"
    },
    "0-0-0-7": {
      templateUrl: "views/messages/basket/med-d/med-d.html",
      modalCtrl: "MedDModalCtrl"
    },
    "0-5-10-0": {
      templateUrl: "views/messages/basket/med-b/aob/is-patient-present.html",
      modalCtrl: "MedBModalCtrl",
      windowClass: "minor-popup"
    },
    "5-10-1": {
      templateUrl: "views/messages/basket/med-b/aob/1-2-aob-required.html",
      modalCtrl: "MedBModalCtrl"
    },
    "5-10-2": {
      templateUrl: "views/messages/basket/med-b/aob/1-2-aob-required.html",
      modalCtrl: "MedBModalCtrl"
    },
    "5-10-3": {
      templateUrl: "views/messages/basket/med-b/aob/3-aob-sign-date.html",
      modalCtrl: "MedBModalCtrl"
    },
    "5-10-4": {
      templateUrl: "views/messages/basket/med-b/aob/4-5-aob-refuse.html",
      modalCtrl: "MedBModalCtrl"
    },
    "5-10-5": {
      templateUrl: "views/messages/basket/med-b/aob/4-5-aob-refuse.html",
      modalCtrl: "MedBModalCtrl"
    },
    "5-10-6": {
      templateUrl:
        "views/messages/basket/med-b/aob/6-aob-refuse-threshold.html",
      modalCtrl: "MedBModalCtrl"
    },
    "5-10-7": {
      templateUrl: "views/messages/basket/med-b/aob/7-aob-return.html",
      modalCtrl: "MedBModalCtrl"
    },
    "5-11-1": {
      templateUrl: "views/messages/basket/med-b/abn/1-abn-required.html",
      modalCtrl: "MedBModalCtrl"
    },
    "5-11-2": {
      templateUrl: "views/messages/basket/med-b/abn/2-abn-option.html",
      modalCtrl: "MedBModalCtrl"
    },
    "5-11-3": {
      templateUrl:
        "views/messages/basket/med-b/abn/3-4-5-abn-option-mismatch.html",
      modalCtrl: "MedBModalCtrl"
    },
    "5-11-4": {
      templateUrl:
        "views/messages/basket/med-b/abn/3-4-5-abn-option-mismatch.html",
      modalCtrl: "MedBModalCtrl"
    },
    "5-11-5": {
      templateUrl:
        "views/messages/basket/med-b/abn/3-4-5-abn-option-mismatch.html",
      modalCtrl: "MedBModalCtrl"
    },
    "5-11-6": {
      templateUrl:
        "views/messages/basket/med-b/abn/6-abn-refuse-unassigned.html",
      modalCtrl: "MedBModalCtrl"
    },
    "5-11-7": {
      templateUrl:
        "views/messages/basket/med-b/abn/7-abn-refuse-assigned-items.html",
      modalCtrl: "MedBModalCtrl"
    },
    "5-11-8": {
      templateUrl: "views/messages/basket/med-b/abn/8-abn-employee.html",
      modalCtrl: "MedBModalCtrl"
    },
    "5-11-9": {
      templateUrl: "views/messages/basket/med-b/abn/9-abn-sign-date.html",
      modalCtrl: "MedBModalCtrl"
    },
    "5-11-10": {
      templateUrl: "views/messages/basket/med-b/abn/10-abn-return.html",
      modalCtrl: "MedBModalCtrl"
    },
    "0-0-0-8": {
      templateUrl: "views/messages/basket/med-b-threshold.html",
      modalCtrl: "MedBErrorMessageModalCtrl",
      windowClass: "minor-popup"
    },
    "0-0-0-10": {
      templateUrl: "views/messages/basket/sold-after-expired.html",
      modalCtrl: "SoldAfterExpModalCtrl",
      windowClass: "major-popup"
    },
    "0-0-0-16": {
      templateUrl: "views/messages/basket/script-sync.html",
      modalCtrl: "DefaultRxScanMessageModalCtrl",
      windowClass: "major-popup"
    },
    "0-0-0-17": {
      templateUrl: "views/messages/basket/script-sync.html",
      modalCtrl: "DefaultRxScanMessageModalCtrl",
      windowClass: "major-popup"
    },
    "0-0-0-9": {
      templateUrl: "views/messages/basket/script-sync.html",
      modalCtrl: "DefaultRxScanMessageModalCtrl",
      windowClass: "major-popup"
    },
    "0-2-0-1": {
      templateUrl: "views/messages/basket/drug-coupon.html",
      modalCtrl: "IPledgeMessageModalCtrl",
      windowClass: "minor-popup"
    },
    "0-0-0-22": {
      templateUrl: "views/messages/basket/cancel-pre-pay.html",
      modalCtrl: "cancelPrePayCtrl",
      windowClass: "minor-popup"
    },
    "0-0-0-21": {
      templateUrl: "views/pre-pay/unscanned-pre-pay.html",
      modalCtrl: "UnScannedPrepayModalCtrl",
      windowClass: "major-popup"
    }
  },
  rxSelectMessages: {
    "1-*": {
      templateUrl: "views/modals/active-note.html", //Add template to show action-notes
      modalCtrl: "ActionNoteMessagesCtrl", //add controller that handles action-notes
      windowClass: "major-popup"
    },
    "0-*": {
      templateUrl: "views/modals/basket-rx-item.html", //Add template to show action-notes
      modalCtrl: "BasketRxItemModalCtrl" //add controller that handles action-notes
    }
  },
  completeOrderMessages: {
    "1-*": {
      templateUrl: "views/modals/active-note.html", //Add template to show action-notes
      modalCtrl: "ActionNoteMessagesCtrl", //add controller that handles action-notes
      windowClass: "major-popup"
    },
    "0-0-0-3": {
      templateUrl: "views/messages/basket/immunization.html",
      modalCtrl: "ImmunizationCtrl",
      windowClass: "minor-popup"
    },
    "0-0-0-4": {
      templateUrl: "views/messages/basket/speciality.html",
      modalCtrl: "SpecialityCtrl",
      windowClass: "minor-popup"
    },
    "0-0-0-5": {
      templateUrl: "views/modals/unscanned-rx-list.html", //Add template to show unscanned Rx
      modalCtrl: "UnScannedRxModalCtrl", //add controller that handles unscanned
      windowClass: "major-popup"
    },
    "0-0-0-6": {
      templateUrl: "views/messages/basket/cancelrx.html", //Add template to show unscanned Rx
      modalCtrl: "cancelRxModalCtrl", //add controller that handles unscanned
      windowClass: "minor-popup"
    },
    "0-0-0-13": {
      templateUrl: "views/modals/script-sync.html", //Add template to show unscanned Rx
      modalCtrl: "ScriptSyncCompleteRxOrderModalCtrl" //add controller that handles unscanned
    },
    "0-0-0-14": {
      templateUrl: "views/modals/script-sync.html", //Add template to show unscanned Rx
      modalCtrl: "ScriptSyncCompleteRxOrderModalCtrl" //add controller that handles unscanned
    },
    "0-0-0-15": {
      templateUrl: "views/modals/script-sync.html", //Add template to show unscanned Rx
      modalCtrl: "ScriptSyncCompleteRxOrderModalCtrl" //add controller that handles unscanned
    },
    "0-0-0-17": {
      templateUrl: "views/messages/basket/script-sync-prepack.html",
      modalCtrl: "DefaultRxScanMessageModalCtrl",
      windowClass: "major-popup"
    },
    "0-0-0-21": {
      templateUrl: "views/pre-pay/unscanned-pre-pay.html",
      modalCtrl: "UnScannedPrepayModalCtrl",
      windowClass: "major-popup"
    },
    "0-0-0-23": {
      templateUrl: "views/messages/basket/error-message.html",
      modalCtrl: "errorMessageModalCtrl",
      windowClass: "minor-popup"
    }
  },
  alertMessages: {
    "A-A": {
      templateUrl: "views/dialogs/is-patient-present.html",
      modalCtrl: "IsPatientPresentModalCtrl",
      windowClass: "minor-popup"
    }
  },
  generalMessages: {
    "0-5-16-2": {
      templateUrl: "views/messages/basket/enable-refill-at-pickup-modal.html",
      modalCtrl: "EnableRefillAtPickupModalCtrl",
      windowClass: "major-popup full-popup"
    },
    "0-5-16-5": {
      templateUrl: "views/messages/basket/enable-refill-at-pickup-modal.html",
      modalCtrl: "EnableRefillAtPickupModalCtrl",
      windowClass: "major-popup full-popup"
    },
    "0-5-16-3": {
      templateUrl: "views/messages/basket/is-patient-present-modal.html",
      modalCtrl: "IsPatientPresentDialogCtrl",
      windowClass: "major-popup full-popup"
    }
  }
};

var MSG_TYPE_MAP = {
  "4": "patCounslMsg"
};

var TP_COMPLIENCE_FORM_TYPES = {
  "1": "AOB",
  "2": "ABN",
  "3": "RRP",
  "4": "NIL"
};

var PAGE_TITLE = {
  login: "LOGIN",
  password: "PASSWORD"
};

var STATE_MAP = [
  "AB",
  "BC",
  "MB",
  "NB",
  "NF",
  "NL",
  "NS",
  "NT",
  "ON",
  "PE",
  "QC",
  "SK",
  "YT",
  "CN",
  "MX",
  "US",
  "AK",
  "AL",
  "AR",
  "AZ",
  "CA",
  "CO",
  "CT",
  "DC",
  "DE",
  "FL",
  "GA",
  "HI",
  "IA",
  "ID",
  "IL",
  "IN",
  "KS",
  "KY",
  "LA",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MS",
  "MT",
  "NC",
  "ND",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VA",
  "VT",
  "WA",
  "WI",
  "WV",
  "WY",
  "AS",
  "FM",
  "GU",
  "MP",
  "PR",
  "PW",
  "UM",
  "VI",
  "99"
];

var COUNTRY_MAP = ["US", "CN"];

var PSE_ERROR_MESSAGE = {
  PSE_INQUERY_FAIL: {
    bodyText:
      "PSE sale not authorized Product cannot be sold <br> Remove from bagging area",
    headerText: "PSE Purchase Error",
    buttons: ["OK"]
  },
  PSE_SERVICE_FAIL: {
    bodyText: "Couldn't reach server",
    headerText: "Error",
    buttons: ["OK"]
  },
  PSE_SERVICE_CANCEL: {
    buttons: ["OK"],
    headerText: "",
    bodyText:
      "Cashier canceled action.<br>Product cannot be sold.<br>Remove from bagging area"
  },
  PSE_SERVICE_SCAN_CANCEL: {
    buttons: ["OK"],
    headerText: "",
    bodyText:
      "Cashier canceled action.<br>Product cannot be sold.<br>Remove from bagging area"
  },
  PSE_CUSTOMER_SCAN_CANCEL: {
    buttons: ["OK"],
    headerText: "",
    bodyText:
      "Customer declines to sign PSE log.<br>Product cannot be sold.<br>Remove from bagging area"
  },
  PSE_LICENSE_OPTION_MESSAGE: {
    buttons: ["Scan", "Manual", "Cancel"],
    headerText: "",
    bodyText:
      "Restricted item - ID required. <br>Scan barcode or manually enter ID information"
  },
  PSE_PURCHASE_ERROR_MESSAGE: {
    buttons: ["OK"],
    headerText: "",
    bodyText:
      "PSE sale/refund not authorized Product cannot be sold <br> Remove from bagging area and Void the Item"
  },
  PSE_PURCHASE_TIMEOUT_MESSAGE: {
    buttons: ["OK"],
    headerText: "",
    bodyText: "PSE sale/refund timeout, <br/>Please try again in a few minutes."
  },
  PSE_REQUIRED_VALIDATION_MESSAGE: {
    buttons: ["OK"],
    headerText: "Error",
    bodyText: "Invalid data. Value Required"
  },
  UNKNOWN_PHARMACY: {
    buttons: ["OK"],
    headerText: "Error",
    bodyText:
      "Due to a system issue we are unable to process<br/>this transaction at this time.<br/>Please try again in a few minutes."
  }
};

var SPECIALTY_ORDER_MESSAGE = {
  SPECIALTY_COMPLETE_ORDER_FAIL: {
    bodyText: "All Specialty Items for the Specialty Order# needs to be sold",
    headerText: "Specialty Item Sale",
    buttons: ["OK"]
  },
  SPECIALTY_PRICE_MODIFIY_ERROR: {
    bodyText: "The price of a Specialty Item may not be modified",
    headerText: "",
    buttons: ["OK"]
  },
  SPECIALTY_VOID_ITEM_ERROR: {
    bodyText:
      "Specialty Items may not be voided. To void this item.<br> you will need to void the entire translation",
    headerText: "",
    buttons: ["OK"]
  },
  SPECIALTY_REFUND_ITEM_ERROR: {
    bodyText: "Refund may not be issued for Specialty Items.",
    headerText: "",
    buttons: ["OK"]
  }
};

var PSE_ERROR_CODE = {
  PSE_SUCESS_CODE: "0000",
  PSE_SUCESS_WARNING: "0003",
  PSE_FAIL_CODE: "0004",
  PSE_TIMEOUT_CODE: "0005"
};

var OPPORTUNITY_DISPOSITION_CODE = {
  MAX_TRANSACTION_THRESHOLD: "0006",
  ASSOCIATE_DEFERRED: "0012",
  ASSOCIATE_DECLINED: "0013",
  ASSOCIATE_DECLINED_PATIENT_WAITING: "0014",
  ASSOCIATE_ACCEPTED: "0015",
  PATIENT_CONFIRM: "0016",
  PATIENT_CONFIRM_UPDATE_PHONE: "0017",
  PATIENT_CANCELLED: "0018",
  TRANSACTION_VOID: "0019",
  TCPA_PROMPT_DISPLAYED: "0005"
};

var PATIENT_COUNSELING_PHASE2 = {
  DISPLAY_TITLE_FOR_COUNSELING_MESSAGE: "MANDATORY COUNSELING"
  // 'INSTRUCTION_TEXT_FOR_COUNSELING_MESSAGE': 'Before you leave with your prescriptions, the Pharmacist must speak with you about medications you are picking up today.',
  // 'COUNSELING_MESSAGE_TO_NOTE': '***Please respect the privacy of the patient and DO NOT STATE THE NAMES OF THE MEDICATIONS requiring Pharmacist counseling.***'
};

var CONSUMER_HEALTH_CARE = [
  "01",
  "02",
  "03",
  "05",
  "06",
  "07",
  "11",
  "12",
  "15",
  "17",
  "22",
  "31",
  "44",
  "45",
  "46",
  "63",
  "64",
  "67",
  "68",
  "69",
  "74",
  "79",
  "87",
  "88"
];

var medalliaFsPOSEmpId = "0000000000";
var medalliaPharLocationType = "In store Rx";
var tlogSourceId = "TGT";
var brandInd = "Target";
var regTypeCd = "Rx";

//var READYFILL_HEADER_BUTTON_TYPES {
//  'Label': 'Enroll All Rxs in ReadyFill?',
//  'Description': 'By selecting \'Yes\', all the patient\'s medication below will be enrolled in ReadyFill.',
//  'Buttons': {
//      'EnableAll': {'actionId': '5', 'actionValue', 'Yes'},
//      'No': {'actionId': '1', 'actionValue', 'No'},
//      'NeverAsked': {'actionId': '3', 'actionValue', 'NeverAsked'}
//  }
//}

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

// gulp

var gulp = require("gulp");
var del = require("del");
var less = require("gulp-less");
var concat = require("gulp-concat");

//Temporary hack for running tasks sequentially. This will be fixed in gulp 4.0
//So this has to revisted in the future
var runSequence = require("run-sequence");

var paths = {
  associate: {
    root: "associate/src/main/",
    lessFiles: "styles/less/**/*.less",
    jsFiles: "scripts/",
    libFiles: "scripts/lib/",
    test: "/associate/src/test/"
  }
};

gulp.task("clean", function() {
  return del.sync([paths.associate.root + "public/*"]);
});

gulp.task("less", function() {
  return gulp
    .src(paths.associate.root + paths.associate.lessFiles)
    .pipe(less())
    .pipe(gulp.dest(paths.associate.root + "public/css"));
});

gulp.task("concat", function() {
  return gulp
    .src([
      paths.associate.root + "styles/main.css",
      paths.associate.root + "styles/general.css",
      paths.associate.root + "public/css/**/*.css"
    ])
    .pipe(concat("cvs-style.css"))
    .pipe(gulp.dest(paths.associate.root + "public/css"));
});

gulp.task("watch", function() {
  gulp.watch(
    [
      paths.associate.root + "styles/main.css",
      paths.associate.root + "styles/general.css",
      paths.associate.root + paths.associate.lessFiles,
      paths.associate.root + paths.associate.jsFiles + "/**/*.js"
    ],
    ["build-dev"]
  );
});

gulp.task("libjs-prod", function() {
  return gulp
    .src([
      paths.associate.root + paths.associate.libFiles + "angular.min.js",
      paths.associate.root + paths.associate.libFiles + "angular-filter.js",
      paths.associate.root + paths.associate.libFiles + "angular-resource.js",
      paths.associate.root + paths.associate.libFiles + "angular-cookies.js",
      paths.associate.root + paths.associate.libFiles + "angular-route.js",
      paths.associate.root + paths.associate.libFiles + "angular-ui-router.js",
      paths.associate.root +
        paths.associate.libFiles +
        "angular-sanitize.min.js",
      paths.associate.root +
        paths.associate.libFiles +
        "angular-utf8-base64.js",
      paths.associate.root + paths.associate.libFiles + "repeat-polyfill.js",
      paths.associate.root + paths.associate.libFiles + "ui-bootstrap.js",
      paths.associate.root + paths.associate.libFiles + "ui-bootstrap-tpls.js",
      paths.associate.root + paths.associate.libFiles + "main.js",
      paths.associate.root + paths.associate.libFiles + "mqtt.js",
      paths.associate.root + paths.associate.libFiles + "RetailPlatform.js",
      paths.associate.root + paths.associate.libFiles + "wecare.js"
    ])
    .pipe(concat("lib.js"))
    .pipe(gulp.dest(paths.associate.root + "public/js"));
});

gulp.task("libjs-dev", function() {
  return gulp
    .src([
      paths.associate.root + paths.associate.libFiles + "angular.min.js",
      paths.associate.root + paths.associate.libFiles + "angular-filter.js",
      paths.associate.root + paths.associate.libFiles + "angular-resource.js",
      paths.associate.root + paths.associate.libFiles + "angular-cookies.js",
      paths.associate.root + paths.associate.libFiles + "angular-route.js",
      paths.associate.root + paths.associate.libFiles + "angular-ui-router.js",
      paths.associate.root +
        paths.associate.libFiles +
        "angular-sanitize.min.js",
      paths.associate.root +
        paths.associate.libFiles +
        "angular-utf8-base64.js",
      paths.associate.root + paths.associate.libFiles + "repeat-polyfill.js",
      paths.associate.root + paths.associate.libFiles + "ui-bootstrap.js",
      paths.associate.root + paths.associate.libFiles + "ui-bootstrap-tpls.js",
      paths.associate.root + paths.associate.libFiles + "main.js",
      paths.associate.root + paths.associate.libFiles + "mqtt.js",
      paths.associate.root + paths.associate.libFiles + "RetailPlatformDbg.js",
      paths.associate.root + paths.associate.libFiles + "wecare.js"
    ])
    .pipe(concat("lib.js"))
    .pipe(gulp.dest(paths.associate.root + "public/js"));
});

gulp.task("wecarejs", function() {
  return gulp
    .src([
      paths.associate.root + paths.associate.jsFiles + "app.js",
      paths.associate.root + paths.associate.jsFiles + "config.js",
      paths.associate.root + paths.associate.jsFiles + "logger.js",
      paths.associate.root + paths.associate.jsFiles + "utils.js",
      paths.associate.root + paths.associate.jsFiles + "services/**/*.js",
      paths.associate.root + paths.associate.jsFiles + "controllers/**/*.js",
      paths.associate.root + paths.associate.jsFiles + "directives/**/*.js",
      paths.associate.root + paths.associate.jsFiles + "factories/**/*.js",
      paths.associate.root + paths.associate.jsFiles + "filters/**/*.js"
    ])
    .pipe(concat("cvs.js"))
    .pipe(gulp.dest(paths.associate.root + "public/js"));
});

gulp.task("build-dev", function(callback) {
  runSequence(
    "clean",
    "less",
    "concat",
    "libjs-dev",
    "wecarejs",
    "watch",
    callback
  );
});

gulp.task("dev", ["build-dev"]);

gulp.task("build", function(callback) {
  runSequence("clean", "less", "concat", "libjs-prod", "wecarejs", callback);
});
gulp.task("default", ["build"]);

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
