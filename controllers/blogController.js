const Blog = require('../models/blogModel');

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const addBlog = async (req, res) => {
    const { title, content, author, image, tags } = req.body;
    try {
        // Only include image if it is provided
        const newBlog = new Blog({
            title,
            content,
            author,
            image: image || null, // If no image is provided, set it to null
            tags
        });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, author, image, tags } = req.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, {
            title,
            content,
            author,
            image: image || null, // If no image is provided, set it to null
            tags
        }, { new: true });
        if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        await Blog.findByIdAndDelete(id);
        res.json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const searchBlogs = async (query) => {
    console.log(query)
    try {
        const blogs = await Blog.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        });
        console.log(blogs)
        return blogs;
    } catch (error) {
        throw error;
    }
};


module.exports = { getBlogs, addBlog, updateBlog, deleteBlog, getBlogById, searchBlogs };

