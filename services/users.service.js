const users = require("../data/fakeUsers.json"); 

class UserService{
    static findAll(){
        return users;
    }

    static findById(id){
        const user = users.find((user) => {
            return user.id === parseInt(id);
        });
        return user;
    }
    
    static add(user) {
        user.id = users.length + 1;
        users.push(user);
        return user;
    }
  

}

module.exports = UserService;
