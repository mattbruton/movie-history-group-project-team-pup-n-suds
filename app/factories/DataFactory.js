"use strict";

app.factory("DataFactory", function($q, $http, firebaseURL, AuthFactory) {

  var getWatchList = function(array) {
        var user = AuthFactory.getUser();
        return $q(function(resolve, reject) {
            $http.get(`${firebaseURL}movies.json`)
                .success(function(moviesObject) {
                    var movieCollection = moviesObject;
                    Object.keys(movieCollection).forEach(function(movie) {
                        if (movieCollection[movie].uid === user.uid) {
                          array.push(movieCollection[movie]);
                        }
                    });            
                    resolve(moviesObject);              
                })
                .error(function(error) {
                    reject(error);
                });
        });
    };



  var postNewMovie = function(newMovie) {
    var user = AuthFactory.getUser();
    return $q(function(resolve, reject) {
        $http.post(
                `${firebaseURL}movies.json`,
                JSON.stringify({
                    Title: newMovie.Title,
                    Year: newMovie.Year,
                    Poster: newMovie.Poster,
                    uid: user.uid,
                    isWatched: false,
                    Rating: 0
                })
            )
            .success(
                function(objectFromFirebase) {
                    resolve(objectFromFirebase);
                }
            );
        });
    };

  return {
    postNewMovie: postNewMovie,
    getWatchList: getWatchList
  };

});