const express = require('express');
const router = express.Router();
const {FlightController} = require('../../controllers');
const {FlightMiddlewares} = require('../../middlewares');


// /api/v1/flights
router
    .post('/',
    FlightMiddlewares.validateCreateRequest,  //calling middleware
    FlightController.createFlight);

    router
    .get('/',
    FlightController.getAllFlights);




module.exports = router;