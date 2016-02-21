describe("Sessions Service", function() {
  var SessionsFactory, httpBackend, q, $localforage, $scope;
  var url = "http://api.tcktwn.dev:3000/sessions";
  var res_create = {
    users: {
      auth_token: "12345",
      created_at: "2016-02-15T11:20:08.375-06:00",
      email:      "user@ticketwin.com",
      updated_at: "2016-02-15T14:53:48.414-06:00",
      user_id:    1
    },
    status: 200
  };

  beforeEach(angular.mock.module("ticketWin"));

  beforeEach(inject(function(_Sessions_, $httpBackend, $q, _$localforage_, $rootScope) {
    SessionsFactory = _Sessions_;
    httpBackend = $httpBackend;
    q = $q;
    $localforage = _$localforage_;
    $scope = $rootScope.$new();
  }));

  beforeEach(function() {
    spyOn($localforage, "get").and.callFake(function() {
      return q.when({});
    });
  });

  it("should exist", function() {
    expect(SessionsFactory).toBeDefined();
    expect(SessionsFactory.create).toBeDefined();
  });

  describe("create", function() {
    var result;
    var sessionsResponse;

    beforeEach(function() {
      result = {};
      sessionsResponse = {};
      spyOn(SessionsFactory, "create").and.callThrough();
    });

    it("should return an auth token with a valid email and password", function() {
      var login = { email: "user@ticketwin.com", password: "foobar" };

      httpBackend.whenPOST(url).respond(200, res_create);

      expect(SessionsFactory.create).not.toHaveBeenCalled();
      expect(result).toEqual({});

      SessionsFactory.create(login)
      .then(function(response) {
        result = response;
      });
      httpBackend.flush();

      expect(SessionsFactory.create).toHaveBeenCalledWith(login);
      expect(result).toEqual(res_create);
      expect(result.status).toEqual(200);
    });

    it("should return an error with an invalid email or password", function() {
      var login = { email: "user@ticketwin.com", password: "wrong" };
      sessionsResponse = {
        data: {
          errors: "Invalid email or password",
        },
        status: 422
      };

      httpBackend.whenPOST(url).respond(function() {
        return [422, sessionsResponse];
      });

      expect(SessionsFactory.create).not.toHaveBeenCalled();
      expect(result).toEqual({});

      SessionsFactory.create(login)
      .then(function(response) {
        result = response;
      })
      .catch(function(response) {
        result = response.data;
      });
      httpBackend.flush();

      expect(SessionsFactory.create).toHaveBeenCalledWith(login);
      expect(result).toEqual(sessionsResponse);
      expect(result.status).toEqual(422);
    });
  });

  describe("login", function() {
    var user = { email: "user@ticketwin.com", password: "foobar" };
    var res_login = "TCKTWN1337";
    var deferred;
    var result;

    beforeEach(function() {
      deferred = q.defer();
      spyOn(SessionsFactory, "login").and.callThrough();
      spyOn(SessionsFactory, "create").and.callFake(function() {
        return q.when(res_create);
      });
      spyOn($localforage, "set").and.callFake(function() {
        return deferred.promise;
      });
    });

    it("should resolve", function() {
      expect(SessionsFactory.create).not.toHaveBeenCalled();
      expect($localforage.set).not.toHaveBeenCalled();

      SessionsFactory.login(user)
      .then(function(res) {
        result = res;
      });
      deferred.resolve(res_login);
      $scope.$apply();

      expect(SessionsFactory.create).toHaveBeenCalledWith(user);
      expect($localforage.set).toHaveBeenCalledWith("Authorization", "12345");
      expect(result).toEqual(res_login);
    });
  });
});
