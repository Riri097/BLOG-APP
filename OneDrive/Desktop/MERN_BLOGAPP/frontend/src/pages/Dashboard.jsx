import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Card */}
        <Card className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's your productivity dashboard
          </p>
        </Card>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">0</p>
              </div>
              <div className="text-4xl">📝</div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Completed</p>
                <p className="text-3xl font-bold text-green-600">0</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Pending</p>
                <p className="text-3xl font-bold text-orange-600">0</p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </Card>
        </div>

        {/* Todo Section Placeholder */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your Tasks
          </h2>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚀</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Todo functionality coming soon!
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              You'll be able to create, manage, and track your tasks here.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;