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



	

	
	$scope.displayMovies = function() {;
		if($location.path() === "/watch-list"){
			DataFactory.getWatchList().then(function(data) {
			$scope.movies = [];
	     		$scope.isWatched = false;      
				$scope.movies = data;
				$scope.title = "Movie Watch List";
				if($scope.movies.length === 0){
					$rootScope.watchListShow = false;
            		$rootScope.searchLogoutShow = true;
				}
			});
		}
		if($location.path() === "/watched"){
			DataFactory.getWatchedList().then(function(data) { 
			$scope.movies = [];
	      		$scope.isWatched = true;     
				$scope.movies = data;
				$scope.title = "Previously Viewed Movies";
				if($scope.movies.length === 0){
					$rootScope.prevListShow = false;
					$rootScope.searchLogoutShow = true;
				}
			});
		};
	};
	
	$scope.unwatchMovie = function(movie) {
		$scope.rateMovie(movie, 0);
		$scope.displayMovies();
	};


	$scope.rateMovie = function(movie, rating) {
		DataFactory.updateRating(movie, rating).then(function() {
			DataFactory.getWatchedList().then(function(data) {
				let movies = [];     
				$scope.movies = data;
				if($scope.movies.length === 0){
					$rootScope.prevListShow = false;
					$location.path("/watch-list");
				}else{
					$rootScope.prevListShow = true;
				}
			});
			DataFactory.getWatchList().then(function(data) {
				let movies = [];     
				$scope.movies = data;
				if($scope.movies.length === 0){
					$rootScope.watchListShow = false;
					$location.path("/watched");
				}else{
					$rootScope.watchListShow = true;
				}
			});

			$scope.displayMovies();

		});
	};


	$scope.checkForContent = function(){
		DataFactory.getWatchedList().then(function(data) {
				let movies = [];     
				$scope.movies = data;
				if($scope.movies.length === 0){
					$scope.emptyPrevList = true;
				}
			});
			DataFactory.getWatchList().then(function(data) {
				let movies = [];     
				$scope.movies = data;
				if($scope.movies.length === 0){
					$scope.emptyWatchList = true
				}
			});
	}


	$scope.removeMovie = function(movieId) {
		DataFactory.deleteMovie(movieId).then(function(response){
			DataFactory.getWatchedList().then(function(data) {
				let movies = [];     
				$scope.movies = data;
				if($scope.movies.length === 0){
					$rootScope.prevListShow = false;
					$location.path("/watch-list");
				}
			});
			DataFactory.getWatchList().then(function(data) {
				let movies = [];     
				$scope.movies = data;
				if($scope.movies.length === 0){
					$rootScope.watchListShow = false;
					$location.path("/watched");
				}else{
					// $rootScope.emptyLists = false;
				}
			});
			// $scope.displayMovies();
		});

	};
	$scope.displayMovies();


});
