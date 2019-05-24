use strict';

angular.module('weCarePlusApp')
    .factory('PollingFactory', function(Request, CONFIG, $location, DialogService) {
        var defaultPollingTime = CONFIG.DEFAULT_POLL_INTERVAL;
        var polls = {};
        var obj = {};
        var loggerName = 'Polling';
        obj.startPolling = function(name, url, pollingTime, callback, failCallback) {
            // Check to make sure poller doesn't already exist
            if (!polls[name]) {
                var poller = function() {
                    Request.invoke({
                        url: url,
                        triggerOffline: "NO",
                        method: 'GET'
                    }).then(callback, failCallback);
                }
                poller();
                polls[name] = setInterval(poller, pollingTime || defaultPollingTime);
            }
        };

        obj.stopPolling = function(name) {
            clearInterval(polls[name]);
            delete polls[name];
        };
        obj.dailyConfigPolling = function() {
            angular.forEach(appConfig.store.services.API.dailyConfig, function(dailyConfigValue, dailyConfigKey) {
                if (dailyConfigValue.active) {
                    obj.startPolling(dailyConfigKey, dailyConfigValue.endpoint, dailyConfigValue.interval, function(data) {
                        DAILY_CONFIG[dailyConfigKey] = data;
                    }, function(data, storeResponseCode, httpResponseCode) {
                        if (DAILY_CONFIG[dailyConfigKey] && Object.keys(DAILY_CONFIG[dailyConfigKey]).length) {
                            LOGGER.info('Error refreshing store config. But it is loaded previously:: ' + dailyConfigKey);
                        } else {
                            LOGGER.info('Error loading store config. Cannot do anything.  ::  ' + dailyConfigKey);
                            var modalOptions = {
                                buttons: ['Ok'],
                                headerText: 'Error loading Configuration',
                                bodyText: "Unable to load configuration. Please reboot the RxPickup station"
                            };
                            DialogService.showDialog({}, modalOptions).then(function(result) {
                                $location.url('/login');
                            });
                        }
                    });
                }
            });

            angular.forEach(appConfig.store.services.API.storeAttributes, function(url, attribName) {
                obj.startPolling('SA_' + attribName, url, 3600000,
                    function(data) {
                        CONFIG.storeAttributes[attribName] = data && (data.value || data);
                    },
                    function(data, storeResponseCode, httpStatusCode) {
                        if (CONFIG.storeAttributes[attribName]) {
                            LOGGER.info('Error refreshing store attribute. But it is loaded previously: ' + attribName);
                        } else {
                            LOGGER.info('Error loading store attribute. Cannot do anything.  ::  ' + attribName);
                            var modalOptions = {
                                buttons: ['Ok'],
                                headerText: 'Error loading Configuration',
                                bodyText: "Unable to load configuration. Please reboot the RxPickup station"
                            };
                            DialogService.showDialog({}, modalOptions).then(function(result) {
                                $location.url('/login');
                            });
                        }
                    }
                );
            });
        };
        return obj;
    });
