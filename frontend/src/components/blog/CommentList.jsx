import React from 'react';
import { FiTrash2, FiUser } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const CommentList = ({ comments, onDelete }) => {
  const { user } = useAuth();

  if (!comments || comments.length === 0) {
    return <p className="text-gray-500 italic">No comments yet. Be the first!</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          
          <div className="flex justify-between items-start">
            {/* User Info */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                <FiUser size={14} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">
                  {comment.user ? comment.user.name : "Unknown User"}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Delete Button (Only show if it's MY comment) */}
            {user && comment.user && user.id === comment.user._id && (
              <button 
                onClick={() => onDelete(comment._id)}
                className="text-red-400 hover:text-red-600 transition p-1"
                title="Delete comment"
              >
                <FiTrash2 size={14} />
              </button>
            )}
          </div>

          {/* The Comment Text */}
          <p className="text-gray-700 text-sm pl-10">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;