"use strict";

app.controller("WatchListCtrl", function($scope, $rootScope, Search, $location, AuthFactory, DataFactory){

   $rootScope.watchListReturn = [];

	$scope.movies = [];
	
  $scope.displayWatchList = function() {
    DataFactory.getWatchList($rootScope.watchListReturn)

  };


  $scope.displayWatchList();

});