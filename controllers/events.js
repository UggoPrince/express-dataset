const eventsServices = require('../services/EventsServices');
const actorsServices = require('../services/ActorsServices');
const reposServices = require('../services/ReposServices');

const getAllEvents = async (req, res) => {
	let {E, A, R} = await eventsServices.getEvents();
	for (let i = 0; i < E.length; i++) {
		const {id, type, created_at} = E[i];
		const actorObj = {id: A[i].id, login: A[i].login, avatar_url: A[i].avatar_url};
		const repoObj = {id: R[i].id, name: R[i].name, url: R[i].url};
		E[i] = {id, type, actor: actorObj, repo: repoObj, created_at};
	}
	res.status(200).json(E);
};

const addEvent = async (req, res) => {
	const {id, type, actor, repo, created_at} = req.body;
	const actorId = actor.id;
	const repoId = repo.id;
	const addActor = await actorsServices.insertActor(actor);
	const addRepo = await reposServices.insertRepo(repo);
	const event = await eventsServices.insertEvent({id, type, actorId, repoId, created_at});
	res.status(201).send({
		status: 201,
		body: event
	});
};


const getByActor = async (req, res) => {
	const {actorID} = req.params;
	let events = await eventsServices.getEventsByActorId(actorID);
	let newObj = {
		id: null,
		type: null,
		actor: {id: null, login: null, avatar_url: null},
		repo: {id: null, name: null, url: null},
		created_at: null
	};
	let eventArr = [];
	for (let i = 0; i < events.length; i++) {
		const {eventId, type, actorId, repoId, created_at, login, avatar_url, name, url} = events[i];
		newObj.id = eventId;
		newObj.type = type;
		newObj.actor.id = actorId;
		newObj.actor.login = login;
		newObj.actor.avatar_url = avatar_url;
		newObj.repo.id = repoId;
		newObj.repo.name = name;
		newObj.repo.url = url;
		newObj.created_at = created_at;
		eventArr.push(newObj);
	}
	res.status(200).send(eventArr);
};


const eraseEvents = async (req, res) => {
	const events = await eventsServices.deleteAllEvents();
	const actors = await actorsServices.deleteAllActors();
	await reposServices.deleteAllRepos();
	res.status(200).send({});
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};



