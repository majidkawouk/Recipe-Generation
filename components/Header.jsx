"use client";

export default function Header() {
  return (
    <div className="shadow-md">
      <div className="flex items-center justify-between p-4 h-14">
        <img src="/leaf.png" alt="My Logo" />

        {/* Navigation Links - Responsive Fix */}
        <div className="flex flex-wrap justify-center gap-x-4 w-full md:w-[40%]">
          {["HOME", "CONTACT", "ABOUT", "SEARCH"].map((item, index) => (
            <h1
              key={index}
              className="cursor-pointer relative font-bold text-sm md:text-lg text-black group"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full"></span>
            </h1>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-2">
          <button className="h-8 w-20 text-sm md:text-base">Log in</button>
          <button className="bg-green-600 text-white h-8 px-2 w-24 text-sm md:text-base">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
