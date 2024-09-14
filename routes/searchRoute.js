const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const menuController = require('../controllers/menuController');

// Search route
router.get('/search', async (req, res) => {
    const query = req.query.query;

    console.log(query)
    try {
        const blogs = await blogController.searchBlogs(query);
        const menuItems = await menuController.searchMenuItems(query);

        // Combine results
        const results = [...blogs, ...menuItems];
        res.json(results);
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ error: 'Internal server error' });
    } 
});

module.exports = router;
