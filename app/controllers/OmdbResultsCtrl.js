"use strict";

app.controller("OmdbResultsCtrl", function($scope, $rootScope, Search, DataFactory, $location){

  $scope.results = $rootScope.omdbSearchReturn;

  $scope.newMovie = {
    Title: "",
    Year: "",
    Poster: "",
    isWatched: false,
    Rating: null
  };

  $scope.addNewMovie = function() {
        DataFactory.postNewMovie($scope.newMovie)
            .then(function successCallback(response) {
                console.log(response);
                $location.url("/welcome");
            });
    };


});