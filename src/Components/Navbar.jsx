import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const data = props.data;
  return (
    <div>
      <nav className="flex flex-col justify-center items-center lg:flex-row align-middle lg:justify-evenly bg-blue-400 rounded  text-xl text-slate-50 ">
        <Link className="text-white" to="/Dashboard">
          Home
        </Link>
        <Link className="text-white" to="/">
          Login
        </Link>
        <Link className="text-white" to="/signup">
          SignUp
        </Link>

        <input
          className="  max-w-[10rem] max-h-[1rem] my-auto text-xs text-black rounded pl-2  
        "
          type="text"
          placeholder="SEARCH"
        ></input>
      </nav>
    </div>
  );
};

export default Navbar;
