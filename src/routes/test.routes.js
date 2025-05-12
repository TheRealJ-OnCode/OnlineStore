const testController = require("../controllers/testRoutes.controller")

const testRoutes = require("express").Router()

testRoutes.get("/test",testController);

module.exports = testRoutes