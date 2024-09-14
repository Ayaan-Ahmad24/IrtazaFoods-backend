const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/get-blog', blogController.getBlogs);
router.post('/add-blog', blogController.addBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);
router.get('/get/:id', blogController.getBlogById);
router.get('/search', blogController.searchBlogs);

module.exports = router;
 