"use strict";

app.controller("WatchListCtrl", function($scope, $location, DataFactory, AuthFactory) {
	$scope.title = "";
 	$scope.movies = [];

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

	$scope.displayMovies();
});
