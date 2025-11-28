const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        trim : true,
        required : true,
    },
    content : {
        type : String,
        trim : true,
        required : true,
    },
    isPublic : {
        type : Boolean,
        default : true,
    },
}, { timestamps : true }
)
exports.Blog = mongoose.model('Blog', blogSchema);


//const BLog = mongoose.model('Blog', blogSchema);
//module.exports = BLog;
