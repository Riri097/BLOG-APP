const { Blog } = require('../models/blogModel'); 
const mongoose = require('mongoose');

// Create a new blog
async function createBLog(req, res){
    try{
        console.log("1. Body:", req.body);
        console.log("2. File:", req.file); 
        
        const { title, content, isPublic } = req.body;
         if (!title || !content) {
            return res.status(400).json({
                message : "Title and Content are required"
            })
         }
        const image = req.file ? `/uploads/${req.file.filename}` : "";

        const blog = await Blog.create({
            title,
            content, 
            isPublic,
            user : req.userId,
            image: image,
        });
        return res.status(201).json({
            message : "Blog created successfully",
            blog,
        })
    }catch(error){
        return res.status(500).json({
            message : error.message,
        })
}
}

// Get all blogs
async function getBLogs(req, res){
    try {
        // Blog.find() is like doing SELECT * FROM blogs
        //populate gets user details from user collection
        // sort by new to old blogs
        const blogs = await Blog.find({isPublic: true})
        .populate('user', 'name')
        .sort({ createdAt: -1 });

        res.status(200).json(blogs);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// Get blogs of logged-in user
const getMyBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ user: req.userId })
            .populate('user', 'name')
            .sort({ createdAt: -1 });
            
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single blog by ID
async function getBLog(req, res){
    try {
        // req.params.id stores the ID from the URL
        const {id} = req.params;
        const blog = await Blog.findById(id)
        .populate('user', 'name')
        .populate('comments.user', 'name'); 

        if (!blog){
            return res.status(404).json({message:'Blog not found'});
        }
        res.status(200).json(blog);

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// Update a blog by ID
async function updateBLog(req, res){
    try{
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("Error: Invalid ID");
            return res.status(404).json({ message: 'No such blog' });
        }

        const blog = await Blog.findById(id);
        if (!blog) {
            console.log("Error: Blog not found");
            return res.status(404).json({ message: 'Blog not found' });
        }
        
        // Check Ownership
        if (blog.user.toString() !== req.userId) {
            console.log("Error: Permission denied (IDs do not match)");
            return res.status(403).json({ message: "You can only update your own posts!" });
        }

        let updateData = {
            title: req.body.title,
            content: req.body.content,
        };

        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
        
        res.json(updatedBlog); 

    }catch(error){
        console.error("CRASH:", error);
        res.status(500).json({ message: error.message })
    }
}

// Delete a blog by ID
async function deleteBLog(req, res){
    try{

        const {id} = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog){
            return res.status(404).json({message :'Blog not found'})
        }
        res.status(200).json({message: 'Blog deleted successfully'});
    }catch(error){
        res.status(500).json({message: error.message})
    }
 
}

// Toggle like/unlike
const toggleLike = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        // Check if already liked
        const isLiked = blog.likes.includes(req.userId);

        if (isLiked) {
            // Unlike: Remove user ID from array
            blog.likes = blog.likes.filter(id => id.toString() !== req.userId);
        } else {
            // Like: Add user ID to array
            blog.likes.push(req.userId);
        }

        await blog.save();
        await blog.populate('user', 'name'); 
        res.json(blog);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addComment = async(req,res) =>{
    try{
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ message: "Blog not found" });
        if (!req.body.text) return res.status(400).json({ message: "Comment text is required" });

        const newComment ={
            user : req.userId,
            text : req.body.text
        }

        blog.comments.push(newComment);
        await blog.save();
        await blog.populate('user', 'name');
        await blog.populate('comments.user', 'name');
        

        res.json(blog);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const deleteComment = async (req, res) => {
    try {
        const blogId = req.params.id;
        const commentId = req.params.commentId;

        const blog = await Blog.findById(blogId);
        const comment = blog.comments.find(c => c._id.toString() === commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        // convert IDs to String to compare them easily
        const isMyComment = comment.user.toString() === req.userId;
        const isMyBlog = blog.user.toString() === req.userId;

        // If it's NOT my comment AND it's NOT my blog... stop!
        if (!isMyComment && !isMyBlog) {
            return res.status(401).json({ message: "You are not allowed to delete this." });
        }

        // Logic: "Keep all comments where the ID is NOT the one we want to delete"
    // filter creates a new array with only the comments that pass the test
        blog.comments = blog.comments.filter(c => c._id.toString() !== commentId);

        await blog.save();

        res.json({ message: "Comment deleted!" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBLog,
    getBLogs,
    getBLog,
    getMyBlogs,
    updateBLog,
    deleteBLog,
    toggleLike,
    addComment,
    deleteComment,
}