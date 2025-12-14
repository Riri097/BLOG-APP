import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// 1. IMPORT THE BLOG CARD
import BlogCard from '../components/blog/BlogCard'; 

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/blogs', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 401) {
          logout(); 
          navigate('/login');
          return;
        }
        
        const data = await response.json();

// --- ADD THIS LINE ---
console.log("Fetched Posts Data:", data); 
// --------------------

        if (response.ok) setPosts(data);

      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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

        {/* 2. BLOG GRID SECTION (Replaced the old list) */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Latest Stories</h2>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg border">
              <p>No posts yet.</p>
            </div>
          ) : (
            // GRID LAYOUT: 1 column on mobile, 2 on tablet, 3 on desktop
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post._id} blog={post} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;