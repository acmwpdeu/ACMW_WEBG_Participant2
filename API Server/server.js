const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importing routes
const user_routes = require('./routes/user.routes');
const weather_routes = require('./routes/weather.routes.js');
const crop_health_routes = require('./routes/crop_health.routes.js');
const community_forum_routes = require('./routes/community_forum.routes');
const resource_routes = require('./routes/resource.routes.js');
const notification_routes = require('./routes/notification.routes.js');
const pest_disease_routes = require('./routes/pest_disease.routes.js');

// Integrating routes
app.use('/api/users', user_routes);
app.use('/api/weather', weather_routes);
app.use('/api/crop-health', crop_health_routes);
app.use('/api/community-forum', community_forum_routes);
app.use('/api/resources', resource_routes);
app.use('/api/notifications', notification_routes);
app.use('/api/pest_disease_alerts', pest_disease_routes);

// // Error handling middleware
// app.use((err, _, res) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });

const port = process.env.API_SERVER_PORT || 3000;

app.listen(port, () => {
    console.log(`Web Server is live at 127.0.0.1:${port}`);
});
