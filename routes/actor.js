const express = require('express');
const {getAllActors, getStreak, updateActor} = require('../controllers/actors');
const {checkActorExist} = require('../middlewares/actorsMiddleware');
const router = express.Router();

router.get('/', getAllActors);
router.get('/streak', getStreak);
router.put('/', checkActorExist, updateActor);

module.exports = router;
