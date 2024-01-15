const helper = require('../Backend/helper.js');
const fileHelper = require('../Backend/fileHelper.js');
const path = require('path');
const GalerieDao = require('../dao/b_calendarDoa.js');
const express = require('express');
var serviceRouter = express.Router();
const helper = require('../Backend/helper.js');
const fileHelper = require('../Backend/fileHelper.js');
const path = require('path');
const calendarDoa = require('../dao/b_calendarDoa.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Calendar');

serviceRouter.post('/buchung/aufladen', async(request, response) => {
    console.log('Service Buchung: upload einer Buchung');
    const calendarDoa = new calendarDoa(request.app.locals.dbConnection);

    try {
        // if no files received, send error
        if (!fileHelper.hasUploadedFiles(request)) {
            console.log('no files transmitted, nothing to do');
            response.status(400).json({'fehler': true, 'nachricht': 'Keine Dateien aufgeladen'});
        } else {

            console.log('count of uploaded files ' + fileHelper.cntUploadedFiles(request));

            // get all file objects
            var files = fileHelper.getAllUplodedFilesAsArray(request, true);

            var savedFiles = [];

            // now walk array and save files in db and on hdd, only if web picture AND if not already in folder
            files.forEach(function(item) {
                console.log('processing file: ' + item.name);

                // get target path
                const targetPath = path.resolve(process.cwd(), 'public', 'galerie', item.name);
                console.log('target Path: ' + targetPath);

                if (item.isWebPicture && !fileHelper.existsFile(targetPath)) {
                    console.log('item is webPicture and not present');                    

                    // create target obj
                    var fileObj = {
                        status: true,
                        fileSaved: false,
                        fileName: item.name,
                        fileSize: item.size,
                        fileMimeType: item.mimetype,
                        fileEncoding: item.encoding,
                        fileHandle: item.handleName,
                        fileNameOnly: item.nameOnly,
                        fileExtension: item.extension,
                        fileIsPicture: item.isPicture, 
                        fileIsWebPicture: item.isWebPicture
                    };
                    
                    // now try to save file info in db
                    try {
                        var savedObj = galerieDao.create(fileObj.fileName, fileObj.fileSize, fileObj.fileMimeType, 'galerie/' + fileObj.fileName, helper.getNow());
                        console.log('Service Galerie: Record inserted in db, id=' + savedObj.id);
                        // transfer file to target folder with target name
                        item.mv(targetPath);
                        // remember status
                        fileObj.fileSaved = true;
                        // set to array
                        savedFiles.push(fileObj);
                    } catch (ex) {
                        console.error('Service Galerie: Error creating record. Exception occured: ' + ex.message);
                    }
                } else {
                    console.log('item is no webPicture or already present, skipping it');
                }
            });

            // send response 
            response.status(200).json(savedFiles);
        }

    } catch (err) {        
        response.status(400).json({'fehler': true, 'nachricht': 'Fehler im Service'});
    }
    
});

module.exports = serviceRouter;