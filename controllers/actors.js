const actorsServices = require('../services/ActorsServices');

var getAllActors = (req, res) => {
	const actors = actorsServices.getActorsByTotalEvents();
	res.status(200).send(actors);
};

var updateActor = (req, res) => {
	const {id, avatar_url} = req.body;
	const update = actorsServices.updateActor({id, avatar_url});
	res.status(200).send({});
};

var getStreak = (req, res) => {
	const actors = actorsServices.getActorsByStreak();
	res.status(200).send(actors);
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};
