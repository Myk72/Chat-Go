import { MessageCircleMoreIcon, MenuIcon, XIcon } from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import { Button } from "../ui/button";

const LandingPageLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col w-full">
      <header className="bg-white py-4 px-6 sticky top-0 z-10 flex flex-col md:flex-row md:items-center md:justify-between shadow-sm">
        <div className="flex justify-between items-center w-full md:w-auto">
          <div className="flex items-center space-x-2">
            <MessageCircleMoreIcon className="size-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">ChatGo</h1>
          </div>

          <div className="md:hidden">
            <Button
              variant={"outline"}
              onClick={() => setMenuOpen(!menuOpen)}
              className={"p-2 border-none hover:bg-gray-100"}
            >
              {menuOpen ? (
                <XIcon className="size-6 text-gray-700" />
              ) : (
                <MenuIcon className="size-6 text-gray-700" />
              )}
            </Button>
          </div>
        </div>

        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col space-y-4 mt-4 md:mt-0
            md:flex md:flex-row md:space-y-0 md:space-x-6
            items-start md:items-center w-full md:w-auto`}
          onClick={() => setMenuOpen(false)}
        >
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

          {!isAuthenticated && (
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
          )}

          {!isAuthenticated && (
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
          )}
        </nav>
      </header>

      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8 items-center">
        <div className="flex justify-center items-center w-full md:border-r md:pr-8">
          <img
            src="/chat_people.avif"
            alt="Chat"
            className="object-contain max-w-full max-h-80 md:max-h-[400px] w-full"
          />
        </div>
        <div className="flex items-center justify-center w-full">
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
