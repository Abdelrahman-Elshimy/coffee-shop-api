const bookModel = require("../models/booking.model");

exports.getBookings = (req, res, next) => {
  let book = new bookModel.BookModel();
  book
    .getAllBookings()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Connection failure" });
    });
};
exports.addBooking = (req, res, next) => {
  console.log(req.body);
  let booking = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    message: req.body.message,
    date: req.body.data,
    time: req.body.time,
    phone: req.body.phone,
  };
  let book = new bookModel.BookModel();
  book
    .addNewBooking(booking)
    .then(() => {
      res.status(200).json({ message: "Booking Add Successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Booking Insertion Error", error: err });
    });
};
