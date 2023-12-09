const userData = {
  username : "admin",
  password : "password",
}

class AuthenticationService {
  static authenticate(username, password) {
    const authenticatedUser = (
      userData.username === username && userData.password === password 
    );

    return authenticatedUser || null;
  }
}

module.exports = AuthenticationService;
