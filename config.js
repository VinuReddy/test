
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


