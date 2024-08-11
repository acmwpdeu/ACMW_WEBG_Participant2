const axios = require('axios');

// Render the crop health page
const render_crop_health_page = (req, res) => {
    res.render('crop_health', { health_result: null, previous_analyses: [] });
};

// Handle the crop health analysis and update the page with the result
const analyze_crop_health = async (req, res) => {
    const image_url = req.body.crop_image_url; // Correctly access the image URL
    console.log('Image URL:', image_url); // Debugging line

    try {
        // Call the API server for crop health analysis
        const api_response = await axios.post(`http://127.0.0.1:3000/api/crop-health/analyze`, {
            image_url: image_url
        });

        const health_result = api_response.data.analysis;

        // Render the page with the analysis result
        res.render('crop_health', {
            health_result,
            previous_analyses: [] // Add functionality to retrieve and display previous analyses
        });
    } catch (error) {
        console.error('Error analyzing crop health:', error);
        res.status(500).send('Failed to analyze crop health');
    }
};

module.exports = {
    render_crop_health_page,
    analyze_crop_health,
};
