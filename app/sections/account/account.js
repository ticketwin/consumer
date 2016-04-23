module.exports = angular.module("controllers:account", [])
.controller("AccountController", function(isLoggedIn) {
  var vm = this;
  vm.user = isLoggedIn;
})
.config(function($stateProvider) {
  $stateProvider
    .state("account", {
      url: "/account",
      template: require("./account.jade"),
      controller: "AccountController as vm",
      resolve: {
        isLoggedIn: function(Sessions) {
          return Sessions.isLoggedIn();
        }
      }
    });
});
