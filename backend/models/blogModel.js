const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {type : String, trim : true, required : true,},
    content : {type : String, trim : true, required : true,},
     user: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
    isPublic : {type : Boolean,default : true,},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments:[{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        text: {type: String, required: true},
        createdAt: {type: Date, default: Date.now}
    }]
}, { timestamps : true }
)
exports.Blog = mongoose.model('Blog', blogSchema);


//const BLog = mongoose.model('Blog', blogSchema);
//module.exports = BLog;
