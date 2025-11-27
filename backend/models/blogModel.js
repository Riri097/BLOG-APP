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
    draft : {
        type : Boolean,
        default : false,
    },
}, { timestamps : true }
)
exports.Blog = mongoose.model('Blog', blogSchema);


//const BLog = mongoose.model('Blog', blogSchema);
//module.exports = BLog;
