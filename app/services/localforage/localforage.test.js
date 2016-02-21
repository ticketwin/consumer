describe("$localforage", function() {
  var LocalForageFactory, httpBackend, q, $scope;

  beforeEach(angular.mock.module("ticketWin"));

  beforeEach(inject(function(_$localforage_, $httpBackend, $q, $rootScope) {
    LocalForageFactory = _$localforage_;
    httpBackend = $httpBackend;
    q = $q;
    $scope = $rootScope.$new();
  }));

  it("should exist", function() {
    expect(LocalForageFactory).toBeDefined();
  });

  describe("get", function() {
    it("should return an auth token for 'Authorization' if one exists", function() {
      var result = "";
      var res_token = "TCKTWN1337";
      var key = "Authorization";

      spyOn(LocalForageFactory, "get").and.callFake(function() {
        return q.when(res_token);
      });

      expect(result).toEqual("");

      LocalForageFactory.get(key).then(function(token) {
        result = token;
      });
      $scope.$apply();

      expect(LocalForageFactory.get).toHaveBeenCalledWith(key);
      expect(result).toEqual(res_token);
    });

    it("should return null for 'Authorization' if a token doesn't exist", function() {
      var result = "";
      var res_token = null;
      var key = "Authorization";

      spyOn(LocalForageFactory, "get").and.callFake(function() {
        return q.when(res_token);
      });

      expect(result).toEqual("");

      LocalForageFactory.get(key).then(function(token) {
        result = token;
      });
      $scope.$apply();

      expect(LocalForageFactory.get).toHaveBeenCalledWith(key);
      expect(result).toEqual(res_token);
    });
  });

  describe("set", function() {
    it("should set an auth token to 'Authorization'", function() {
        var result = "";
        var token = "TCTKWN1337";
        var key = "Authorization";

        spyOn(LocalForageFactory, "set").and.callFake(function() {
          return q.when(token);
        });

        expect(result).toEqual("");

        LocalForageFactory.set(key, token).then(function(data) {
          result = data;
        });
        $scope.$apply();

        expect(LocalForageFactory.set).toHaveBeenCalledWith(key, token);
        expect(result).toEqual(token);
    });
  });
});
