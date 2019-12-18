const actorsServices = require('../services/ActorsServices');

var getAllActors = async (req, res) => {
	const actors = await actorsServices.getActorsByTotalEvents();
	for (let i = 0; i < actors.length; i++) {
		delete actors[i].cnt;
	}
	res.status(200).send(actors);
};

var updateActor = async (req, res) => {
	const {id, avatar_url} = req.body;
	const update = await actorsServices.updateActor({id, avatar_url});
	res.status(200).send({});
};

var getStreak = async (req, res) => {
	const actors = await actorsServices.getActorsByStreak();
	let actorArr = [];
	for (let i = 0; i < actors.length; i++) {
		actorArr.push(actors[i]);
		delete actorArr[i].cnt;
	}
	res.status(200).send(actorArr);
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};
