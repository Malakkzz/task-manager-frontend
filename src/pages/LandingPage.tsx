import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("You've been logged out!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col justify-center items-center px-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-green-700 mb-4 text-center">
        Welcome to Task Manager
      </h1>

      <p className="text-gray-700 text-lg sm:text-xl max-w-2xl text-center mb-6">
        We help you stay organized and never miss a task. Plan, prioritize, and
        get things done with ease!
      </p>

      <div className="flex gap-4 mb-8">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-lg font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white border border-green-600 text-green-700 hover:bg-green-50 px-6 py-2 rounded-md text-lg font-medium transition"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-lg font-medium transition"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
