const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Importing routes
const user_routes = require('./routes/user.routes'); 

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// integrating routes
app.use('/api/auth', user_routes);

const port = process.env.API_SERVER_PORT || 3000;

app.listen(port, () => {
    console.log(`Web Server is live at 127.0.0.1:${port}`);
});