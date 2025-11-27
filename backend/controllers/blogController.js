

async function createBLog(req, res){
    try{
        const { title, content } = req.body;
         if (!title || !content) {
            return res.status(400).json({
                message : "Title and Content are required"
            })
         }
        const blog = await Blog.create({title, content,});
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
async function getBLogs(req, res){
 
}
async function getBLog(req, res){
 
}
async function updateBLog(req, res){
 
}
async function deleteBLog(req, res){
 
}

module.exports = {
    createBLog,
    getBLogs,
    getBLog,
    updateBLog,
    deleteBLog,
}