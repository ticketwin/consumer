angular.module("ticketWin", [
  "ui.router",
  require("./sections/sections.js").name,
  require("./services/services.js").name
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
});
