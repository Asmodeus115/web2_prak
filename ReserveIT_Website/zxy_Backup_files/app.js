console.log('SErver startet');
const express = require('express');
const app = express();
//app.use(express.static('public'));
app.use(express.static('html'));

