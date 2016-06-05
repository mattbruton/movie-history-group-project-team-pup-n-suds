"use strict";

app.factory("DataFactory", function($q, $http, firebaseURL, AuthFactory) {

  var getMovies = function(movies) {
    var user = AuthFactory.getUser();
    return $q(function(resolve, reject) {
        $http.get(`${firebaseURL}movies.json`)
            .success(function(objectFromFirebase){
                JSON.stringify({
                    Title: movies.Title,
                        Year: movies.Year,
                        Poster: movies.Poster,
                        uid: user.uid,
                        isWatched: false,
                        Rating: 0
        })
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
    getMovies: getMovies
  };

});