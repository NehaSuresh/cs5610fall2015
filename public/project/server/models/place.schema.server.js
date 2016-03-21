"use strict";

module.exports = function (mongoose) {
    var PlaceSchema = new mongoose.Schema({
        street_number: String,
        route: String,
        administrative_area_level_1: String,
        locality: String,
        postal_code: String,
        country: String,
        displayAddress: String,
        formatted_address: String,
        lat: String,
        lng: String
    });

    return PlaceSchema;
};