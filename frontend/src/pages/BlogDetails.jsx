import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiUser, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import CommentList from '../components/blog/CommentList';

const BlogDetails = () => {
  const { id } = useParams(); // Get the ID from the URL (e.g., /blog/123)
  const navigate = useNavigate();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. FETCH THE BLOG
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        const data = await response.json();
        if (response.ok) setBlog(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);
// 1. HANDLE DELETE BLOG
    const handleDeleteBlog = async () => {
    if (!window.confirm("Are you sure you want to delete this entire story?")) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        toast.success("Story deleted successfully");
        navigate('/dashboard'); // Go back to dashboard after delete
      } else {
        toast.error("Failed to delete story");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting story");
    }
  };

// 2. HANDLE LIKE
const handleLike = async () => {
  const token = localStorage.getItem('token');
  if (!token) return toast.error("Please login to like!");

  try {
    const response = await fetch(`http://localhost:5000/api/blogs/${id}/like`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const updatedBlog = await response.json();

    if (updatedBlog.likes.length > blog.likes.length) {
      toast.success("Liked!");
    } else {
      toast.success("Unliked!");
    }

    setBlog(updatedBlog); 
    
  } catch (error) {
    console.error("Error liking:", error);
    toast.error("Something went wrong");
  }
};

// 3. HANDLE COMMENT
const handleComment = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  if (!token) return toast.error("Please login to comment!");

  try {
    const response = await fetch(`http://localhost:5000/api/blogs/${id}/comment`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ text: comment })
    });
    
    const data = await response.json();

    if (response.ok) {
      setBlog(data); // Update the blog with the new comment list
      setComment(''); // Clear the text box
      toast.success("Comment posted!");
    } else {
      console.error("Backend Error:", data);
      toast.error(data.message || "Failed to post comment");
    }

  } catch (error) {
    console.error("Error commenting:", error);
    toast.error("Something went wrong");
  }
};

  // 4. HANDLE COMMENT DELETE
  const handleDeleteComment = async (commentId) => {
    if(!window.confirm("Are you sure you want to delete this comment?")) return;

    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}/comment/${commentId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            // Optimistic update: Remove comment from screen immediately
            setBlog(prev => ({
                ...prev,
                comments: prev.comments.filter(c => c._id !== commentId)
            }));
            toast.success("Comment deleted");
        } else {
            toast.error("Failed to delete comment");
        }
    } catch (error) {
        console.error("Error deleting comment:", error);
        toast.error("Something went wrong");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!blog) return <div className="text-center mt-20">Blog not found</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 pb-20">
      
      {/* --- IMAGE --- */}
      {blog.image && (
        <img 
          src={`http://localhost:5000${blog.image}`} 
          alt={blog.title} 
          className="w-full h-80 object-cover rounded-2xl shadow-md mb-8"
        />
      )}

      {/* --- HEADER --- */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
      
      <div className="flex items-center justify-between mb-8 border-b pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
            <FiUser />
          </div>
          <div>
            <p className="font-bold text-gray-800">{blog.user?.name || "Unknown Author"}</p>
            <p className="text-sm text-gray-500">{new Date(blog.createdAt).toDateString()}</p>
          </div>
        </div>

        {/* Like Button */}
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
            blog.likes.includes(user?._id) 
              ? "bg-red-100 text-red-600" 
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          <FiHeart className={blog.likes.includes(user?._id) ? "fill-current" : ""} />
          <span>{blog.likes.length} Likes</span>
        </button>
      </div>

      {/* --- CONTENT --- */}
      <div className="prose max-w-none text-gray-700 leading-relaxed mb-12 whitespace-pre-wrap">
        {blog.content}
      </div>

      {/* --- COMMENTS SECTION --- */}
      <div className="bg-gray-50 p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-6">Comments ({blog.comments.length})</h3>

        {/* Comment Form */}
        <form onSubmit={handleComment} className="flex gap-4 mb-8">
          <input 
            type="text" 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
            required
          />
          <button type="submit" className="bg-primary text-white px-6 rounded-lg hover:opacity-90">
            <FiSend />
          </button>
        </form>

        {/* Comment List Component */}
        <CommentList 
          comments={blog.comments}
          onDelete={handleDeleteComment}
          />
          </div>
    </div>
  );
}
export default BlogDetails;