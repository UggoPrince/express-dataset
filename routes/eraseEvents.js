const express = require('express');
const {eraseEvents} = require('../controllers/events');
const router = express.Router();

router.delete('/events', eraseEvents);

module.exports = router;
