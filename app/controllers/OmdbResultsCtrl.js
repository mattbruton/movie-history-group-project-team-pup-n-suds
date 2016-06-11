"use strict";

app.controller("OmdbResultsCtrl", function($scope, $rootScope, Search, DataFactory, $location) {

  $scope.results = $rootScope.omdbSearchReturn;


  $scope.addNewMovie = function(movie) {
    DataFactory.postNewMovie(movie)
      .then(function successCallback(response) {
        $location.url("/watch-list");
        $rootScope.watchListShow = true;
      });
  };


});
