angular.module("ticketWin", [
  "ui.router",
  require("./components/components.js").name,
  require("./sections/sections.js").name,
  require("./services/services.js").name
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
});
