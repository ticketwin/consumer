describe("httpRequestInterceptor", function() {
  var httpRequestInterceptor, LocalForageFactory, q, $scope;

  beforeEach(angular.mock.module("ticketWin"));

  beforeEach(inject(function(_httpRequestInterceptor_, _$localforage_, $q, $rootScope) {
    httpRequestInterceptor = _httpRequestInterceptor_;
    LocalForageFactory = _$localforage_;
    q = $q;
    $scope = $rootScope.$new();
  }));

  it("should exist", function() {
    expect(httpRequestInterceptor).toBeDefined();
  });

  describe("request", function() {
    it("should set an Authorization token in HTTP header", function() {
      var res_token = "TCKTWN1337";
      var res_headers = { headers: { Authorization: "TCKTWN1337" } };
      var pre_intercept_headers = { headers: {} };
      var post_intercept_headers;

      spyOn(LocalForageFactory, "get").and.callFake(function() {
        return q.when(res_token);
      });
      spyOn(httpRequestInterceptor, "request").and.callThrough();

      httpRequestInterceptor.request(pre_intercept_headers).then(function(result) {
        post_intercept_headers = result;
      });

      $scope.$apply();

      expect(post_intercept_headers).toEqual(res_headers);
    });
  });
});
