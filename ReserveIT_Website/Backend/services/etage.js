
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

module.exports = serviceRouter;
