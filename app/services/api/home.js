var _ = require("lodash");

module.exports = angular.module("api:home", [])
.factory("Home", function($http) {
  var Home = {};

  Home.get = function() {
    var users = [{ id: 1, name: "john" }, { id: 2, name: "jane" }];

    users = users.map(function(user) {
      return user.name.toUpperCase();
    });

    return users;
  };

  return Home;
});
