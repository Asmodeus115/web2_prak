const helper = require('../helper.js');
const BenutzerDao = require('../dao/benutzerDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Benutzer');

serviceRouter.get('/benutzer/gib/:id', function(request, response) {
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


serviceRouter.post('/benutzer/existiert', function(request, response) {
    console.log('Service Benutzer: Client requested check, if record exists, id=' + request.params.id);

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var exists = benutzerDao.exists(request.params.id);
        console.log('Service Benutzer: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        //response.status(200).json({ 'id': request.params.id, 'existiert': exists });

        if (exists) {
            response.status(200).json({ 'id': request.params.id, 'existiert': exists });
            console.log("Benutzer exists");
        } else {
            console.log("Benutzer nicht existiert");
            //response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
        }
        
    } catch (ex) {
        console.error('Service Benutzer: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});


serviceRouter.get('/benutzer/zugang', function(request, response) {
    console.log('Service Benutzer: Client requested check, if user has access');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.benutzername)) 
        errorMsgs.push('benutzername fehlt');
    if (helper.isUndefined(request.body.passwort)) 
        errorMsgs.push('passwort fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Benutzer: check not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
    try {
        var hasaccess = benutzerDao.hasaccess(request.body.benutzername, request.body.passwort);
        console.log('Service Benutzer: Check if user has access, hasaccess=' + hasaccess);
        response.status(200).json(hasaccess);
    } catch (ex) {
        console.error('Service Benutzer: Error checking if user has access. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});



module.exports = serviceRouter;