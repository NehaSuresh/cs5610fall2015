"use strict";

module.exports = function (app, mongoose, db, passport, LocalStrategy) {
    var userModel = require('./models/user.model.server.js')(mongoose, db, passport, LocalStrategy);
    var foodTruckModel = require('./models/foodTruck.model.server.js')(mongoose, db);

    require('./services/user.service.server.js')(app, userModel, passport, LocalStrategy);
    require('./services/foodTruck.service.server.js')(app, foodTruckModel);
};