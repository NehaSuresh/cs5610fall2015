"use strict";

module.exports = function (mongoose, db) {
    var q = require('q');
    var UserSchema = require('./user.schema.server.js')(mongoose);
    var FoodTruckUserModel = db.model('FoodTruckUserModel', UserSchema);

    var api = {
        Create: createUser,
        Update: updateUser,
        Delete: deleteUser,
        FindAllUsers: findAllUsers,
        FindUserById: findUserById,
        FindByUserName: findUserByName,
        FindByAuth: findUserByAuth,
        Favorite: favorites
    };

    return api;

    function createUser(user) {
        var deferred = q.defer();

        FoodTruckUserModel.create(user, function (err, newUser) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(newUser);
            }
        });
        return deferred.promise;
    }

    function updateUser(id, user) {
        var deferred = q.defer();

        FoodTruckUserModel.findById(id, function (err, updateUser) {
            updateUser.firstname = user.firstname;
            updateUser.lastname = user.lastname;
            updateUser.username = user.username;
            updateUser.password = user.password;
            updateUser.email = user.email;
            updateUser.favorite = user.favorite;

            updateUser.save(function (err, updatedUser) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(updatedUser);
                }
            });
        });
        return deferred.promise;
    }

    function deleteUser(id) {
        var deferred = q.defer();

        FoodTruckUserModel.remove({_id: id}, function (err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        FoodTruckUserModel.find(function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findUserById(id) {
        var deferred = q.defer();

        FoodTruckUserModel.findById(id, function (err, user) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByName(username) {
        var deferred = q.defer();

        FoodTruckUserModel.findOne({username: username}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByAuth(username, password) {
        var deferred = q.defer();

        FoodTruckUserModel.findOne({username: username, password: password}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function favorites(userid, listingid) {
        var deferred = q.defer();

        FoodTruckUserModel.findById(userid, function(err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log(user);
                var favorite = user.favorite;

                favorite.push(foodTruckId);

                user.favorite = favorite;

                user.save(function (err, updatedUser) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedUser);
                    }
                });
            }
        });

        return deferred.promise;
    }
};