const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.API_SERVER_PORT || 3000;

app.listen(port, () => {
    console.log(`Web Server is live at 127.0.0.1:${port}`);
});