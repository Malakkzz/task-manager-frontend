import { Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import TaskDashboard from './pages/TaskDashboard';
import TaskForm from './pages/TaskForm';
import AuthGuard from './components/AuthGuard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
          <AuthGuard>
            <TaskDashboard />
          </AuthGuard>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/new-task" element={<TaskForm />} />
    </Routes>
  );
}
