"use strict";

app.controller("OmdbResultsCtrl", function($scope, $rootScope, Search, DataFactory, $location){

  $scope.results = $rootScope.omdbSearchReturn;
  

  $scope.addNewMovie = function(movie) {
    console.log(movie);
        DataFactory.postNewMovie(movie)
            .then(function successCallback(response) {
                console.log(response);
                $location.url("/welcome");
            });
    };


});