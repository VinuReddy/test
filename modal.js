// modal ctrl

angular
  .module("weCarePlusApp")
  .controller("BasketPhoneLookupCtrl", function(
    $scope,
    $modalInstance,
    deferred,
    OrderFactory,
    PatientFactory,
    DialogService,
    Request,
    OrderService,
    ExtraCareEnrollmentService
  ) {
    LOGGER.info("Entering BasketPhoneLookupCtrl", "BasketPhoneLookupCtrl");

    $scope.cancelLookup = function() {
      LOGGER.info(
        "Entering cancelLookup method",
        "BasketPhoneLookupCtrl > cancelLookup"
      );

      var modalOptions = {
        buttons: ["Yes", "No"],
        headerText: "Confirm",
        bodyText: "Are you sure you wish to CANCEL this operation?"
      };
      DialogService.showDialog({}, modalOptions).then(function(result) {
        if (result == "Yes") {
          $modalInstance.dismiss();
          deferred.reject();
        }
      });
    };

    $scope.resolvePhoneLookup = function(result) {
      deferred.resolve(result);
      $modalInstance.dismiss();
    };

    $scope.lookup = function(inputvalue) {
      LOGGER.info("Entering lookup method", "BasketPhoneLookupCtrl > lookup");

      if (!inputvalue || (inputvalue && inputvalue.length < 10)) {
        var empModalOptions = {
          buttons: ["Okay"],
          headerText: "Error",
          bodyText: "Invalid Phone Number"
        };
        DialogService.showDialog({}, empModalOptions).then(function(result) {});
        return;
      }
      $scope.resolvePhoneLookup(inputvalue);
    };
  });
