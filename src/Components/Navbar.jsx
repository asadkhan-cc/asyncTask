import React from "react";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
const Navbar = (props) => {
  // console.log(props,"logging props from nav")
  const dataFromSearch = (e) => {
    e.preventDefault();
    console.log(e);
    // console.log("datafromsearch", e.target[0].value);
    props.state(e.target.value);
  };
  return (
    <div>
      <nav className="flex flex-col justify-center items-center md:flex-row md:justify-evenly lg:flex-row align-middle lg:justify-evenly bg-blue-400 rounded  text-xl text-slate-50 ">
        <Link className="text-white" to="/Dashboard">
          Home
        </Link>
        <Link className="text-white" to="/">
          Login
        </Link>
        <Link className="text-white" to="/signup">
          SignUp
        </Link>
        <div className="relative">
          <input
            className="  max-w-[10rem] max-h-[1rem] mt-auto text-xs text-black rounded pl-2  
        "
            type="text"
            placeholder="SEARCH"
            onChange={dataFromSearch}
          ></input>
          <SearchOutlined className="absolute text-stone-900" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
