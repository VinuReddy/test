// logger

var LOGGER = {};
LOGGER.settings = {
  enable: true,
  level: "INFO",
  console: false,
  dateFormat: "yyyy-mm-dd HH:MM:ss"
};
LOGGER.determineLevelNumber = function(levelName) {
  var number = 0;
  if (levelName === "TRACE") {
    number = 1;
  } else if (levelName === "DEBUG") {
    number = 2;
  } else if (levelName === "INFO") {
    number = 3;
  } else if (levelName === "WARN") {
    number = 4;
  } else if (levelName === "ERROR") {
    number = 5;
  } else if (levelName === "FATAL") {
    number = 6;
  }
  return number;
};
LOGGER.send = function(level, data) {
  if (!LOGGER.socket) {
    LOGGER.socket = angular
      .element(document.body)
      .injector()
      .get("SocketTrafficHandler");
  }
  LOGGER.socket.send(
    JSON.stringify({
      type: "LOG",
      options: {
        message: data,
        logLevel: level
      }
    }),
    false
  );
};
LOGGER.print = function(level, message, loggerName) {
  // var now = new Date();
  // var logDateTime = now.format(LOGGER.settings.dateFormat);
  var logMessage = "Associate screen: " + level + " :: ";
  if (loggerName) {
    logMessage += loggerName + ":";
  }
  logMessage += " " + message;
  if (!LOGGER.CONFIG) {
    LOGGER.CONFIG = angular
      .element(document.body)
      .injector()
      .get("CONFIG");
  }
  if (LOGGER.CONFIG) {
    if (LOGGER.CONFIG.txnInfo.transactionId) {
      logMessage += " :TXN-ID: " + LOGGER.CONFIG.txnInfo.transactionId;
    }
    if (LOGGER.CONFIG.txnInfo.transactionNumber) {
      logMessage += " :TXN-NUM: " + LOGGER.CONFIG.txnInfo.transactionNumber;
    }
    if (LOGGER.CONFIG.loggedInUser.id) {
      logMessage += " :ASSOCIATE-ID: " + LOGGER.CONFIG.loggedInUser.id;
    }
  }
  if (LOGGER.settings.console) {
    console.log(logMessage);
  }
  if (
    LOGGER.settings.enable &&
    LOGGER.determineLevelNumber(level) >=
      LOGGER.determineLevelNumber(LOGGER.settings.level)
  ) {
    LOGGER.send(level, logMessage);
  }
};

LOGGER.trace = function(message, loggerName) {
  LOGGER.print("TRACE", message, loggerName);
};

LOGGER.debug = function(message, loggerName) {
  LOGGER.print("DEBUG", message, loggerName);
};

LOGGER.info = function(message, loggerName) {
  LOGGER.print("INFO", message, loggerName);
};

LOGGER.warn = function(message, loggerName) {
  LOGGER.print("WARN", message, loggerName);
};

LOGGER.error = function(message, loggerName) {
  LOGGER.print("ERROR", message, loggerName);
};

LOGGER.fatal = function(message, loggerName) {
  LOGGER.print("FATAL", message, loggerName);
};

