"use strict";
(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope) {

        var users = [];

        var testUser = {
						userName: "userName",
						password: "password",
						userId: guid(),
						firstName: "firstName",
						lastName: "lastName",
						email: "email"
				};

        console.log ("Adding test user");
        users.push(testUser);
        $rootScope.user = testUser;

		 var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        
        return service;

        function findUserByUsernameAndPassword(username, password, callback)
				{	
					console.log(username);
					for(var i = 0; i<users.length; i++) {
						if(users[i].password == password && users[i].username == username) {
							return callback(users[i]);
						}
					}
					return callback(null);
				}
				

        function findAllUsers(callback)
				{
					return callback(users);
				}

        function createUser(user, callback)
				{
					var id = guid();
					user.userId = id;
					users.push(user);
					return callback(user);
				}

        function deleteUserById(userId, callback)
				{
					for(var i=0; i<users.length; i++) {
						if(users[i].userId == userId) {
							users.splice(i, 1);
						}
					}
					return callback(users);
				}

        function updateUser(userId, newUser, callback)
				{
					for(var i=0; i<users.length; i++) {
						if(users[i].userId == userId) {
							users[i] = newUser;
							return callback(users[i]);
						}
					}
				}
    }

    function guid() {
	            return Math.floor((1 + Math.random()) * 0x10000)
	              .toString(16)
	              .substring(1);
	        }

})();