import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation(); //Gives the current path (like /, /login, etc.), used to highlight the active nav link
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state on mount & on location change
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  //This is a helper function
  //that returns a Tailwind CSS class string based on whether the current path matches the given one.
  const navLinkClass = (path: string) =>
    `relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      location.pathname === path
        ? "text-green-700 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-700"
        : "text-gray-700 hover:text-green-600"
    }`;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-green-700">
            Task Manager
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <Link to="/" className={navLinkClass("/")}>
              Dashboard
            </Link>
            <Link to="/new-task" className={navLinkClass("/new-task")}>
              Add Task
            </Link>

            {!isLoggedIn ? (
              <Link
                to="/login"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
