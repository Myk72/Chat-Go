import { MessageCircleMoreIcon } from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";

const LandingPageLayout = () => {
  return (
    <div className="min-h-screen flex flex-col gap-10">
      <header className="bg-white py-4 px-6 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageCircleMoreIcon className="size-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">ChatGo</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Contact us
            </NavLink>

            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Sign Up
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Login
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-grow h-auto grid grid-cols-2 p-6 gap-2">
        <div className="flex justify-center items-center shrink-0 border-r">
          <img
            src="chat_people.avif"
            className="object-cover hover:scale-105 duration-500"
          />
        </div>
        <div className="flex items-center w-full justify-center">
          <Outlet />
        </div>
      </main>

      <footer className="bg-gray-50 py-4 px-6 mt-auto">
        <div className="text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ChatGo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageLayout;
