import React from 'react'
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
        <div className="flex flex-col md:items-start items-center w-full ">
          <img src={assets.logo_dark} alt="logo" />
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio consequatur voluptates dicta soluta? Explicabo libero amet modi dolor beatae placeat vero ea pariatur sint necessitatibus!</p>
        </div>
        <div></div>
        <div></div>
      </div>
      <p>Copyright 2025 © PallabIT .All Right Reserved.</p>
    </footer>
  );
}

export default Footer