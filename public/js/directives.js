'use strict';


angular.module('scanthisApp.directives', [])

/*button to switch from makeitem to summaryblock*/
.directive('viewsummarybutton', function() { return { templateUrl: 'htmlpartials/viewsummarybutton.html' }; })

/*select lot from dropdown*/
.directive('selectlot', function() { return { templateUrl: 'htmlpartials/selectlot.html' }; })

/*creating item entries*/
.directive('makeitem', function() { return { templateUrl: 'htmlpartials/makeitem.html' }; })

/*summary of items table*/
.directive('summaryblock', function() { return { templateUrl: 'htmlpartials/summaryblock.html' }; })

/*form with submit button*/
.directive('createform', function() { return { templateUrl: 'htmlpartials/createform.html' }; })

/*moving lots from one stage to another*/
.directive('movelot', function() { return { templateUrl: 'htmlpartials/movelot.html' }; })

/*table with suppliers with button to set as current*/
.directive('supplierlist', function() { return { templateUrl: 'htmlpartials/supplierlist.html' }; })

/**/
.directive('loinlist', function() { return { templateUrl: 'htmlpartials/loinlist.html' }; })

.directive('boxsummary', function() { return { templateUrl: 'htmlpartials/boxsummary.html' }; })

/**/
.directive('boxinfo', function() { return { 
  scope: { box: '=' },
  templateUrl: 'htmlpartials/boxinfo.html' }; })

.directive('shipinfo', function() { return { 
  scope: { ship: '=' },
  templateUrl: 'htmlpartials/shipinfo.html' }; })

/*Creates a searchable table of items in order to reprint labels*/
.directive('reprint', function() {
  return {
    templateUrl: 'htmlpartials/reprint.html',
    controller: function($scope, $injector, DatabaseServices) {

        $scope.ListAllItems = function(station_id){
            var query = '?station_id=eq.' + station_id;
            var func = function(response){
              $scope.items = response.data;
              for (var i=0;i<$scope.items.length;i++){
                $scope.items[i].internal_lot_code = $scope.items[i].internal_lot_code ? $scope.items[i].internal_lot_code : $scope.items[i].lot_number;
              }
            };
            DatabaseServices.GetEntries('item_lot', func, query);
          };

        $scope.ListAllItems($scope.station_id);        
    }
  };
})




;
