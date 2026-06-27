import React from "react";

const Navbar = () => {
  return (
    <div className="border-b border-neutral-700 h-20 text-white p-5 flex justify-between items-center">
      <h1>
        Leonheil <span className="text-teal-500 ">.</span>
      </h1>

      <div className="flex gap-5 text-gray-400 font-mono tracking-wider">
        <a
          href="#"
          className="hover:text-teal-500 transition-all duration-300 ease-in-out"
        >
          WORK
        </a>
        <a
          href="#"
          className="hover:text-teal-500 transition-all duration-300 ease-in-out"
        >
          ABOUT
        </a>
        <a
          href="#"
          className="hover:text-teal-500 transition-all duration-300 ease-in-out"
        >
          CONTACT
        </a>
      </div>

      <div>
        <button className="text-teal-500 border rounded-lg p-2 transition-all duration-300 ease-in-out hover:bg-teal-600 hover:text-white hover:-translate-y-0.5 active:translate-y-0">
          Get in touch
        </button>
      </div>
    </div>
  );
};

export default Navbar;
