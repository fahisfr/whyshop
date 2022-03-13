const express  = require('express')
const router   = express.Router()
const Feedback = require('../Controllers/Feedback')
const ApiValidation = require('../APIValidations/APIValidation')

router.post('/',Feedback)

module.exports = router