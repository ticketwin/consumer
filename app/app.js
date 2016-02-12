angular.module("ticketWin", [
  "ui.router",
  require("./components/components.js").name,
  require("./sections/sections.js").name,
  require("./services/services.js").name
])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/");
});
