import React from "react";

const Navbar = () => {
  return (
    <div className="border-b border-neutral-700 h-20 text-white p-10 flex justify-between items-center">
      <div className="tracking-wider flex items-center gap-2">
        <a
          href="#"
          className="text-2xl font-bold hover:text-teal-300 transition-all duration-300 ease-in-out font-mono"
        >
          Leonheil{" "}
        </a>

        <span class="relative flex size-3 mt-0.5">
          <span class="absolute inline-flex h-full w-full animate-bounce rounded-full bg-teal-400"></span>
        </span>
      </div>

      <div className="flex gap-7 text-gray-400 font-mono tracking-wider">
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
        <button className="text-teal-500 border rounded-lg p-2 transition-all duration-300 ease-in-out hover:bg-teal-500/30 hover:text-white hover:-translate-y-0.5 active:translate-y-0 hover:border-teal-500 cursor-pointer">
          Get in touch
        </button>
      </div>
    </div>
  );
};

export default Navbar;
