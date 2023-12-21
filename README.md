## Hall Booking API

1. Create Room (POST) : https://hall-booking-api-czxl.onrender.com/api/create-room
    (request body) : {
        "roomName" : "room_name",
        "seats" : (Number),
        "amenities" : "Array of Strings",
        "pricePerHour" : "Rupees" (Number),
        "roomId" : (Number)
    }


2. Book room (POST) : https://hall-booking-api-czxl.onrender.com/api/book-room/:roomId
    (request params) : "room_Id"
    (request body) : {
        "customerName" : "customer_name",
        "startTime" : (Type Date) eg. "2023-01-01T08:00:00.000Z",
        "endTime" : (Type Date) eg. ""2023-01-02T12:00:00.000Z",
        "roomId" : "room_Id",
        "roomName" : "room_name"        
    }


3. Get the list of the rooms (GET) : https://hall-booking-api-czxl.onrender.com/api/list-rooms


4. Get the list of the customers (GET) : https://hall-booking-api-czxl.onrender.com/api/list-customers
    
