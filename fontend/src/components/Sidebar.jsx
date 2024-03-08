import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { userAuth } from "../context/AuthContext";
import { IoHomeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import { VscSignIn } from "react-icons/vsc";

function Sidebar() {
  const {authUser} = userAuth();

  return (
    <aside
      className="flex flex-col items-center min-w-12 sm:w-16 sticky top-0 left-0 h-screen py-8 
     overflow-y-auto border-r bg-glass
     "
    >
      <nav className="h-full flex flex-col gap-3 items-center">
        <Link to="/" className="justify-center flex">
          <img
            className="h-8"
            src="../../public/github.svg"
            alt="Github logo"
          />
        </Link>

        <Link to="" className="">
          <IoHomeSharp />
        </Link>
        
        {authUser ? (
          <Link
            to="/likes"
            className="p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800"
          >
            <FaHeart size={22} />
          </Link>
        ) : (
          <Link
            to="/login"
            className="p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-800"
          >
            <VscSignIn />
          </Link>
        )}

        {authUser ? (
          <Link
            to="/explore"
            className="p-1.5  flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800"
          >
            <MdOutlineExplore size={25} />
          </Link>
        ) : (
          <Link
            to="/signup"
            className="p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-800"
          >
            <MdEditDocument size={25} />
          </Link>
        )}
        {authUser && (
          <div className="flex flex-col gap-2 mt-auto">
            <Logout />
          </div>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
