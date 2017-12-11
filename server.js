const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 4200;
const app = express();

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`); 
});