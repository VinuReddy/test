// home

<div class="row" ng-init="init()">
    <div class="container-fluid home-container">
        <div class="col-md-4 col-xs-4 pd-border bg-home-left pd-home-left">
            <div class="row bg-frst-left">
                <div class="rx-first-bx"><span class="rx-label"></span> <span class="rx-number"></span></div>
                <div class="rx-amt">Enter Item <span ng-if="isRefund">REFUND</span></div>
            </div>
            <div class="row bg-scnd-left scroll-vertical">
                <div>
                    <address>
                        &nbsp;
                        <!-- 123 Any Street -->
                        {{CONFIG.storeAttributes.storeInfo.streetAddr1}}
                        <br> &nbsp;
                        <!-- AnyTown,RI 02895 -->
                        {{CONFIG.storeAttributes.storeInfo.cityName}}, {{CONFIG.storeAttributes.storeInfo.stateCode}} {{CONFIG.storeAttributes.storeInfo.zipCode}}
                        <br> &nbsp;
                        <!-- 555.555.1231 -->
                        {{CONFIG.storeAttributes.storeInfo.rxPhoneNumber}}
                        <br>
                    </address>
                    <div class="row" ng-if="getAllItemsInOrder().length || minuteClinicDepositsOrder.length">
                        &nbsp;&nbsp;<b>REG#</b><span>{{CONFIG.registerData.id}}</span> &nbsp;
                        <b>TRN#</b><span>{{getCurrentTxnNum()}}</span> &nbsp;
                        <b>CSHR#</b><span>{{CONFIG.loggedInUser.id}}</span> &nbsp;
                        <b>STR#</b><span>{{CONFIG.storeAttributes.storeNumber}}</span>
                    </div>
                    <div>
                        <div class="row" data-ng-repeat="item in getAllItemsInOrder()">
                            <span data-ng-if="item.basketItemInfo">
                                <span class="col-md-8 col-xs-8 pull-left text-left item-pad">
                                    F 1 RX #: {{item.basketItemInfo.rxNum | prepandZero:8}}{{item.basketItemInfo.refillNum | prepandZero:3}}{{item.basketItemInfo.partialFillSeqNum | prepandZero:1}}
                                </span>
                            <span class="col-md-4 col-xs-4 pull-right text-right padding-right-74" ng-hide="item.basketItemInfo.fillDisposition.priceModify">
                                    {{item.basketItemInfo.patPayAmt | fixDecimal:2}}
                                </span>
                            <span class="col-md-4 col-xs-4 pull-right text-right padding-right-74" ng-show="item.basketItemInfo.fillDisposition.priceModify">
                                    {{item.basketItemInfo.fillDisposition.modifiedPrice | fixDecimal:2}}
                                </span>
                            </span>
                            <span data-ng-if="item.sku">
                                <span class="col-md-8 col-xs-8 pull-left text-left item-pad">{{item.description + item.pseGramsPerBox}}</span>
                            <span class="col-md-4 col-xs-4 pull-right text-right padding-right-74" ng-hide="item.priceModify">
                                    {{item.retailPrice | fixDecimal:2}}
                                </span>
                            <span class="col-md-4 col-xs-4 pull-right text-right padding-right-74" ng-show="item.priceModify">
                                    {{item.modifiedPrice | fixDecimal:2}}
                                </span>
                            </span>
                            <span data-ng-if="item.description === 'TAXABLE ITEM' || item.description === 'CVS OTC item'">
                                <span class="col-md-8 col-xs-8 pull-left text-left">{{item.description}}</span>
                            <span class="col-md-4 col-xs-4 pull-right text-right padding-right-55">{{item.retailPrice | fixDecimal:2}} {{item.description === 'TAXABLE ITEM' ? 'T' : 'N'}}</span>
                            </span>
                            <!-- Bill Pay -->
                            <span data-ng-if="item.accountNumber">
                                <span class="col-md-8 col-xs-8 pull-left text-left">{{item.itemDescription}}</span>
                            <span class="col-md-4 col-xs-4 pull-right text-right padding-right-74">
                                {{item.price | fixDecimal:2}}
                            </span>
                            </span>
                        </div>
                        <div class="row" data-ng-repeat="item in minuteClinicDepositsOrder">
                            <span>
                                <span class="col-md-8 col-xs-8 pull-left text-left">{{item.label}}</span>
                            <span class="col-md-4 col-xs-4 pull-right text-right padding-right-74">{{item.amount | fixDecimal:2}}</span>
                            </span>
                        </div>
                        <div class="row" ng-if="getEncodedEccNumber()">
                            <span class="col-md-12 col-xs-12 pull-left text-left"> ExtraCare Card #: ********{{getEncodedEccNumber()}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row bg-thrd-left">
                <div class="rx-thrd-bx">
                    <div class="col-md-6 col-xs-6 rx-cal-label">Total:</div>
                    <div class="col-md-6 col-xs-6 txt-right rx-total"><span data-ng-bind="totalAmount()"></span></div>
                </div>
            </div>
        </div>
        <div class="col-md-8 col-xs-8 pd-border bg-home-right ">
            <div class="pd-home-right brderRadius-10 scroll-vertical">
                <div class="mg-home-row-gap"></div>
                <div class="mg-home-right">
                    <div class="col-md-1 col-xs-1 mg-right-btn"></div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                        <a class="btn  key-grey btn-vCenter" data-ng-disabled="voidEarlierItemDisabled || isBillPay || activeFluShots" data-ng-click="voidEarlierItem()" data-ng-class="{active: voidEarlierItemActive}">
                            Void <br> Earlier Item
                        </a>
                    </div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                        <a class="btn  key-grey btn-vCenter" data-ng-disabled="activeFluShots || isBillPay || activePaidOut || isRefund || minuteClinicDepositsOrder.length " data-ng-click='priceModify()' data-ng-class="{active: isPriceModify}">Price Modify</a>
                    </div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                        <a class="btn key-grey btn-vCenter" ng-disabled="!isRefundActive() || isBillPay || isPriceModify" data-ng-click="refund()" data-ng-class="{active: isRefund}">Refund</a>
                    </div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                        <a class="btn  key-grey btn-vCenter" ng-disabled="getAllItemsInOrder().length == 0 && minuteClinicDepositsOrder.length == 0 && !getEncodedEccNumber() || isBillPay" data-ng-click='voidTxn()'>Void<br>Transaction </a>
                    </div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                        <a class="btn  key-grey btn-vCenter" data-ng-disabled="activeFluShots || isBillPay || activePaidOut || minuteClinicDepositsOrder.length " data-ng-click='!(activePaidOut || minuteClinicDepositsOrder.length ) && extraCareLookUp()'>ExtraCare<br>Phone #<br>Lookup </a>
                    </div>
                    <div class="col-md-1 col-xs-1 mg-right-btn"></div>
                </div>
                <div class="mg-home-row-gap"></div>
                <div class="mg-home-right">
                    <div class="col-md-1 col-xs-1 mg-right-btn"></div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                        <a class="btn  btn-vCenter key-grey btn-footer-icon" data-ng-disabled="activeFluShots || isBillPay || activePaidOut || minuteClinicDepositsOrder.length" ng-click="itemLookup()"><i class="fa fa-barcode"></i><br/>UPC</a>
                    </div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                        <a class="btn  btn-vCenter key-grey btn-footer-icon" data-ng-disabled="activeFluShots || isBillPay || activePaidOut || minuteClinicDepositsOrder.length" ng-click="skuLookup()"><i class="fa fa-keyboard-o"></i><br/>Item#</a>
                    </div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                        <a class="btn  key-grey btn-vCenter" ng-disabled="!(isRefund || CONFIG.storeData.isOffline) || minuteClinicDepositsOrder.length || activePaidOut || isBillPay || activeFluShots" ng-click="rxscan()">Rx</a>
                    </div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                        <a class="btn  key-grey btn-vCenter" data-ng-disabled="activeFluShots || isBillPay || activePaidOut || minuteClinicDepositsOrder.length" data-ng-click='taxNonTaxAmountAction(false)'>
                            CVS OTC<br/>
                            Item Not<br/>
                            on File
                        </a>
                    </div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                        <a class="btn  key-grey btn-vCenter" data-ng-disabled="CONFIG.storeData.isOffline || isBillPay || activeFluShots || activePaidOut || minuteClinicDepositsOrder.length || isRefund" data-ng-click='goToWeCare()'>
                            <img src="images/logo.png">
                        </a>
                    </div>
                    <div class="col-md-1 col-xs-1 mg-right-btn"></div>
                </div>
                <div class="mg-home-row-gap"></div>
                <div class="mg-home-right">
                    <div class="col-md-1 col-xs-1 mg-right-btn"></div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                        <a class="btn  key-grey btn-vCenter" data-ng-click='extraCareEnrollment()'>
                            ExtraCare<br/>HQ
                        </a>
                    </div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                    </div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                    </div>
                    <!--  <div class="col-md-2 mg-right-btn">
                         <a class="btn  key-grey btn-vCenter"  data-ng-click='test()'>
                            Switch offline
                        </a>
                    </div> -->
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                    </div>
                    <div class="col-md-1 col-xs-1 mg-right-btn"></div>
                </div>
                <div class="mg-home-row-gap"></div>
                <div class="mg-home-right">
                    <div class="col-md-1 col-xs-1 mg-right-btn"></div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                        <a class="btn btn-home key-grey btn-vCenter" ng-disabled="getAllItemsInOrder().length || isPriceModify || isBillPay " data-ng-click='minuteClinicDeposits()' ng-if="isManager">Minute Clinic<br>Deposits</a>
                    </div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                        <a class="btn btn-home key-grey btn-vCenter" data-ng-disabled="activeFluShots || isBillPay || activePaidOut || isMinuteClinicDeposits || isRefund" data-ng-click='!(activePaidOut || isMinuteClinicDeposits || isRefund) && employeeMgmt()' ng-if="isManager">Employee <br> Management</a>
                    </div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                        <a ng-if="CONFIG.storeAttributes.paidouts_enabled === 'yes'" class="btn btn-home key-grey btn-vCenter" ng-disabled='( activeFluShots || activePaidOut == "CE" || isPriceModify || isBillPay || isMinuteClinicDeposits || (!activePaidOut && getAllItemsInOrder().length))' data-ng-click='doPaidouts("ESS")'>Emergency <br> Store Supply</a>
                    </div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                        <a ng-if="CONFIG.storeAttributes.paidouts_enabled === 'yes'" class="btn btn-home key-grey btn-vCenter" ng-disabled='(activeFluShots || activePaidOut == "ESS" || isBillPay || isPriceModify || isMinuteClinicDeposits || (!activePaidOut && getAllItemsInOrder().length))' data-ng-click='doPaidouts("CE")'>Customer <br> Escalation</a>
                    </div>
                    <div class="col-md-2 col-xs-2 mg-right-btn">
                        <a ng-if="checkIfCouponAllowed()" class="btn btn-home key-grey btn-vCenter" ng-disabled='(activePaidOut || isPriceModify || isBillPay || isMinuteClinicDeposits || getAllItemsInOrder().length)' data-ng-click='doFlushots()'>Flu Shot<br> Offer</a>
                    </div>
                </div>
                <div class="col-md-1 col-xs-1 mg-right-btn"></div>
                <div class="col-md-2 col-xs-2 mg-right-btn">
                    <a ng-if="CONFIG.storeAttributes.billPayInd === 'Y'" class="btn  key-grey btn-vCenter" ng-disabled='(activePaidOut || isPriceModify || isMinuteClinicDeposits || getAllItemsInOrder().length)' data-ng-click='enableBillPay()' data-ng-class="{active: isBillPay}">Bill Pay</a>
                </div>
            </div>
            <div ng-show="isPserPurchaseIsCompleted" class="col-md-2 col-xs-2 footer-right-btn pd-align">
                <a class="btn  btn-vCenter key-grey btn-footer-icon" data-ng-click='doPsePurchase()'><i class="glyphicon glyphicon-usd"></i><br>Total</a>
            </div>
            <div ng-show="!isPserPurchaseIsCompleted" class="col-md-2 col-xs-2 footer-right-btn pd-align">
                <a class="btn  btn-vCenter key-grey btn-footer-icon" data-ng-click='getTotal()'><i class="glyphicon glyphicon-usd"></i><br>Total</a>
            </div>
            <div class="col-md-2 col-xs-2 footer-right-btn pd-align" ng-show="showRegenBarcode()">
                <a class="btn btn-home key-grey btn-vCenter" data-ng-click='regenBarcode()'>Regenerate <br>Last Barcode</a>
            </div>
            <div class="col-md-2 col-xs-2 footer-right-btn pd-align">
                <a class="btn  key-grey btn-vCenter" data-ng-click='signOff()'>Sign Off</a>
            </div>
            <div class="col-md-2 col-xs-2 footer-right-btn pd-align">
                <a class="btn  key-grey btn-vCenter" data-ng-click="agentPunch('home')">Time <br/>In/Out</a>
            </div>
        </div>
    </div>
</div>

// basket

<div class="row" ng-init="CONFIG.pageTitle = 'Prescription Basket - ' + getTotalWaitingBinCount();init();">
    <div class="container-fluid basket-container">
        <div class="col-md-8 col-xs-8 sub-container-bg-default content-top-height right pd-basket scroll-vertical background-basket">
            <div class="panel panel-default" data-ng-repeat="(patientId, patientItem) in basketData" ng-if="patientItem.patientFillInfoList.length">
                <div class="panel-heading panel-header-bg-default" ng-class="{selected: (selectedPatient && (selectedPatient.rxCPatientId === patientItem.patientDetails.rxCPatientId))}" ng-click="doSelectPatient(patientItem.patientDetails)">
                    <div class="row">
                        <div class="col-md-8 col-xs-8">
                            {{patientItem.patientDetails.lastName + ', ' + patientItem.patientDetails.firstName}}
                        </div>
                        <div class="col-md-4 col-xs-4 text-align-right">
                            {{patientItem.patientDetails.birthday | date:CONFIG.birthDayFormat}}
                        </div>
                        <div class="col-md-8 col-xs-8">
                            {{patientItem.patientDetails.address.streetAddress}}
                        </div>
                        <div class="col-md-4 col-xs-4 text-align-right">
                            {{getWaitingBinCount(patientId)}} - WB
                        </div>
                    </div>
                </div>
                <div class="padding-varied panel-body bg-panel">
                    <div ng-repeat="(key, fillInfoValue) in basketData[patientItem.patientDetails.rxCPatientId].patientFillInfoList | orderBy: 'prePayFillInfo.isETW' | groupBy:'prePayFillInfo.isETW'">
                        <!-- <div>{{fillInfoValue}}</div> -->
                        <div ng-if="key" class="table table-row-bg-default remove-margin">
                            <div ng-repeat="(key2, filInfoGroupByVal) in fillInfoValue | groupBy:'prePayFillInfo.refOrderId'" class="bGround">
                                <!-- {{filInfoGroupByVal[0]}}  -->
                                <!-- {{key2}} -->
                                <div ng-if='filInfoGroupByVal[0].prePayFillInfo.isETW' class="panel-heading panel-header-bg-default">
                                    <span class="col-xs-1">
                                        <input ng-disabled="filInfoGroupByVal[0].itemStatus.statusVal !=='SLD' && filInfoGroupByVal[0].prePayFillInfo.isETW" class="checkbox checkbox-wrapper" type="checkbox" ng-checked="filInfoGroupByVal[0].fillDisposition.dispositionKey =='SLD'">
                                    </span>
                                    <!-- <span class="col-xs-1"></span>   -->
                                    <span class="col-xs-4">Pre-Pay#:{{filInfoGroupByVal[0].prePayFillInfo.refOrderId}}</span>
                                    <!-- <span class="col-xs-1"></span> -->
                                    <span class="col-xs-3">Status: NEW</span>
                                    <!-- <span class="col-xs-1"></span> -->
                                    <span class="col-xs-4">Type: Pre-Pay</span>
                                </div>
                                <table class="table table-row-bg-default" style='table-layout:fixed;'>
                                    <thead class="border-btm">
                                        <tr>
                                            <th ng-show="isLocalTesting" class="col-xs-1 text-align-left">Action</th>
                                            <th class="col-xs-1 text-align-left"></th>
                                            <th class="col-xs-4 text-align-left">Medication</th>
                                            <th class="col-xs-2 text-align-left">Rx#</th>
                                            <th class="col-xs-2 text-align-left">Status</th>
                                            <th class="col-xs-2 text-align-right">Price</th>
                                            <th class="col-xs-1"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="fontBold" ng-hide="basketItem.itemStatus.itemStat == 'Sold'" data-ng-repeat="basketItem in filInfoGroupByVal" ng-class="{'disp-none': false, 'grayBackground':(basketItem.itemStatus.statusVal.substr(0,3)=='SLD' || basketItem.itemStatus.statusVal=='REQ' || basketItem.canceLRxInd=='Y'),'row-red': (basketItem.rxExpiredIndicator=='Y'), 'recently-verified': hasRxBeenRecentlyVerified(basketItem), 'disable-etw-line-item':(basketItem.fillDisposition.dispositionKey =='HWB')}" ng-init="basketItem.barcode"="basketItem.rxNum" ng-if="basketItem.rxNum" data-ng-click="processSelectedFill(patientItem, basketItem)">
                                            <td ng-show="isLocalTesting" class="col-xs-1 text-align-left">
                                                <button class="btn btn-xs btn-primary" ng-click="scanItem(basketItem, $event)">Scan</button>
                                            </td>
                                            <td class="text-align-left">
                                                <input ng-disabled="basketItem.itemStatus.statusVal !=='SLD'" class="checkbox checkbox-wrapper" type="checkbox" name="item.basketItemInfo.rxNum" value="item.basketItemInfo.rxNum" ng-checked="basketItem.fillDisposition.dispositionKey =='SLD'">
                                            </td>
                                            <td class="col-xs-4 text-align-left">{{basketItem.drugDesc}}</td>
                                            <td class="col-xs-2 text-align-left">
                                                <span ng-show="basketItem.itemStatus.statusVal.substr(0,3)=='SLD' && basketItem.readyFillInd == 'Y' && basketItem.scriptSyncIndicator != 'Y'">R</span>
                                                <span ng-show="basketItem.scriptSyncIndicator == 'Y'">S</span>{{basketItem.rxNum}}
                                            </td>
                                            <td class="col-xs-2 text-align-left">
                                                <span style='color:blue;' ng-if="basketItem.itemStatus.statusVal == 'HCH'">$HOLD</span>
                                                <span ng-if="basketItem.itemStatus.statusVal != 'HCH'">{{basketItem.itemStatus.statusVal}}</span>
                                                <span ng-if="basketItem.ssAlignmentFillInd === 'A'">-AF</span>
                                                <span ng-if="CONFIG.storeAttributes.posSimplificationScriptLocationEnabled === 'Y' && basketItem.itemStatus.statusVal === 'WB' && basketItem.refrigerateFlag === 'Y'">-F</span>
                                            </td>
                                            <td ng-show="!basketItem.prePayFillInfo.isETW" class="col-xs-2 text-align-right">{{basketItem.patPayAmt | currency:""}}</td>
                                            <td ng-show="basketItem.prePayFillInfo.isETW" class="col-xs-2 text-align-right">Pre-Pay</td>
                                            <td class="col-xs-1 text-align-center">
                                                <span ng-show="isRxNumberHasActionNote(basketItem) && !BASKET_SCENARIO.STATUS_KEY[basketItem.fillDisposition.disposition]"
                                                    ng-class="{actionNoteUnResolvedNotActionable : (basketItem.itemStatus.actionable == 'N'), actionNoteResolved : isActionNoteResolved(basketItem), actionNoteUnResolved : !isActionNoteResolved(basketItem)}"> AN </span>
                                                <span ng-show="basketItem.fillDisposition.dispositionKey !== 'SLD'">{{BASKET_SCENARIO.STATUS_KEY[basketItem.fillDisposition.disposition]}}</span>
                                            </td>
                                        </tr>
                                        <tr class="fontBold grayBackground" ng-if="!filInfoGroupByVal[0].prePayFillInfo.isETW && basketData[patientItem.patientDetails.rxCPatientId].summaryRollUpInfoType && !(basketData[patientItem.patientDetails.rxCPatientId].summaryRollUpInfoType | isEmptyObj) && basketData[patientItem.patientDetails.rxCPatientId].summaryRollUpInfoType.sumRollup">
                                            <td class="col-xs-4 text-align-center">{{basketData[patientItem.patientDetails.rxCPatientId].summaryRollUpInfoType.itemStatus.statusVal}}</td>
                                            <td class="col-xs-2 text-align-center">({{basketData[patientItem.patientDetails.rxCPatientId].summaryRollUpInfoType.sumRollup
                                                | prepandZero:2}})
                                            </td>
                                            <td class="col-xs-2 text-align-right"></td>
                                            <td class="col-xs-2 text-align-center"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <table ng-if="!key" class="table table-row-bg-default remove-margin" style='table-layout:fixed;'>
                            <thead>
                                <tr>
                                    <th ng-show="isLocalTesting" class="col-xs-1 text-align-left">Action</th>
                                    <th class="col-xs-1 text-align-left"></th>
                                    <th class="col-xs-4 text-align-left">Medication</th>
                                    <th class="col-xs-2 text-align-left">Rx#</th>
                                    <th class="col-xs-2 text-align-left">Status</th>
                                    <th ng-if="checkForWaitingBinSlot()" class="col-xs-2 text-align-left">Slot</th>
                                    <th class="col-xs-2 text-align-right">Price</th>
                                    <th class="col-xs-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="fontBold" ng-show="!key" data-ng-repeat="basketItem in fillInfoValue | orderBy: 'orderId'" ng-class="{'disp-none': false, 'grayBackground':(basketItem.itemStatus.statusVal.substr(0,3)=='SLD' || basketItem.itemStatus.statusVal=='REQ' || basketItem.canceLRxInd=='Y'),'row-red': (basketItem.rxExpiredIndicator=='Y'), 'recently-verified': hasRxBeenRecentlyVerified(basketItem),'disable-etw-line-item':(basketItem.fillDisposition.dispositionKey =='HWB')}" ng-init="basketItem.barcode"="basketItem.rxNum" ng-if="basketItem.rxNum" data-ng-click="processSelectedFill(patientItem, basketItem)">
                                    <td ng-show="isLocalTesting" class="col-xs-1 text-align-left">
                                        <button class="btn btn-xs btn-primary" ng-click="scanItem(basketItem, $event)">Scan</button>
                                    </td>
                                    <td class="col-xs-1 text-align-left">
                                        <input ng-disabled="basketItem.itemStatus.statusVal !=='SLD'" class="checkbox checkbox-wrapper" type="checkbox" name="item.basketItemInfo.rxNum" value="item.basketItemInfo.rxNum" ng-checked="basketItem.fillDisposition.dispositionKey =='SLD'">
                                    </td>
                                    <td class="col-xs-4 text-align-left">{{basketItem.drugDesc}}</td>
                                    <td class="col-xs-2 text-align-left">
                                        <span ng-show="basketItem.itemStatus.statusVal.substr(0,3)=='SLD' && basketItem.readyFillInd == 'Y' && basketItem.scriptSyncIndicator != 'Y'">R</span>
                                        <span ng-show="basketItem.scriptSyncIndicator == 'Y'">S</span>{{basketItem.rxNum}}
                                    </td>
                                    <td class="col-xs-2 text-align-left">
                                        <span style='color:blue;' ng-if="basketItem.itemStatus.statusVal == 'HCH'">$HOLD</span>
                                        <span ng-if="basketItem.itemStatus.statusVal != 'HCH'">{{basketItem.itemStatus.statusVal}}</span>
                                        <span ng-if="basketItem.ssAlignmentFillInd === 'A'">-AF</span>
                                        <span ng-if="CONFIG.storeAttributes.posSimplificationScriptLocationEnabled === 'Y' && basketItem.itemStatus.statusVal === 'WB' && basketItem.refrigerateFlag === 'Y'">-F</span>
                                    </td>
                                    <td ng-show="basketItem.itemStatus.statusVal === 'WB' && basketItem.location" class="col-xs-2 text-align-left">
                                        <span class="border-slot">{{basketItem.location | leadingZeros}}</span>
                                    </td>
                                    <td ng-show="(basketItem.itemStatus.statusVal !== 'WB' && checkForWaitingBinSlot()) || (basketItem.itemStatus.statusVal == 'WB' && !basketItem.location)" class="col-xs-2 text-align-left">
                                        <span>{{}}</span>
                                    </td>
                                    <td ng-show="!basketItem.prePayFillInfo.isETW" class="col-xs-2 text-align-right">{{basketItem.patPayAmt | currency:""}}</td>
                                    <td ng-show="basketItem.prePayFillInfo.isETW" class="col-xs-2 text-align-right">Pre-Pay</td>
                                    <td class="col-xs-1 text-align-center">
                                        <span ng-show="isRxNumberHasActionNote(basketItem) && !BASKET_SCENARIO.STATUS_KEY[basketItem.fillDisposition.disposition]"
                                            ng-class="{actionNoteUnResolvedNotActionable : (basketItem.itemStatus.actionable == 'N'), actionNoteResolved : isActionNoteResolved(basketItem), actionNoteUnResolved : !isActionNoteResolved(basketItem)}"> AN </span>
                                        <span ng-show="basketItem.fillDisposition.dispositionKey !== 'SLD'">{{BASKET_SCENARIO.STATUS_KEY[basketItem.fillDisposition.disposition]}}</span>
                                    </td>
                                </tr>
                                <tr class="fontBold grayBackground" ng-if="basketData[patientItem.patientDetails.rxCPatientId].summaryRollUpInfoType && !(basketData[patientItem.patientDetails.rxCPatientId].summaryRollUpInfoType | isEmptyObj) && basketData[patientItem.patientDetails.rxCPatientId].summaryRollUpInfoType.sumRollup">
                                    <td class="col-xs-4 text-align-center">{{basketData[patientItem.patientDetails.rxCPatientId].summaryRollUpInfoType.itemStatus.statusVal}}</td>
                                    <td class="col-xs-2 text-align-center">({{basketData[patientItem.patientDetails.rxCPatientId].summaryRollUpInfoType.sumRollup
                                        | prepandZero:2}})
                                    </td>
                                    <td class="col-xs-2 text-align-right"></td>
                                    <td class="col-xs-2 text-align-center"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-8 col-xs-8">
        <div class="bask-total-txt">Total <span class="bask-rgt-align">{{getBasketOrderTotal() | currency }}</span></div>
    </div>
    <div class="col-xs-12 col-md-12 container-foo bottom-row-container" style='margin-left: 9px;'>
        <div class="">
            <div class="col-md-1 col-xs-1 match-btn-hgt home-btn-fnt">
                <a class="btn btn-vCenter btn-icon key-grey" ng-click="goHome(true)">
                    <div>
                        <i class="fa fa-home"></i>
                        <br> Home
                    </div>
                </a>
            </div>
            <div class="col-md-1 col-xs-1 match-btn-hgt">
                <a ng-class="{disabled: disableBasketButtonsWhenCounselingInProgress}" class="btn  btn-vCenter key-grey" ng-click="refreshPatient()">
                    <div class="btn-text">Refresh
                        <br>Patient</div>
                </a>
            </div>
            <!-- <div ng-show="CONFIG.storeAttributes.posSimplificationRemoveTransactionDetailsScreenEnabled ==='N'" class="col-md-1 col-xs-1 match-btn-hgt">
                <a class="btn btn-vCenter btn-icon key-grey" ng-click="enterBarcode()">
                    <div>
                        <i class="fa fa-question-circle"></i>
                        <br> Help
                    </div>
                </a>
            </div> -->
            <div class="col-md-1 col-xs-1 match-btn-hgt">
                <a ng-class="{disabled: disableBasketButtonsWhenCounselingInProgress}" class="btn  btn-vCenter key-grey" ng-click="addPatient()">
                    <div class="btn-text">Add
                        <br>Patient</div>
                </a>
            </div>
            <div class="col-md-1 col-xs-1 match-btn-hgt">
                <a ng-class="{disabled: disableBasketButtonsWhenCounselingInProgress}" class="btn  btn-vCenter key-grey" ng-click="removePatient()">
                    <div class="btn-text">Remove
                        <br>Patient</div>
                </a>
            </div>
            <div ng-if="!showEratpu" class="col-md-2 col-xs-2 match-btn-hgt"></div>
            <div class="col-md-1 col-xs-1 match-btn-hgt"></div>
            <div ng-if="!showEratpu" class="col-md-2 col-xs-2 match-btn-hgt"></div>
            <div ng-if="!enableHomeDelivery" class="col-md-1 col-xs-1 match-btn-hgt"></div>
            <div ng-class="{disabled: disableBasketButtonsWhenCounselingInProgress}" ng-if="showEratpu" class="col-md-2 col-xs-2 match-btn-hgt footer-margn">
                <button class="btn btn-vCenter btn-icon key-grey" ng-click="invokeEnableRefillAtPickup()" ng-class="disableEratpu ? 'disabled' : ((CONFIG.storeAttributes.enableRefillButtonColorSwitch == 'Y') ? 'notEnrolledBtn' : 'key-grey')">
                    View Eligible
                    <br>Refills
                </button>
            </div>
            <div class="col-md-2 col-xs-2 match-btn-hgt">
                <a ng-class="{disabled: disableBasketButtonsWhenCounselingInProgress, notEnrolledBtn: checkButtonStatus()}" class="btn  btn-vCenter key-grey" ng-click="pharmacyHealthRewards()"
                     ng-show="phrEnabled === 'Y'">
                    <div class="btn-text" ng-if="(checkEnrollmentStatus() === 'E') || (checkEnrollmentStatus() === '')">ExtraCare
                        <br>Pharmacy
                        <br>Rewards Status</div>
                    <div class="btn-text" ng-if="(checkEnrollmentStatus() === 'N')">Enroll in
                        <br>Pharmacy Rewards</div>
                    <div class="btn-text" ng-if="(checkEnrollmentStatus() === 'X')">Enroll in
                        <br>Pharmacy Rewards</div>
                </a>
            </div>
            <div ng-if="enableHomeDelivery" class="col-md-1 col-xs-1 match-btn-hgt">
                <a ng-click="checkForHomeDelivery()" class="btn btn-vCenter key-grey">
                    <div class="btn-text">Home
                        <br>Delivery</div>
                </a>
            </div>
            <div class="col-md-2 col-xs-2 match-btn-hgt con-pad-right">
                <a ng-class="getContinueButtonClass()" ng-click="completeRxOrder()" class="btn  btn-vCenter key-grey pre-wrap">
                    <div class="btn-text">{{continueButtonText}}
                    </div>
                </a>
            </div>
        </div>
    </div>
    
    // 90day
    
    <div ng-controller="Msg90daysCtrl" ng-init="init()">
    <!-- <instruction instr-text="intrTxt"></instruction>
    <description desc-text="descTxt"></description> -->
    <div>
        <p class="successText black">{{intrTxt}}</p>
    </div>
    <div class="listContent">
        <p>{{descTxt}}</p>
    </div>
    <div class="height-570 scroll-vertical">
        <div data-ng-repeat="(patientId, rxInfoPatientDetailsInfo) in patientMessageRxInfoMap">
            <div class="container-fluid">
                <patientdetails patient="rxInfoPatientDetailsInfo.patientDetails" show-dob="true" show-address="true" show-phone="true" />
                <div ng-if="(patientLevelActive && !suppressPatientLevelWhenPatIsNotPresent) && !rxInfoPatientDetailsInfo.patientLevelMessage.properties.SHOW_ON_ESIG_ONLY" class="container-fluid listContent no-padding no-border-radius">
                    <div class="col-md-8 col-xs-8">
                        {{patientMessageConfig.lnItmButton.lineInstructions}}
                    </div>
                    <div class="col-md-4 col-xs-4 font-stl">
                        <div class="btnContainer margin-10-5">
                            <a ng-if="patientMessageConfig.lnItmButton.button3" ng-click="doEnrollAll(rxInfoPatientDetailsInfo.patientLevelMessage, patientMessageConfig.lnItmButton.button3.id)" class="btn btn-normal btn-bg-default pull-right" ng-class="{active: (dispositionMap[rxInfoPatientDetailsInfo.patientLevelMessage.msgSeq] == patientMessageConfig.lnItmButton.button3.id)}">{{patientMessageConfig.lnItmButton.button3.value}}</a>
                            <a ng-if="patientMessageConfig.lnItmButton.button2" ng-click="doEnrollAll(rxInfoPatientDetailsInfo.patientLevelMessage, patientMessageConfig.lnItmButton.button2.id)" class="btn btn-normal btn-bg-default pull-right" ng-class="{active: (dispositionMap[rxInfoPatientDetailsInfo.patientLevelMessage.msgSeq] == patientMessageConfig.lnItmButton.button2.id)}">{{patientMessageConfig.lnItmButton.button2.value}}</a>
                            <a ng-if="patientMessageConfig.lnItmButton.button1" ng-click="doEnrollAll(rxInfoPatientDetailsInfo.patientLevelMessage, patientMessageConfig.lnItmButton.button1.id)" class="btn btn-normal btn-bg-default pull-right" ng-class="{active: (dispositionMap[rxInfoPatientDetailsInfo.patientLevelMessage.msgSeq] == patientMessageConfig.lnItmButton.button1.id)}">{{patientMessageConfig.lnItmButton.button1.value}}</a>
                        </div>
                    </div>
                </div>
                <div ng-if="displayRxCenMsg && patientLevelActive && !updatedText" class="col-md-12 col-xs-12" style="background-color: rgb(202, 226, 136);color:black;text-align:center;"><strong>IN WAITING BIN</strong></div>
                <div ng-if="(!rxInfoPatientDetailsInfo.SOLD.length && displayRxCenMsg && patientLevelActive && !updatedText)" class="col-md-12 col-xs-12" style="color:black;text-align:center;"><strong>NO 90 DAY ELIGIBLE PRESCRIPTIONS BEING PICKED UP NOW</strong></div>
                <div ng-if="rxInfoPatientDetailsInfo.SOLD.length && displayRxCenMsg  && !item.patientMessage.properties.SHOW_ON_ESIG_ONLY" class="col-md-12 col-xs-12">
                    <div class="col-md-4 col-xs-4">Drug</div>
                    <div class="col-md-4 col-xs-4">Prescriber</div>
                    <div class="col-md-4 col-xs-4">90 Day Rx Preference</div>
                </div>
                <!-- <div ng-if="!rxInfoPatientDetailsInfo.SOLD.length" class="col-md-12" style="background-color: #ddd;color:black;text-align:center;"><strong>NO WAITING BIN PRESCRIPTIONS</strong></div> -->
                <div ng-if="displayRxCenMsg && !item.patientMessage.properties.SHOW_ON_ESIG_ONLY" class="container-fluid listContent no-padding no-border-radius" ng-repeat="item in rxInfoPatientDetailsInfo.SOLD | orderBy: 'rxInfo.drugDesc'">
                    <div class="col-md-4 col-xs-4">
                        {{item.rxInfo.drugDesc}}
                    </div>
                    <div class="col-md-4 col-xs-4 word-wrap">
                        {{item.rxInfo.prescName.lastName + ', ' + item.rxInfo.prescName.firstName}}
                    </div>
                    <div class="col-md-4 col-xs-4 font-stl">
                        <div class="btnContainer margin-10-5" ng-class="{'disabledbutton': disableForm}">
                            <a ng-if="item.patientMessage.messageConfig.configInfo[1].lnItmButton.button3" ng-click="doActionLineBtn(item.patientMessage, item.patientMessage.messageConfig.configInfo[1].lnItmButton.button3.id)" class="btn btn-normal btn-bg-default pull-right" ng-class="{active: (dispositionMap[item.patientMessage.msgSeq] == item.patientMessage.messageConfig.configInfo[1].lnItmButton.button3.id)}">{{item.patientMessage.messageConfig.configInfo[1].lnItmButton.button3.value}}</a>
                            <a ng-if="item.patientMessage.messageConfig.configInfo[1].lnItmButton.button2" ng-click="doActionLineBtn(item.patientMessage, item.patientMessage.messageConfig.configInfo[1].lnItmButton.button2.id)" class="btn btn-normal btn-bg-default pull-right" ng-class="{active: (dispositionMap[item.patientMessage.msgSeq] == item.patientMessage.messageConfig.configInfo[1].lnItmButton.button2.id) }">{{item.patientMessage.messageConfig.configInfo[1].lnItmButton.button2.value}}</a>
                            <a ng-if="item.patientMessage.messageConfig.configInfo[1].lnItmButton.button1" ng-click="doActionLineBtn(item.patientMessage, item.patientMessage.messageConfig.configInfo[1].lnItmButton.button1.id)" class="btn btn-normal btn-bg-default pull-right" ng-class="{active: ((dispositionMap[item.patientMessage.msgSeq] == item.patientMessage.messageConfig.configInfo[1].lnItmButton.button1.id) && !disableNeverAsked),'disabledbutton': disableNeverAsked}">{{item.patientMessage.messageConfig.configInfo[1].lnItmButton.button1.value}}</a>
                        </div>
                    </div>
                </div>
                <div ng-if="displayRxCenMsg && patientLevelActive && !updatedText" class="col-md-12 col-xs-12" style="background-color: rgb(202, 226, 136);color:black;text-align:center;"><strong>OTHER 90 DAY ELIGIBLE RX</strong></div>
                <div ng-if="(!rxInfoPatientDetailsInfo.UNSOLD.length && displayRxCenMsg && patientLevelActive && !updatedText)" class="col-md-12 col-xs-12" style="color:black;text-align:center;"><strong>NO OTHER 90 DAY ELIGIBLE PRESCRIPTIONS AT THIS TIME</strong></div>
                <div ng-if="rxInfoPatientDetailsInfo.UNSOLD.length && displayRxCenMsg  && !item.patientMessage.properties.SHOW_ON_ESIG_ONLY" class="col-md-12 col-xs-12">
                    <div class="col-md-4 col-xs-4">Drug</div>
                    <div class="col-md-4 col-xs-4">Prescriber</div>
                    <div class="col-md-4 col-xs-4">90 Day Rx Preference</div>
                </div>
                <div ng-if="rxInfoPatientDetailsInfo.UNSOLD && displayRxCenMsg  && !item.patientMessage.properties.SHOW_ON_ESIG_ONLY" class="container-fluid listContent no-padding no-border-radius" ng-repeat="item in rxInfoPatientDetailsInfo.UNSOLD | orderBy: 'rxInfo.drugDesc'">
                    <div class="col-md-4 col-xs-4">
                        {{item.rxInfo.drugDesc}}
                    </div>
                    <div class="col-md-4 col-xs-4">
                        {{item.rxInfo.prescName.lastName + ', ' + item.rxInfo.prescName.firstName}}
                    </div>
                    <div class="col-md-4 col-xs-4 font-stl">
                        <div class="btnContainer margin-10-5" ng-class="{'disabledbutton': disableForm}">
                            <a ng-if="item.patientMessage.messageConfig.configInfo[1].lnItmButton.button3" ng-click="doActionLineBtn(item.patientMessage, item.patientMessage.messageConfig.configInfo[1].lnItmButton.button3.id)" class="btn btn-normal btn-bg-default pull-right" ng-class="{active: (dispositionMap[item.patientMessage.msgSeq] == item.patientMessage.messageConfig.configInfo[1].lnItmButton.button3.id)}">{{item.patientMessage.messageConfig.configInfo[1].lnItmButton.button3.value}}</a>
                            <a ng-if="item.patientMessage.messageConfig.configInfo[1].lnItmButton.button2" ng-click="doActionLineBtn(item.patientMessage, item.patientMessage.messageConfig.configInfo[1].lnItmButton.button2.id)" class="btn btn-normal btn-bg-default pull-right" ng-class="{active: (dispositionMap[item.patientMessage.msgSeq] == item.patientMessage.messageConfig.configInfo[1].lnItmButton.button2.id)}">{{item.patientMessage.messageConfig.configInfo[1].lnItmButton.button2.value}}</a>
                            <a ng-if="item.patientMessage.messageConfig.configInfo[1].lnItmButton.button1" ng-click="doActionLineBtn(item.patientMessage, item.patientMessage.messageConfig.configInfo[1].lnItmButton.button1.id)" class="btn btn-normal btn-bg-default pull-right" ng-class="{active: ((dispositionMap[item.patientMessage.msgSeq] == item.patientMessage.messageConfig.configInfo[1].lnItmButton.button1.id) && !disableNeverAsked),'disabledbutton': disableNeverAsked}">{{item.patientMessage.messageConfig.configInfo[1].lnItmButton.button1.value}}</a>
                        </div>
                    </div>
                </div>
                <!-- <div ng-if="!rxInfoPatientDetailsInfo.UNSOLD.length" class="col-md-12" style="background-color: #ddd;color:black;text-align:center;"><strong>NO ELIGIBLE PRESCRIPTIONS</strong></div> -->
            </div>
        </div>
    </div>
    <div screen-selector class="row bottom-row-container" screen-type="90Day">
        <div class="container-fluid">
        </div>
        <div class="container-fluid">
            <div class="col-md-2 col-xs-2"></div>
            <div class="col-md-2 col-xs-2"></div>
            <div class="col-md-2 col-xs-2"></div>
            <div class="col-md-2 col-xs-2"></div>
            <div class="col-md-2 col-xs-2"></div>
            <div class="col-md-2 col-xs-2 match-btn-hgt continue-btn" ng-class="{'disabledbutton': disableForm}">
                <a ng-class="{active: continueActive}" ng-click="continueActive && nextMessage()" class="btn  btn-vCenter key-grey"> Continue </a>
            </div>
        </div>
    </div>
</div>


// request

"use strict";

angular
  .module("weCarePlusApp")
  .service("Request", function Request(
    $rootScope,
    $http,
    $q,
    $location,
    $modal,
    CONFIG,
    DialogService,
    BasketFactory,
    MonitorService
  ) {
    var loadingDefaults = {
      backdrop: "static",
      keyboard: true,
      modalFade: false,
      windowClass: "minor-popup",
      templateUrl: "views/dialogs/loading.html"
    };
    var loggerName = "Request";
    var loadingMessages = [];
    var loadingCount = 0;
    var loadingInstance = null;
    var loadingScope = null;
    var lastUrlInvoked = "";
    var failAttemptCount = 0;
    var deferredMap = {};
    var service = {
      cancelInvoke: function(deferredKey) {
        if (deferredMap[deferredKey]) {
          deferredMap[deferredKey].resolve();
        }
      },
      invoke: function(args, deferredKey) {
        $rootScope.blockUI = true;
        params = args.params || {};
        args = args || {};
        args.headers = args.headers || {};
        args.headers.accept = args.headers.accept || "application/json";
        var deferred = $q.defer(),
          url = args.url || this.url,
          method = args.method || "GET",
          params = params,
          triggerOffline = args.triggerOffline || "yes",
          data = args.data || {},
          timeout = args.timeout || 150000,
          rejectPromiseOnTimeout = args.rejectPromiseOnTimeout, //Only used for Total API for now - PHANI
          headers = {
            "CVS-REGISTER-ID": CONFIG.registerId,
            "CVS-VERSION-NO": CONFIG.versionNo,
            "CVS-TIMESTAMP": appUtils.getCurrentTimestamp(
              CONFIG.timestampFormat
            ),
            "CVS-SCREEN-ID": CONFIG.screenId,
            "CVS-TRANSACTION-ID":
              args.headers.transactionId || CONFIG.txnInfo.transactionId,
            "CVS-WORKSTATION-ID": CONFIG.workstationID,
            "CVS-AUTH-TOKEN": CONFIG.headerData.token,
            "CVS-EMPLOYEE-ID": CONFIG.loggedInUser.id,
            "CVS-TRANSACTION-NUMBER":
              args.headers.transactionNumber ||
              CONFIG.txnInfo.transactionNumber,
            "CVS-DEVICE-TYPE": "wcworkstation",
            "CVS-STORE-NUMBER": CONFIG.storeAttributes.storeNumber,
            "CVS-REGISTER-TYPE": "FS",
            "CVS-OFFLINE-STATUS": CONFIG.storeData.isOffline,
            "CVS-IN-TRANSACTION-TYPE": "Y",
            "CVS-REGISTER-TYPE-CODE": "FS",
            "CVS-TXN-START-TIMESTAMP": CONFIG.messages.txnStartTimestamp,
            "CVS-CURRENT-TIMESTAMP": appUtils.getCurrentTimestamp(),
            "CVS-TRANSACTION-LOCATION":
              CONFIG.headers["CVS-TRANSACTION-LOCATION"],
            "CVS-RX-TRANSACTION-TYPE": CONFIG.headers["CVS-RX-TRANSACTION-TYPE"],
            "CVS-STORE-CODE": CONFIG.storeType,
            "CVS-COUPON-REDEMPTION-VERSION": "6",
            Accept: args.headers.accept,
            "CVS-CONTENT-VERSION-NO": "3",
            "CVS-USER-GROUP": "pharmacy_user",
            "CVS-APPLICATION-NAME": "POS"
          };
        if (args.timeoutByPromise) {
          timeout = deferred.promise;
        }

        if (deferredKey) {
          deferredMap[deferredKey] = deferred;
        }
        if (lastUrlInvoked !== url) {
          failAttemptCount = 0;
          lastUrlInvoked = url;
        }

        var msgID = {
          stamp: new Date().getTime(),
          msg: args.loadMessage,
          hideLoading: args.hideLoading,
          showCancelButton: args.showCancelButton
        };
        service.startLoading(msgID);

        var withcred = false;
        LOGGER.debug("invoke > URL:" + url, loggerName);
        var now = new Date();
        var startTime = now.format("HH:MM:ss");
        var now = new Date();
        var startTime = now.format("HH:MM:ss");
        var now = new Date();
        var startTime = now.format("HH:MM:ss");
        $http({
          url: url,
          withCredentials: withcred,
          method: method.toUpperCase(),
          params: params,
          data: data,
          timeout: timeout,
          headers: headers
        })
          .success(
            angular.bind(this, function(data, status, headers, config) {
              service.stopLoading(msgID);

              if (data) {
                var storeResponse = data.StoreResponse || data.storeResponse;
                CONFIG.lastCallResponse = storeResponse;
                var statusCode = storeResponse && storeResponse.code;
                if (
                  (storeResponse &&
                    storeResponse.offlineStatus === true &&
                    CONFIG.storeData.isOffline === false) ||
                  statusCode === "1099" ||
                  statusCode === "0001"
                ) {
                  LOGGER.error(
                    "URL:" +
                      url +
                      " > OFFLINE:" +
                      storeResponse.offlineStatus +
                      " > STATUS:" +
                      status +
                      " > RESPONSE:" +
                      JSON.stringify(data),
                    loggerName
                  );
                  if (triggerOffline.toUpperCase() === "NO") {
                    deferred.reject(storeResponse);
                  } else {
                    $rootScope.goOffLine();
                  }
                  return;
                }

                if (statusCode === "200" || statusCode === "0000") {
                  LOGGER.debug(
                    ":SUCCESS >  URL:" +
                      url +
                      " > OFFLINE:" +
                      storeResponse.offlineStatus +
                      " > STORE_RES_CODE:" +
                      statusCode,
                    loggerName
                  );
                  deferred.resolve(storeResponse.payload);
                } else {
                  if (args.customResponse) {
                    deferred.resolve(data);
                  } else {
                    LOGGER.error(
                      ":FAILURE >  URL:" +
                        url +
                        " > STORE_RES_CODE:" +
                        statusCode +
                        " > RESPONSE:" +
                        JSON.stringify(data),
                      loggerName
                    );
                    storeResponse.httpStatusCode = status;
                    deferred.reject(storeResponse);
                  }
                }
              } else {
                LOGGER.error(
                  ":FAILURE >  URL:" + url + " > RESPONSE:EMPTY",
                  loggerName
                );
                var errorData = {
                  httpStatusCode: status
                };
                deferred.reject(errorData);
              }
            })
          )
          .error(
            angular.bind(this, function(data, status, headers, config) {
              var nowtime = new Date();
              var endTime = nowtime.format("HH:MM:ss");
              var errorMessage =
                "ERROR > START_TIME: " +
                startTime +
                "; END_TIME: " +
                endTime +
                " URL:" +
                url +
                " > STATUS_CODE:" +
                status +
                "> DATA:" +
                JSON.stringify(data);
              LOGGER.error(errorMessage, loggerName);
              if (status === 0) {
                MonitorService.sendAlert({
                  message: "Timed out: " + url,
                  detailMessages: [errorMessage]
                });
              }
              service.stopLoading(msgID);
              service.reset();
              if (lastUrlInvoked === url) {
                failAttemptCount++;
              }
              if (failAttemptCount > 3) {
                LOGGER.error(
                  "Failed Attempt Threshold Reached > Count: " +
                    failAttemptCount +
                    " > Logged In User: " +
                    CONFIG.loggedInUser.id,
                  loggerName
                );
                if (CONFIG.loggedInUser.id) {
                  $location.url("home");
                }
                return;
              }
              var urlSplit = url ? url.split("?") : "";
              if (
                urlSplit.length &&
                urlSplit[0] === "/service/bsl/fastpass/transaction/signature"
              ) {
                return;
              }
              if (triggerOffline.toUpperCase() === "YES") {
                var modalOptions = {
                  buttons: ["Ok"],
                  headerText: "Connection Error",
                  bodyText: msgID.msg
                    ? "Couldn't reach server while " + msgID.msg
                    : "Couldn't reach server"
                };
                DialogService.showDialog({}, modalOptions).then(function(
                  result
                ) {
                  if (rejectPromiseOnTimeout && status === 0) {
                    deferred.reject(data);
                  } else {
                    // added for CVS Pay Backend changes
                    var isFastPassTxn =
                      urlSplit[0].indexOf("fastpass") != -1 ? true : false;
                    if (isFastPassTxn) {
                      if (status == 404) {
                        data = {
                          code: 404,
                          message: "No service was found."
                        };
                      }
                      var responseJSONData = data;
                      if (responseJSONData == null || responseJSONData == "") {
                        responseJSONData = {
                          code: status,
                          message:
                            modalOptions.headerText +
                            ":" +
                            modalOptions.bodyText
                        };
                      }
                      deferred.reject(responseJSONData);
                    }
                  }
                  $rootScope.goOffLine();
                });
              } else {
                var errorData = data || {};
                errorData.httpStatusCode = status;
                deferred.reject(errorData);
              }
            })
          );
        return deferred.promise;
      }
    };

    service.startLoading = function(msgID) {
      msgID.msg && loadingMessages.push(msgID);
      if (loadingCount === 0) {
        loadingDefaults.controller = function($scope, $modalInstance) {
          $scope.messages = loadingMessages;
          loadingInstance = $modalInstance;
          loadingScope = $scope;
          $scope.showCancelButton = msgID.showCancelButton;
          $scope.cancelInvoke = function() {
            loadingCount = 0;
            loadingMessages = [];
            $modalInstance && $modalInstance.close();
          };
        };
        if (!msgID.hideLoading) {
          $modal.open(loadingDefaults);
        }
      }
      loadingCount++;
    };

    service.stopLoading = function(msgID) {
      if (loadingCount > 0) loadingCount--;
      if (msgID.msg) {
        angular.forEach(loadingMessages, function(val, key) {
          if (val.stamp === msgID.stamp) {
            loadingMessages.splice(key, 1);
          }
        });
      }
      if (loadingCount <= 0 && loadingInstance) {
        loadingInstance.close();
        loadingCount = 0;
        loadingMessages.splice(0, loadingMessages.length);
      }
    };

    service.reset = function() {
      loadingMessages = [];
      loadingCount = 0;
      loadingInstance = null;
      loadingScope = null;
    };
    return service;
  });

// home ctrl

'use strict';

angular.module('weCarePlusApp')
    .controller('HomeCtrl', ['$scope', 'SocketTrafficHandler', '$location', '$modal', 'DialogService',
        'BasketFactory', 'PatientFactory', 'Request', 'PseFactory', 'OrderFactory',
        'ESignFactory', 'CONFIG', 'EmployeeMgmtFactory', 'NumberEntryService',
        'TransactionInfo', 'PrintService', 'PseService', 'base64', 'MessageFactory', '$route',
        'ManagerOverrideService', 'HipaaService', 'BasketService', 'PayloadService', 'MessageService',
        '$q', 'LoginFactory', 'ModalService', 'OrderService', 'ExtraCareEnrollmentService', 'PosSimplificationTimeStampService', 'CoreNinetyDayMessageHandlerService', 'BasketFluShotService',
        function($scope, SocketTrafficHandler, $location, $modal, DialogService, BasketFactory,
            PatientFactory, Request, PseFactory, OrderFactory,
            ESignFactory, CONFIG, EmployeeMgmtFactory, NumberEntryService,
            TransactionInfo, PrintService, PseService, base64, MessageFactory, $route,
            ManagerOverrideService, HipaaService, BasketService, PayloadService, MessageService,
            $q, LoginFactory, ModalService, OrderService, ExtraCareEnrollmentService, PosSimplificationTimeStampService, CoreNinetyDayMessageHandlerService, BasketFluShotService) {

            LOGGER.info('Entering HomeCtrl', 'HomeCtrl');
            var loggerName = 'HomeCtrl';
            var homeFlags = {};
            $scope.voidTxnEvent = false;
            $scope.totalEvent = false;

            $scope.init = function() {
                PosSimplificationTimeStampService.handleItemEntryScreenEnterEvent();
                LOGGER.info('Entering init method', 'HomeCtrl > init');
                $scope.hideExtraCareHQButton = true;
                $scope.initializeHome();
                if (OrderFactory.getProxyPhrMethodName()) {
                    if (!OrderFactory.getEccNumber()) {
                        LOGGER.info('Entering init method > ExtraCare card not scanned', 'HomeCtrl > init');
                        var modalOptions = {
                            buttons: ['Phone #<br>Lookup', 'Cancel'],
                            headerText: 'Extracare Card Scan',
                            bodyText: 'Please Scan ExtraCare Card.' // add text - PG2
                        };
                        DialogService.showDialog({}, modalOptions).then(function(result) {
                            if (result === 'Cancel') {
                                LOGGER.info('Entering init method > Clicked Cancel on Extracare card scan', 'HomeCtrl > init');
                                // clicking cancel - void txn - PG2
                                if ($scope.getAllItemsInOrder().length || $scope.getEncodedEccNumber()) {
                                    if (OrderFactory.getFastpass() && OrderFactory.getFastpassData()) {
                                        ESignFactory.doFastpassCompleteCancel({
                                            statusCode: "-1",
                                            statusMessage: "Canceled"
                                        });
                                    }
                                    // !CONFIG.storeData.isOffline && OpportunityFactory.updateOpportunity(true, "0000");
                                }
                                $scope.clearWholeData();
                                $scope.updateSecDispPriceList();
                            } else if (result === 'Phone #<br>Lookup') {
                                $scope.extraCareLookUp(true);
                            }
                        });
                    } else {
                        $scope[OrderFactory.getProxyPhrMethodName()](true);
                    }
                    return;
                }
                $scope.resolveExtracareHealthRewards();
                $scope.patientServiceFlag = false;
            };

            $scope.$on('SCANNED_DATA_ECC_CARD', function(evt, barcode) {
                var barcodeType = "extracare";
                PosSimplificationTimeStampService.selectEventMethod({ screenName: "item_entry", eventType: "barcode_scanned", barcodeType: barcodeType });
                if (OrderFactory.getNoItemsInOrder() && (BasketFactory.getRxItemsInOrder() && !Object.keys(BasketFactory.getRxItemsInOrder()).length)) {
                    $scope.hideExtraCareHQButton = false;
                }
                LOGGER.info('Extracare Card scanned ', 'HomeCtrl');
                DialogService.closeDialog();
                if (OrderFactory.getProxyPhrMethodName()) {
                    var totalCouponAmount = OrderService.calculatePHRGiftCardAmount();
                    if (totalCouponAmount) {
                        OrderService.printCoupon(function() {
                            LOGGER.info('OrderService.printCoupon method called ', 'HomeCtrl');
                            $scope.clearWholeData();
                            $scope.updateSecDispPriceList();
                        });
                    } else {
                        if ($scope.getAllItemsInOrder().length || $scope.getEncodedEccNumber()) {
                            if (OrderFactory.getFastpass() && OrderFactory.getFastpassData()) {
                                ESignFactory.doFastpassCompleteCancel({
                                    statusCode: "-1",
                                    statusMessage: "Canceled"
                                });
                            }
                            // !CONFIG.storeData.isOffline && OpportunityFactory.updateOpportunity(true, "0000");
                        }
                        $scope.clearWholeData();
                        $scope.updateSecDispPriceList();
                        var modalOptions = {
                            buttons: ['Ok'],
                            headerText: 'Error',
                            bodyText: 'ExtraCare card applied does not match the ExtraCare card used for <br/>Pharmacy & Health Rewards enrollment. Reward cannot be redeemed at this time.'
                        };
                        DialogService.showDialog({}, modalOptions).then(function(result) {});
                    }
                }
            });

            $scope.resolveExtracareHealthRewards = function() {
                LOGGER.info('Entering resolveExtracareHealthRewards method', 'HomeCtrl > resolveExtracareHealthRewards');

                var selectedPatientList = PatientFactory.getSelectedPatientList();
                var showHipaa = false;
                var alreadyHipaadisplayed = PatientFactory.getPHREnrollmentProcess();
                angular.forEach(selectedPatientList, function(patientItem, patientID) {
                    if (!showHipaa && !alreadyHipaadisplayed && patientItem.eccData && !patientItem.eccData.cancelled && (patientItem.eccData.enrollmentStatus === 'S' || patientItem.eccData.enrollmentStatus === 'R') && !patientItem.eccData.resolved && patientItem.eccData.xtracareCardNumber) {
                        showHipaa = true;
                        var opts = {
                            patientId: patientItem.rxCPatientId,
                            patientName: patientItem.lastName + ', ' + patientItem.firstName,
                            phrEnrollmentBarcode: '1900000000' + patientItem.rxCPatientId + '0',
                            eccData: patientItem.eccData
                        };
                        opts.extraCareCardNo = patientItem.eccData.xtracareCardNumber;
                        if (patientItem.eccData.enrollmentStatus === 'R') {
                            delete opts.extraCareCardNo;
                        }
                        HipaaService.enroll(opts);
                    }
                });
                return showHipaa;
            };

            var disableScanListeners = function() {
                LOGGER.info("HOME: unbinding all scan listeners...");
                $scope.disableRootScanListeners();
                if ($scope.unBinders.unbindOtcScan) $scope.unBinders.unbindOtcScan();
                if ($scope.unBinders.unbindFastpassScan) $scope.unBinders.unbindFastpassScan();
                if ($scope.unBinders.unbindRxScan) $scope.unBinders.unbindRxScan();
                if ($scope.unBinders.unbindSplRxScan) $scope.unBinders.unbindSplRxScan();
                if ($scope.unBinders.unbindLicenseScan) $scope.unBinders.unbindLicenseScan();
                if ($scope.unBinders.unbindNonLicenseScan) $scope.unBinders.unbindNonLicenseScan();
                if ($scope.unBinders.unbindPhrScan) $scope.unBinders.unbindPhrScan();
            }

            var enableScanListeners = function() {
                LOGGER.info("HOME: enabling all scan listeners except license...");
                $scope.enableRootScanListeners();
                $scope.unBinders.unbindOtcScan = $scope.$on('SCANNED_DATA_OTC', scanOtc);
                $scope.unBinders.unbindFastpassScan = $scope.$on('SCANNED_DATA_FASTPASS', handleFastPass);
                $scope.unBinders.unbindRxScan = $scope.$on('SCANNED_DATA_RX', handleRxScan);
                $scope.unBinders.unbindSplRxScan = $scope.$on('SCANNED_DATA_SPLRX', handleSplRxScan);
                $scope.unBinders.unbindPhrScan = $scope.$on('SCANNED_DATA_PHR', handlePhrEnrollment);
            }

            $scope.initializeHome = function() {
                LOGGER.info('Entering initializeHome method', 'HomeCtrl > initializeHome');
                /**
                 * unbind all the scan event listeners when initializing.
                 * They will be bound at the end of this function.
                 */
                disableScanListeners();

                homeFlags.totalInProgress = false;
                $scope.CONFIG.pageTitle = 'CVS Health';
                $scope.isManager = CONFIG.loggedInUser.roles == 'P' ? true : false;
                $scope.isMinuteClinicDeposits = false;
                $scope.isOffline = CONFIG.storeData.isOffline;
                $scope.isPriceModify = false;
                $scope.isBillPay = false;
                $scope.isPserPurchaseIsCompleted = PseFactory.getIsPserPurchaseIsCompleted();
                $scope.isRefund = PseFactory.getIsPseRefund() ? PseFactory.getIsPseRefund() : false;
                $scope.minuteClinicDepositsOrder = [];
                $scope.patientInfoByCardno = PatientFactory.getExtraCareInfoByCardno();
                $scope.patientListByPhone = PatientFactory.getPatientListByPhone();
                $scope.refundSaleCompleted = PseFactory.isPseRefundPayCompleted();
                $scope.rxOrder = BasketFactory.getRxItemsInOrder();
                $scope.tempCurrOrder = OrderFactory.getOtcDataFromTxn();
                $scope.voidEarlierItemActive = false;
                $scope.voidEarlierItemDisabled = ($scope.getAllItemsInOrder().length || $scope.minuteClinicDepositsOrder.length) ? false : true;
                $scope.activePaidOut = null;
                $scope.activeFluShots = false;
                enableScanListeners();
            };

            $scope.isRefundActive = function() {
                if (!$scope.isRefund) {
                    if (Object.keys($scope.rxOrder).length || OrderFactory.getOtcDataFromTxn().length || $scope.minuteClinicDepositsOrder.length) {
                        return false;
                    }
                    return true;
                }
                return true;
            };

            $scope.voidItemMisMatchAlert = function() {
                $scope.voidEarlierItemActive = false;
                var modalOptions = {
                    buttons: ['OK'],
                    headerText: 'Error',
                    bodyText: 'Item/amount entered does not match.<br> Verify item/amount you wish to void from basket and try again'
                };
                DialogService.showDialog({}, modalOptions).then(function(result) {});
            };

            $scope.doPaidouts = function(actionTaken) {
                LOGGER.info('Button Pressed - PaidOuts ' + actionTaken, 'HomeCtrl');

                if ($scope.isPriceModify || $scope.isBillPay) {
                    return;
                }
                if ($scope.activePaidOut && $scope.activePaidOut !== actionTaken) {
                    return;
                }
                if ($scope.minuteClinicDepositsOrder.length) {
                    return;
                }
                if ($scope.getAllItemsInOrder().length && !$scope.activePaidOut) {
                    return;
                }
                NumberEntryService.showDialog({}, {
                    inputText: CONFIG.paidOuts[actionTaken].viewData.inputText,
                    headerText: CONFIG.paidOuts[actionTaken].viewData.headerText,
                    cancelConfirm: true,
                    maskCurrency: true,
                    thresholdValue: CONFIG.MAXIMUM_LIMIT.paidOutsLimit,
                    thresholdValueAlertText: CONFIG.paidOuts[actionTaken].viewData.thresholdValueAlertText,
                    invalidCondition: ' == 0',
                    invalidConditionAlertText: 'Invalid Amount Entered'
                }).then(function(resultVal) {
                    var amount = 0;
                    if ($scope.isRefund) {
                        amount = (parseInt(resultVal) / 100);
                    } else {
                        amount = -(parseInt(resultVal) / 100);
                    }
                    resultVal = amount.toFixed(2);
                    if ($scope.voidEarlierItemActive && !$scope.voidEarlierItemDisabled) {
                        var voidItemNotFound = true;
                        for (var i = 0; i < OrderFactory.getOtcDataFromTxn().length; i++) {
                            if (resultVal === OrderFactory.getOtcDataFromTxn()[i].retailPrice) {
                                $scope.voidEarlierItemActive = false;
                                $scope.tempCurrOrder.splice(i, 1);
                                $scope.updateSecDispPriceList();
                                voidItemNotFound = false;
                                return;
                            }
                        }
                        if (voidItemNotFound) {
                            $scope.voidItemMisMatchAlert();
                        }
                    } else {
                        PosSimplificationTimeStampService.selectEventMethod({ screenName: "manager_override", eventType: "screen_entered" });
                        var managerOverridePromise = ManagerOverrideService.doManagerOverride({
                            usernameHeaderText: 'Manager Override',
                            usernameInputTextHelp: 'Enter Manager ID Number',
                            passwordHeaderText: 'Manager Override',
                            passwordInputTextHelp: 'Enter Password',
                            usernameCancelConfirm: true,
                            passwordCancelConfirm: true,
                            bypassIfManager: true
                        });
                        if (!$scope.isManager) {
                            managerOverridePromise.then(
                                function(result) {
                                    PosSimplificationTimeStampService.selectEventMethod({ screenName: "manager_override", eventType: "screen_exited" });
                                    var eve = PosSimplificationTimeStampService.getEventjson();
                                    if (!$scope.activePaidOut) {
                                        $scope.activePaidOut = actionTaken;
                                        disableScanListeners();
                                        if (!$scope.isRefund) {
                                            $scope.refundSaleCompleted = true;
                                        }
                                    }
                                    var otcPaidout = angular.copy(CONFIG.paidOuts[actionTaken].payloadData);
                                    otcPaidout.cost = resultVal;
                                    otcPaidout.retailPrice = resultVal;
                                    OrderFactory.getTransactionIdData();
                                    OrderFactory.getOtcDataFromTxn().push(otcPaidout);
                                    $scope.tempCurrOrder = OrderFactory.getOtcDataFromTxn();
                                    $scope.updateSecDispPriceList();
                                },
                                function(empNotOnFile) {});
                        } else {
                            if (!$scope.activePaidOut) {
                                $scope.activePaidOut = actionTaken;
                                disableScanListeners();
                                if (!$scope.isRefund) {
                                    $scope.refundSaleCompleted = true;
                                }
                            }
                            var otcPaidout = angular.copy(CONFIG.paidOuts[actionTaken].payloadData);
                            otcPaidout.cost = resultVal;
                            otcPaidout.retailPrice = resultVal;
                            OrderFactory.getTransactionIdData();
                            OrderFactory.getOtcDataFromTxn().push(otcPaidout);
                            $scope.tempCurrOrder = OrderFactory.getOtcDataFromTxn();
                            $scope.updateSecDispPriceList();
                        }
                    }
                });
            };
            /**
             *To check whether total items reached max pos sold and display a popup
             * if max pos sold is empty or null, then default value 50 is used
             */
            $scope.isMaxItem = function() {

                LOGGER.info('Entering isMaxItem method', 'HomeCtrl > isMaxItem');

                var returnValue = false;
                var currentOrderSoldCount = $scope.getAllItemsInOrder().length + $scope.minuteClinicDepositsOrder.length;
                var maxItemsInOrderCount = 50;
                if (DAILY_CONFIG.screenConfig.screenConfig && DAILY_CONFIG.screenConfig.screenConfig.maxPosSold) {
                    maxItemsInOrderCount = DAILY_CONFIG.screenConfig.screenConfig.maxPosSold;
                }
                if (currentOrderSoldCount >= maxItemsInOrderCount) {
                    returnValue = true;
                    var modalOptions = {
                        buttons: ['OK'],
                        headerText: 'Error',
                        bodyText: 'Max POS Items in Order, Action not allowed.'
                    };
                    DialogService.showDialog({}, modalOptions).then(function(result) {
                        //Close window
                    });
                }
                return returnValue;
            };

            $scope.getCurrentTxnNum = function() {
                return TransactionInfo.getTransactionNumber();
            };

            $scope.taxNonTaxAmountAction = function(taxable) {
                LOGGER.info('Button Pressed - Item not on file', 'HomeCtrl');

                if ($scope.isMinuteClinicDeposits || $scope.isMaxItem() || $scope.activePaidOut ||
                    $scope.activeFluShots || $scope.isBillPay) {
                    return;
                }
                NumberEntryService.showDialog({}, {
                    inputText: taxable ? 'TAXABLE Amount' : 'Enter CVS OTC Item Price Using Keypad',
                    headerText: taxable ? 'TAXABLE' : 'CVS OTC',
                    cancelConfirm: true,
                    maskCurrency: true,
                    thresholdValue: CONFIG.MAXIMUM_LIMIT.otcAmountLimit
                }).then(function(resultVal) {
                    if (resultVal) {
                        if ($scope.isRefund) {
                            resultVal = -(parseInt(resultVal) / 100).toFixed(2);
                        } else {
                            resultVal = (parseInt(resultVal) / 100).toFixed(2);
                        }
                        BasketFactory.setPricesource('M');
                        var otcItemSpl = {
                            "sku": null,
                            "upc": null,
                            "retailPrice": resultVal,
                            "cost": resultVal,
                            "description": taxable ? "TAXABLE ITEM" : "CVS OTC item",
                            "quantity": 1,
                            "taxableItem": taxable ? true : false
                        };
                        if ($scope.voidEarlierItemActive && !$scope.voidEarlierItemDisabled) {
                            var voidItemNotFound = true;
                            // var taxableNonTaxableOrder = OrderFactory.getOtcDataFromTxn();
                            for (var i = 0; i < OrderFactory.getOtcDataFromTxn().length; i++) {
                                if ((OrderFactory.getOtcDataFromTxn()[i].taxableItem === taxable) && (resultVal === OrderFactory.getOtcDataFromTxn()[i].retailPrice)) {
                                    $scope.voidEarlierItemActive = false;
                                    $scope.tempCurrOrder.splice(i, 1);
                                    $scope.updateSecDispPriceList();
                                    voidItemNotFound = false;
                                    return;
                                }
                            }
                            if (voidItemNotFound) {
                                $scope.voidItemMisMatchAlert();
                            }
                        } else {
                            OrderFactory.getTransactionIdData();
                            OrderFactory.getOtcDataFromTxn().push(otcItemSpl);
                            $scope.tempCurrOrder = OrderFactory.getOtcDataFromTxn();
                            $scope.updateSecDispPriceList();
                        }
                    }
                });

            };

            $scope.getEncodedEccNumber = function() {
                var eccNumber = OrderFactory.getEccNumber();
                if (eccNumber && eccNumber.length > 4) {
                    var encodedEccNumber = eccNumber.substr(eccNumber.length - 4, 4);
                    return encodedEccNumber;
                }
                return;
            };

            $scope.showRegenBarcode = function() {
                return OrderFactory.getTotalBarcode();
            };

            /**
             * This method will be called if anything changes on
             * the left side of the home screen. This is used as
             * a hook to enable/disable any buttons on the home
             * screen as well.
             */
            $scope.updateSecDispPriceList = function() {
                $scope.isPriceModify = false;
                OrderFactory.setTotalBarcode(null);
                $scope.voidEarlierItemDisabled = ($scope.getAllItemsInOrder().length || $scope.minuteClinicDepositsOrder.length) ? false : true;
                if ($scope.voidEarlierItemDisabled && $scope.activePaidOut) {
                    $scope.activePaidOut = null;
                    enableScanListeners();
                    $scope.refundSaleCompleted = false;
                }
                /**
                 * Call the parent scope function to actually update
                 * the secondary display
                 */
                $scope.$parent.updateSecDispPriceList({
                    isRefund: $scope.isRefund
                });
            };

            $scope.doPseInquery = function(barcode) {

                LOGGER.info('Entering doPseInquery method', 'HomeCtrl > doPseInquery');

                var pseInquiryPromise = PseService.validatePseItems(barcode, null, null);
                pseInquiryPromise.then(function(result) {
                    if (!PseFactory.getIsPSEFlagIsDisplayed()) {
                        PseFactory.setIsPSEFlagIsDisplayed(true);
                        if (result !== null && (result.responseCode == PSE_ERROR_CODE['PSE_SUCESS_CODE'] || result.responseCode == PSE_ERROR_CODE['PSE_SUCESS_WARNING'])) {
                            // PseFactory.setIdentityScanData("");
                            PseFactory.setIdentityInfo(PseService.mergePersonInfo(result.personinfo, PseFactory.getIdentityInfo()));
                            if (result.responseCode == PSE_ERROR_CODE['PSE_SUCESS_WARNING'] && result.warnings && result.warnings.warning && result.warnings.warning.length) {
                                angular.forEach(result.warnings.warning, function(warningItem) {
                                    if (warningItem.code === 'ID EXPIRATION') {
                                        var modalOptions = {
                                            buttons: ['OK'],
                                            headerText: 'Error',
                                            bodyText: 'Scanned ID Expired'
                                        };
                                        DialogService.showDialog({}, modalOptions).then(function(result) {
                                            //Close window
                                        });
                                        return;
                                    }
                                });
                                $location.url("/license-entry");
                            } else {
                                $scope.showPSECustomerDisplay();
                            }
                        } else if (result !== null && result.responseCode == PSE_ERROR_CODE['PSE_FAIL_CODE']) {
                            if (result.personinfo) {
                                PseFactory.setIdentityInfo(PseService.mergePersonInfo(result.personinfo, PseFactory.getIdentityInfo()));
                            }
                            $scope.showPseErrorMessage();
                            $scope.removeControlledItem();
                            $scope.printPSEDecline(result);
                        } else {
                            $scope.showServiceErrorMessage();
                            $scope.removeControlledItem();
                        }

                    } else {
                        if (result !== null && (result.responseCode == PSE_ERROR_CODE['PSE_SUCESS_CODE'] || result.responseCode == PSE_ERROR_CODE['PSE_SUCESS_WARNING'])) {
                            PseFactory.setIdentityInfo(PseService.mergePersonInfo(result.personinfo, PseFactory.getIdentityInfo()));
                            $scope.addControlledItemToHomeBasket();
                        } else if (result !== null && result.responseCode == PSE_ERROR_CODE['PSE_FAIL_CODE']) {
                            if (result.personinfo) {
                                PseFactory.setIdentityInfo(PseService.mergePersonInfo(result.personinfo, PseFactory.getIdentityInfo()));
                            }
                            $scope.showPseErrorMessage();
                            $scope.removeControlledItem();
                            $scope.printPSEDecline(result);
                        } else {
                            $scope.showServiceErrorMessage();
                            $scope.removeControlledItem();
                        }
                    }
                }, function(result) {
                    $scope.showServiceErrorMessage();
                    $scope.removeControlledItem();
                });
            };

            $scope.removeControlledItem = function() {

                LOGGER.info('Entering removeControlledItem method', 'HomeCtrl > removeControlledItem');

                var controlledItem = PseFactory.getControlledItem();
                PseFactory.setInquiryInProgress(false);
                PseFactory.removeFromCurrentOrderList(controlledItem);
                if ($scope.isRefund) {
                    var toRemoveItem = "";
                    angular.forEach(OrderFactory.getOtcDataFromTxn(), function(otcItem, index) {
                        if (otcItem.upc == controlledItem.upc) {
                            toRemoveItem = index;
                        }
                    });
                    if (toRemoveItem) {
                        OrderFactory.getOtcDataFromTxn().splice(toRemoveItem, 1);
                    }
                }
            };
            $scope.printPSEDecline = function(response) {

                LOGGER.info('Entering printPSEDecline method', 'HomeCtrl > printPSEDecline');

                var printPseDicline = angular.copy(PseFactory.getPsePrintServiceRequest());
                printPseDicline.PSEDeclineRequest.dailyLimit = "3.6 g";
                printPseDicline.PSEDeclineRequest.maxLimit = "9.0 g";
                printPseDicline.PSEDeclineRequest.days = "30";
                if (response !== null && response.inquirySid) {
                    printPseDicline.PSEDeclineRequest.transaction = response.inquirySid;
                } else {
                    var tempId = appUtils.getCurrentTimestamp() + "";
                    printPseDicline.PSEDeclineRequest.transaction = tempId.substr(0, 7);
                }
                PrintService.doPrint(appConfig.store.services.API.printService.pseDecline, printPseDicline);
            };

            $scope.showPseErrorMessage = function() {

                LOGGER.info('Entering showPseErrorMessage method', 'HomeCtrl > showPseErrorMessage');

                //If reached PSE purchase limit invoke PSE Decline
                var pseDeclinePromise = PseService.executePsePurchaseRequest('DECLINE');
                //Pse Item purchase issue
                var modalOptions = PSE_ERROR_MESSAGE['PSE_INQUERY_FAIL'];
                DialogService.showDialog({}, modalOptions).then(function(type) {
                    if (type == 'OK') {
                        if (PseFactory.getCurrentOrderList().length < 1) {
                            PseFactory.clearPSEData();
                        }
                    }
                });
            };

            $scope.showServiceErrorMessage = function() {

                LOGGER.info('Entering showServiceErrorMessage method', 'HomeCtrl > showServiceErrorMessage');

                var modalOptions = PSE_ERROR_MESSAGE['PSE_SERVICE_FAIL'];
                DialogService.showDialog({}, modalOptions).then(function(type) {
                    if (type == 'OK') {
                        if (PseFactory.getCurrentOrderList().length < 1) {
                            PseFactory.clearPSEData();
                        }
                    }
                });
            };

            $scope.totalAmount = function() {
                var orderTotal = 0;
                if ($scope.minuteClinicDepositsOrder.length) {
                    angular.forEach($scope.minuteClinicDepositsOrder, function(item) {
                        orderTotal += parseFloat(item.amount);
                    });
                    return orderTotal.toFixed(2);
                }
                angular.forEach(OrderFactory.getOtcDataFromTxn(), function(otcItem) {
                    if (otcItem.priceModify) {
                        orderTotal += parseFloat(otcItem.modifiedPrice);
                    } else {
                        orderTotal += parseFloat(otcItem.retailPrice);
                    }
                });
                angular.forEach($scope.rxOrder, function(val, key) {
                    if (val.basketItemInfo.fillDisposition && val.basketItemInfo.fillDisposition.priceModify) {
                        orderTotal += parseFloat(val.basketItemInfo.fillDisposition.modifiedPrice);
                    } else {
                        orderTotal += parseFloat(val.basketItemInfo.patPayAmt);
                    }
                });
                orderTotal = orderTotal.toFixed(2);
                return orderTotal;
            };

            $scope.getAllItemsInOrder = function() {
                var allItems = [];
                OrderFactory.setNoItemsInOrder(true);
                angular.forEach($scope.rxOrder, function(val, key) {
                    allItems.push(val);
                    OrderFactory.setNoItemsInOrder(false);
                });
                angular.forEach(OrderFactory.getOtcDataFromTxn(), function(otcItem) {
                    allItems.push(otcItem);
                    OrderFactory.setNoItemsInOrder(false);
                });
                angular.forEach(OrderFactory.getBillPayItemFromTxn(), function(billPayItem) {
                    allItems.push(billPayItem);
                    OrderFactory.setNoItemsInOrder(false);
                });
                if (allItems.length) {
                    // OrderFactory.setTotalBarcode(null);
                    OrderFactory.setNoItemsInOrder(false);
                }
                return allItems;
            };

            $scope.voidEarlierItem = function() {
                LOGGER.info('Button Pressed - Void Earlier Item', 'HomeCtrl');
                $scope.isPriceModify = false;
                if ($scope.activeFluShots || $scope.isBillPay)
                    return;
                if (!$scope.voidEarlierItemDisabled) {
                    $scope.voidEarlierItemActive = !$scope.voidEarlierItemActive;
                }
            };

            $scope.goToWeCare = function() {
                LOGGER.info('Button Pressed - RxConnect', 'HomeCtrl');

                PosSimplificationTimeStampService.handleItemEntryScreenEvents("RxConnect");

                if ($scope.minuteClinicDepositsOrder.length || CONFIG.storeData.isOffline || $scope.activePaidOut ||
                    $scope.isRefund || $scope.activeFluShots || $scope.isBillPay) {
                    return;
                }
                if ((!$scope.rxOrder && !$scope.tempCurrOrder) || (!$scope.rxOrder.length && !$scope.tempCurrOrder.length)) {
                    SocketTrafficHandler.clear();
                }
                if (BasketFactory.getBasketData() && Object.keys(BasketFactory.getBasketData()).length) {
                    $location.url('/basket');
                    return;
                }
                $location.url("/patient-lookup");
                $scope.CONFIG.pageTitle = "Patient Lookup";
            };

            var handleFastPass = function(evt, barcode) {

                LOGGER.info('Entering handleFastPass method', 'HomeCtrl > handleFastPass');
                $scope.fastPassListner(barcode);
            }

            $scope.clearWholeData = function() {
                LOGGER.info('Entering clearWholeData method', 'HomeCtrl > clearWholeData');
                $scope.clearAllFactories();
                $scope.initializeHome();
                $route.reload();
            };

            $scope.itemLookup = function() {
                LOGGER.info('Button Pressed - UPC Lookup', 'HomeCtrl');

                if ($scope.minuteClinicDepositsOrder.length || $scope.activePaidOut || $scope.activeFluShots || $scope.isBillPay) {
                    return;
                }
                disableScanListeners();
                NumberEntryService.showDialog({}, {
                    inputText: 'Enter UPC # Using Keypad',
                    headerText: 'UPC',
                    cancelConfirm: true
                }).then(function(result) {
                    enableScanListeners();
                    $scope.$broadcast('SCANNED_DATA_OTC', result);
                }, function() {
                    enableScanListeners();
                });
            };
            $scope.skuLookup = function() {
                LOGGER.info('Button Pressed - Item # Lookup', 'HomeCtrl');

                if ($scope.isBillPay || $scope.minuteClinicDepositsOrder.length || $scope.activePaidOut || $scope.activeFluShots) {
                    return;
                }
                disableScanListeners();
                NumberEntryService.showDialog({}, {
                    inputText: 'Enter Item # Using Keypad',
                    headerText: 'Item #',
                    cancelConfirm: true
                }).then(function(result) {
                    enableScanListeners();
                    $scope.$broadcast('SCANNED_DATA_OTC', result, true);
                }, function() {
                    BasketFactory.setPricesource('B');
                    enableScanListeners();
                });
            };
            $scope.rxscan = function() {
                LOGGER.info('Button Pressed - RX number', 'HomeCtrl');

                if ($scope.minuteClinicDepositsOrder.length || $scope.activePaidOut || $scope.activeFluShots || $scope.isBillPay) {
                    return;
                }
                if ($scope.isRefund || CONFIG.storeData.isOffline) {
                    NumberEntryService.showDialog({}, {
                        inputText: 'Enter Rx',
                        headerText: 'Rx'
                    }).then(function(result) {
                        BasketFactory.setPricesource('B');
                        $scope.$broadcast('SCANNED_DATA_RX', result);
                    });
                }
            };


            var scanOtc = function(evt, barcode, isSku) {
                if ($scope.isBillPay) {
                    $scope.performBillPay(evt, barcode);
                    return;
                }

                LOGGER.info('Entering scanOtc method', 'HomeCtrl > scanOtc');
                BasketFactory.setPricesource('B');
                if ($scope.isMinuteClinicDeposits || $scope.isMaxItem()) {
                    return;
                }
                PosSimplificationTimeStampService.hanldeOTCItemScan();
                var param = isSku ? 'SKU' : 'UPC';
                if ($scope.isPriceModify) {
                    $scope.currentOtcItem = {};
                    if ($scope.isRefund) {
                        var modalOptions = {
                            buttons: ['OK'],
                            headerText: 'Error',
                            bodyText: 'Price Modify not allowed'
                        };
                        DialogService.showDialog({}, modalOptions).then(function(result) {});
                        return;
                    }
                    var itemLookUpPromise = Request.invoke({
                        loadMessage: "Looking up item...",
                        url: appConfig.store.services.API.itemLookUp + '/' + '?' + param + '=' + barcode,
                        method: 'GET'
                    });
                    itemLookUpPromise.then(function(result) {
                        if ($scope.getAllItemsInOrder().length === 0) {
                            OrderFactory.getTransactionIdData();
                        }
                        $scope.currentOtcItem = result;
                        if ($scope.currentOtcItem) {
                            $scope.currentOtcItem.scanInd = 'Y';
                            var modalOptions = {
                                buttons: ['Price', 'Percent', 'Cancel'],
                                bodyText: 'Please select method of price modify'
                            };
                            DialogService.showDialog({}, modalOptions).then(function(result) {
                                $scope.isPriceModify = false;
                                if (result == "Price") {
                                    NumberEntryService.showDialog({}, {
                                        inputText: 'Please enter the PRICE to modify <br/>' +
                                            'the item ' + $scope.currentOtcItem.description +
                                            '<br/>Regular Unit price:&nbsp;' + $scope.currentOtcItem.retailPrice,
                                        headerText: 'PRICE MODIFY',
                                        maskCurrency: true
                                    }).then(function(result) {
                                        if (result) {
                                            if ($scope.currentOtcItem.priceModify) {
                                                var modalOptions = {
                                                    buttons: ['OK'],
                                                    headerText: 'Information',
                                                    bodyText: 'PRICE MODIFY NOT<br/>ALLOWED'
                                                };
                                                DialogService.showDialog({}, modalOptions).then(function(result) {

                                                });
                                                return;
                                            }
                                            $scope.currentOtcItem.modifiedPrice = (parseFloat(result) / 100).toFixed(2);

                                            var amount = $scope.currentOtcItem.modifiedPrice;
                                            var modifiedPriceDiff = parseFloat($scope.currentOtcItem.retailPrice) - amount;
                                            if (amount > parseFloat($scope.currentOtcItem.retailPrice)) {
                                                var mOptions = {
                                                    buttons: ['OK'],
                                                    headerText: 'Information',
                                                    bodyText: 'PRICE MODIFY MARKUP<br/>IS NOT ALLOWED'
                                                };
                                                DialogService.showDialog({}, mOptions).then(function(result) {
                                                    $scope.isPriceModify = true;
                                                    $scope.$broadcast('SCANNED_DATA_OTC', barcode, isSku);
                                                });
                                                return;
                                            }

                                            $scope.currentOtcItem.priceModify = true;
                                            if ($scope.currentOtcItem.pseFlag) {
                                                if (!PseFactory.isInquiryInProgress()) {
                                                    PseFactory.setControlledItem($scope.currentOtcItem);
                                                    PseFactory.addControlledItemToCurrentOrderList();
                                                    PseFactory.setInquiryInProgress(true);
                                                    $scope.showPSE();
                                                } else {
                                                    LOGGER.info("Ignoring item scanned while PSE inquiry in progress.: " + barcode);
                                                }
                                            } else {
                                                $scope.doManagerOverride({
                                                    callback: $scope.otcItemRefundCallback,
                                                    callbackData: {
                                                        currentOtcItem: $scope.currentOtcItem
                                                    },
                                                    type: 'priceModify',
                                                    amount: modifiedPriceDiff
                                                });
                                                return;
                                            }
                                        }
                                    });
                                } else if (result == "Percent") {
                                    NumberEntryService.showDialog({}, {
                                        inputText: 'Please enter the PERCENT OFF to<br/>' +
                                            'modify the item ' + $scope.currentOtcItem.description +
                                            '<br/>Regular Unit price:&nbsp;' + $scope.currentOtcItem.retailPrice,
                                        headerText: 'PERCENT OFF MODIFY'
                                    }).then(function(result) {
                                        if (result) {
                                            result = parseInt(result);
                                            if (result <= 100) {
                                                if ($scope.currentOtcItem.priceModify) {
                                                    var modalOptions = {
                                                        buttons: ['OK'],
                                                        headerText: 'Information',
                                                        bodyText: 'PRICE MODIFY NOT<br/>ALLOWED'
                                                    };
                                                    DialogService.showDialog({}, modalOptions).then(function(result) {

                                                    });
                                                    return;
                                                }
                                                $scope.currentOtcItem.modifiedPrice = ($scope.currentOtcItem.retailPrice - ($scope.currentOtcItem.retailPrice * result) / 100).toFixed(2);
                                                var amount = $scope.currentOtcItem.modifiedPrice;
                                                var modifiedPriceDiff = parseFloat($scope.currentOtcItem.retailPrice) - amount;
                                                $scope.currentOtcItem.priceModify = true;
                                                if ($scope.currentOtcItem.pseFlag) {
                                                    if (!PseFactory.isInquiryInProgress()) {
                                                        PseFactory.setControlledItem($scope.currentOtcItem);
                                                        PseFactory.addControlledItemToCurrentOrderList();
                                                        PseFactory.setInquiryInProgress(true);
                                                        $scope.showPSE();
                                                    } else {
                                                        LOGGER.info("Ignoring item scanned while PSE inquiry in progress.: " + barcode);
                                                    }
                                                } else {
                                                    $scope.doManagerOverride({
                                                        callback: $scope.otcItemRefundCallback,
                                                        callbackData: {
                                                            currentOtcItem: $scope.currentOtcItem
                                                        },
                                                        type: 'priceModify',
                                                        amount: modifiedPriceDiff
                                                    });
                                                    return;
                                                }
                                            } else {
                                                var modalOptions = {
                                                    buttons: ['OK'],
                                                    headerText: 'Error',
                                                    bodyText: 'Please enter a valid percentage'
                                                };
                                                DialogService.showDialog({}, modalOptions).then(function(result) {});
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }, function(result, statusCode) {
                        var modalOptions = {
                            buttons: ['OK'],
                            headerText: 'Error',
                            bodyText: result.message
                        };
                        DialogService.showDialog({}, modalOptions).then(function(result) {});
                    });

                } else {
                    $scope.handleOtcItemScan(barcode, isSku);
                }
            };

            $scope.otcItemRefundCallback = function(opts) {

                LOGGER.info('Entering otcItemRefundCallback method', 'HomeCtrl > otcItemRefundCallback');

                OrderFactory.getOtcDataFromTxn().push(opts.currentOtcItem);
                $scope.updateSecDispPriceList();
            };
            $scope.handleOtcItemScan = function(barcode, isSku) {

                LOGGER.info('Entering handleOtcItemScan method', 'HomeCtrl > handleOtcItemScan');

                var param = isSku ? 'SKU' : 'UPC';
                if ($scope.voidEarlierItemActive && !$scope.voidEarlierItemDisabled) {
                    $scope.voidEarlierItemActive = false;
                    var voidItemFound = false;
                    var toRemoveItem = -1;
                    var otcItemToVoid = {};

                    var itemLookUpPromise = Request.invoke({
                        loadMessage: "Looking up item...",
                        url: appConfig.store.services.API.itemLookUp + '/' + '?' + param + '=' + barcode,
                        method: 'GET'
                    });
                    itemLookUpPromise.then(function(result) {
                        var voidItemNotFound = true;
                        angular.forEach(OrderFactory.getOtcDataFromTxn(), function(otcItem, index) {
                            if (isSku) {
                                if (parseInt(otcItem.sku) == parseInt(result.sku)) {
                                    voidItemFound = true;
                                    toRemoveItem = index;
                                    otcItemToVoid = otcItem;
                                    voidItemNotFound = false;
                                }
                            } else {
                                if (parseInt(otcItem.upc) == parseInt(result.upc)) {
                                    voidItemFound = true;
                                    toRemoveItem = index;
                                    otcItemToVoid = otcItem;
                                    voidItemNotFound = false;
                                }
                            }
                        });
                        if (voidItemNotFound) {
                            $scope.voidItemMisMatchAlert();
                        }
                        if (toRemoveItem > -1) {
                            if (otcItemToVoid.pseFlag) {
                                PseFactory.removeFromCurrentOrderList(otcItemToVoid);
                            }
                            OrderFactory.getOtcDataFromTxn().splice(toRemoveItem, 1);
                            if ($scope.isRefund && !OrderFactory.getOtcDataFromTxn().length) {
                                $scope.isRefund = false;
                            }
                        }
                        $scope.updateSecDispPriceList();
                    }, function(result, statusCode) {
                        var modalOptions = {
                            buttons: ['OK'],
                            bodyText: 'Item not found in current transaction'
                        };
                        DialogService.showDialog({}, modalOptions).then(function(result) {});
                    });
                    $scope.updateSecDispPriceList();
                } else {
                    //if OrderFactory having transaction data no need to call the same service.
                    OrderFactory.getTransactionIdData();
                    var itemLookUpPromise = Request.invoke({
                        loadMessage: "Looking up item...",
                        url: appConfig.store.services.API.itemLookUp + '/' + '?' + param + '=' + barcode,
                        method: 'GET'
                    });
                    itemLookUpPromise.then(function(result) {
                        if (result && result.doNotSell && !$scope.isRefund) {
                            if (result.major) {
                                checkForConsumerhealthCare(result.major);
                            }
                            LOGGER.info('Home Page > Action:handleOtcItemScan > OTC_NO_SALE:Not Allowed to Sell', loggerName);
                            var modalOptions = {
                                buttons: ['OK'],
                                headerText: 'Error',
                                bodyText: 'Front Store Item not allowed to sell.'
                            };
                            DialogService.showDialog({}, modalOptions).then(function(result) {});
                            return;
                        }
                        var otcItem = result;
                        if (otcItem && otcItem.major) {
                            checkForConsumerhealthCare(result.major);
                        }
                        otcItem.scanInd = 'Y';
                        if ($scope.isRefund) {
                            var amount = otcItem.retailPrice;
                            otcItem.retailPrice = -(otcItem.retailPrice);
                            if (otcItem.pseFlag) {
                                if (!PseFactory.isInquiryInProgress()) {
                                    if (CONFIG.storeAttributes.pseRefundBlocked && CONFIG.storeAttributes.pseRefundBlocked === 'Y') {
                                        DialogService.showDialog({}, {
                                            buttons: ['OK'],
                                            headerText: 'Error',
                                            bodyText: "PSE items cannot be refunded in this store"
                                        }).then(function(selection) {
                                            return;
                                        });
                                    } else {
                                        PseFactory.setPseRefundPayCompleted($scope.refundSaleCompleted);
                                        PseFactory.setIsPseRefund(true);
                                        PseFactory.setControlledItem(otcItem);
                                        PseFactory.addControlledItemToCurrentOrderList();
                                        $scope.showPSE();
                                    }
                                } else {
                                    LOGGER.info("Ignoring item scanned while PSE inquiry in progress.: " + barcode);
                                }
                            } else {
                                $scope.doManagerOverride({
                                    callback: $scope.otcItemRefundCallback,
                                    callbackData: {
                                        currentOtcItem: otcItem
                                    },
                                    type: 'refund',
                                    amount: amount
                                });
                                return;
                            }
                        } else {
                            if (otcItem.pseFlag) {
                                if (!PseFactory.isInquiryInProgress()) {
                                    PseFactory.setControlledItem(otcItem);
                                    PseFactory.addControlledItemToCurrentOrderList();
                                    PseFactory.setInquiryInProgress(true);
                                    $scope.showPSE();
                                } else {
                                    LOGGER.info("Ignoring item scanned while PSE inquiry in progress.: " + barcode);
                                }
                            } else {
                                OrderFactory.getOtcDataFromTxn().push(otcItem);
                                $scope.tempCurrOrder = OrderFactory.getOtcDataFromTxn();
                            }
                        }
                        $scope.updateSecDispPriceList();
                    }, function(result, statusCode) {
                        var modalOptions = {
                            buttons: ['OK'],
                            headerText: 'Error',
                            bodyText: result.message
                        };
                        DialogService.showDialog({}, modalOptions);
                    });
                }
            };

            var findRxInOrder = function(fillInfo) {
                var arrayBarCode = Object.keys($scope.rxOrder);
                for (var i = arrayBarCode.length - 1; i >= 0; i--) {
                    var tmpBarcode = arrayBarCode[i];
                    if ($scope.buildPartialRxbarcode($scope.rxOrder[tmpBarcode].basketItemInfo) === $scope.buildPartialRxbarcode(fillInfo)) {
                        return $scope.rxOrder[tmpBarcode];
                    }
                }
                return null;
            }

            var handleRxScan = function(evt, barcode) {
                if ($scope.isMinuteClinicDeposits || $scope.isMaxItem()) {
                    return;
                }
                if ($scope.isPriceModify && $scope.rxOrder.length === 0) {
                    var modalOptions = {
                        buttons: ['OK'],
                        headerText: 'Error',
                        bodyText: 'Price Modify not allowed'
                    };
                    DialogService.showDialog({}, modalOptions).then(function(result) {});
                    return;
                }

                if ($scope.isRefund || $scope.isOffline || ($scope.voidEarlierItemActive &&
                        !$scope.voidEarlierItemDisabled) || $scope.isPriceModify) {
                    OrderFactory.getTransactionIdData();
                    var payload = {
                        RxInfoRequest: {
                            barCode: barcode,
                            storeNumber: CONFIG.storeAttributes.storeNumber,
                            screenId: 1234,
                            /////////////////////////////////////////////////////////////
                            // 'R' is for Refunds. Since we just need the barcode for  //
                            // getting the Rx number and fill sequence number, we      //
                            // can use 'R' for Voiding the transaction as well         //
                            /////////////////////////////////////////////////////////////
                            transactionType: 'R'
                        }
                    };
                    if ($scope.isOffline || $scope.isPriceModify) {
                        payload.RxInfoRequest.transactionType = "S";
                        payload.RxInfoRequest.patientProfileList = BasketFactory.getRxOrderData();
                    }

                    var rxScanPromise = Request.invoke({
                        url: appConfig.store.services.API.rxScan,
                        method: 'POST',
                        data: payload
                    });
                    rxScanPromise.then(function(result) {
                        if (result) {
                            var fillInfo = result;
                            /**
                             * Check if the void earlier transaction is active and not
                             * disabled. If it is, then remove the item from transaction.
                             * If it is not, then it is offline scenario
                             */
                            if ($scope.voidEarlierItemActive && !$scope.voidEarlierItemDisabled) {
                                voidRxFromSale(fillInfo, barcode);
                            } else {
                                if ($scope.isOffline && !$scope.isRefund && !$scope.isPriceModify) {
                                    var offlineFillInfo = fillInfo;
                                    fillInfo = fillInfo.patientFillInfo;

                                    // check if the item is already in basket.
                                    if (findRxInOrder(fillInfo)) {
                                        var modalOptions = {
                                            buttons: ['Okay'],
                                            headerText: 'Error',
                                            bodyText: 'Prescription already in the basket.'
                                        };
                                        DialogService.showDialog({}, modalOptions);
                                        return;
                                    }

                                    var modalOptions = {
                                        buttons: ['Cancel', 'C', 'N', 'No letter'],
                                        headerText: 'State Regulatory Information',
                                        bodyText: 'Please select the letter preceding the Prescription number on the receipt'
                                    };
                                    DialogService.showDialog({}, modalOptions).then(function(resultInner) {
                                        var offlinePPRMsgInfo = BasketFactory.getOfflineProfile().patientMessageInfo || {};
                                        var state = null;
                                        //for identifing store state as SRD config data is providing Login State
                                        angular.forEach(DAILY_CONFIG.SRDRulesConfig.SRDRulesConfig.state, function(states) {
                                            if (states.type === 'LOGIN_STATE') {
                                                state = states.code;
                                            }
                                        });
                                        if (resultInner === 'C' || resultInner === 'N') {
                                            offlinePPRMsgInfo.srdMsg = offlinePPRMsgInfo.srdMsg || [];
                                            var messageItem = {
                                                type: "SRDMsg",
                                                disposition: null,
                                                mandatory: 'Y',
                                                notDisplayedReason: null,
                                                timestamp: null,
                                                messageType: 8,
                                                rxNum: fillInfo.rxNum,
                                                refillNum: fillInfo.refillNum,
                                                partialFillSeqNum: fillInfo.partialFillSeqNum,
                                                editVersionNum: fillInfo.editVersionNum,
                                                rxPatientId: CONFIG.offlinePatId,
                                                msgSeq: appUtils.getRandomNumber(4),
                                                messageConfig: null,
                                                markDisplayed: false,
                                                state: state,
                                                dea: (resultInner == 'C') ? "C3" : "C2",
                                                pickupCaptureIndicator: 'P',
                                                patientCaptureIndicator: 'P',
                                                progType: "1"
                                            };

                                            offlinePPRMsgInfo.srdMsg.push(messageItem);
                                            BasketFactory.getOfflineProfile().patientMessageInfo = offlinePPRMsgInfo;
                                            $scope.tpComplianceMessageAction(BasketFactory.getOfflineProfile(), offlineFillInfo, result);


                                        } else if (resultInner === 'No letter') {
                                            BasketFactory.getOfflineProfile().patientMessageInfo = offlinePPRMsgInfo;
                                            $scope.tpComplianceMessageAction(BasketFactory.getOfflineProfile(), offlineFillInfo, result);

                                        } else if (resultInner === 'Cancel') {
                                            return;
                                        }
                                        var patFillList = BasketFactory.getOfflineProfile().patientFillInfoList || [];
                                        patFillList.push(fillInfo);
                                        BasketFactory.getOfflineProfile().patientFillInfoList = patFillList;

                                        fillInfo.fillDisposition = {
                                            dispositionKey: 'SLD',
                                            disposition: 1,
                                            scanInd: 'Y',
                                            taxCollected: 0,
                                            userId: CONFIG.loggedInUser.id,
                                            lineVoidedLater: 'N',
                                            modifiedPrice: null,
                                            fillLevel: 'N',
                                            locationOfRx: 'WB',
                                            voidedTransactionNumber: null,
                                            priceSource: 'T',
                                            barcode: barcode
                                        };

                                        var rxItemInOrder = {
                                            basketItemInfo: fillInfo
                                        };
                                        $scope.rxOrder[barcode] = rxItemInOrder;
                                        if (BasketFactory.getRxItemsInOrder()[barcode] == null) {
                                            BasketFactory.setRxItemsInOrder(barcode, rxItemInOrder);
                                        }
                                        MessageFactory.setIsOfflineMessagingDone(false);
                                        $scope.updateSecDispPriceList();
                                    });
                                }
                                if ($scope.isPriceModify) {
                                    // when cashPrescriptionIndicator == "Y" in fillInfo, price modify is not allowed
                                    if (fillInfo && fillInfo.patientFillInfo.cashPrescriptionIndicator == "Y") {
                                        var modalOptions = {
                                            buttons: ['OK'],
                                            headerText: 'Error',
                                            bodyText: 'Price Modify not allowed'
                                        };
                                        DialogService.showDialog({}, modalOptions).then(function(result) {
                                            $scope.isPriceModify = false;
                                        });
                                        return;
                                    }
                                    var modalOptions = {
                                        buttons: ['Price', 'Percent', 'Cancel'],
                                        bodyText: 'Please select method of price modify'
                                    };
                                    DialogService.showDialog({}, modalOptions).then(function(result) {
                                        $scope.isPriceModify = false;
                                        if (result == "Price") {
                                            //console.log("Inside Price ");
                                            var currentItem = $scope.rxOrder[barcode];
                                            NumberEntryService.showDialog({}, {
                                                inputText: 'Please enter the PRICE to modify <br/>' +
                                                    'the item ' + currentItem.basketItemInfo.drugDesc +
                                                    '<br/>Regular Unit price:&nbsp;' + currentItem.basketItemInfo.patPayAmt,
                                                headerText: 'PRICE MODIFY',
                                                maskCurrency: true
                                            }).then(function(result) {
                                                if (result) {
                                                    var currentItem = $scope.rxOrder[barcode];
                                                    if (currentItem) {
                                                        if (currentItem.basketItemInfo.fillDisposition.priceModify) {
                                                            var modalOptions = {
                                                                buttons: ['OK'],
                                                                headerText: 'Information',
                                                                bodyText: 'PRICE MODIFY NOT<br/>ALLOWED'
                                                            };
                                                            DialogService.showDialog({}, modalOptions).then(function(result) {

                                                            });
                                                            return;
                                                        }
                                                        var modifiedPrice = (parseFloat(result) / 100).toFixed(2);
                                                        if (modifiedPrice > parseFloat(currentItem.basketItemInfo.patPayAmt)) {
                                                            var mOptions = {
                                                                buttons: ['OK'],
                                                                headerText: 'Information',
                                                                bodyText: 'PRICE MODIFY MARKUP<br/>IS NOT ALLOWED'
                                                            };
                                                            DialogService.showDialog({}, mOptions).then(function(result) {

                                                            });
                                                            return;
                                                        }
                                                        var modifiedPriceDiff = parseFloat(currentItem.basketItemInfo.patPayAmt) - modifiedPrice;
                                                        $scope.doManagerOverride({
                                                            callback: $scope.rxItemPriceModifyCallback,
                                                            callbackData: {
                                                                currentItem: currentItem,
                                                                modifiedPrice: modifiedPrice
                                                            },
                                                            type: 'priceModify',
                                                            amount: modifiedPriceDiff,
                                                            isRx: true
                                                        });
                                                        // currentItem.basketItemInfo.fillDisposition.modifiedPrice = (parseFloat(result) / 100).toFixed(2);
                                                        // currentItem.basketItemInfo.fillDisposition.priceModify = true;
                                                        // $scope.updateSecDispPriceList();
                                                    }
                                                }
                                            });
                                        } else if (result == "Percent") {
                                            var currentItem = $scope.rxOrder[barcode];
                                            NumberEntryService.showDialog({}, {
                                                inputText: 'Please enter the PERCENT OFF to modify <br/>' +
                                                    'the item ' + currentItem.basketItemInfo.drugDesc +
                                                    '<br/>Regular Unit price:&nbsp;' + currentItem.basketItemInfo.patPayAmt,
                                                headerText: 'PERCENT OFF MODIFY'
                                            }).then(function(result) {
                                                if (result) {
                                                    result = parseInt(result);
                                                    if (result <= 100) {
                                                        var currentItem = $scope.rxOrder[barcode];
                                                        if (currentItem) {
                                                            if (currentItem.basketItemInfo.fillDisposition.priceModify) {
                                                                var modalOptions = {
                                                                    buttons: ['OK'],
                                                                    headerText: 'Information',
                                                                    bodyText: 'PRICE MODIFY NOT<br/>ALLOWED'
                                                                };
                                                                DialogService.showDialog({}, modalOptions).then(function(result) {});
                                                                return;
                                                            }
                                                            var modifiedPrice = (currentItem.basketItemInfo.patPayAmt - (currentItem.basketItemInfo.patPayAmt * result) / 100).toFixed(2);
                                                            var modifiedPriceDiff = parseFloat(currentItem.basketItemInfo.patPayAmt) - modifiedPrice;
                                                            $scope.doManagerOverride({
                                                                callback: $scope.rxItemPriceModifyCallback,
                                                                callbackData: {
                                                                    currentItem: currentItem,
                                                                    modifiedPrice: modifiedPrice
                                                                },
                                                                type: 'priceModify',
                                                                amount: modifiedPriceDiff
                                                            });
                                                            // currentItem.basketItemInfo.fillDisposition.modifiedPrice = (currentItem.basketItemInfo.patPayAmt - (currentItem.basketItemInfo.patPayAmt * result) / 100).toFixed(2);
                                                            // currentItem.basketItemInfo.fillDisposition.priceModify = true;
                                                            // $scope.updateSecDispPriceList();
                                                        }
                                                    } else {
                                                        var modalOptions = {
                                                            buttons: ['OK'],
                                                            headerText: 'Error',
                                                            bodyText: 'Please enter a valid percentage'
                                                        };
                                                        DialogService.showDialog({}, modalOptions).then(function(result) {});
                                                    }
                                                }
                                            });

                                        }
                                    });
                                }
                                //////////////////////////////
                                // process Refund scenario. //
                                //////////////////////////////
                                if ($scope.isRefund) {
                                    processRefundForFill(fillInfo, barcode);
                                }
                            }
                        }
                    }, function(result, statusCode) {
                        var modalOptions = {
                            buttons: ['Okay'],
                            headerText: 'Error',
                            bodyText: result.moreInfo
                        };
                        DialogService.showDialog({}, modalOptions).then(function(result) {});
                    });
                } else {
                    // $location.url('/patient-lookup');
                }

                var voidRxFromSale = function(fillInfo, barcode) {

                    fillInfo = fillInfo.patientFillInfo ? fillInfo.patientFillInfo : fillInfo;

                    $scope.voidEarlierItemActive = false;
                    var voidRxFound = false;
                    var offlineFillIndex = -1;
                    var patientIds = Object.keys(BasketFactory.getBasketData());
                    var voidItemNotFound = true;
                    voidRxFromSale_outerLoop:
                        for (var i = patientIds.length - 1; i >= 0; i--) {
                            var profile = BasketFactory.getBasketData()[patientIds[i]];
                            for (var j = profile.patientFillInfoList.length - 1; j >= 0; j--) {
                                var patFillDetail = profile.patientFillInfoList[j];
                                if ($scope.buildPartialRxbarcode(fillInfo) ==
                                    $scope.buildPartialRxbarcode(patFillDetail)) {
                                    OrderService.removeWelcomeRxCoupon(patientIds[i], fillInfo);
                                    voidItemNotFound = false;
                                    voidRxFound = true;
                                    offlineFillIndex = j;
                                    //New disposition
                                    patFillDetail.fillDisposition.disposition = 3;
                                    patFillDetail.fillDisposition.dispositionKey = 'HWB';
                                    patFillDetail.fillDisposition.scanInd = 'Y';
                                    patFillDetail.fillDisposition.taxCollected = 0;
                                    patFillDetail.fillDisposition.userId = CONFIG.loggedInUser.id;
                                    patFillDetail.fillDisposition.lineVoidedLater = 'N'; //this is mandatory filed Y or N, value becomes Y when you do price modify
                                    patFillDetail.fillDisposition.fillLevel = 'N';
                                    if (patFillDetail.itemStatus && patFillDetail.itemStatus.statusVal) {
                                        patFillDetail.fillDisposition.locationOfRx = patFillDetail.itemStatus.statusVal;
                                    } else {
                                        patFillDetail.fillDisposition.locationOfRx = "";
                                    }
                                    patFillDetail.fillDisposition.priceSource = BasketFactory.getPricesource();
                                    patFillDetail.fillDisposition.voidedTransactionNumber = CONFIG.TxnNum;
                                    break voidRxFromSale_outerLoop;
                                }
                            }
                        }

                    if (voidItemNotFound) {
                        $scope.voidItemMisMatchAlert();
                    }

                    if (($scope.isRefund || CONFIG.storeData.isOffline) && $scope.rxOrder[barcode]) {
                        if (offlineFillIndex > -1)
                            BasketFactory.getOfflineProfile().patientFillInfoList.splice(offlineFillIndex, 1);
                    }

                    if (!voidRxFound) {
                        var modalOptions = {
                            buttons: ['OK'],
                            headerText: 'Error',
                            bodyText: 'Prescription not found in current order'
                        };
                        DialogService.showDialog({}, modalOptions);
                    } else {
                        delete $scope.rxOrder[barcode];
                    }
                    $scope.updateSecDispPriceList();
                };

                var processRefundForFill = function(fillInfo, barcode) {
                    fillInfo = fillInfo.patientFillInfo || fillInfo;

                    //Disposition
                    fillInfo.fillDisposition.disposition = 1;
                    fillInfo.fillDisposition.scanInd = 'Y';
                    fillInfo.fillDisposition.taxCollected = 0;
                    fillInfo.fillDisposition.userId = CONFIG.loggedInUser.id;
                    fillInfo.fillDisposition.lineVoidedLater = 'N'; //this is mandatory filed Y or N, value becomes Y when you do price modify
                    fillInfo.fillDisposition.fillLevel = 'N';
                    fillInfo.fillDisposition.voidedTransactionNumber = null; //
                    fillInfo.fillDisposition.priceSource = BasketFactory.getPricesource();

                    var amount = fillInfo.patPayAmt;
                    fillInfo.patPayAmt = -(fillInfo.patPayAmt);
                    $scope.doManagerOverride({
                        callback: $scope.rxItemRefundCallback,
                        callbackData: {
                            fillInfo: fillInfo,
                            barcode: barcode
                        },
                        type: 'refund',
                        amount: amount,
                        isRx: true
                    });
                };
            };

            $scope.rxItemPriceModifyCallback = function(opts) {

                LOGGER.info('Entering rxItemPriceModifyCallback method', 'HomeCtrl > rxItemPriceModifyCallback');

                if (opts) {
                    opts.currentItem.basketItemInfo.fillDisposition.modifiedPrice = opts.modifiedPrice;
                    opts.currentItem.basketItemInfo.fillDisposition.priceModify = true;
                    $scope.updateSecDispPriceList();
                }
            };

            $scope.doManagerOverride = function(opts, skipAlert) {

                LOGGER.info('Entering doManagerOverride method', 'HomeCtrl > doManagerOverride');

                var managerOverrideFor = "refund";
                opts = opts ? opts : {};
                opts.type = opts.type ? opts.type : 'refund';
                var thAmount = null;
                if (opts.type == 'priceModify') {
                    managerOverrideFor = "price modify";
                    thAmount = 5;
                } else {
                    thAmount = 10;
                }
                if (parseFloat(opts.amount) > thAmount) {
                    if (skipAlert) {
                        PosSimplificationTimeStampService.selectEventMethod({ screenName: "manager_override", eventType: "screen_entered" });
                        var eve = PosSimplificationTimeStampService.getEventjson();
                        var managerOverridePromise = ManagerOverrideService.doManagerOverride({
                            usernameHeaderText: 'Manager Override',
                            usernameInputTextHelp: 'Enter Manager ID Number',
                            passwordHeaderText: 'Manager Override',
                            passwordInputTextHelp: 'Enter Password',
                            usernameCancelConfirm: true,
                            passwordCancelConfirm: true
                        });
                        managerOverridePromise.then(function(result) {
                            opts.callback && opts.callback(opts.callbackData);
                            PosSimplificationTimeStampService.selectEventMethod({ screenName: "manager_override", eventType: "screen_exited" });
                            var eve = PosSimplificationTimeStampService.getEventjson();
                        }, function(empNotOnFile) {
                            if (empNotOnFile && empNotOnFile == true)
                                $scope.doManagerOverride(opts, true);
                        });
                    } else {
                        var modalOptions = {
                            buttons: ['OK'],
                            headerText: 'Information',
                            bodyText: opts.isRx ? 'To continue with prescription ' + managerOverrideFor + ', manager override required' : 'To continue with OTC ' + managerOverrideFor + ', manager override required'
                        };
                        var showDialog = DialogService.showDialog({}, modalOptions).then(function(type) {
                            PosSimplificationTimeStampService.selectEventMethod({ screenName: "manager_override", eventType: "screen_entered" });
                            var managerOverridePromise = ManagerOverrideService.doManagerOverride({
                                usernameHeaderText: 'Manager Override',
                                usernameInputTextHelp: 'Enter Manager ID Number',
                                passwordHeaderText: 'Manager Override',
                                passwordInputTextHelp: 'Enter Password',
                                usernameCancelConfirm: true,
                                passwordCancelConfirm: true
                            });
                            managerOverridePromise.then(function(result) {
                                opts.callback && opts.callback(opts.callbackData);
                                PosSimplificationTimeStampService.selectEventMethod({ screenName: "manager_override", eventType: "screen_exited" });
                            }, function(empNotOnFile) {
                                if (empNotOnFile && empNotOnFile == true)
                                    $scope.doManagerOverride(opts, true);
                            });
                        });
                    }

                } else {
                    opts.callback && opts.callback(opts.callbackData);
                }
            };

            $scope.rxItemRefundCallback = function(opts) {

                LOGGER.info('Entering rxItemRefundCallback method', 'HomeCtrl > rxItemRefundCallback');

                var rxItemInOrder = {
                    basketItemInfo: opts.fillInfo
                };
                if (findRxInOrder(opts.fillInfo)) {
                    var modalOptions = {
                        buttons: ['OK'],
                        headerText: 'Error',
                        bodyText: 'Item already in basket.'
                    };
                    DialogService.showDialog({}, modalOptions);
                    return;
                }
                $scope.rxOrder[opts.barcode] = rxItemInOrder;
                var fillsList = BasketFactory.getOfflineProfile().patientFillInfoList || [];
                fillsList.push(opts.fillInfo);
                BasketFactory.getOfflineProfile().patientFillInfoList = fillsList;
                $scope.updateSecDispPriceList();
            };

            var handleSplRxScan = function(evt, barcode) {
                appUtils.log("Rx Speciality Drug Scanned...");
                if ($scope.isPriceModify) {
                    var modalOptions = SPECIALTY_ORDER_MESSAGE['SPECIALTY_PRICE_MODIFIY_ERROR'];
                    DialogService.showDialog({}, modalOptions).then(function(result) {
                        //Close window
                    });
                } else if ($scope.isRefund) {
                    var modalOptions = SPECIALTY_ORDER_MESSAGE['SPECIALTY_REFUND_ITEM_ERROR'];
                    DialogService.showDialog({}, modalOptions).then(function(result) {
                        //Close window
                    });
                } else if ($scope.voidEarlierItemActive) {
                    var modalOptions = SPECIALTY_ORDER_MESSAGE['SPECIALTY_VOID_ITEM_ERROR'];
                    DialogService.showDialog({}, modalOptions).then(function(result) {
                        //Close window
                    });
                } else {
                    $location.url('/patient-lookup');
                }
            };


            $scope.tpComplianceMessageAction = function(patientProfile, offlineFillInfo, result) {

                LOGGER.info('Entering tpComplianceMessageAction method', 'HomeCtrl > tpComplianceMessageAction');

                //copy all the response details of scan data
                if (result.rxScanServicePayLoad && result.rxScanServicePayLoad.listOfListOfEntries.length && result.rxScanServicePayLoad.listOfListOfEntries[0] != 'NIL') {

                    var rxScanDeffer = $q.defer();
                    PayloadService.displayRxScanMessage().rxScanDisplayMessageRequest.listOfLists.push(result.rxScanServicePayLoad.listOfListOfEntries[0]);
                    MessageService.displayMessage(rxScanDeffer, 'rxScan');

                }

            };

            $scope.rowSelectPatient = function(event, index, item) {

                LOGGER.info('Entering rowSelectPatient method', 'HomeCtrl > rowSelectPatient');

                $scope.selectedRowIndex = index;
                $scope.selectPatientRowItem = item;
                $scope.continueKeyActive = true;
            };

            $scope.selectPatientToContinue = function() {

                LOGGER.info('Entering selectPatientToContinue method', 'HomeCtrl > selectPatientToContinue');

                if (!$scope.continueKeyActive) {
                    return;
                }
                getExtraCareInfoByCardNo($scope.selectPatientRowItem.encoded_extra_card_nbr);

            };

            var getExtraCareInfoByCardNo = function(extracareNo) {

                var extraCarelookUpPromise = OrderFactory.getEccInfoByCardNo(extracareNo);
                extraCarelookUpPromise.then(function(result) {
                    PatientFactory.setExtraCareInfoByCardno(result);
                    OrderFactory.setEccNumber(extracareNo);

                    $location.url('/home');
                }, function(result) {
                    var modalOptions = {
                        buttons: ['OK'],
                        headerText: 'Error',
                        bodyText: 'ExtraCare Card Scan Error'
                    };
                    DialogService.showDialog({}, modalOptions).then(function(result) {});
                });
            };

            $scope.extraCareLookUp = function(isPharmacyGrowth) {
                LOGGER.info("Button Pressed - Phone number lookup", "HomeCtrl");
                PosSimplificationTimeStampService.handleItemEntryScreenEvents("extracare_phone_lookup");
                PosSimplificationTimeStampService.selectEventMethod({
                    screenName: "extracare_phone_lookup",
                    eventType: "screen_entered"
                });
                if (
                    $scope.isMinuteClinicDeposits ||
                    $scope.activePaidOut ||
                    $scope.activeFluShots ||
                    $scope.isBillPay
                ) {
                    return;
                }

                var patientSelectionPromise = ExtraCareEnrollmentService.extraCarePhoneLookup();
                if (patientSelectionPromise) {
                    patientSelectionPromise.then(function(data) {
                        if (isPharmacyGrowth) {
                            var selectedPatientList = PatientFactory.getSelectedPatientList();
                            if (selectedPatientList &&
                                Object.keys(selectedPatientList).length &&
                                selectedPatientList[Object.keys(selectedPatientList)[0]] &&
                                selectedPatientList[Object.keys(selectedPatientList)[0]].eccData &&
                                selectedPatientList[Object.keys(selectedPatientList)[0]].eccData.xtracareCardNumber &&
                                OrderFactory.getEccData()
                            ) {
                                var patientExtraCareCardNum =
                                    selectedPatientList[Object.keys(selectedPatientList)[0]].eccData.xtracareCardNumber;
                                if (false) {
                                    $scope.getTotal(true);
                                } else {
                                    $scope.clearWholeData();
                                    $scope.updateSecDispPriceList();
                                    // dialogue
                                    var modalOptions = {
                                        buttons: ["OK"],
                                        headerText: "Error",
                                        bodyText: "ExtraCare card applied does not match the ExtraCare card used for <br/>Pharmacy & Health Rewards enrollment. Reward cannot be redeemed at this time."
                                    };
                                    DialogService.showDialog({}, modalOptions).then(function(
                                        result
                                    ) {});
                                }
                            } else {
                                $scope.clearWholeData();
                                $scope.updateSecDispPriceList();
                                var modalOptions = {
                                    buttons: ["OK"],
                                    headerText: "Error",
                                    bodyText: "Invalid Extracare Card, Start new transaction"
                                };
                                DialogService.showDialog({}, modalOptions).then(function(
                                    result
                                ) {});
                            }
                        }
                    });
                }
            };

            $scope.extraCareEnrollment = function() {
                var resultPromise = ExtraCareEnrollmentService.extraCareEnrollment();
                resultPromise.then(function(result) {});
            };

            $scope.doPsePurchase = function() {
                LOGGER.info('Button Pressed - Total(PSE purchase)', 'HomeCtrl');
                if (PseFactory.getCurrentOrderList().length >= 1) {
                    var psePurchasePromise;
                    if (!$scope.isRefund) {
                        psePurchasePromise = PseService.executePsePurchaseRequest('PURCHASE');
                    } else {
                        psePurchasePromise = PseService.buildPseReturnPurchaseRequest();
                    }
                    psePurchasePromise.then(function(result) {
                        $scope.isPserPurchaseIsCompleted = true;
                        $scope.getTotal();
                    }, function(data) {
                        // nothing to handle on failure. The dialog boxes and logged and taken care
                        // in the service
                    });
                } else {
                    $scope.getTotal();
                }
                return;
            };

            $scope.getTotal = function(skipCheck) {

                // Medallia check for rx items in order
                var rxItemsInOrder = "N";
                var caregiverInd = "N";
                var welCounselInd = "N";
                var isRxItemsInOrder = BasketFactory.getRxOrderData();
                if (isRxItemsInOrder) {
                    angular.forEach(isRxItemsInOrder, function(item) {
                        if (item &&
                            item.patientDetails) {
                            rxItemsInOrder = "Y";
                        }
                        if (item &&
                            item.patientDetails && item.patientDetails.caregivingRelationship &&
                            item.patientDetails.caregivingRelationship.length > 0) {
                            caregiverInd = "Y";
                        }
                        if (item &&
                            item.patientDetails && item.patientDetails.welcomeCounselInd) {
                            welCounselInd = item.patientDetails && item.patientDetails.welcomeCounselInd;
                        }
                    })
                }
                var fsTxn = "N";
                if (OrderFactory.getOtcDataFromTxn() &&
                    OrderFactory.getOtcDataFromTxn().length) {
                    fsTxn = "Y";
                }
                //medallia

                PosSimplificationTimeStampService.handleItemEntryScreenEvents("total");
                if ($scope.isBillPay || $scope.activeFluShots) {
                    return;
                }
                LOGGER.info('Home Page > ACTION:TOTAL > FUNCTION:getTotal > TXN_TYPE:' + ($scope.isRefund ? 'REFUND' : 'SALE'), loggerName);
                if (homeFlags.totalInProgress) {
                    LOGGER.info('Home Page > getTotal already in progress. Dismissing the duplicate invocation.', loggerName);
                    return;
                }
                homeFlags.totalInProgress = true;

                var payload;
                if ($scope.isOffline && !MessageFactory.getIsOfflineMessagingDone() &&
                    BasketFactory.getOfflineProfile().patientFillInfoList &&
                    BasketFactory.getOfflineProfile().patientFillInfoList.length && !$scope.isRefund) {
                    CONFIG.messages.txnStartTimestamp = appUtils.getCurrentTimestamp();
                    BasketService.buildPartialBarcodeRxInfoMap();
                    BasketService.buildMsgSeqMsgItemMap();
                    PayloadService.compileInStoreMessages().instoreCompileMessageRequest.listOfPatientProfiles = BasketFactory.getRxOrderData();
                    MessageService.compileMessage('inStore');
                    homeFlags.totalInProgress = false;
                    return;
                }

                if ($scope.minuteClinicDepositsOrder.length) {
                    payload = {
                        "TransactionObject": {
                            "transactionId": OrderFactory.getTransactionIdData().transactionId,
                            "paymentcompleted": $scope.isRefund ? $scope.refundSaleCompleted : true,
                            "transactionNumber": OrderFactory.getTransactionIdData().transactionNumber,
                            "transactionType": !$scope.isRefund ? "S" : "R",
                            "minitClinicTransaction": {}
                        }
                    };
                    for (var i = 0; i < $scope.minuteClinicDepositsOrder.length; i++) {
                        if (!payload.TransactionObject.minitClinicTransaction[$scope.minuteClinicDepositsOrder[i].key]) {
                            payload.TransactionObject.minitClinicTransaction[$scope.minuteClinicDepositsOrder[i].key] = 0;
                        }
                        payload.TransactionObject.minitClinicTransaction[$scope.minuteClinicDepositsOrder[i].key] += parseFloat($scope.minuteClinicDepositsOrder[i].amount);
                    }
                    var totalPromise = Request.invoke({
                        url: appConfig.store.services.API.minuteClinic,
                        method: 'POST',
                        data: payload,
                        timeout: 20000
                    });
                    SocketTrafficHandler.clear();

                    totalPromise.then(
                        function(data, statusCode, moreInfo) {
                            homeFlags.totalInProgress = false;
                            if (data && data.image) {
                                var minuteClinicPrintData = {
                                    "MinuteClinicRequest": {
                                        "register": CONFIG.registerId,
                                        "transactionNumber": OrderFactory.getTransactionIdData().transactionNumber,
                                        "storeNumber": CONFIG.storeAttributes.storeNumber,
                                        "empId": CONFIG.loggedInUser.id
                                    }
                                };
                                if (payload.TransactionObject.minitClinicTransaction.cashAmount) {
                                    minuteClinicPrintData.MinuteClinicRequest.cashAmount = (payload.TransactionObject.minitClinicTransaction.cashAmount).toFixed(2);
                                }
                                if (payload.TransactionObject.minitClinicTransaction.checkAmount) {
                                    minuteClinicPrintData.MinuteClinicRequest.checkAmount = (payload.TransactionObject.minitClinicTransaction.checkAmount).toFixed(2);
                                }
                                PrintService.doPrint(appConfig.store.services.API.printService.minitclinicDeposits, minuteClinicPrintData);
                                OrderFactory.clearTxnDetails;
                                OrderFactory.setTotalBarcode(data);
                                $modal.open({
                                    templateUrl: 'views/modals/barcode.html',
                                    keyboard: false,
                                    backdrop: 'static',
                                    size: 'sm',
                                    windowClass: 'total-popup',
                                    controller: 'barcodeCtl',
                                    resolve: {
                                        data: function() {
                                            return {
                                                totalQRCode: ('data:image/png;base64,' + data.image),
                                                recheckStatus: $scope.recheckRxConnectStatus
                                            };
                                        }
                                    }
                                });
                                $scope.clearWholeData();
                            } else {
                                var modalOptions = {
                                    buttons: ['OK'],
                                    headerText: 'Success',
                                    bodyText: 'Transaction completed successfully.'
                                };
                                DialogService.showDialog({}, modalOptions).then(function(result) {
                                    $scope.clearWholeData();
                                    $scope.recheckRxConnectStatus();
                                });
                            }
                        },
                        function(data) {
                            $scope.clearWholeData();
                            OrderFactory.clearTxnDetails();
                            var modalOptions = {
                                buttons: ['OK'],
                                headerText: 'Error',
                                bodyText: 'Unable to process at this time, please try again later'
                            };
                            DialogService.showDialog({}, modalOptions);
                        });
                    return;
                }

                if ($scope.activePaidOut && $scope.tempCurrOrder.length) {
                    var total = -(parseFloat($scope.totalAmount()));
                    if (total > CONFIG.MAXIMUM_LIMIT.paidOutsLimit) {
                        var modalOptions = {
                            buttons: ['OK'],
                            headerText: 'Error',
                            bodyText: CONFIG.paidOuts[$scope.activePaidOut].viewData.thresholdValueAlertText
                        };
                        DialogService.showDialog({}, modalOptions);
                        homeFlags.totalInProgress = false;
                        return;
                    }
                }
                // Medallia logic
                var dt = new Date();
                var hasTcpaMessage = "N"
                var eccShortNumber = OrderFactory.getEccShortCardNum();
                if (MessageFactory.isTcpaDisplayed()) {
                    hasTcpaMessage = "Y"
                }
                var eccShortNum;
                var shortCard = OrderFactory.getEccData();
                if (shortCard && shortCard.emp_ind == "Y") {
                    if (eccShortNumber) {
                        eccShortNum = eccShortNumber;
                    } else {
                        eccShortNum = shortCard.extraCareCardNumberShort
                    }
                } else if (eccShortNumber) {
                    eccShortNum = eccShortNumber;
                } else if (shortCard && shortCard.extraCareCardNumberShort) {
                    eccShortNum = shortCard.extraCareCardNumberShort;
                } else {
                    // Hardcoded value requested from CRM, will move this to config
                    eccShortNum = "0002847830";
                }
                if (shortCard && shortCard.emp_ind) {
                    var emp_ind = shortCard.emp_ind;
                }
                var emailValid = "N";
                var emailStatusCode = "N";
                if (shortCard &&
                    shortCard.emailAddressesByPreference &&
                    shortCard.emailAddressesByPreference.length > 0) {
                    if (shortCard.emailAddressesByPreference[0].emailAddress) {
                        var emailValid = "Y";
                        if (emailValid == "Y") {
                            if (shortCard.emailAddressesByPreference[0].emailStatusCode &&
                                shortCard.emailAddressesByPreference[0].emailStatusCode == "A") {
                                var emailStatusCode = "Y";
                            }
                        }
                    }

                }

                var employeeID = CONFIG.loggedInUser.id;
                var employeeIdWithLeadingZeros = employeeIdWithLeadingZero(employeeID, 10);
                if (eccShortNum) {
                    var shortCardNumWithLeadingZeros = employeeIdWithLeadingZero(eccShortNum, 10);
                }
                var defaultValueForFewFields = "N";

                var surveyInfo = {
                    rxTxn: rxItemsInOrder,
                    fsTxn: fsTxn,
                    fsCpnInd: defaultValueForFewFields,
                    fsCustHealthCare: defaultValueForFewFields,
                    fsPhoto: defaultValueForFewFields,
                    fsBeautyCare: defaultValueForFewFields,
                    fsGeneralMerchandise: defaultValueForFewFields,
                    fsGreetingCards: defaultValueForFewFields,
                    fsPersonalCare: defaultValueForFewFields,
                    fsEdibles: defaultValueForFewFields,
                    fsOthers: defaultValueForFewFields,
                    txnSpend: $scope.totalAmount(),
                    brandInd: brandInd,
                    rxTcpaFlag: hasTcpaMessage,
                    regTypeCd: regTypeCd,
                    tlogSourceType: tlogSourceId,
                    regNum: CONFIG.registerId,
                    txnNum: OrderFactory.getTransactionIdData().transactionNumber,
                    // targetPOSEmpId: CONFIG.loggedInUser.id,
                    targetPOSEmpId: employeeIdWithLeadingZeros,
                    pharWaiterInd: PatientFactory.getPatientSearchStr() === 'Waiters' ? 'Y' : 'N',
                    pharTxnLocationType: medalliaPharLocationType,
                    shortCardNbr: shortCardNumWithLeadingZeros,
                    strNum: CONFIG.storeAttributes.storeNumber,
                    txnDateTime: appUtils.getCurrentTimestamp(CONFIG.timestampFormat),
                    txnTimeZone: dt.toLocaleTimeString("en-us", { timeZoneName: "short" }).split(" ")[2],
                    verNbr: CONFIG.versionNo,
                    fsPOSEmpId: medalliaFsPOSEmpId,
                    rxPOSEmpId: medalliaFsPOSEmpId,
                    saleShopperInd: defaultValueForFewFields,
                    fsTcpaFlag: defaultValueForFewFields,
                    newPatientInd: welCounselInd,
                    caregiverInd: caregiverInd,
                    counselInd: defaultValueForFewFields,
                    surveyPrintInd: defaultValueForFewFields,
                    paymentMethod: defaultValueForFewFields,
                    fsConsHealthCare: OrderFactory.getFsConsHealthCare(),
                    msgSourceType: tlogSourceId
                }
                // medallia


                if ((($scope.tempCurrOrder && $scope.tempCurrOrder.length) || ($scope.rxOrder && (Object.keys($scope.rxOrder).length))) || skipCheck) {

                    var url = appConfig.store.services.API.total;
                    var transactionType = 'S';
                    var voidTxn = false;
                    //Paid outs and Flu shots offer are one kind of refunds as per requirement
                    if ($scope.isRefund || $scope.activePaidOut) {
                        transactionType = 'R';
                        if ($scope.isRefund && $scope.activePaidOut) {
                            transactionType = 'S';
                            $scope.refundSaleCompleted = true;
                        }
                        payload = {
                            TransactionObject: {
                                transactionId: OrderFactory.getTransactionIdData().transactionId,
                                transactionNumber: OrderFactory.getTransactionIdData().transactionNumber,
                                paymentcompleted: $scope.refundSaleCompleted,
                                transactionType: transactionType,
                                dispositonInfo: {
                                    RegisterNum: CONFIG.registerId,
                                    TxnNum: appUtils.getCurrentTimestamp(CONFIG.translationTimeFormat),
                                    POSTenderType: "Cash",
                                    DispositionId: "20150701152500429",
                                    UserId: CONFIG.loggedInUser.id,
                                    totalTransactionCount: null,
                                    TxnStrtTym: appUtils.getCurrentTimestamp(),
                                    TxnEndTym: appUtils.getCurrentTimestamp(),
                                    FillsSold: 1,
                                    FillNotSold: 0,
                                    MsgDisp: 0,
                                    MsgNotDisp: 0,
                                    OffInd: "N",
                                    OTCcount: OrderFactory.getOtcDataFromTxn() && OrderFactory.getOtcDataFromTxn().length,
                                    SaleTymStmp: appUtils.getCurrentTimestamp(),
                                    WaiterInd: "N",
                                    POSCounselLocation: CONFIG.storeData.posCounselLocation
                                },
                                patientProfileList: BasketFactory.getRxOrderData(),
                                storeItemList: OrderFactory.getOtcDataFromTxn(),
                                miscInfo: null
                            }
                        };
                        if (CONFIG.storeAttributes.enableSurveyInfoForMedallia == "Y") {
                            payload.TransactionObject.surveyInfo = surveyInfo;
                            payload.TransactionObject.emailValid = emailValid;
                            payload.TransactionObject.isEmailvalid = emailStatusCode;
                            payload.TransactionObject.emp_ind = emp_ind;
                        }
                        if (!Object.keys($scope.rxOrder).length) {
                            delete payload.TransactionObject.patientProfileList;
                        }
                    } else {
                        if ($scope.resolveExtracareHealthRewards()) {
                            homeFlags.totalInProgress = false;
                            return;
                        }
                        BasketService.updateEmptyPatientDisposition();
                        payload = {
                            TransactionObject: {
                                transactionId: OrderFactory.getTransactionIdData().transactionId,
                                transactionNumber: OrderFactory.getTransactionIdData().transactionNumber,
                                //need to remove transactiontype value
                                transactionType: transactionType,
                                patientProfileList: BasketFactory.getRxOrderData(),
                                posSignatureRequest: ESignFactory.getPosSignatureRequest(),
                                paymentcompleted: true,
                                dispositonInfo: {
                                    RegisterNum: CONFIG.registerId,
                                    TxnNum: appUtils.getCurrentTimestamp(CONFIG.translationTimeFormat),
                                    POSTenderType: "Cash",
                                    DispositionId: "20150701152500429",
                                    UserId: CONFIG.loggedInUser.id,
                                    totalTransactionCount: null,
                                    TxnStrtTym: appUtils.getCurrentTimestamp(),
                                    TxnEndTym: appUtils.getCurrentTimestamp(),
                                    FillsSold: 1,
                                    FillNotSold: 0,
                                    MsgDisp: MessageFactory.getNotDisplayedReasonData().messagesDisplayedCount,
                                    MsgNotDisp: MessageFactory.getNotDisplayedReasonData().messagesNotDisplayedCount,
                                    OffInd: "N",
                                    OTCcount: OrderFactory.getOtcDataFromTxn() && OrderFactory.getOtcDataFromTxn().length,
                                    SaleTymStmp: appUtils.getCurrentTimestamp(),
                                    WaiterInd: PatientFactory.getPatientSearchStr() === 'Waiters' ? 'Y' : 'N',
                                    POSCounselLocation: "1"
                                },
                                storeItemList: OrderFactory.getOtcDataFromTxn(),
                                couponList: [{
                                    campId: null,
                                    cpnNbr: null,
                                    cpnSeqNbr: null,
                                    cpnDiscAmt: null,
                                    redeemOvrdReason: null,
                                    cpnMatchCD: null,
                                    campCpnSeqNbr: null,
                                    dateAndTime: null
                                }],
                                miscInfo: null,
                                extraCareInfo: {
                                    xtracareCardNumber: OrderFactory.getEccNumber(),
                                    enrollmentStatus: null,
                                    hippaExpiryDateTime: null,
                                    targetIndicator: null,
                                    enrollPromptIndicator: null,
                                    couponValue: null,
                                    couponExpiryDateTime: null
                                },
                                phrInfo: null
                            }
                        };
                        if (CONFIG.storeAttributes.enableSurveyInfoForMedallia == "Y") {
                            payload.TransactionObject.surveyInfo = surveyInfo;
                            payload.TransactionObject.emailValid = emailValid;
                            payload.TransactionObject.isEmailvalid = emailStatusCode;
                            payload.TransactionObject.emp_ind = emp_ind;
                        }
                        if (!Object.keys($scope.rxOrder).length) {
                            delete payload.TransactionObject.patientProfileList;
                        }
                        if ($scope.isOffline) {
                            payload.TransactionObject.dispositonInfo.OffInd = "Y";
                        }
                    }
                    if (transactionType === 'S') {
                        url = appConfig.store.services.API.total;
                    } else {
                        url = appConfig.store.services.API.refund;
                    }
                    var totalPHRCouponAmount = OrderService.calculatePHRGiftCardAmount();
                    if (totalPHRCouponAmount) {
                        LOGGER.info('Updating PHR info to transaction obj', 'HomeCtrl > getTotal');
                        var lastCouponExpDate =
                            payload.TransactionObject.phrInfo = {
                                maxRedeemAmount: totalPHRCouponAmount,
                                expireDt: OrderService.lastCouponExpDate
                            }
                    }
                    // BasketService.updateUndispositionedOfferToCounsel();
                    if (payload.TransactionObject.transactionType === 'S' && (CONFIG.storeAttributes.trailOfferGiftCardEnabled === 'Y' || CONFIG.storeAttributes.phrGiftCardEnabled === 'Y') && OrderService.isRedeemGiftCardEligible()) {
                        LOGGER.info('Entering Gift Card Flow', 'HomeCtrl > getTotal');
                        OrderService.transactionObject = payload;
                        OrderService.checkOutURL = url;
                        var checkOutPromise = OrderService.doCheckOut(skipCheck);
                        checkOutPromise.then(function(barcodeObj) {
                            SocketTrafficHandler.clear();
                            LOGGER.info('checkOutPromise: RESOLVE', 'HomeCtrl > getTotal');
                            CONFIG.storeData.posCounselLocation = null;
                            homeFlags.totalInProgress = false;
                            //calling updateOpportunity service once the transaction is completed
                            // !CONFIG.storeData.isOffline && OpportunityFactory.updateOpportunity(voidTxn, null);
                            //calling recordProcessedTransaction service
                            if (OrderFactory.getFastpass() && OrderFactory.getFastpassData()) {
                                OrderFactory.recordProcessedTransaction("Complete");
                            }
                            OrderFactory.clearTxnObject(true);
                            $scope.clearWholeData();
                            OrderFactory.setEccNumber(null);
                            if (barcodeObj) {
                                if (barcodeObj.totalBarcode) {
                                    LOGGER.info('checkOutPromise: RESOLVE > Has Total Barcode', 'HomeCtrl > getTotal');
                                    OrderFactory.setTotalBarcode(barcodeObj.totalBarcode);
                                }
                                if (barcodeObj.giftCardBarcode) {
                                    LOGGER.info('checkOutPromise: RESOLVE > Has GiftCard Barcode', 'HomeCtrl > getTotal');
                                    OrderFactory.setGiftCardBarcode(barcodeObj.giftCardBarcode);
                                }
                            }
                        });
                    } else {
                        // 90-Day Esig - RxDw Call
                       CoreNinetyDayMessageHandlerService.handleRxDwDisposition();

                        var totalPromise = Request.invoke({
                            url: url,
                            method: 'POST',
                            data: payload,
                            timeout: 20000,
                            rejectPromiseOnTimeout: true
                        });
                        SocketTrafficHandler.clear();
                        totalPromise.then(
                            function(data) {
                                CONFIG.storeData.posCounselLocation = null;
                                homeFlags.totalInProgress = false;
                                //calling updateOpportunity service once the transaction is completed
                                // !CONFIG.storeData.isOffline && OpportunityFactory.updateOpportunity(voidTxn, null);
                                if (data && data.image) {
                                    var newPhrenroll = BasketFactory.getNewPhrEnrollment();
                                    if (newPhrenroll) {
                                        var phrConfirmationData = {
                                            "PHREnrollmentConfirmationRequest": {
                                                "prescriptionNumber": 10,
                                                "rewardAmount": 5,
                                                "cardNumber": OrderFactory.getEccNumber()
                                            }
                                        }
                                        PrintService.doPrint(appConfig.store.services.API.printService.phrConfirmation, phrConfirmationData);
                                    }
                                    //calling recordProcessedTransaction service
                                    if (OrderFactory.getFastpass() && OrderFactory.getFastpassData()) {
                                        OrderFactory.recordProcessedTransaction("Complete");
                                    }
                                    $scope.clearWholeData();
                                    OrderFactory.clearTxnDetails;
                                    // OrderFactory.startNewTxn();
                                    OrderFactory.setTotalBarcode(data);
                                    $modal.open({
                                        templateUrl: 'views/modals/barcode.html',
                                        keyboard: false,
                                        backdrop: 'static',
                                        size: 'sm',
                                        windowClass: 'total-popup',
                                        controller: 'barcodeCtl',
                                        resolve: {
                                            data: function() {
                                                return {
                                                    totalQRCode: ('data:image/png;base64,' + data.image),
                                                    recheckStatus: $scope.recheckRxConnectStatus
                                                };
                                            }
                                        }
                                    });
                                } else {
                                    var modalOptions = {
                                        buttons: ['OK'],
                                        headerText: 'Success',
                                        bodyText: 'Transaction completed successfully.'
                                    };

                                    DialogService.showDialog({}, modalOptions).then(function(result) {
                                        $scope.clearWholeData();
                                        $scope.recheckRxConnectStatus();
                                    });
                                }
                                PosSimplificationTimeStampService.selectEventMethod({ eventType: "transaction_finalized" });
                                PosSimplificationTimeStampService.sendRxDWTimestampDisposition("completed");
                            },
                            function(data) {
                                CONFIG.storeData.posCounselLocation = null;
                                $scope.clearWholeData();
                                OrderFactory.clearTxnDetails();
                                var modalOptions = {
                                    buttons: ['OK'],
                                    headerText: 'Error',
                                    bodyText: 'Unable to process at this time, please try again later'
                                };
                                DialogService.showDialog({}, modalOptions);
                            });
                    }
                } else {
                    var modalOptions = {
                        buttons: ['Ok'],
                        headerText: 'No Items Found ',
                        bodyText: 'No items found in order'
                    };
                    DialogService.showDialog({}, modalOptions);
                    homeFlags.totalInProgress = false;
                }
            };


            // var fsConsHealthCare = "N"; 
            var checkForConsumerhealthCare = function(major) {
                var len = CONSUMER_HEALTH_CARE.length;
                for (var i = 0; i < len; i++) {
                    if (major == CONSUMER_HEALTH_CARE[i]) {
                        // var fsConsHealthCare = "Y";
                        OrderFactory.setFsConsHealthCare("Y");
                        return;
                    } else {
                        OrderFactory.setFsConsHealthCare("N");
                    }
                }
            }

            var employeeIdWithLeadingZero = function(emp, length) {
                var my_string = '' + emp;
                while (my_string.length < length) {
                    my_string = '0' + my_string;
                }

                return my_string;
            }
            $scope.recheckRxConnectStatus = function() {

                LOGGER.info('Entering recheckRxConnectStatus method', 'HomeCtrl > recheckRxConnectStatus');

                // TODO : check offline status
                Request.invoke({
                    url: appConfig.store.services.API.facility,
                    method: 'GET'
                }).then(
                    function(result) {
                        if (result.offline || result.pharmacyClosed) {
                            $scope.isOffline = true;
                            CONFIG.storeData.isOffline = true;
                            $location.url("/home");
                        } else {
                            $scope.isOffline = false;
                            CONFIG.storeData.isOffline = false;
                            $location.url("/patient-lookup");
                        }
                    });
            };


            $scope.regenBarcode = function() {
                LOGGER.info('Button Pressed - REGENERATE BARCODE', 'HomeCtrl');
                if (OrderFactory.getGiftCardBarcode()) {
                    OrderService.showRegenBarcode({ hasGiftCard: true, currentScreen: "Total" });
                    return;
                }
                if (OrderFactory.getTotalBarcode()) {
                    var hasItemsInOrder = false;
                    if ($scope.getAllItemsInOrder().length || $scope.minuteClinicDepositsOrder.length) {
                        hasItemsInOrder = true;
                    }
                    $modal.open({
                        templateUrl: 'views/modals/barcode.html',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'sm',
                        controller: 'barcodeCtl',
                        windowClass: 'total-popup',
                        resolve: {
                            data: function() {
                                return {
                                    totalQRCode: ('data:image/png;base64,' + OrderFactory.getTotalBarcode()),
                                    hasItemsInOrder: hasItemsInOrder,
                                    recheckStatus: $scope.recheckRxConnectStatus
                                };
                            }
                        }
                    });
                }
            };

            $scope.showPSE = function() {

                LOGGER.info('Entering showPSE method', 'HomeCtrl > showPSE');

                if (!PseFactory.getIsPSEFlagIsDisplayed()) {
                    var showPseDialog = function() {
                        /**
                         * Only the generic scan listener should be active.
                         * All the other scan listeners should be disabled.
                         *
                         * This condition should be reversed when the scan is done or
                         * pressed cancel.
                         */
                        disableScanListeners();
                        var IdModalOptions = PSE_ERROR_MESSAGE['PSE_LICENSE_OPTION_MESSAGE'];
                        DialogService.showDialog({}, IdModalOptions).then(function(result) {

                            if (result === 'Manual') {
                                if ($scope.isRefund) {
                                    $location.url('/license-entry');
                                    PseFactory.setIsPSEFlagIsDisplayed(true);
                                } else {
                                    $location.url('/license');
                                }
                            } else if (result === 'Scan') {
                                LOGGER.info("Enabling license scan listener.");
                                $scope.unBinders.unbindLicenseScan = $scope.$on('SCANNED_DATA_LICENSE', handleLicenseScan);
                                $scope.unBinders.unbindNonLicenseScan = $scope.$on('SCANNED_DATA_GENERIC', handleNonLicenseScan);
                                showPleaseWait();
                            } else if (result === 'Cancel') {
                                PseFactory.clearPSEData();
                                enableScanListeners();
                            }
                        }, function() {
                            PseFactory.clearPSEData();
                        });
                    };

                    var showPleaseWait = function() {
                        var modalOptions = {
                            buttons: ['Cancel'],
                            headerText: 'Please scan......',
                            bodyText: 'Please Scan Customer I.D.',
                            blockUI: false,
                            modalKey: 'please-wait'
                        };
                        DialogService.showDialog({}, modalOptions).then(function(firstRes) {
                            if (firstRes === 'Cancel') {
                                var modalOptionsChildOne = {
                                    buttons: ['Yes', 'No'],
                                    headerText: 'Confirmation',
                                    bodyText: 'Are you sure you wish to CANCEL this operation?',
                                    blockUI: false,
                                    modalKey: 'pse-scan-cancel'
                                };
                                DialogService.showDialog({}, modalOptionsChildOne).then(function(secondRes) {
                                    if (secondRes === 'No') {
                                        showPleaseWait();
                                        return;
                                    } else {
                                        // reset the scan listeners to default.
                                        disableScanListeners();
                                        enableScanListeners();
                                        var modalOptionsChildTwo = {
                                            buttons: ['Yes', 'No'],
                                            headerText: 'Confirmation',
                                            bodyText: 'Restricted Item � ID Required<br/>Would you like to Manually Enter ID Information?',
                                            blockUI: false,
                                            modalKey: 'pse-scan-cancel-contd'
                                        };
                                        DialogService.showDialog({}, modalOptionsChildTwo).then(function(thirdRes) {
                                            if (thirdRes === 'No') {
                                                DialogService.closeDialogByKey('please-wait');
                                                PseFactory.clearPSEData();
                                                return;
                                            } else {
                                                if ($scope.isRefund) {
                                                    $location.url('/license-entry');
                                                    PseFactory.setIsPSEFlagIsDisplayed(true);
                                                } else {
                                                    $location.url('/license');
                                                }
                                            }
                                        });
                                    }
                                }, function() {
                                    PseFactory.clearPSEData();
                                });
                            }
                        });
                    };
                    var showEmployeeTrackingDialog = function() {
                        if (CONFIG.storeAttributes.pseEmpTracking === 'Y') {
                            var empModalOptions = {
                                buttons: ['OK'],
                                bodyText: 'Enter employee ID to confirm ID validation under Blacklight.'
                            };
                            DialogService.showDialog({}, empModalOptions).then(function(result) {
                                // Capture the employee ID and store it in PSE factory.
                                NumberEntryService.showDialog({}, {
                                    inputText: "Enter Employee ID",
                                    headerText: "Employee ID",
                                    cancelConfirm: true
                                }).then(function(employeeId) {
                                    var agentLoginService = Request.invoke({
                                        url: appConfig.store.services.API.employees + '?emp_id=' + employeeId,
                                        method: 'GET',
                                        triggerOffline: 'no'
                                    });
                                    agentLoginService.then(function(result) {
                                        if (result && result[0].empId) {
                                            PseFactory.setTrackedEmployee(employeeId);
                                            showPseDialog();
                                        } else {
                                            var modalOptions = {
                                                buttons: ['Ok'],
                                                headerText: 'Invalid LoggedIn UserId',
                                                bodyText: 'Please provide correct logged in Agent ID'
                                            };
                                            DialogService.showDialog({}, modalOptions).then(function(type) {});
                                        }
                                    }, function(errorData) {
                                        LOGGER.info("Error while validating employee id - " + JSON.stringify(errorData));
                                        PseFactory.clearPSEData();
                                        DialogService.showDialog({}, {
                                            buttons: ['Ok'],
                                            headerText: 'Invalid Employee Id',
                                            bodyText: 'Employee not found on file.'
                                        }).then(function(type) {
                                            DialogService.showDialog({}, {
                                                buttons: ['Ok'],
                                                bodyText: 'Product cannot be sold.<br>Remove from bagging area'
                                            });
                                        });
                                    });
                                }, function(rejectReason) {
                                    // EMP ID cancelled
                                    DialogService.showDialog({}, {
                                        buttons: ['OK'],
                                        bodyText: "PSE sale cancelled when capturing employee ID."
                                    });
                                    LOGGER.info("Cancelled the employee ID information in PSE sale");
                                    PseFactory.clearPSEData();
                                });
                            });
                        } else {
                            showPseDialog();
                        }
                    };

                    if (CONFIG.storeAttributes.pseRphIdReqired === 'Y') {
                        DialogService.showDialog({}, {
                            buttons: ['OK'],
                            bodyText: 'RPh Approval Needed - Key Register ID.'
                        }).then(function(rphApprovalResult) {
                            ManagerOverrideService.doManagerOverride({
                                    usernameHeaderText: 'RPh Approval',
                                    usernameInputTextHelp: 'Enter Pharmacist Credentials',
                                    passwordHeaderText: 'RPh Approval',
                                    passwordInputTextHelp: 'Password',
                                    invalidRoleMessage: 'Invalid Role - Not a pharmacist',
                                    usernameCancelConfirm: true,
                                    passwordCancelConfirm: true
                                })
                                .then(function(result) {
                                    PseFactory.setRphName(result);
                                    LOGGER.info("Pharmacist ID validated for employee ID : " + result);
                                    showEmployeeTrackingDialog();
                                }, function(rejectReason) {
                                    // Handle the RPH validation errors
                                    var message = rejectReason || 'RPh Approval failed. Please try again.';
                                    DialogService.showDialog({}, {
                                        buttons: ['OK'],
                                        bodyText: message
                                    });
                                    LOGGER.info("Manager override failed - " + rejectReason);
                                    PseFactory.clearPSEData();
                                });
                        });
                    } else {
                        showEmployeeTrackingDialog();
                    }

                } else {
                    //if pse request is already done.
                    if (!$scope.isRefund) {
                        $scope.doPseInquery();
                    } else {
                        OrderFactory.getOtcDataFromTxn().push(PseFactory.getControlledItem());
                        $scope.isPserPurchaseIsCompleted = true;
                        PseFactory.setIsPserPurchaseIsCompleted($scope.isPserPurchaseIsCompleted);
                    }
                }
            };

            var handleNonLicenseScan = function(evt, barcode, SCANNED_DATA_TYPE, barcodeType) {
                if (barcodeType !== '201') {
                    LOGGER.info('Unknown barcode type scanned. Not a PDF417 2D barcode. Type:' + barcodeType);
                    DialogService.closeDialogByKey('invalidBarcode');
                    var modalOptions = {
                        buttons: ['Okay'],
                        headerText: 'Invalid Barcode',
                        bodyText: 'Invalid barcode scanned. Please scan the 2D barcode at the back of the License.',
                        modalKey: 'invalidBarcode',
                        blockUI: true
                    };
                    DialogService.showDialog({}, modalOptions);
                }
            };
            var handleLicenseScan = function(evt, barcode, SCANNED_BARCODE_TYPE) {

                LOGGER.info("License data scanned.");
                //reset the scan listerners
                disableScanListeners();
                enableScanListeners();
                DialogService.closeDialogByKey('all');
                PseFactory.setIsLicenseIdScaned(true);
                if (!$scope.isRefund) {
                    $scope.doPseInquery(base64.encode(barcode));
                } else if ($scope.isRefund) {
                    PseFactory.setIdentityScanData(barcode);
                    $scope.addControlledItemToHomeBasket();
                    OrderFactory.getOtcDataFromTxn().push(PseFactory.getControlledItem());
                    $scope.isPserPurchaseIsCompleted = true;
                    PseFactory.setIsPserPurchaseIsCompleted($scope.isPserPurchaseIsCompleted);
                }
            };

            $scope.showPSECustomerDisplay = function() {

                LOGGER.info('Entering showPSECustomerDisplay method', 'HomeCtrl > showPSECustomerDisplay');

                var modalOptions = {
                    buttons: ['Cancel'],
                    headerText: 'Customer Terminal Processing',
                    bodyText: 'WAITING FOR CUSTOMER RESPONSE',
                    blockUI: true
                };
                DialogService.showDialog({}, modalOptions).then(function(result) {
                    if (result === 'Cancel') {
                        PseFactory.clearPSEData();
                        SocketTrafficHandler.cancelDeferred('pse_signature_capture');
                        $scope.removeControlledItem();
                        $scope.updateSecDispPriceList();

                        var customerNotaggreedToSign = PSE_ERROR_MESSAGE['PSE_SERVICE_SCAN_CANCEL'];
                        DialogService.showDialog({}, customerNotaggreedToSign).then(function(result) {
                            appUtils.log(result);
                        });
                    }
                });

                SocketTrafficHandler.send(JSON.stringify({
                    type: 'DISPLAY_QUESTION',
                    options: {
                        route: 'pseConfirm',
                        payload: {
                            displayText: CONFIG.PSE_CF_LOG
                        }
                    }
                }), true, 'pse_signature_capture').then(function(response) {
                    if (response.options.isAgreed) {
                        DialogService.closeDialog();
                        //for pse request it is same as esig
                        var eSigCompressionRequest = PseFactory.getEsigCompressedRequestPayload();

                        eSigCompressionRequest.eSigCompressionRequest.base64PNGESig = response.options.image.replace('data:image/png;base64,', '');
                        var esigPromiss = PseService.esignServiceRequest(eSigCompressionRequest);
                        esigPromiss.then(function(result) {
                            PseFactory.setCompressedCustomSign(result.base64TIFFEsig);
                            var esigModel = $modal.open({
                                templateUrl: 'views/modals/esig-confirm.html',
                                keyboard: false,
                                backdrop: 'static',
                                size: 'md',
                                resolve: {
                                    image: function() {
                                        return {
                                            originalImg: response.options.image,
                                            compressedImg: result.base64TIFFEsig,
                                            callback: $scope.addControlledItemToHomeBasket,
                                            cancleCallback: $scope.showPSECustomerDisplay
                                        };
                                    }
                                },
                                controller: 'PseHomeEsigPopupCtrl'
                            });
                        }, function(result) {
                            var modalOptions = {
                                buttons: ['OK'],
                                headerText: 'ERROR',
                                bodyText: 'Sing Compression Failed, Please ask customer to Resign'
                            };
                            DialogService.closeDialog();
                            DialogService.showDialog({}, modalOptions).then(function(result) {

                            });
                        });


                    } else {
                        DialogService.closeDialog();
                        PseFactory.clearPSEData();
                        var customerNotaggreedToSign = PSE_ERROR_MESSAGE['PSE_CUSTOMER_SCAN_CANCEL'];

                        DialogService.showDialog({}, customerNotaggreedToSign).then(function(result) {
                            appUtils.log(result);
                        });
                    }

                });

            };
            $scope.addControlledItemToHomeBasket = function() {

                LOGGER.info('Entering addControlledItemToHomeBasket method', 'HomeCtrl > addControlledItemToHomeBasket');

                //add item to current order list and then go to home
                if (!PseFactory.getIsPseRefund()) {
                    OrderFactory.addOtcItemToTxn(PseFactory.getControlledItem());
                    $scope.updateSecDispPriceList();
                }
                PseFactory.setInquiryInProgress(false);
                PseFactory.setIsPSEFlagIsDisplayed(true);
            };
            $scope.agentPunchInOut = function() {

                LOGGER.info('Entering agentPunchInOut method', 'HomeCtrl > agentPunchInOut');

                $location.url('/agent-punchinout');
            };

            $scope.refund = function() {
                LOGGER.info('Button Pressed - Refund', 'HomeCtrl');

                if ($scope.isRefund) {
                    if (!$scope.getAllItemsInOrder().length && !$scope.minuteClinicDepositsOrder.length) {
                        $scope.isRefund = false;
                        $scope.refundSaleCompleted = false;
                        PatientFactory.clearSelectedPatientList();
                        BasketFactory.clearBasketData();
                        appUtils.log("HOME: getting out of refund mode.");
                        return;
                    } else {
                        return;
                    }
                }
                if (!$scope.isRefundActive() || ($scope.isMinuteClinicDeposits || $scope.minuteClinicDepositsOrder.length) || $scope.isPriceModify || $scope.isBillPay) {
                    return;
                }
                var modalOptions = {
                    buttons: ['Yes', 'No'],
                    bodyText: 'Was sale completed on Target POS terminal for items you wish to return?'
                };
                appUtils.log("HOME: Getting into a Refund mode.");
                disableScanListeners();
                DialogService.showDialog({}, modalOptions).then(function(result) {
                    enableScanListeners();
                    if (($scope.tempCurrOrder && $scope.tempCurrOrder.length) || ($scope.rxOrder && Object.keys($scope.rxOrder).length)) {
                        return;
                    }
                    $scope.isRefund = true;
                    $scope.refundSaleCompleted = (result === 'Yes') ? true : false;
                    BasketFactory.removeAllPatients();
                    BasketService.updateBasketData('0', {});
                }, function() {
                    enableScanListeners();
                });
            };
            $scope.employeeMgmt = function(employee) {
                LOGGER.info('Button Pressed - Employee Management', 'HomeCtrl');

                if ($scope.isMinuteClinicDeposits || $scope.activePaidOut || $scope.activeFluShots || $scope.isBillPay) {
                    return;
                }
                var employeePromise = Request.invoke({
                    loadMessage: "Loading employees...",
                    url: appConfig.store.services.API.employeeMgmt,
                    method: 'GET'
                });
                employeePromise.then(function(result) {
                    if (result === null) {
                        return;
                    }
                    EmployeeMgmtFactory.setUserInfo(result);
                    $modal.open({
                        templateUrl: 'views/modals/emp-mgmt.html',
                        keyboard: false,
                        windowClass: 'modal-dialog-full',
                        backdrop: 'static',
                        scope: $scope.$new(),
                        controller: 'EmployeeMgmtCtrl'

                    });
                }, function() {
                    //
                });
            };

            $scope.checkIfCouponAllowed = function() {
                if (BasketFluShotService.checkIfCouponAllowed() === "flushotEnabledStateText" && CONFIG.storeAttributes.fluShotsOfferenabled === 'yes') {
                    return true;
                } else {
                    return false;
                }
            }

            $scope.doFlushots = function() {
                LOGGER.info('Button Pressed - Flushots Offer', 'HomeCtrl');

                if ($scope.isPriceModify || $scope.activePaidOut || $scope.activeFluShots || $scope.isBillPay ||
                    $scope.minuteClinicDepositsOrder.length || $scope.getAllItemsInOrder().length || $scope.isRefund) {
                    return;
                }
                $scope.voidEarlierItemActive = false;
                $scope.activeFluShots = true;
                disableScanListeners();
                // OrderFactory.getTransactionIdData();
                var otcFluShot = {
                    sku: 243518,
                    upc: 400000376974,
                    description: "TGT-RX - Flu Shot Offer",
                    quantity: 1,
                    taxableItem: false,
                    major: "400000376974",
                    minor: "",
                    cost: -5.00,
                    retailPrice: -5.00
                }
                if (!$scope.isRefund)
                    $scope.refundSaleCompleted = true;
                OrderFactory.getOtcDataFromTxn().push(otcFluShot);
                $scope.tempCurrOrder = OrderFactory.getOtcDataFromTxn();
                $scope.updateSecDispPriceList();

                var modalOptions = {
                    buttons: ['Cancel', 'Get Coupon'],
                    headerText: 'Print Flushot Coupon',
                    bodyText: 'Are you sure you want to print the Flushot Coupon?'
                };
                DialogService.showDialog({}, modalOptions).then(function(result) {
                    if (result == "Get Coupon") {
                        $scope.printFluCoupon();
                        $scope.clearWholeData();
                    } else {
                        $scope.clearWholeData();
                    }
                });
            };
            // printing coupons for flushot offer - Vinuthna
            $scope.printFluCoupon = function() {
                LOGGER.info('Entering printFluCoupon', 'HomeCtrl');
                if ($scope.tempCurrOrder && $scope.tempCurrOrder.length) {
                    var url = appConfig.store.services.API.total;
                    var transactionType = 'R';
                    var voidTxn = false;

                    BasketService.updateEmptyPatientDisposition();
                    // if ($scope.isOffline) {
                    //     payload.TransactionObject.dispositonInfo.OffInd = "Y";
                    // }
                    var fluShotRefundDeferred = $q.defer()
                    OrderFactory.startNewTxn(fluShotRefundDeferred);
                    fluShotRefundDeferred.promise.then(function() {
                        var payload = {
                            TransactionObject: {
                                transactionId: OrderFactory.getTransactionIdData().transactionId,
                                transactionNumber: OrderFactory.getTransactionIdData().transactionNumber,
                                //need to remove transactiontype value
                                transactionType: transactionType,
                                patientProfileList: BasketFactory.getRxOrderData(),
                                posSignatureRequest: ESignFactory.getPosSignatureRequest(),
                                paymentcompleted: true,
                                dispositonInfo: {
                                    RegisterNum: CONFIG.registerId,
                                    TxnNum: appUtils.getCurrentTimestamp(CONFIG.translationTimeFormat),
                                    POSTenderType: "Cash",
                                    DispositionId: "20150701152500429",
                                    UserId: CONFIG.loggedInUser.id,
                                    totalTransactionCount: null,
                                    TxnStrtTym: appUtils.getCurrentTimestamp(),
                                    TxnEndTym: appUtils.getCurrentTimestamp(),
                                    FillsSold: 1,
                                    FillNotSold: 0,
                                    MsgDisp: MessageFactory.getNotDisplayedReasonData().messagesDisplayedCount,
                                    MsgNotDisp: MessageFactory.getNotDisplayedReasonData().messagesNotDisplayedCount,
                                    OffInd: "N",
                                    OTCcount: OrderFactory.getOtcDataFromTxn() && OrderFactory.getOtcDataFromTxn().length,
                                    SaleTymStmp: appUtils.getCurrentTimestamp(),
                                    WaiterInd: PatientFactory.getPatientSearchStr() === 'Waiters' ? 'Y' : 'N',
                                    POSCounselLocation: "1"
                                },
                                storeItemList: [{
                                    sku: 243518,
                                    upc: 400000376974,
                                    description: "TGT-RX - Flu Shot Offer",
                                    quantity: 1,
                                    taxableItem: false,
                                    major: "400000376974",
                                    minor: "",
                                    cost: -5.00,
                                    retailPrice: -5.00
                                }],
                                couponList: [{
                                    campId: null,
                                    cpnNbr: null,
                                    cpnSeqNbr: null,
                                    cpnDiscAmt: null,
                                    redeemOvrdReason: null,
                                    cpnMatchCD: null,
                                    campCpnSeqNbr: null,
                                    dateAndTime: null
                                }],
                                miscInfo: null,
                                extraCareInfo: {
                                    xtracareCardNumber: OrderFactory.getEccNumber(),
                                    enrollmentStatus: null,
                                    hippaExpiryDateTime: null,
                                    targetIndicator: null,
                                    enrollPromptIndicator: null,
                                    couponValue: null,
                                    couponExpiryDateTime: null
                                },
                                phrInfo: null
                                // giftCardCouponList: [],
                                // trailOfferAuditList: []
                            }
                        };
                        var printCouponPromise = Request.invoke({
                            url: appConfig.store.services.API.redeemGiftcard,
                            method: 'POST',
                            data: payload,
                            timeout: 20000,
                            rejectPromiseOnTimeout: true
                        });
                        // SocketTrafficHandler.clear();
                        printCouponPromise.then(function(data) {
                            LOGGER.info('printFluCoupon call success', 'HomeCtrl');
                            CONFIG.storeData.posCounselLocation = null;
                            //calling updateOpportunity service once the transaction is completed
                            // !CONFIG.storeData.isOffline && OpportunityFactory.updateOpportunity(voidTxn, null);
                            $scope.clearWholeData();
                            OrderFactory.clearTxnDetails();

                        }, function(data) {
                            LOGGER.info('printFluCoupon service call failed', 'HomeCtrl');
                            CONFIG.storeData.posCounselLocation = null;
                            $scope.clearWholeData();
                            OrderFactory.clearTxnDetails();
                            var modalOptions = {
                                buttons: ['OK'],
                                headerText: 'Error',
                                bodyText: 'Unable to process at this time, please try again later'
                            };
                            DialogService.showDialog({}, modalOptions);
                        });
                    });
                }
            }

            $scope.performBillPay = function(evt, barcode) {
                if (barcode.length !== 30) {
                    var invalidBarcodeOpts = {
                        buttons: ['OK'],
                        headerText: 'Error',
                        bodyText: 'Invalid Barcode Scanned'
                    };
                    DialogService.showDialog({}, invalidBarcodeOpts).then(function(result) {});
                    return;
                }
                LOGGER.info('Button Pressed - Bill Pay', 'HomeCtrl');
                // start new transaction
                OrderFactory.startNewTxn();
                var param = 'UPC';
                var billpayItem = barcode.substring(0, 11) + "8";
                var itemLookUpPromise = Request.invoke({
                    loadMessage: "Looking up item...",
                    url: appConfig.store.services.API.itemLookUp + '?' + param + '=' + billpayItem,
                    method: 'GET'
                });

                itemLookUpPromise.then(function(result) {
                    if (result) {
                        disableScanListeners();
                    }
                    NumberEntryService.showDialog({}, {
                        inputText: 'Health Plan Bill',
                        headerText: 'Enter Health Plan Bill',
                        cancelConfirm: true,
                        cancelCallback: $scope.clearWholeData,
                        maskCurrency: true,
                        limit: {
                            minVal: CONFIG.LIMIT_BILL_PAY.minLimit,
                            maxVal: CONFIG.LIMIT_BILL_PAY.maxLimit
                        }
                    }).then(function(resultVal) {
                        resultVal = (parseInt(resultVal) / 100).toFixed(2);
                        // if the amount entered is valid go to customer facing screen
                        var options = {
                            route: 'fraudPrevMsg',
                            payload: {}
                        };
                        SocketTrafficHandler.send(JSON.stringify({
                            type: 'DISPLAY_ONLY',
                            options: options
                        }), true).then(function(response) {
                            if (response.options.action == "continue") {
                                var accountNum = barcode.substring(11, barcode.length);
                                var upc = barcode.substring(0, 11);
                                $scope.confirmBillPayAssociate(resultVal, accountNum, result, upc);
                            } else {
                                $scope.clearWholeData();
                            }
                        });
                    });
                }, function(result, statusCode) {
                    var modalOptions = {
                        buttons: ['OK'],
                        headerText: 'Error',
                        bodyText: result.message
                    };
                    DialogService.showDialog({}, modalOptions).then(function(result) {});
                });

            }

            $scope.confirmBillPayAssociate = function(amount, accountNum, otcItemInfo, upc) {

                LOGGER.info('Entering confirmBillPayAssociate method', 'HomeCtrl > confirmBillPayAssociate');
                var modalOptions = {
                    buttons: ['Yes', 'No'],
                    headerText: '',
                    bodyText: 'Inform customer: <br> Health care premium payments are non refundable. <br> Check and CVS Gift/Money Card Tendors NOT Allowed.  Customer must verify amount on payment terminal.<br><br>Continue with payment of $' + amount + "?"
                };
                DialogService.showDialog({}, modalOptions).then(function(result) {
                    if (result == 'Yes') {
                        var options = {
                            route: 'customerAmountConf',
                            payload: {
                                amount: amount,
                                accountNum: accountNum,
                                description: otcItemInfo.description
                            }
                        };
                        SocketTrafficHandler.send(JSON.stringify({
                            type: 'DISPLAY_ONLY',
                            options: options
                        }), true).then(function(response) {
                            if (response.options.action == "accept") {
                                // pre auth call goes here
                                var payload = {
                                    "billPayRequest": {
                                        "accountNum": accountNum,
                                        "price": amount,
                                        "scannedUpcNumber": upc,
                                        "transType": '10'
                                    }
                                }
                                var billPayPreAuthPromise = Request.invoke({
                                    url: appConfig.store.services.API.preAuthentication,
                                    method: 'POST',
                                    data: payload
                                });
                                billPayPreAuthPromise.then(function(result) {
                                    if (result) {
                                        var billPayItem = {
                                            "skuNumber": otcItemInfo.sku,
                                            "scannedUpcNumber": upc,
                                            "cvsUpcNumber": otcItemInfo.upc,
                                            "accountNumber": accountNum,
                                            "price": amount,
                                            "approvalCode": "",
                                            "itemDescription": otcItemInfo.description
                                        }
                                        OrderFactory.getBillPayItemFromTxn().push(billPayItem);
                                        $scope.tempCurrOrder = OrderFactory.getBillPayItemFromTxn();
                                        var payload = {
                                            "TransactionObject": {
                                                "transactionId": OrderFactory.getTransactionIdData().transactionId,
                                                "transactionNumber": OrderFactory.getTransactionIdData().transactionNumber,
                                                "transactionType": "S",
                                                "storeItemList": [],
                                                "billPayItemList": OrderFactory.getBillPayItemFromTxn()
                                            }
                                        };
                                        var billPayQRCodePromise = Request.invoke({
                                            url: appConfig.store.services.API.billPayQRCode,
                                            method: 'POST',
                                            data: payload
                                        });
                                        billPayQRCodePromise.then(function(result) {
                                            if (result && result.image) {
                                                OrderFactory.setTotalBarcode(result);
                                                $modal.open({
                                                    templateUrl: 'views/modals/billPay-barcode.html',
                                                    keyboard: false,
                                                    backdrop: 'static',
                                                    windowClass: 'minor-popup',
                                                    size: 'sm',
                                                    controller: 'barcodeCtl',
                                                    resolve: {
                                                        data: function() {
                                                            return {
                                                                imageQRCode: ('data:image/png;base64,' + result.image),
                                                                clearDataCallback: $scope.clearWholeData
                                                            };
                                                        }
                                                    }
                                                });
                                            }

                                        }, function(result, statusCode) {
                                            var modalOptions = {
                                                buttons: ['OK'],
                                                headerText: 'Error',
                                                bodyText: 'Due to a system issue we are unable to process</br> this transaction at this time.</br>Please try again in few minutes.'
                                            };
                                            DialogService.showDialog({}, modalOptions).then(function(result) {
                                                $scope.clearWholeData();
                                            });
                                        });
                                    } else {
                                        // logging && alert
                                        LOGGER.error('QR Code FAILURE: Barcode data absent', 'barcodeCtl');
                                    }
                                }, function(result) {
                                    var modalOptions = {
                                        buttons: ['OK'],
                                        headerText: 'Error',
                                        bodyText: 'Due to a system issue we are unable to process</br> this transaction at this time.</br>Please try again in few minutes.'
                                    };
                                    DialogService.showDialog({}, modalOptions).then(function(result) {
                                        $scope.clearWholeData();
                                    });
                                });
                            } else {
                                // $scope.clearWholeData();
                                var modalOptions = {
                                    buttons: ['OK'],
                                    headerText: 'Cancel',
                                    bodyText: 'Customer canceled payment.'
                                };
                                DialogService.showDialog({}, modalOptions).then(function(result) {
                                    $scope.clearWholeData();
                                });

                            }
                        });
                    } else {
                        $scope.clearWholeData();
                    }
                });
            }
            // var timeout;
            $scope.enableBillPay = function() {

                LOGGER.info('Entering enableBillPay method', 'HomeCtrl > enableBillPay');
                if ($scope.isPriceModify || $scope.activePaidOut || $scope.activeFluShots ||
                    $scope.minuteClinicDepositsOrder.length || $scope.getAllItemsInOrder().length) {
                    return;
                }
                $scope.isBillPay = !$scope.isBillPay;
                // if (timeout) {
                //     $timeout.cancel(timeout);
                // }
                // if ($scope.isBillPay) {
                //     timeout = $timeout(function() {
                //         $scope.$broadcast('SCANNED_DATA_OTC', '799366205540006371681500100004');
                //     }, 3000);
                // }

            }

            $scope.testLog = function() {

                LOGGER.info('Entering testLog method', 'HomeCtrl > testLog');

                console.log("Rx Items in Order ");
                console.log(BasketFactory.getRxItemsInOrder());
                console.log("Basket data ");
                console.log(BasketFactory.getBasketData());
                BasketFactory.getRxOrderData();
            };

            $scope.test = function() {

                LOGGER.info('Entering test method', 'HomeCtrl > test');

                $scope.isOffline = true;
                $scope.goOffLine();
            };

            $scope.priceModify = function() {
                LOGGER.info('Button Pressed - Price Modify', 'HomeCtrl');
                if ($scope.activePaidOut || $scope.minuteClinicDepositsOrder.length || $scope.isRefund || $scope.activeFluShots || $scope.isBillPay) {
                    return;
                }
                $scope.isPriceModify = !$scope.isPriceModify;
                $scope.voidEarlierItemActive = false;
            }

            $scope.voidTxn = function(voidTxn) {
                LOGGER.info('Button Pressed - Void Transaction', 'HomeCtrl');
                PosSimplificationTimeStampService.handleItemEntryScreenEvents("void_transaction");
                if ($scope.isBillPay) {
                    return;
                }
                var modalOptions = {
                    buttons: ['Yes', 'No'],
                    headerText: 'Void Transaction',
                    bodyText: 'Do you want to void current transaction?'
                };
                DialogService.showDialog({}, modalOptions).then(function(result) {
                    if (result && result === 'Yes') {
                        $scope.hideExtraCareHQButton = true;
                        if ($scope.getAllItemsInOrder().length || $scope.getEncodedEccNumber()) {
                            if (OrderFactory.getFastpass() && OrderFactory.getFastpassData()) {
                                ESignFactory.doFastpassCompleteCancel({
                                    statusCode: "-1",
                                    statusMessage: "Canceled"
                                });
                                //calling recordProcessedTransaction service
                                OrderFactory.recordProcessedTransaction("Void");
                            }
                            // !CONFIG.storeData.isOffline && OpportunityFactory.updateOpportunity(true, "0000");
                        }
                        $scope.clearWholeData();
                        $scope.updateSecDispPriceList();
                        // change this to a common place
                        PosSimplificationTimeStampService.selectEventMethod({ eventType: "transaction_finalized" });
                        PosSimplificationTimeStampService.sendRxDWTimestampDisposition("voided");
                    } else {
                        //$scope.hideExtraCareHQButton = false;
                    }
                });
            };

            $scope.minuteClinicDeposits = function() {
                LOGGER.info('Button Pressed - MinuteClinic Deposits', 'HomeCtrl');

                if ($scope.getAllItemsInOrder().length || $scope.isMaxItem() || $scope.activePaidOut ||
                    $scope.isPriceModify || $scope.activeFluShots || $scope.isBillPay) {
                    return;
                }
                if ($scope.isMinuteClinicDeposits && $scope.minuteClinicDepositsOrder.length === 0) {
                    $scope.minuteClinicDepositsActive = false;
                    $scope.isMinuteClinicDeposits = false;
                    return;
                }
                $scope.minuteClinicDepositsActive = true;
                if ($scope.voidEarlierItemActive) {
                    if ($scope.isMinuteClinicDeposits) {
                        if (!$scope.minuteClinicDepositsOrder.length) {
                            var modalOptions = {
                                buttons: ['OK'],
                                headerText: 'Error',
                                bodyText: 'No Minute Clinic Deposits'
                            };
                            DialogService.showDialog({}, modalOptions).then(function(result) {});
                            return;
                        }
                        var modalOptions = {
                            buttons: ['Cash<br>Deposits', 'Check<br>Deposits', 'Cancel'],
                            headerText: 'Void Earlier Item',
                            bodyText: 'Void Earlier Item'
                        };
                        DialogService.showDialog({}, modalOptions).then(function(result) {
                            if (result == "Cash<br>Deposits") {
                                NumberEntryService.showDialog({}, {
                                    inputText: 'Cash Deposit Amount',
                                    headerText: 'Cash Deposits',
                                    cancelConfirm: true,
                                    maskCurrency: true
                                }).then(function(resultVal) {
                                    if (resultVal) {
                                        var voidItemNotFound = true;
                                        $scope.minuteClinicDepositsActive = false;
                                        $scope.voidEarlierItemActive = false;
                                        resultVal = $scope.isRefund ? -(parseInt(resultVal) / 100).toFixed(2) : (parseInt(resultVal) / 100).toFixed(2);

                                        var itemFound = false;
                                        for (var i = 0; i < $scope.minuteClinicDepositsOrder.length; i++) {
                                            if ($scope.minuteClinicDepositsOrder[i].key == 'cashAmount' && (resultVal == $scope.minuteClinicDepositsOrder[i].amount)) {
                                                voidItemNotFound = false;
                                                $scope.minuteClinicDepositsOrder.splice(i, 1);
                                                OrderFactory.setMinuteClinicDepositsOrder($scope.minuteClinicDepositsOrder);
                                                itemFound = true;
                                                if (!$scope.minuteClinicDepositsOrder.length) {
                                                    $scope.isMinuteClinicDeposits = false;
                                                }
                                                $scope.updateSecDispPriceList();
                                                return;
                                            }
                                        }
                                        if (voidItemNotFound) {
                                            $scope.voidItemMisMatchAlert();
                                        }
                                        if (itemFound) {
                                            var modalOptions = {
                                                buttons: ['OK'],
                                                headerText: 'Error',
                                                bodyText: 'Voided item not in transaction'
                                            };
                                            DialogService.showDialog({}, modalOptions).then(function(result) {});
                                        }
                                    }
                                });
                            } else if (result == "Check<br>Deposits") {
                                NumberEntryService.showDialog({}, {
                                    inputText: 'Check Deposit Amount',
                                    headerText: 'Check Deposits',
                                    cancelConfirm: true,
                                    maskCurrency: true
                                }).then(function(resultVal) {
                                    if (resultVal) {
                                        var voidItemNotFound = true;
                                        $scope.minuteClinicDepositsActive = false;
                                        $scope.voidEarlierItemActive = false;
                                        resultVal = $scope.isRefund ? -(parseInt(resultVal) / 100).toFixed(2) : (parseInt(resultVal) / 100).toFixed(2);
                                        for (var i = 0; i < $scope.minuteClinicDepositsOrder.length; i++) {
                                            if ($scope.minuteClinicDepositsOrder[i].key == 'checkAmount' && (resultVal == $scope.minuteClinicDepositsOrder[i].amount)) {
                                                voidItemNotFound = false;
                                                $scope.minuteClinicDepositsOrder.splice(i, 1);
                                                OrderFactory.setMinuteClinicDepositsOrder($scope.minuteClinicDepositsOrder);
                                                if (!$scope.minuteClinicDepositsOrder.length) {
                                                    $scope.isMinuteClinicDeposits = false;
                                                }
                                                $scope.updateSecDispPriceList();
                                                return;
                                            }
                                        }
                                        if (voidItemNotFound) {
                                            $scope.voidItemMisMatchAlert();
                                        }
                                    }
                                });
                            }
                        });
                    }
                } else {
                    var modalOptions = {
                        buttons: ['Cash<br>Deposits', 'Check<br>Deposits', 'Cancel'],
                        headerText: 'Minute Clinic Deposits',
                        bodyText: 'Minute Clinic Deposits'
                    };
                    DialogService.showDialog({}, modalOptions).then(function(result) {
                        if (result == "Cash<br>Deposits") {
                            if (!$scope.isMinuteClinicDeposits == true) {
                                $scope.isMinuteClinicDeposits = true;
                            }
                            NumberEntryService.showDialog({}, {
                                inputText: 'Cash Deposit Amount',
                                headerText: 'Cash Deposits',
                                cancelConfirm: true,
                                maskCurrency: true
                            }).then(function(resultVal) {
                                if (resultVal) {
                                    $scope.minuteClinicDepositsActive = false;
                                    $scope.voidEarlierItemDisabled = false;
                                    if ($scope.minuteClinicDepositsOrder.length === 0) {
                                        OrderFactory.startNewTxn();
                                    }
                                    var cashAmount = {
                                        key: 'cashAmount',
                                        amount: !$scope.isRefund ? (parseInt(resultVal) / 100).toFixed(2) : -(parseInt(resultVal) / 100).toFixed(2),
                                        label: 'MC Cash Total'
                                    };
                                    $scope.minuteClinicDepositsOrder.push(cashAmount);
                                    OrderFactory.setMinuteClinicDepositsOrder($scope.minuteClinicDepositsOrder);
                                    $scope.updateSecDispPriceList();
                                }
                            });
                        } else if (result == "Check<br>Deposits") {
                            if (!$scope.isMinuteClinicDeposits == true) {
                                $scope.isMinuteClinicDeposits = true;
                            }
                            NumberEntryService.showDialog({}, {
                                inputText: 'Check Deposit Amount',
                                headerText: 'Check Deposits',
                                cancelConfirm: true,
                                maskCurrency: true
                            }).then(function(resultVal) {
                                if (resultVal) {
                                    $scope.minuteClinicDepositsActive = false;
                                    if ($scope.minuteClinicDepositsOrder.length === 0) {
                                        OrderFactory.startNewTxn();
                                    }
                                    var checkAmount = {
                                        key: 'checkAmount',
                                        amount: !$scope.isRefund ? (parseInt(resultVal) / 100).toFixed(2) : -(parseInt(resultVal) / 100).toFixed(2),
                                        label: 'MC Check Total'
                                    };
                                    $scope.minuteClinicDepositsOrder.push(checkAmount);
                                    OrderFactory.setMinuteClinicDepositsOrder($scope.minuteClinicDepositsOrder);
                                    $scope.updateSecDispPriceList();
                                }
                            });
                        }
                    });
                }
            };

            var handlePhrEnrollment = function(evt, barcode) {
                if (CONFIG.storeAttributes.phrEnabled !== 'Y') {
                    LOGGER.info('Home Page > ACTION:PHR Enrollment Disabled > FUNCTION:enroll ', loggerName);
                    var modalOptions = {
                        buttons: ['OK'],
                        headerText: '',
                        bodyText: 'Enrollment not available. Pharmacy & Health Reward credits cannot be earned in this state.'
                    };
                    DialogService.showDialog({}, modalOptions).then(function(result) {});
                    return;
                }
                var parsedPatientId = barcode.substring(10, barcode.length - 1);
                var phrStatusPromise = Request.invoke({
                    loadMessage: "Checking rewards enrollment status",
                    url: appConfig.store.services.API.phrStatus + '?patient-id=' + parsedPatientId,
                    method: 'GET'
                });
                phrStatusPromise.then(function(eccData) {
                    eccData = eccData ? eccData : {};
                    OrderFactory.setPHRInfo(eccData);
                    if (eccData.enrollmentStatus !== 'E') {
                        var opts = {
                            patientId: parsedPatientId,
                            phrEnrollmentBarcode: barcode,
                            extraCareCardNo: eccData.xtracareCardNumber || ""
                        };
                        HipaaService.enroll(opts);
                    } else {
                        //
                    }
                }, function(eccData) {
                    var modalOptions = {
                        buttons: ['OK'],
                        headerText: 'Error',
                        bodyText: 'Sorry, we are temporarily unable to complete this transaction due to system issue.<br/>If you would like to join the Pharmacy ExtraBucks Rewards program, you can go online<br/>to cvs.com/rxrewards today or we can take care of this for you on your next visit.',
                        blockUI: true
                    };
                    DialogService.showDialog({}, modalOptions).then(function(type) {});
                });
            };
        }
    ]);


angular.module('weCarePlusApp')
    .controller('barcodeCtl', function($scope, $modalInstance, data, $location, PatientFactory, BasketFactory, OrderFactory, PrintService, DialogService, $modal, $rootScope, Request, ESignFactory, CONFIG, MessageFactory, $q) {

        $scope.data = data;
        $scope.dismiss = function() {
            LOGGER.info('Barcode dialog  > ACTION:DISMISS > FUNCTION:dismiss ', 'barcodeCtl');
            $modalInstance.close();
            PatientFactory.clearSelectedPatientList();
            BasketFactory.clearBasketData();
            OrderFactory.clearTxnObject();
            data.recheckStatus && data.recheckStatus();
        };
        $scope.confirmBillPay = function() {

            LOGGER.info('Entering  confirmBillPay method', 'HomeCtrl > confirmBillPay');
            // confirm bill pay (Auth) call goes here
            var modalOptions = {
                buttons: ['Yes', 'No'],
                headerText: 'Confirm',
                bodyText: 'Are you sure you wish to Confirm this operation?'
            };
            DialogService.showDialog({}, modalOptions).then(function(result) {
                if (result == "Yes") {
                    // auth call goes here(confirm bill pay)
                    var payload = {
                        "TransactionObject": {
                            "transactionId": OrderFactory.getTransactionIdData().transactionId,
                            "transactionNumber": OrderFactory.getTransactionIdData().transactionNumber,
                            "transactionType": "S",
                            "storeItemList": [],
                            "billPayItemList": OrderFactory.getBillPayItemFromTxn(),
                            patientProfileList: BasketFactory.getRxOrderData(),
                            posSignatureRequest: ESignFactory.getPosSignatureRequest(),
                            dispositonInfo: {
                                RegisterNum: CONFIG.registerId,
                                TxnNum: appUtils.getCurrentTimestamp(CONFIG.transationTimeFormat),
                                POSTenderType: "Cash",
                                DispositionId: "20150701152500429",
                                UserId: CONFIG.loggedInUser.id,
                                totalTransactionCount: null,
                                TxnStrtTym: appUtils.getCurrentTimestamp(),
                                TxnEndTym: appUtils.getCurrentTimestamp(),
                                FillsSold: 1,
                                FillNotSold: 0,
                                MsgDisp: MessageFactory.getNotDisplayedReasonData().messagesDisplayedCount,
                                MsgNotDisp: MessageFactory.getNotDisplayedReasonData().messagesNotDisplayedCount,
                                OffInd: "N",
                                OTCcount: OrderFactory.getOtcDataFromTxn() && OrderFactory.getOtcDataFromTxn().length,
                                SaleTymStmp: appUtils.getCurrentTimestamp(),
                                WaiterInd: PatientFactory.getPatientSearchStr() === 'Waiters' ? 'Y' : 'N',
                                POSCounselLocation: "1"
                            },
                            couponList: [{
                                campId: null,
                                cpnNbr: null,
                                cpnSeqNbr: null,
                                cpnDiscAmt: null,
                                redeemOvrdReason: null,
                                cpnMatchCD: null,
                                campCpnSeqNbr: null,
                                dateAndTime: null
                            }],
                            extraCareInfo: {
                                xtracareCardNumber: OrderFactory.getEccNumber(),
                                enrollmentStatus: null,
                                hippaExpiryDateTime: null,
                                targetIndicator: null,
                                enrollPromptIndicator: null,
                                couponValue: null,
                                couponExpiryDateTime: null
                            },
                            phrInfo: null
                        }
                    };
                    var confirmBillPayPromise = Request.invoke({
                        url: appConfig.store.services.API.confirmBillPay,
                        method: 'POST',
                        data: payload
                    });
                    confirmBillPayPromise.then(function(result) {
                        data.clearDataCallback && data.clearDataCallback();
                        $modalInstance.close();
                    }, function(result, statusCode) {
                        // refund
                        // OrderFactory.clearTxnDetails;
                        var billPayRefundDeferred = $q.defer()
                        OrderFactory.startNewTxn(billPayRefundDeferred); // new txn id for refund
                        billPayRefundDeferred.promise.then(function() {
                            var payload = {
                                "TransactionObject": {
                                    "transactionId": OrderFactory.getTransactionIdData().transactionId,
                                    "transactionNumber": OrderFactory.getTransactionIdData().transactionNumber,
                                    "transactionType": "R",
                                    "storeItemList": [],
                                    "billPayItemList": OrderFactory.getBillPayItemFromTxn(),
                                    // "statusCode" : result.statusCode,
                                    patientProfileList: BasketFactory.getRxOrderData(),
                                    posSignatureRequest: ESignFactory.getPosSignatureRequest(),
                                    dispositonInfo: {
                                        RegisterNum: CONFIG.registerId,
                                        TxnNum: appUtils.getCurrentTimestamp(CONFIG.transationTimeFormat),
                                        POSTenderType: "Cash",
                                        DispositionId: "20150701152500429",
                                        UserId: CONFIG.loggedInUser.id,
                                        totalTransactionCount: null,
                                        TxnStrtTym: appUtils.getCurrentTimestamp(),
                                        TxnEndTym: appUtils.getCurrentTimestamp(),
                                        FillsSold: 1,
                                        FillNotSold: 0,
                                        MsgDisp: MessageFactory.getNotDisplayedReasonData().messagesDisplayedCount,
                                        MsgNotDisp: MessageFactory.getNotDisplayedReasonData().messagesNotDisplayedCount,
                                        OffInd: "N",
                                        OTCcount: OrderFactory.getOtcDataFromTxn() && OrderFactory.getOtcDataFromTxn().length,
                                        SaleTymStmp: appUtils.getCurrentTimestamp(),
                                        WaiterInd: PatientFactory.getPatientSearchStr() === 'Waiters' ? 'Y' : 'N',
                                        POSCounselLocation: "1"
                                    },
                                    couponList: [{
                                        campId: null,
                                        cpnNbr: null,
                                        cpnSeqNbr: null,
                                        cpnDiscAmt: null,
                                        redeemOvrdReason: null,
                                        cpnMatchCD: null,
                                        campCpnSeqNbr: null,
                                        dateAndTime: null
                                    }],
                                    extraCareInfo: {
                                        xtracareCardNumber: OrderFactory.getEccNumber(),
                                        enrollmentStatus: null,
                                        hippaExpiryDateTime: null,
                                        targetIndicator: null,
                                        enrollPromptIndicator: null,
                                        couponValue: null,
                                        couponExpiryDateTime: null
                                    },
                                    phrInfo: null
                                }
                            };

                            var billPayRefundPromise = Request.invoke({
                                url: appConfig.store.services.API.billPayRefund,
                                method: 'POST',
                                data: payload
                            });
                            billPayRefundPromise.then(function(result) {
                                if (result && result.image) {
                                    OrderFactory.setTotalBarcode(result);
                                    $modal.open({
                                        templateUrl: 'views/modals/billPay-refundBarcode.html',
                                        keyboard: false,
                                        backdrop: 'static',
                                        windowClass: 'minor-popup',
                                        size: 'sm',
                                        controller: 'barcodeCtl',
                                        resolve: {
                                            data: function() {
                                                return {
                                                    imageQRCode: ('data:image/png;base64,' + result.image),
                                                    clearDataCallback: $scope.clearWholeData
                                                };
                                            }
                                        }
                                    });
                                }
                                data.clearDataCallback && data.clearDataCallback();
                                $modalInstance.close();
                                // print
                            }, function(result, statusCode) {
                                var modalOptions = {
                                    buttons: ['OK'],
                                    headerText: 'Error',
                                    bodyText: 'Due to a system issue we are unable to process</br> this transaction at this time.</br>Please try again in few minutes.'
                                };
                                DialogService.showDialog({}, modalOptions).then(function(result) {
                                    $scope.clearWholeData();
                                });
                            });
                        });
                    });
                }
            });
        }

        $scope.cancelQRCode = function() {

            LOGGER.info('Entering  cancelQRCode method', 'HomeCtrl > cancelQRCode');
            // popup
            var modalOptions = {
                buttons: ['Yes', 'No'],
                headerText: 'Cancel',
                bodyText: 'Are you sure you wish to CANCEL this operation?'
            };
            DialogService.showDialog({}, modalOptions).then(function(result) {
                if (result == "Yes") {
                    data.clearDataCallback && data.clearDataCallback();
                    $modalInstance.close();
                }
            });
        }

        $scope.printQRcode = function() {

            LOGGER.info('Entering printQRcode method', 'barcodeCtl > printQRcode');

            var barCodeData = OrderFactory.getTotalBarcodeData();
            var QRpayload = {
                'QRCodeRequest': {
                    'qrData': barCodeData
                }
            };
            if (barCodeData) {
                PrintService.doPrint(appConfig.store.services.API.printService.totalQRCode, QRpayload);
                LOGGER.info('Barcode dialog  > ACTION:PRINT > FUNCTION:PRINT ', 'barcodeCtl');
            } else {
                LOGGER.error('PRINT FAILURE: Barcode data absent', 'barcodeCtl');
            }
            data.clearDataCallback && data.clearDataCallback();
            $scope.dismiss();
        };
    });

angular.module('weCarePlusApp')
    .controller('PseHomeEsigPopupCtrl', function($scope, $modalInstance, $location, image, CONFIG, Request, ESignFactory, PseFactory) {

        LOGGER.info('Entering PseHomeEsigPopupCtrl', 'PseHomeEsigPopupCtrl');

        $scope.image = image.originalImg;
        $scope.esignConfirmEnable = false;

        $scope.redirectHome = function() {

            LOGGER.info('Entering redirectHome method', 'PseHomeEsigPopupCtrl > printQRcode');
            if ($scope.esignConfirmEnable) {
                return;
            }
            $scope.esignConfirmEnable = true;
            PseFactory.setIsItemCanAddToTotal(true);
            image.callback && image.callback();
            $modalInstance.close();
        };
        $scope.dismiss = function() {

            LOGGER.info('Entering dismiss method', 'PseHomeEsigPopupCtrl > dismiss');

            image.cancleCallback && image.cancleCallback();
            $modalInstance.close();
        };
    });