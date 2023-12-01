
const helper = require('../helper.js');
const fileHelper = require('../fileHelper.js');
const path = require('path');
const EtageDao = require('../dao/etageDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Etage');

serviceRouter.get('/etage/gib/:id', function(request, response) {
    console.log('Service Etage: Client requested one record, id=' + request.params.id);

    const etage = new EtageDao(request.app.locals.dbConnection);
    try {
        var obj = etage.loadById(request.params.id);
        console.log('Service Etage: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Etage: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});


serviceRouter.get('/etage/ladenGeb', function(request, response) {
    console.log('Service Etage: Client requested all records');

    const etage = new EtageDao(request.app.locals.dbConnection);
    try {
        var arr = etage.loadAllGeb();
        console.log('Service Etage: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Etage: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});



serviceRouter.post('/etage/laden', function(request, response) {
    console.log('Service Etage: Client requested all records');
    console.log(request.body.id);

    const etage = new EtageDao(request.app.locals.dbConnection);
    try {
        var arr = etage.loadById(request.body.id);
        console.log('Service Etage: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Etage: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});





serviceRouter.get('/etage/existiert/:id', function(request, response) {
    console.log('Service Etage: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const etage = new EtageDao(request.app.locals.dbConnection);
    try {
        var exists = etage.exists(request.params.id);
        console.log('Service Etage: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Etage: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});


serviceRouter.post('/etage/erstellen', function(request, response) {
    console.log('Service Etage: Einen neuen Termin in der Datenbank erstellen');
    
    var errorMsgs=[];
    if (helper.isUndefined(request.body.RaumID)) 
        errorMsgs.push('RaumID fehlt');
    if (helper.isUndefined(request.body.BenutzerID)) 
        errorMsgs.push('BenutzerID fehlt');
    if (helper.isUndefined(request.body.Startzeit)) 
        errorMsgs.push('Startzeit fehlt');
    if (helper.isUndefined(request.body.Endzeit)) 
        errorMsgs.push('Endzeit fehlt');


    if (errorMsgs.length > 0) {
        console.log('Service Etage: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const etage = new EtageDao(request.app.locals.dbConnection);
    try {
        var obj = etage.create(request.body.RaumID, request.body.BenutzerID, request.body.Startzeit, request.body.Endzeit, request.body.EtageCode);
        console.log('Service Etage: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Etage: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/etage', function(request, response) {
    console.log('Service Etage: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.RaumID)) 
        errorMsgs.push('RaumID fehlt');
    if (helper.isUndefined(request.body.BenutzerID)) 
        errorMsgs.push('BenutzerID fehlt');
    if (helper.isUndefined(request.body.Startzeit)) 
        errorMsgs.push('Startzeit fehlt');
    if (helper.isUndefined(request.body.Endzeit)) 
        errorMsgs.push('Endzeit fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Etage: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const etage = new EtageDao(request.app.locals.dbConnection);
    try {
        var obj = etage.update(request.body.RaumID, request.body.BenutzerID, request.body.Startzeit, request.body.Endzeit, request.body.EtageCode);
        console.log('Service Etage: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Etage: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/etage/:id', function(request, response) {
    console.log('Service Etage: Client requested deletion of record, id=' + request.params.id);

    const etage = new EtageDao(request.app.locals.dbConnection);
    try {
        var obj = etage.loadById(request.params.id);
        etage.delete(request.params.id);
        console.log('Service Etage: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Etage: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});


module.exports = serviceRouter;