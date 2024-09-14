const Menu = require('../models/menuModel');
const cloudinary = require('../configs/cloudinaryConfig'); // Import your Cloudinary config
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temporary file storage

// Handler for adding a menu item with image URL from Cloudinary
const addMenuItemWithImageURL = async (req, res) => {
    const { name, quantity, price, image } = req.body;
    try {
        // Check for duplicates by name (or any other unique field)
        const existingItem = await Menu.findOne({ name });
        if (existingItem) {
            return res.status(400).json({ message: 'Menu item already exists' });
        }

        // Create new menu item
        const newItem = new Menu({
            name,
            quantity,
            price,
            image
        });
        await newItem.save();

        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Handler for fetching all menu items
const getMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Handler for updating a menu item
const updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { name, quantity, price, image } = req.body;
    try {
        const updatedItem = await Menu.findByIdAndUpdate(id, { name, quantity, price, image }, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Menu item not found' });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Handler for deleting a menu item
const deleteMenuItem = async (req, res) => {
    const { id } = req.params;
    try {
        await Menu.findByIdAndDelete(id);
        res.json({ message: 'Menu item deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const searchMenuItems = async (query) => {
    console.log(query)
    try {
        const menuItems = await Menu.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        console.log(menuItems)
        return menuItems;
    } catch (error) {
        throw error;
    }
};

const getSingleMenuItem = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ message: 'Menu item ID is required' });
        }
        const menuItem = await Menu.findById(id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(menuItem);
    } catch (error) {
        console.error('Error fetching menu item:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};




module.exports = { getMenuItems, addMenuItemWithImageURL, updateMenuItem, deleteMenuItem, searchMenuItems, getSingleMenuItem };
