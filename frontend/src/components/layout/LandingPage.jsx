import { MessageCircleMoreIcon } from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";

const LandingPageLayout = () => {
  return (
    <div className="h-screen flex flex-col gap-4">
      <header className="bg-white py-4 px-6 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
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

      <main className="flex-grow container mx-auto p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="md:w-3/5 w-full flex justify-center">
            <img
              src="/chat_people.avif"
              alt="People chatting on ChatGo"
              className="max-w-full h-auto"
            />
          </div>
          <div className="md:w-2/5 w-full">
            <Outlet />
          </div>
        </div>
        <div className="mt-18 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ChatGo. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
};

export default LandingPageLayout;
