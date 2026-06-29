import React from "react";

const Hero = () => {
  return (
    <div className="p-32 text-teal-400 font-sans tracking-wider cursor-default flex items-center justify-between h-dvh">
      <div className="w-full">
        <div className="flex items-center gap-2 mb-3">
          <span class="relative flex size-3">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
            <span class="relative inline-flex size-3 rounded-full bg-teal-500"></span>
          </span>
          <p className="font-mono">CREATIVE DEVELOPER & DESIGNER</p>
        </div>

        <div className="mt-10 w-4/5">
          <h1 className="text-7xl font-bold leading-[0.9] tracking-wide text-white">
            Building
            <br />
            things
            <br />
            <span className="text-teal-400">that </span>
            <span className="text-transparent [-webkit-text-stroke:2px_#525252] ">
              matter.
            </span>
          </h1>
        </div>
      </div>

      <div className="bg-neutral-800 mt-10 rounded-lg size-72 p-8">
        <p>Status</p>
      </div>
    </div>
  );
};

export default Hero;
