module.exports = angular.module("api:sessions", [])
.factory("Sessions", function($http) {
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

  return Sessions;
});
