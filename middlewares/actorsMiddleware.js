const actorsServices = require('../services/ActorsServices');

const checkActorExistByParams = async (req, res, next) => {
    const {actorID} = req.params;
    const actor = await actorsServices.getActorById(actorID);
    if (!actor.exist) {
        res.status(404).send({
            status_code: 404,
            error: `Actor with id - ${actorID} does not exist`
        });
    } else next();
};

const checkActorExist = async (req, res, next) => {
    const {id} = req.body;
    const actor = await actorsServices.getActorById(id);
    if (!actor.exist) {
        res.status(404).send({
            status_code: 404,
            error: `Actor with id - ${actorID} does not exist`
        });
    } else next();
};

module.exports = {checkActorExist, checkActorExistByParams};