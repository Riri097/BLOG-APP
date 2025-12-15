import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import BlogCard from '../components/blog/BlogCard'; 
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. KEEP THIS ONE (The Logic)
  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        toast.success("Story deleted");
        // Remove from UI immediately
        setPosts(posts.filter(post => post._id !== blogId));
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting story");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/blogs/my-posts', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 401) {
          logout(); 
          navigate('/login');
          return;
        }
        
        const data = await response.json();

        if (response.ok) {
          setPosts(data);
        }

      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };
    if(user) fetchPosts();
  }, [user]);


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark">My Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}!</p>
          </div>
          <Link to="/create-post">
            <Button variant="secondary">+ Create New Post</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-l-4 border-[#005519da]">
            <h3 className="text-text text-sm font-medium">Total Posts</h3>
            <p className="text-3xl font-bold text-text">{posts.length}</p>
          </Card>
        </div>

        {/* Blog Grid */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Latest Stories</h2>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg border">
              <p>No posts yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
<BlogCard key={post._id} blog={post} onDelete={handleDelete} />
))}
</div>
)}
</div>  </div>
</div>);
};

export default Dashboard;