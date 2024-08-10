const axios = require('axios');

// Configure axios instance with default settings

let api_client;

const create_api_client = () => {
    if (!api_client) {
        api_client = axios.create({
            baseURL: 'http://localhost:3000',
            withCredentials: true,
        });
        console.log("New API Client");
        return api_client;
    }
    console.log("Old API Client");
    return api_client;
};

api_client = create_api_client();

module.exports = api_client;