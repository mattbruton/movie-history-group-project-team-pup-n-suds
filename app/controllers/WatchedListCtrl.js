"use strict";

app.controller("WatchedListCtrl", function($scope, DataFactory, AuthFactory) {

  $scope.watched = [];

  $scope.displayWatchedList = function() {
    DataFactory.getWatchedList().then(function(data) {
      $scope.watched = data;
      console.log($scope.watched);
    });
  };

  
  $scope.displayWatchedList();

  $scope.removeMovie = function(movieId) {
    DataFactory.deleteMovie(movieId).then(function(response){
            $scope.displayWatchList();
            });
        };

  $scope.removeMovie();

});