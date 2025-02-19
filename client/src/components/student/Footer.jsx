import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
        <div className="flex flex-col md:items-start items-center w-full ">
          <img src={assets.logo_dark} alt="logo" />
          <p className="mt-6 text-sm text-center md:text-left  md:text-xs text-white/80">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
            consequatur voluptates dicta soluta? Explicabo libero amet modi
            dolor beatae.
          </p>
        </div>
        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-start w-full">
          <h1 className="font-semibold text-white mb-5">
            Subscribe to our newsletter
          </h1>
          <p className="text-white/80 text-sm">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className="flex items-center pt-4 gap-2">
            <input
              className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm"
              type="email"
              placeholder="Enter your Email"
            />
            <button className="bg-blue-600 w-24 h-9 text-white rounded  ">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <p className="text-center text-white/60 py-4 text-xs md:text-sm ">
        Copyright 2025 © PallabIT .All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
