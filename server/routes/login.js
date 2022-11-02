const express = require("express");
const router = express.Router();

const LoginController = require("../controllers/login");
const APIValidation = require("../apiValidations/apiValidation");

router.post("/", APIValidation.LoginAPIValidation, LoginController);

module.exports = router;
