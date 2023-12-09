
const helper = require('../helper.js');
const fileHelper = require('../fileHelper.js');
const path = require('path');
const BuchungDao = require('../dao/buchungDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Buchung');

serviceRouter.get('/buchung/gib/:id', function(request, response) {
    console.log('Service Buchung: Client requested one record, id=' + request.params.id);

    const buchungDao = new BuchungDao(request.app.locals.dbConnection);
    try {
        var obj = buchungDao.loadById(request.params.id);
        console.log('Service Buchung: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Buchung: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});


// Service Klasse für den Button Meine Buchungen
serviceRouter.post('/buchung/ladeMeineBuchungen', function(request, response) {
    console.log('Service Buchung: Client requested all records');
    console.log(request.body.BenutzerID);

    const buchungDao = new BuchungDao(request.app.locals.dbConnection);
    try {
        var arr = buchungDao.loadById(request.body.BenutzerID);
        console.log('Service Buchung: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Buchung: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

// Service Klasse für das farbige Zeigen das Termine im Kalender
serviceRouter.get('/buchung/alleladen', function(request, response) {
    console.log('Service Buchung: Client requested all records');

    const buchungDao = new BuchungDao(request.app.locals.dbConnection);
    try {
        var arr = buchungDao.loadAllBuchungen();
        console.log('Service Buchung: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Buchung: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});




serviceRouter.get('/buchung/existiert/:id', function(request, response) {
    console.log('Service Buchung: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const buchungDao = new BuchungDao(request.app.locals.dbConnection);
    try {
        var exists = buchungDao.exists(request.params.id);
        console.log('Service Buchung: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Buchung: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});


serviceRouter.post('/buchung/erstellen', function(request, response) {
    console.log('Service Buchung: Einen neuen Termin in der Datenbank erstellen');
    
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
        console.log('Service Buchung: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const buchungDao = new BuchungDao(request.app.locals.dbConnection);
    try {
        var obj = buchungDao.create(request.body.RaumID, request.body.BenutzerID, request.body.Startzeit, request.body.Endzeit, request.body.BuchungCode);
        console.log('Service Buchung: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Buchung: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/buchung', function(request, response) {
    console.log('Service Buchung: Client requested update of existing record');

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
        console.log('Service Buchung: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const buchungDao = new BuchungDao(request.app.locals.dbConnection);
    try {
        var obj = buchungDao.update(request.body.RaumID, request.body.BenutzerID, request.body.Startzeit, request.body.Endzeit, request.body.BuchungCode);
        console.log('Service Buchung: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Buchung: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/buchung/:id', function(request, response) {
    console.log('Service Buchung: Client requested deletion of record, id=' + request.params.id);

    const buchungDao = new BuchungDao(request.app.locals.dbConnection);
    try {
        var obj = buchungDao.loadById(request.params.id);
        buchungDao.delete(request.params.id);
        console.log('Service Buchung: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Buchung: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});


module.exports = serviceRouter;