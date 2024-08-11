const axios = require('axios');
const crop_health_model = require('../models/crop_health.models.js');

const analyze_crop_health = async (req, res) => {
    const { image_url } = req.body;
    console.log(image_url);

    try {
        // Call Clarifai API for image recognition
        const response = await axios.post(
            'https://api.clarifai.com/v2/users/clarifai/apps/main/models/general-image-recognition/versions/aa7f35c01e0642fda5cf400f543e7c40/outputs',
            {
                inputs: [
                    {
                        data: {
                            image: {
                                url: image_url
                            }
                        }
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Key ${process.env.CLARIFAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Extract useful data from the response
        const concepts = response.data.outputs[0].data.concepts;

        // Filter and structure the response
        const relevant_info = concepts.map(concept => ({
            name: concept.name,
            value: concept.value
        }));

        // Send the structured data back to the client
        res.json({
            analysis: relevant_info
        });

    } catch (error) {
        console.error('Error analyzing crop health:', error);
        res.status(500).json({ error: 'Failed to analyze crop health' });
    }
};

module.exports = {
    analyze_crop_health,
};
