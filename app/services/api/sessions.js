module.exports = angular.module("api:sessions", [])
.factory("Sessions", function($http, $localforage, $q) {
  var API = "http://api.tcktwn.dev:3000/";
  var payload = {};

  var Sessions = {};

  Sessions.create = function(data) {
    payload.sessions = {};
    payload.sessions = data;
    return $http.post(API + "sessions", payload)
    .then(function(response) {
      return response.data;
    });
  };

  Sessions.login = function(data) {
    return $q(function(resolve, reject) {
      Sessions.create(data)
      .then(function(result) {
        return $localforage.set("Authorization", result.users.auth_token);
      })
      .then(function(result) {
        return resolve(result);
      })
      .catch(function(err) {
        return reject(err);
      });
    });
  };

  return Sessions;
});
