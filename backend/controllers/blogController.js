const { Blog } = require('../models/blogModel'); 

// Create a new blog
async function createBLog(req, res){
    try{
        const { title, content, isPublic } = req.body;
         if (!title || !content) {
            return res.status(400).json({
                message : "Title and Content are required"
            })
         }
        const blog = await Blog.create({title, content, isPublic});
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
        const blogs = await Blog.find({isPublic: true}); // Only fetch public blogs
        res.status(200).json(blogs);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// Get a single blog by ID
async function getBLog(req, res){
    try {
        // req.params.id stores the ID from the URL
        const {id} = req.params;
        const blog = await Blog.findById(id);
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
        // {new: true} returns the updated blog from db
        const{id} = req.params;

        const blog = await Blog.findByIdAndUpdate(id, req.body, {new: true});
        if (!blog){
            return res.status(404).json({message: 'Blog not found'})
        }

    }catch(error){
        res.status(500).json({message: error.message})
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

module.exports = {
    createBLog,
    getBLogs,
    getBLog,
    updateBLog,
    deleteBLog,
}