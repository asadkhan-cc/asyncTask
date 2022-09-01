import axios from "axios";
import { notification } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [flag, setFlag] = useState(true);
  const Navigate = useNavigate();
  const eopen = useRef();
  console.log(eopen);
  //==================form submit handeler===================
  const formSubmitHandeler = (event) => {
    event.preventDefault();
    const loginData = {
      email: event.target[0].value,
      password: event.target[1].value,
    };
    console.log(loginData);
    axios
      .post("https://reqres.in/api/login", loginData)
      .then((res) => {
        console.log(res);
        console.log(res.data.token);
        if (res.data.token === "QpwL5tke4Pnpja7X4") {
          openNotificationWithIcon("success", "Login Sucessfull");
          Navigate("/dashboard");
        }
      })
      .catch((err) => {
        // console.log(err);
        openNotificationWithIcon("error", "Username or Passwors Incorrect");
      });
  };
  const openNotificationWithIcon = (type, str) => {
    notification[type]({
      message: "NOTIFICATION",
      description: str,
    });
  };
  function togglePassword(event) {
    setFlag(!flag);
  }
  return (
    <>
      <div className="w-full max-w-xs mx-auto  mt-40">
        <form
          className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={formSubmitHandeler}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className=" shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline isvalid:border-red-500"
                id="password"
                type={flag?"password":"text"}
                placeholder="Password"
              />
              {flag?<EyeOutlined
                onClick={togglePassword}
                className="absolute w-4 hidden translate-y-[50%] right-4 top-1 hover:text-slate-500 "
              />
              :
              <EyeInvisibleOutlined
                onClick={togglePassword}
                className="absolute w-4 hidden translate-y-[50%] right-4 top-1 hover:text-slate-500 "
              />}
              
              
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href=".#"
            >
              Forgot Password?
            </a>
          </div>
          <p className="mt-8 text-right">
            {" "}
            New Here! Lets{" "}
            <Link className="text-blue-600" to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
