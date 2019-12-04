const eventsServices = require('../services/EventsServices');

const checkEventExist = async (req, res, next) => {
    const {id} = req.body;

    const event = await eventsServices.getEventbyId(id);

    if (event) {
        res.status(400).send({
            status_code: 400,
            error: `Event with id - ${id} already exist`
        });
    } else next();
};

module.exports = checkEventExist;
