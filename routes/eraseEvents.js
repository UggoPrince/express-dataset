const express = require('express');
const {eraseEvents} = require('../controllers/events');
const router = express.Router();

router.delete('/', eraseEvents);

module.exports = router;
