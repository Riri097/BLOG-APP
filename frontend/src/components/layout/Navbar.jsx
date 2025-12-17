import { Link } from 'react-router-dom';
import Button from '../ui/Button'; 

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          BlogApp
        </Link>

        {/* Guest Links Only */}
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary">Get Started</Button>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;