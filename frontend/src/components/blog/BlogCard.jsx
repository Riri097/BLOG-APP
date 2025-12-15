import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiMessageSquare, FiUser } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import ActionButtons from './ActionButtons'; // <--- Import the new component

const BlogCard = ({ blog, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Safe ID Comparison
  const currentUserId = (user?._id || user?.id)?.toString();
  const postAuthorId = (blog.user?._id || blog.user)?.toString();
  const isMyPost = currentUserId && postAuthorId && currentUserId === postAuthorId;

  return (
    <div 
      onClick={() => navigate(`/blog/${blog._id}`)}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition border border-gray-100 flex flex-col h-full group"
    >
      {/* ... Image Section (Keep as is) ... */}
      {blog.image && (
        <div className="h-48 w-full overflow-hidden">
          <img src={`http://localhost:5000${blog.image}`} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow">
        {/* ... Title & Content (Keep as is) ... */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.content}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          
          {/* Left: Stats */}
          <div className="flex gap-4 text-gray-500 text-sm">
             <span className="flex items-center gap-1"><FiHeart /> {blog.likes?.length || 0}</span>
             <span className="flex items-center gap-1"><FiMessageSquare /> {blog.comments?.length || 0}</span>
          </div>

          {/* Right: Actions - LOOK HOW CLEAN THIS IS NOW! */}
          <ActionButtons 
            isOwner={isMyPost} 
            blogId={blog._id} 
            onDelete={onDelete} 
          />

        </div>
      </div>
    </div>
  );
};

export default BlogCard;