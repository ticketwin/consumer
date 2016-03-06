describe("Users Service", function() {
  var UsersFactory, httpBackend, q, $localforage, $scope;
  var url = "http://api.tcktwn.dev:3000/users";
  var res_create = {
    users: {
      auth_token: "12345",
      created_at: "2016-02-15T11:20:08.375-06:00",
      email:      "user@ticketwin.com",
      updated_at: "2016-02-15T14:53:48.414-06:00",
      user_id:    1
    },
    status: 201
  };

  beforeEach(angular.mock.module("ticketWin"));

  beforeEach(inject(function(_Users_, $httpBackend, $q, _$localforage_, $rootScope) {
    UsersFactory = _Users_;
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
    expect(UsersFactory).toBeDefined();
    expect(UsersFactory.create).toBeDefined();
    expect(UsersFactory.login).toBeDefined();
  });

  describe("create", function() {
    var result;
    var usersResponse;

    beforeEach(function() {
      result = {};
      usersResponse = {};
      spyOn(UsersFactory, "create").and.callThrough();
    });

    it("should return a user and auth token with a valid account credentials ", function() {
      var account = { email: "user@ticketwin.com", password: "foobar", password_confirmation: "foobar" };

      httpBackend.whenPOST(url).respond(201, res_create);

      expect(UsersFactory.create).not.toHaveBeenCalled();
      expect(result).toEqual({});

      UsersFactory.create(account)
      .then(function(response) {
        result = response;
      });
      httpBackend.flush();

      expect(UsersFactory.create).toHaveBeenCalledWith(account);
      expect(result).toEqual(res_create);
    });

    it("should return an error with passwords that don't match", function () {
      var account = { email: "user@ticketwin.com", password: "foobar", password_confirmation: "foobar123" };
      usersResponse = {
        data: {
          errors: [
            "doesn't match Password",
            "doesn't match Password"
          ]
        },
        status: 422
      };

      httpBackend.whenPOST(url).respond(function() {
        return [422, usersResponse];
      });

      expect(UsersFactory.create).not.toHaveBeenCalled();
      expect(result).toEqual({});

      UsersFactory.create(account)
      .then(function(response) {
        result = response;
      })
      .catch(function(response) {
        result = response.data;
      });
      httpBackend.flush();

      expect(UsersFactory.create).toHaveBeenCalledWith(account);
      expect(result).toEqual(usersResponse);
      expect(result.status).toEqual(422);
    });
  });

  describe("login", function() {
    var account = { email: "user@ticketwin.com", password: "foobar", password_confirmation: "foobar" };
    var res_login = "TCKTWN1337";
    var deferred;
    var result;

    beforeEach(function() {
      deferred = q.defer();
      spyOn(UsersFactory, "login").and.callThrough();
      spyOn(UsersFactory, "create").and.callFake(function() {
        return q.when(res_create);
      });
      spyOn($localforage, "set").and.callFake(function() {
        return deferred.promise;
      });
    });

    it("should resolve", function() {
      expect(UsersFactory.create).not.toHaveBeenCalled();
      expect($localforage.set).not.toHaveBeenCalled();

      UsersFactory.login(account)
      .then(function(res) {
        result = res;
      });
      deferred.resolve(res_login);
      $scope.$apply();

      expect(UsersFactory.create).toHaveBeenCalledWith(account);
      expect($localforage.set).toHaveBeenCalledWith("Authorization", "12345");
      expect(result).toEqual(res_login);
    });
  });
});
