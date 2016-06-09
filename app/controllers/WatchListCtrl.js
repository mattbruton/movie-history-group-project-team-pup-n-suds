"use strict";

app.controller("WatchListCtrl", function($scope, $location, $rootScope, DataFactory, AuthFactory) {
	$scope.title = "";
	$scope.movies = [];
	$scope.isWatched = false;
	$scope.items = [{
		value: '1',
		text: '1 Star'
	},
	{
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
			$scope.movies = [];
	     		$scope.isWatched = false;      
				$scope.movies = data;
				$scope.title = "Movie Watch List";
				console.log("watch-list", $scope.movies);
				if($scope.movies.length > 0){
					$rootScope.isActive = true;
				}else{
					$rootScope.isActive = false;
				};
			});
		}
		if($location.path() === "/watched"){
			DataFactory.getWatchedList().then(function(data) { 
			$scope.movies = [];
	      		$scope.isWatched = true;     
				$scope.movies = data;
				$scope.title = "Previously Viewed Movies";
				console.log("prev-list", $scope.movies);
				if($scope.movies.length > 0){
					$rootScope.hasContent = true;
				}else{
					$rootScope.hasContent = false;
				};
			});
		};
	};
	
	$scope.unwatchMovie = function(movie) {
		$scope.rateMovie(movie, 0);
		$scope.displayMovies();
	};


	$scope.rateMovie = function(movie, rating) {
		DataFactory.updateRating(movie, rating).then(function() {
			// $scope.displayMovies();
			DataFactory.getWatchedList().then(function(data) {
				let movies = [];     
				$scope.movies = data;
				if($scope.movies.length === 0){
					$rootScope.hasContent = false;
					$location.path("/watch-list");
				}else{
					$rootScope.hasContent = true;
				}
				$scope.displayMovies();
			});
		});
	};


	$scope.removeMovie = function(movieId) {
		DataFactory.deleteMovie(movieId).then(function(response){
			$scope.displayMovies();
			DataFactory.getWatchedList().then(function(data) {
				let movies = [];     
				$scope.movies = data;
				if($scope.movies.length === 0){
					$rootScope.hasContent = false;
					$location.path("/watch-list");
				};
			});
		});
	};

	$scope.displayMovies();

});
