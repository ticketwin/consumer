module.exports = angular.module("api:users", [])
.factory("Users", function($http, $localforage, $q) {
  var API = "http://api.tcktwn.dev:3000/";
  var payload = {};

  var Users = {};

  Users.create = function(data) {
    payload.users = {};
    payload.users = data;
    return $http.post(API + "users", payload)
    .then(function(response) {
      return response.data;
    });
  };

  Users.login = function(data) {
    return $q(function(resolve, reject) {
      Users.create(data)
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

  return Users;

});
