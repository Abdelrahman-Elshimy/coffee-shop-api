const { ObjectID, Timestamp } = require("bson");
const { time } = require("console");
const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/coffee-shop";
const bookSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  message: String,
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const Booking = mongoose.model("booking", bookSchema);

exports.BookModel = class BookingApi {
  // get all Bookings from database
  getAllBookings() {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(DB_URL)
        .then(() => {
          return Booking.find();
        })
        .then((bookings) => {
          mongoose.disconnect();
          resolve(bookings);
        })
        .catch((err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  }

  // add new Booking
  addNewBooking(booking) {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(DB_URL)
        .then(() => {
          const bookingA = new Booking(booking);
          return bookingA.save();
        })
        .then(() => {
          mongoose.disconnect();
          resolve();
        })
        .catch((err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  }
};
