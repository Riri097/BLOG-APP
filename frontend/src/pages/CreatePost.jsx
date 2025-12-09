import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null); // 1. New State for Image
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to post.');
      setLoading(false);
      return;
    }

    // 2. USE FORMDATA (Required for Files)
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (file) {
      formData.append('image', file); // Add the file to the envelope
    }

    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: { 
          // NOTE: Do NOT set 'Content-Type': 'application/json'
          // The browser sets the correct boundary automatically for files.
          'Authorization': `Bearer ${token}` 
        },
        body: formData, // Send the envelope
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create post');
      }

      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Write a New Story</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="Enter an engaging title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* 3. Image Input (New) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])} // Grab the first file
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              rows="12"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"
              placeholder="Tell your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Publishing...' : 'Publish Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;