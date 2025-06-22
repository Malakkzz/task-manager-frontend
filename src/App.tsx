import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import TaskDashboard from "./pages/TaskDashboard";
import TaskForm from "./pages/TaskForm";
import AuthGuard from "./components/AuthGuard";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Layout>
      {/* Only show Navbar if authenticated */}
      {localStorage.getItem("token") && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <TaskDashboard />
            </AuthGuard>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-task" element={<TaskForm />} />
      </Routes>
    </Layout>
  );
}
