const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const upload = require('../middleware/uploadMiddleware'); // Middleware for handling file uploads

// Route for adding a menu item with image
router.post('/add', upload.single('image'), menuController.addMenuItemWithImageURL);

// Route for getting all menu items
router.get('/get', menuController.getMenuItems);

// Route for updating a menu item
router.put('/:id', menuController.updateMenuItem);

// Route for deleting a menu item
router.delete('/:id', menuController.deleteMenuItem);

// Route for searching menu items
router.get('/search', menuController.searchMenuItems);

// Route for getting a single menu item by ID
router.get('/get/:id', menuController.getSingleMenuItem);

module.exports = router;
