const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

routes.post('/sessions', sessionController.create);

routes.get('/ongs', ongController.index);
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required(),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}) , ongController.create);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), profileController.index);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), incidentController.index);

routes.post('/incidents', incidentController.create);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}),incidentController.delete);

module.exports = routes;