"use strict";

app.factory("DataFactory", function($q, $http, firebaseURL, AuthFactory) {

  var getMovies = function(movies) {
    return $q(function(resolve, reject) {
        $http.get(`${firebaseURL}movies.json`)
                .success(function(objectFromFirebase){
                    resolve(objectFromFirebase);
                })
                .error(function(error){
                    reject(error);
                });
        });
    }



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
                    isWatched: newMovie.isWatched,
                    Rating: newMovie.Rating
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
    postNewMovie: postNewMovie
  };

});