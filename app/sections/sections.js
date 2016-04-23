module.exports = angular.module("ticketWin:sections", [
  require("./home/home").name,
  require("./login/login").name,
  require("./signup/signup").name,
  require("./account/account").name
]);
