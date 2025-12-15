import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const ActionButtons = ({ isOwner, blogId, onDelete }) => {
  // 1. If not owner, render nothing (Clean!)
  if (!isOwner) return null;

  return (
    <div className="flex items-center gap-2">
      
      {/* Edit Button */}
      <Link 
        to={`/edit-blog/${blogId}`}
        onClick={(e) => e.stopPropagation()} // Prevent opening the card
        className="text-blue-500 hover:bg-blue-50 p-2 rounded-full transition"
        title="Edit Story"
      >
        <FiEdit size={18} />
      </Link>

      {/* Delete Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Prevent opening the card
          onDelete(blogId);    // Call the parent's delete function
        }} 
        className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
        title="Delete Story"
      >
        <FiTrash2 size={18} />
      </button>
      
    </div>
  );
};

export default ActionButtons;