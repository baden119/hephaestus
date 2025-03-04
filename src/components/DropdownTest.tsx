"use client";

import { useState } from "react";

const DropdownTest = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center my-2">
      <div className="relative inline-block text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Dropdown
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            <button
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => alert("Option 1 selected")}
            >
              Option 1
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => alert("Option 2 selected")}
            >
              Option 2
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => alert("Option 3 selected")}
            >
              Option 3
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownTest;
