# RentEase Server

This is the backend server for the RentEase Cloud-Based House Rental System. It is built with Node.js, Express, and MongoDB (Mongoose).

## Project Structure

```
server/
│
├── app.js
├── controllers/
│   └── owner.controller.js
├── db/
│   └── db.config.js
├── models/
│   ├── owner.model.js
│   ├── room.model.js
│   └── tenant.model.js
├── routes/
│   └── owner.routes.js
├── services/
│   └── owner.services.js
└── trash/
    └── roomfakeData.js
```

## Code Flow

1. **Server Initialization**:  
   The server is started from [app.js](app.js). It loads environment variables, sets up middleware, connects to MongoDB, and registers routes.

2. **Database Connection**:  
   The connection to MongoDB is handled in [`db/db.config.js`](db/db.config.js) using Mongoose.

3. **Routing**:  
   Owner-related routes are defined in [`routes/owner.routes.js`](routes/owner.routes.js) and handled by [`controllers/owner.controller.js`](controllers/owner.controller.js).

4. **Request Validation**:  
   Incoming requests to `/owner/signup` are validated using `express-validator`.

5. **Controller & Service Layer**:  
   The controller receives validated requests and calls the service layer ([`services/owner.services.js`](services/owner.services.js)) to interact with the database.

## API Endpoints

### Owner

#### Register Owner

- **Endpoint:** `POST /owner/signup`
- **Description:** Registers a new owner.
- **Request Body:**
    ```json
    {
      "username": "john_doe",
      "email": "john@example.com",
      "password": "securepassword",
      "phone": "9876543210"
    }
    ```
- **Success Response:**
    - **Status:** 201 Created
    - **Body:**
      ```json
      {
        "message": "Owner registered successfully",
        "owner": {
          "_id": "ObjectId",
          "username": "john_doe",
          "email": "john@example.com",
          "phone": 9876543210,
          "role": "owner",
          "rooms": [],
          "tenants": []
        }
      }
      ```
- **Validation Error Response:**
    - **Status:** 422 Unprocessable Entity
    - **Body:**
      ```json
      {
        "message": "Invalid signup details",
        "errors": [
          {
            "msg": "Username is required",
            "param": "username",
            "location": "body"
          }
        ]
      }
      ```
- **Server Error Response:**
    - **Status:** 500 Internal Server Error
    - **Body:**
      ```json
      {
        "message": "Server error",
        "error": "Error message"
      }
      ```

#### Health Check

- **Endpoint:** `GET /check`
- **Description:** Simple endpoint to check if the server is running.
- **Response:**
    - **Status:** 200 OK
    - **Body:**  
      ```
      i am listeing
      ```

## How to Run

1. Install dependencies:
    ```sh
    npm install
    ```
2. Set up your `.env` file (see `.gitignore` for sensitive files).
3. Start the server:
    ```sh
    node app.js
    ```
4. The server will listen on the port specified in your `.env` file.

## Notes

- All owner-related endpoints are prefixed with `/owner`.
- Data validation is enforced for signup.
- MongoDB must be running locally or update the connection string in [`db/db.config.js`](db/db.config.js).

## Future Improvements

- Add tenant and room routes.
- Implement authentication and authorization.
- Add more robust error handling and logging.

---

For more details, see the code in the respective files:
- [app.js](app.js)
- [controllers/owner.controller.js](controllers/owner.controller.js)
- [routes/owner.routes.js](routes/owner.routes.js)
- [services/owner.services.js](services/owner.services.js)