const express = require("express");
const router = express.Router();
const Feedback = require("../controllers/feedback");
const ApiValidation = require("../apiValidations/apiValidation");

router.post("/", Feedback);

module.exports = router;
