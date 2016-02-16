var localforage = require("localforage");

module.exports = angular.module("localforage:localforage", [])
.factory("$localforage", function() {
  var $localforage = {};

  $localforage.get = function(token) {
    return localforage.getItem(token).then(function(data) {
      return data;
    });
  };

  $localforage.set = function(key, value) {
    return localforage.setItem(key, value).then(function(data) {
      return data;
    });
  };

  return $localforage;
});
