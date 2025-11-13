// src/pages/CreateRole.tsx

import React from "react";
import { Link } from "react-router-dom";

const UpdateRole: React.FC = () => {
  return (
    <div className="w-full p-6 md:p-8">
      {/* Main content wrapper */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        {/* Header Section */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Update The Role
        </h1>

        {/* Form Section */}
        <form>
          {/* Form fields grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="adminCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Admin Code
              </label>
              <input
                type="text"
                id="adminCode"
                placeholder="Admin Code"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Link
              to="/management/admin/role"
              className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back
            </Link>
            <button
              type="submit"
              className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRole;
