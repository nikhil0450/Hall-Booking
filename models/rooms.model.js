const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomName: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  roomId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Rooms", roomSchema);