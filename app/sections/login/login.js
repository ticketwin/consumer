module.exports = angular.module("controllers:login", [])
.controller("LoginController", function($state, Sessions) {
  var vm = this;

  vm.signIn = function() {
    vm.error = "";
    Sessions.login(vm.user)
    .then(function(result) {
      return $state.go("home");
    })
    .catch(function(result) {
      vm.error = result.data.errors;
    });
  };
})
.config(function($stateProvider) {
  $stateProvider
    .state("login", {
      url: "/login",
      template: require("./login.jade"),
      controller: "LoginController as vm"
    });
});
