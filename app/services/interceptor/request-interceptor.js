module.exports = angular.module("interceptor:request-interceptor", [])
.factory("httpRequestInterceptor", function($localforage) {
  return {
    request: function(config) {
      return $localforage.get("Authorization")
      .then(function(token) {
        config.headers.Authorization = token;
        return config;
      });
    }
  };
});
