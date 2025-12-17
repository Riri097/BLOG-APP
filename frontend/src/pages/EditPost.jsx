import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Fetch existing data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
           headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (response.ok) {
          setTitle(data.title);
          setContent(data.content);
          // If there is an existing image, show it. If not, preview stays empty.
          if(data.image) {
            setPreview(`http://localhost:5000${data.image}`);
          }
        } else {
          toast.error("Blog not found");
          navigate('/dashboard');
        }
      } catch (error) {
        console.error(error);
        toast.error("Error loading story");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  // 2. Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 3. Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
        console.log("1. Submit Clicked!");
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    
    // Only append image if a NEW file was selected
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}` 
          // Note: Do NOT set Content-Type here, browser does it for FormData
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Story updated successfully!");
        navigate('/dashboard');
      } else {
        console.error("Backend Error:", data);
        toast.error(data.message || "Failed to update");
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-dark">Edit Story</h1>
      
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-xl shadow-sm space-y-6">
        
        {/* --- FIX 1: SIMPLIFIED IMAGE PREVIEW --- */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
            
            {preview ? (
              <div className="mb-4 border border-gray-300">
                {/* Standard IMG tag with fixed height to prevent black screen */}
                <img 
                  src={preview} 
                  alt="Preview" 
                  style={{ width: '100%', height: '300px', objectFit: 'contain', backgroundColor: '#f3f4f6' }} 
                />
              </div>
            ) : (
              <p className="text-gray-500 mb-2">No image selected</p>
            )}

            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea 
            rows="10"
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"
            required
          />
        </div>
<div className="flex justify-end gap-4">
          {/* Cancel Button */}
          <button 
            type="button" 
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition"
          >
            Cancel
          </button>
          
          {/* Save Button - USING STANDARD HTML TO FORCE SUBMIT */}
          <button 
            type="submit" 
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium transition shadow-sm"
          >
            Save Changes
          </button>
        </div>


      </form>
    </div>
  );
};

export default EditPost;