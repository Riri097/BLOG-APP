import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiMessageSquare, FiUser } from 'react-icons/fi';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/blog/${blog._id}`)}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition border border-gray-100"
    >
      
      {/* 1. IMAGE SECTION */}
      {/* Only render this part if blog.image exists */}
      {blog.image && (
        <div className="h-48 w-full">
          <img 
            src={`http://localhost:5000${blog.image}`} 
            alt={blog.title} 
            className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'; // Hide if broken
                console.log("Image failed to load:", `http://localhost:5000${blog.image}`);
            }}
          />
        </div>
      )}

      {/* 2. CONTENT SECTION */}
      <div className="p-5">
        
        {/* Author & Date */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <FiUser className="text-primary" />
          <span>{blog.user ? blog.user.name : "Unknown"}</span>
          <span>•</span>
          <span>{new Date(blog.createdAt).toDateString()}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {blog.title}
        </h3>

        {/* Content Preview (First 100 letters) */}
        <p className="text-gray-600 text-sm mb-4">
          {blog.content.substring(0, 100)}...
        </p>

        {/* Footer: Likes & Comments */}
        <div className="flex items-center gap-4 text-gray-400 text-sm pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <FiHeart /> 
            <span>{blog.likes.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiMessageSquare /> 
            <span>{blog.comments.length}</span>
          </div>
        </div>

      </div>
    </div>
    );
};

export default BlogCard;
