const bookingController = require("../controllers/booking.controller");
const bodyParser = require("body-parser");
const router = require("express").Router();

// get all bookings
router.get("/", bookingController.getBookings);

// add new booking
router.post("", bodyParser.json(), bookingController.addBooking);
module.exports = router;
