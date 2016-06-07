"use strict";

app.controller("WatchListCtrl", function($scope, $location, DataFactory, AuthFactory) {
	$scope.title = "";
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

	$scope.displayMovies = function() {
		if($location.path() === "/watch-list"){
			DataFactory.getWatchList().then(function(data) {      
			$scope.movies = data;
			$scope.title = "Movie Watch List";
			// console.log($scope.movies);
			});
		}else{
			DataFactory.getWatchedList().then(function(data) {      
			$scope.movies = data;
			$scope.title = "Previously Viewed Movies";
			// console.log($scope.movies);
			});
		}
	};

  $scope.rateMovie = function(objId, title, year, poster, imdbid, rating) {
    DataFactory.updateRating(objId, title, year, poster, imdbid, rating).then(function() {
      $scope.displayMovies();
    })

  };

	$scope.displayMovies();

  $scope.removeMovie = function(movieId) {
  	DataFactory.deleteMovie(movieId).then(function(response){
            $scope.displayMovies();
            });
        };

  // $scope.removeMovie();
  
});
