"use strict";

app.controller("WatchListCtrl", function($scope, $routeParams, Search, $location, DataFactory){
	$scope.movies = [];
    $scope.addedmovie = {};

    $scope.addedmovie = $scope.movies.filter(function(item){
		return item.id === $routeParams.itemId;
	})[0];
 
     $scope.addToWatch = function(movie) {
        DataFactory.getMovies(movie)
            .then(function successCallback(response) {
                console.log(response);
                $location.url("/watch-list");
            });
    };


});