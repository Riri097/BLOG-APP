import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button'; // Assuming you have this, or use standard <button>

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="w-full bg-primary border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      
      {/* 1. The Logo (Visible to everyone) */}
      <Link to="/" className="text-2xl font-bold text-primary">
        BlogApp
      </Link>

      {/* 2. The Actions (Changes based on login) */}
      <div>
        {user ? (
          // --- OPTION A: USER IS LOGGED IN ---
          // We don't need much here because the Sidebar has the links.
          // Let's just show a friendly greeting.
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">
              Hi, {user.name} 
            </span>
            {/* We don't need a Logout button here because it's in the Sidebar now! */}
          </div>
        ) : (
          // --- OPTION B: GUEST (NOT LOGGED IN) ---
          <div className="flex items-center gap-4">
            <Link to="/login">
              <button className="text-gray-600 hover:text-blue-600 font-medium">
                Log in
              </button>
            </Link>
            
            <Link to="/signup">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Get Started
              </button>
            </Link>
          </div>
        )}
      </div>

    </nav>
  );
};

export default Navbar;