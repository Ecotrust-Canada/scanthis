'use strict';


angular.module('scanthisApp.setsupplierController', [])

.controller('SetSupplierCtrl', function($scope, $http, DatabaseServices) {

  /*
   *sets the supplier
   */

  
  /*display all suppliers*/
  $scope.ListSuppliers = function(){
    var func = function(response){
      $scope.suppliers = response.data;
    };
    DatabaseServices.GetEntries('supplier', func);
  };

  $scope.ListSuppliers();

  /*show selected supplier*/
  $scope.GetCurrentSupplier = function(){
    $http.get('http://10.10.50.30:3000/stage?id=eq.' + $scope.stage_id).then(function(response){
      var supplier_id = response.data[0].current_supplier_id;
      var query = '?id=eq.' + supplier_id;
      var func = function(response){
        $scope.currentsupplier = response.data;
      };
      DatabaseServices.GetEntries('supplier', func, query);
    }, function(response){
    });
    
  };

  /*assign one as current*/
  $scope.PatchStageWithSupplier = function(supplier_id){
    var func = function(response){
      $scope.GetCurrentSupplier();
    };
    var patch = {"current_supplier_id": supplier_id};
    var query = '?id=eq.' + $scope.stage_id;
    DatabaseServices.PatchEntry('stage', patch, query, func);
  };

  $scope.GetCurrentSupplier();


});
