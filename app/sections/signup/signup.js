var ip = require("ip");

module.exports = angular.module("controllers:signup", [])
.controller("SignupController", function(Users, $state) {
  var vm = this;
  vm.user = {};
  vm.user.consents = [];

  vm.signUp = function() {
    vm.error = "";
    if (vm.terms_of_service === true) {
      var consent = {};
      consent.consent_type = "terms_of_service";
      consent.ip_address = ip.address(),
      vm.user.consents.push(consent);
    }
    Users.login(vm.user)
    .then(function(result) {
      return $state.go("home");
    })
    .catch(function(result) {
      //TODO Potential API fix
      if (result.status === 500) { vm.error = "You must agree to Terms of Service"; return; }
      vm.error = result.data.errors;
    });
  };
})
.config(function($stateProvider) {
  $stateProvider
    .state("signup", {
      url: "/signup",
      template: require("./signup.jade"),
      controller: "SignupController as vm"
    });
});
