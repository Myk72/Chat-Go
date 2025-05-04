import { NavLink } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About ChatGo</h1>

      <div className="space-y-4 text-gray-600">
        <p>
          ChatGo is a personal project developed entirely by me as a showcase of
          modern web development skills and a passion for creating seamless
          communication tools.
        </p>

        <div className="bg-blue-50 p-3 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-700 mb-3">
            Our Vision
          </h2>
          <p>
            To create a world where distance doesn't matter - where
            conversations flow as naturally online as they do in person.
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <NavLink
            to="/contact"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
