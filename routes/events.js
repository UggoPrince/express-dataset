const express = require('express');
const {getAllEvents, addEvent, getByActor} = require('../controllers/events');
const checkEventExist = require('../middlewares/eventsMiddleware');
const {checkActorExistByParams} = require('../middlewares/actorsMiddleware');
const router = express.Router();

router.get('/', getAllEvents);
router.get('/actors/:actorID', checkActorExistByParams, getByActor);
router.post('/', checkEventExist, addEvent);

module.exports = router;
