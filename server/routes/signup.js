const express = require("express");
const router = express.Router();

const CareateUser = require("../controllers/signupController");
const APIValidation = require("../apiValidations/apiValidation");

router.post("/", APIValidation.SinupAPIValidation, CareateUser);

module.exports = router;
