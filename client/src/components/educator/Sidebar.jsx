import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);
  const menuItem = [
    { name: " Dashboard", path: "/educator", icon: assets.home_icon },
    {
      name: "Add  Course",
      path: "/educator/add-course",
      icon: assets.add_icon,
    },
    {
      name: "My  Course",
      path: "/educator/my-course",
      icon: assets.my_course_icon,
    },
    {
      name: "Student Enroll",
      path: "/educator/student-enroll",
      icon: assets.person_tick_icon,
    },
  ];
  return (
    isEducator && (
      <div className="md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col">
        {menuItem.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${
                isActive
                  ? "bg-indigo-50 border-r-[6px] border-indigo-500/90"
                  : "hover:bg-gray-100/0 border-r-[6px] border-white hover:border-gray-100/90"
              } `
            }
          >
            <img src={item.icon} alt="" className="w-4 h-4" />
            <p className="md:block hidden text-center">{item.name}</p>
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Sidebar;
