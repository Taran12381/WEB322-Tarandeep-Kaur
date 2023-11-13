const userData = require("../data/fakeUsers.json");

class AuthenticationService {
  static authenticate(username, password) {
    const authenticatedUser = userData.find(
      (user) => user.email === username && user.password === password && user.isAdmin === true
    );

    return authenticatedUser || null;
  }
}

module.exports = AuthenticationService;
