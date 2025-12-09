import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import BlogCard from '../components/blog/BlogCard';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const MyPosts = () => {
  const { user } = useAuth(); // Get the logged-in user
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        // 1. Fetch ALL blogs
        const response = await fetch('http://localhost:5000/api/blogs');
        const data = await response.json();

        if (response.ok) {
          // 2. FILTER: Keep only posts where (post.user._id === my.id)
          const userPosts = data.filter(post => post.user?._id === user?._id);
          setMyPosts(userPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyPosts();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Stories</h1>
          <Link to="/create-post">
            <Button>+ Write New</Button>
          </Link>
        </div>

        {/* Loading State */}
        {loading && <div className="text-center py-10">Loading your posts...</div>}

        {/* Empty State */}
        {!loading && myPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <h3 className="text-xl font-medium text-gray-700 mb-2">You haven't written anything yet.</h3>
            <p className="text-gray-500 mb-6">Share your thoughts with the world!</p>
            <Link to="/create-post">
              <Button variant="primary">Start Writing</Button>
            </Link>
          </div>
        )}

        {/* Grid of My Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myPosts.map((post) => (
            <BlogCard key={post._id} blog={post} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default MyPosts;