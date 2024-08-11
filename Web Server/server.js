const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const cookie_parser = require('cookie-parser');

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const user_routes = require('./routes/user.routes');
const auth_routes = require('./routes/auth.routes');
const dashboard_routes = require('./routes/dashboard.routes');

app.use(cookie_parser());

app.use('/', user_routes);
app.use('/auth', auth_routes);
app.use('/', dashboard_routes);

// // Error handling middleware
// app.use((err, _, res) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });

const port = process.env.WEB_SERVER_PORT || 8000;

app.listen(port, () => {
    console.log(`Web Server is live at http://127.0.0.1:${port}`);
});
