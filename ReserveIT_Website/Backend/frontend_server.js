const express = require('express');
const app = express();
const path = require("path");

app.use(express.static('Frontend'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});

let html = path.join(__dirname, 'Frontend', 'html', 'index.html');
app.get('/', (req, res) => {
    console.log('HTML ' + html);
    res.sendFile(html)
});

