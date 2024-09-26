const express = require("express");
const configureMiddleware = require("../config/middleware");
const routers = require("../config/routers");
const server = express();
configureMiddleware(server);
routers.cohortRouters(server);
routers.studentRouters(server);
module.exports = server;
