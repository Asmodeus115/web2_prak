const helper = require('../helper.js');
const BenutzerDao = require('../dao/benutzerDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Benutzer');

serviceRouter.get('/benutzer/gib/:id', function (request, response) {
    console.log('Service Benutzer: Client requested one record, id=' + request.params.id);

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var obj = benutzerDao.loadById(request.params.id);
        console.log('Service Benutzer: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Benutzer: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});


serviceRouter.post('/benutzer/existiert', function (request, response) {
    console.log('Service Benutzer: Client requested check, if record exists, id=' + request.params.id);

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var obj = benutzerDao.exists(request.body.id, request.body.passwort);

        if (obj === true) {
            response.status(200).json(obj);
        } else {
            console.error('Service Buchung: Error creating new record. Exception occured: ' + ex.message);
            response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
        }
        console.log('Service Benutzer --> ' + obj);

    } catch (ex) {
        console.error('Service Buchung: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;