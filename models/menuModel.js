const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String, // URL or path to the image
        required: true
    }
}, { timestamps: true });

const Menu = mongoose.model("Menu", MenuSchema);
module.exports = Menu;
