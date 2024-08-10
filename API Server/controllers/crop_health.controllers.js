const axios = require('axios');
const crop_health_model = require('../models/crop_health.models.js');
const { validationResult } = require('express-validator');

analyze_crop_health = async (req, res) => {
    const { crop_id, image_url } = req.body;

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

        // Example of filtering and structuring the response
        const relevant_info = concepts.map(concept => ({
            name: concept.name,
            value: concept.value
        }));

        // Send the structured data back to the client
        res.json({
            crop_id,
            analysis: relevant_info
        });

    } catch (error) {
        console.error('Error analyzing crop health:', error);
        res.status(500).json({ error: 'Failed to analyze crop health' });
    }
};

// analyze_crop_health = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { crop_id, image_url } = req.body;

//     if (!image_url) {
//         return res.status(400).json({ error: 'Image URL is required' });
//     }

//     try {
//         // Send the image URL to Clarifai for analysis using Axios
//         const clarifai_response = await axios.post(
//             'https://api.clarifai.com/v2/users/clarifai/apps/main/models/general-image-recognition/versions/aa7f35c01e0642fda5cf400f543e7c40/outputs',
//             {
//                 inputs: [
//                     {
//                         data: {
//                             image: {
//                                 url: image_url
//                             }
//                         }
//                     }
//                 ]
//             },
//             {
//                 headers: {
//                     'Authorization': `Key ${process.env.CLARIFAI_API_KEY}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );

//         // Extract concepts and their confidence values from the response
//         const concepts = clarifai_response.data.outputs[0].data.concepts.map(concept => ({
//             name: concept.name,
//             confidence: concept.value
//         }));

//         // Process the concepts to detect potential issues
//         const pest_detected = concepts.some(concept => concept.name.includes('pest'));
//         const disease_detected = concepts.some(concept => concept.name.includes('disease'));
//         const recommendations = `Detected issues: ${concepts.map(c => c.name).join(', ')}`;

//         // Save the analysis result in the database
//         const crop_health = new crop_health_model({
//             user_id: req.user._id,
//             crop_id,
//             image_url,
//             analysis_result: {
//                 pest_detected,
//                 disease_detected,
//                 concepts,
//                 recommendations
//             }
//         });

//         await crop_health.save();

//         res.status(201).json({ message: 'Crop health analysis successful', crop_health });
//     } catch (error) {
//         res.status(500).json({ error: 'Image analysis failed', details: error.message });
//     }
// };

modules.exports = {
    analyze_crop_health,
};
