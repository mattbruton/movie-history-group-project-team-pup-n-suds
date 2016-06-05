"use strict";

app.controller("SearchCtrl", function($scope, $rootScope, Search, $location){
  
  $rootScope.omdbSearchReturn = [];

  $scope.searchedMovie = {
    movie: "",
    year: "",
    type: ""
  };

  $scope.searchOMDBFunction = function(){
    Search.getOMDBMovieList($scope.searchedMovie.movie, $scope.searchedMovie.year, $rootScope.omdbSearchReturn)
    .then(function() {
      $location.url('/omdb-results');
    });
  };

});