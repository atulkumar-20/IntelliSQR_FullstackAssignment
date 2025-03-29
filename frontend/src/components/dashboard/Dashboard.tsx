import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto h-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome {user?.email.split('@')[0]}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <h1 className="text-2xl font-bold text-gray-900">
            This is your Dashboard
          </h1>
        </div>
      </div>
    </div>
  );
};
