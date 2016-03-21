"use strict";

var users = require("./user.mock.json");

module.exports = function(app) {
	var api = {
			FindAllUsers : FindAllUsers,
			FindByUserId : FindUserById,
			AddNewUser : AddNewUser,
			UpdateUser : UpdateUser,
			DeleteUser : DeleteUser,
			FindUserByUsername: FindUserByUsername,
			FindUserByCredential: FindUserByCredential
	};
	
	return api;
	
	function FindAllUsers() {
		return users;
	}
	
	function FindUserById(id) {
		for (var i = 0; i < users.length; i++) {
			if (users[i].id == id) {
				return users[i];
			}
		}
		return null;
	}
	
	function AddNewUser(user) {
		user.id = guid();
		user.push(user);
		return users;
	}
	
	function UpdateUser(id, newUser) {
		for (var i = 0; i < users.lenght; i++) {
			if (users[i].id == id) {
				newUser.id = id;
				users[i] = newUser;
				break;
			}
		}
		return users;
	}
	
	function DeleteUser(id) {
		for (var i = 0; i < users.length; i++) {
			if (users[i].id == id) {
				users.splice(i, 1);
				break;
			}
		}
		return users;
	}
	
	function FindUserByUsername(username) {
		for (var i = 0; i < users.length; i++) {
			if (users[i].username == username) {
				return user[i];
			}
		}
		return null;
	}
	
	function FindUserByCredential(credentials) {
		for (var i = 0; i < users.length; i++) {
			if (users[i].username == credentials.username &&
				users[i].password == credentials.password) {
				return users[i];
			}
		}
		return null;
	}
	
	function guid() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
};
