import { NavLink } from "react-router-dom";

const ContactPage = () => {
  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact ChatGo</h1>

      <div className="space-y-6 text-gray-600">
        <p>
          Have questions or feedback? We'd love to hear from you. Reach out
          through any of these channels:
        </p>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Email</h3>
              <p>bmikias482@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Phone</h3>
              <p>+ (251) 921778842</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-orange-100 p-3 rounded-full mr-4">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Location</h3>
              <p>
                5 kilo
                <br />
                Addis Ababa, Ethiopia
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <NavLink
            to="/about"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Learn About Us
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
