const Rooms = require("../models/rooms.model");
const Bookings = require("../models/bookings.model");

const createRoom = async (req, res) => {
    try {
      const payload = req.body;
  
      const roomsCollection = await Rooms.find();
      payload.roomId = roomsCollection.length + 1;
  
      const newRoom = new Rooms(payload);
  
      try {
        const data = await newRoom.save();
        res.status(201).send({ message: "Room created successfully", roomDetails: data });
      } catch (err) {
        res.status(400).send({ message: "Error while creating the room", error: err });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal server error", error: error });
    }
};  

const bookRoom = async (req, res) => {
    try {
      const payload = req.body;
      payload.roomId = req.params.roomId;
  
      const existingRoom = await Rooms.findOne({ roomId: payload.roomId });
  
      if (existingRoom) {
        payload.startTime = new Date(payload.startTime);
        payload.endTime = new Date(payload.endTime);
  
        const isBooked = await Bookings.find({
          roomId: payload.roomId,
          startTime: {
            $eq: payload.startTime,
          },
          endTime: {
            $eq: payload.endTime,
          },
        });
  
        if (isBooked.length === 0) {
          payload.roomName = existingRoom.roomName;
          
          // Using promise-based save
          const newBooking = new Bookings(payload);
          const savedBooking = await newBooking.save();
  
          res.status(201).send({ message: "Room booked successfully", bookingDetails: savedBooking });
        } else {
          res.status(400).send({ message: "The room is already booked on this date & time" });
        }
      } else {
        res.status(400).send({ message: "No such room exists" });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal server error", error: error });
    }
};
  
const listRooms = async (req, res) => {
    try {
      const aggr = [
        {
          $lookup: {
            from: "bookings",
            localField: "roomId",
            foreignField: "roomId",
            as: "bookedStatus",
          },
        },
        {
          $project: {
            _id: 0,
            roomName: 1,
            seats: 1,
            amenities: 1,
            pricePerHour: 1,
            bookedStatus: {
              customerName: 1,
              startTime: 1,
              endTime: 1,
            },
          },
        },
      ];
  
      const roomList = await Rooms.aggregate(aggr).exec(); // Use .exec() to return a promise
      
      if (roomList) {
        if(roomList.length !== 0) {
          roomList.forEach((room) => {
            if(room.bookedStatus.length == 0) {
              room.bookedStatus = "No booking available";
            }
          });      
          return res.status(200).send({ roomList: roomList });
        } else {
          res.status(200).send({ message: "No room has been created yet" });
        }
      } else {
        res.status(400).send({ message: "Error while fetching room list" });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal server error", error: error });
    }
};
  

const listCustomers = async (req, res) => {
    try {
      const aggr = [
        {
          $group: {
            _id: "$customerName",
            bookingDetails: {
              $push: {
                roomName: "$roomName",
                startTime: "$startTime",
                endTime: "$endTime",
              },
            },
          },
        },
      ];
  
      const customerList = await Bookings.aggregate(aggr);
  
      if (customerList) {
        if (customerList.length !== 0) {
          customerList.forEach((customer) => {
            customer.customerName = customer._id;
            delete customer._id;
            customer.bookedData = customer.bookingDetails;
            delete customer.bookingDetails;
          });
  
          return res.status(200).send({ customerList });
        } else {
          res.status(200).send({ message: "No customer has booked any room" });
        }
      } else {
        res.status(400).send({ message: "Error while fetching customer list" });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal server error", error });
    }
}; 

module.exports = { createRoom, bookRoom, listRooms, listCustomers };