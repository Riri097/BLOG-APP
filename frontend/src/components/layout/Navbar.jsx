import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
            BlogApp
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          
          {/* Auth Buttons */}
          {user ? (
            <div className="flex items-center gap-4">
              {/* Link to Dashboard */}
              <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
                Dashboard
              </Link>

              {/* Vertical Separator Line */}
              <div className="h-5 w-px bg-gray-300 hidden sm:block"></div>

              <span className="hidden text-sm font-medium text-gray-900 sm:block">
                Hi, {user.name}
              </span>
              
              <Button onClick={handleLogout} variant="secondary" className="text-sm">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;