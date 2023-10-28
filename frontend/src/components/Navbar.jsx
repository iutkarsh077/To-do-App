import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const email = useSelector((state) => state.tasks.email);
  const data = useSelector((state) => state.tasks);
  // console.log(data)


  return (
    <div className="w-screen bg-gray-500 h-16 flex justify-end">
      <ul className="flex gap-10 pr-0 w-1/3 items-center justify-end mr-10 hover:cursor-pointer">
        <Link to="/">
          <li className="hover:underline hover:scale-110 hover:ease-in-out hover:text-purple-900">
            Home
          </li>
        </Link>
        <Link to="/login">
          <li className="hover:underline hover:scale-110 hover:ease-in-out hover:text-purple-900  ">
            Login In
          </li>
        </Link>
        <Link to="/signUp">
          <li className="hover:underline hover:scale-110 hover:ease-in-out hover:text-purple-900">
            Sign up
          </li>
        </Link>
       <Link to="/contact"><li className="hover:underline hover:scale-110 hover:ease-in-out hover:text-purple-900">
          Contact
        </li></Link>
       <li className="hover:text-green-400">
          {email}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
