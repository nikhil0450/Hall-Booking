const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  roomId: {
    type: Number,
    required: true,
    ref: "Rooms",
  },
  roomName: {
    type: String,
    required: true,
    ref: "Rooms",
  },
});

module.exports = mongoose.model("Bookings", BookingSchema);