const express = require("express");
const { createRoom, bookRoom, listRooms, listCustomers } = require("../controllers/room.controller");

const router = express.Router();

router.post("/create-room", createRoom);

router.post("/book-room/:roomId", bookRoom);

router.get("/list-rooms", listRooms);

router.get("/list-customers", listCustomers);

module.exports = router;