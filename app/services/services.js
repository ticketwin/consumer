module.exports = angular.module("ticketWin:services", [
  require("./api/api").name,
  require("./interceptor/interceptor").name,
  require("./localforage/localforage").name
]);
