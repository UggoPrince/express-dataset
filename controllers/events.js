const eventsServices = require('../services/EventsServices');
const actorsServices = require('../services/ActorsServices');
const reposServices = require('../services/ReposServices');

const getAllEvents = async (req, res) => {
	let events = await eventsServices.getEvents();
	for (let i = 0; i < events.length; i++) {
		const {eventId, type, actorId, repoId, created_at, login, avatar_url, name, url} = events[i];
		const actorObj = {id: actorId, login, avatar_url:avatar_url};
		const repoObj = {id: repoId, name: name, url: url};
		events[i] = {id: eventId, type, actor: actorObj, repo: repoObj, created_at: created_at};
	}
	res.status(200).send(events);
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


var eraseEvents = (req, res) => {
	const events = eventsServices.deleteAllEvents();
	res.status(200).send(eventArr);
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};



