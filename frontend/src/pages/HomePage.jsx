import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Welcome to ChatGo
        </h1>
        <p className="text-lg text-gray-600">
          Your gateway to seamless conversations and meaningful connections.
        </p>
        <p className="text-lg text-blue-600">
          Stay connected with friends, family, and colleagues.
        </p>
      </div>

      <div className="items-center flex justify-center gap-4">
        <NavLink
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          to="/chat"
        >
          Get Started
        </NavLink>
      </div>
    </div>
  );
};

export default HomePage;
