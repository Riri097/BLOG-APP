import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button'; 

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="w-full bg-primary border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
      
      {/* 1. Logo - Uses your theme color */}
      <Link to="/" className="text-2xl font-bold text-dark flex items-center gap-2">
        <span>StoryBlog</span>
      </Link>

      {/* 2. Actions */}
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-600 hidden md:block text-sm">
              Hi, {user.name}
            </span>
            <Link to="/dashboard">
              <Button variant="primary">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary">Sign up</Button>
            </Link>
          </div>
        )}
      </div>

    </nav>
  );
};

export default Navbar;