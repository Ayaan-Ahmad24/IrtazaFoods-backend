const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL or path to the image
        required: false
    },
    tags: [String] // Optional: Tags or categories for the blog post
}, { timestamps: true });

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
