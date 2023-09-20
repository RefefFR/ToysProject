// Express library with all the capabilities
const express = require("express");
// Performs internet address manipulations
const path = require("path");
// Library that can run a server
const http = require("http");

const { routesInit } = require("./routes/configRoutes");
// Connecting to MongoDB
require("./db/mongoConnect");

const app = express();

// To be able to receive JSON in POST, PUT, and DELETE requests
app.use(express.json());

// Defines that the "public" directory and all its files will be public
app.use(express.static(path.join(__dirname, "public")));

// Function responsible for defining all the routes in the server application
routesInit(app);

const server = http.createServer(app);
// Checking on which port to run the server, if in a real server it collects
// the port variable from its environment, otherwise it's 3001
const port = process.env.PORT || 3001;
server.listen(port);
