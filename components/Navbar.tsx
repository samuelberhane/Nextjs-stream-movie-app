import { GoSearch } from "react-icons/go";
import { AiFillBell } from "react-icons/ai";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [windowScroll, setWindowScroll] = useState(false);

  // change navbar background with window scroll effect
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 0) setWindowScroll(true);
      else setWindowScroll(false);
    };
    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  return (
    <div
      className={`flex items-center justify-between px-4 md:px-8 py-4 md:py-6 fixed top-0 w-full transition-all z-50 ${
        windowScroll ? "bg-[#3b3a3b]" : "bg-black"
      }`}
    >
      <div className="flex items-center  md:space-x-10">
        <h1 className="text-red-500 font-bold text-3xl md:text-4xl uppercase items-center">
          Stream
        </h1>
        <ul className="hidden md:flex space-x-4">
          <li className="navLink">Home</li>
          <li className="navLink">Tv Shows</li>
          <li className="navLink">Movies</li>
          <li className="navLink">New & Popular</li>
          <li className="navLink">My List</li>
        </ul>
      </div>
      <div className="flex items-center space-x-2 lg:space-x-4">
        <GoSearch className="text-white w-6 h-6 hidden sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <AiFillBell className="w-7 h-7" />
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
