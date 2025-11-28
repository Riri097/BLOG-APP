import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">

      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Welcome to TaskMaster
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Your ultimate productivity companion. Organize your tasks, boost your efficiency, 
            and achieve your goals with our simple yet powerful task management system.
          </p>
          
          {user ? (
            <Link to="/dashboard">
              <Button className="text-lg px-8 py-3">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex gap-4 justify-center">
              <Link to="/signup">
                <Button className="text-lg px-8 py-3">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="text-lg px-8 py-3">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Easy Task Management
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create, organize, and track your tasks with an intuitive interface.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Secure & Private
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your data is encrypted and stored securely. Only you can access your tasks.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">🌙</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Dark Mode
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Work comfortably in any lighting condition with our dark mode support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;