"use strict";

app.controller("WatchListCtrl", function($scope, DataFactory, AuthFactory) {

  $scope.movies = [];

  $scope.items = [{
    value: '1',
    text: '1 Star'
  }, {
    value: '2',
    text: '2 Stars'
  },
  {
    value: '3',
    text: '3 Stars'
  },
  {
    value: '4',
    text: '4 Stars'
  },
  {
    value: '5',
    text: '5 Stars'
  }];  

  $scope.displayWatchList = function() {
    DataFactory.getWatchList().then(function(data) {
      $scope.movies = data;
      console.log($scope.movies);
    });
  };

  $scope.rateMovie = function(objId, title, year, poster, imdbid, rating) {
    DataFactory.updateRating(objId, title, year, poster, imdbid, rating).then(function() {
      $scope.displayWatchList();
    })

  };

  $scope.displayWatchList();

  $scope.removeMovie = function(movieId) {
  	DataFactory.deleteMovie(movieId).then(function(response){
            $scope.displayWatchList();
            });
        };

  // $scope.removeMovie();
  
  });
