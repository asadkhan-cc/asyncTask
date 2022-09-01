import axios from "axios";

import { notification } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { validPassword } from "../Common/Regix";
const Signup = () => {
  const [flagA, setFlagA] = useState(true);
  const [flagB, setFlagB] = useState(true);
  const [pWord, setPWord] = useState("");
  const [cPWord, setcPWord] = useState("");
  const [regixA, setregixA] = useState("");
  const [pwdError, setPwdError] = useState(false);

  const [regixB, setregixB] = useState("");
  const [pwdErrorB, setPwdErrorB] = useState(false);

  const [passwordErrorMessage, setPasswordErrorMessage] = useState(true);
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState(true);
  const Navigate = useNavigate();
  //==================form submit handeler===================
  const formSubmitHandeler = (event) => {
    event.preventDefault();
    validate();
    validate2();
    // console.log(event.target[3])
    const loginData = {
      email: event.target[1].value,
      password: event.target[3].value,
    };
    console.log(loginData);
    console.log(passwordValidationMessage, passwordErrorMessage);
    console.log(pwdError, pwdErrorB);
    console.log(!passwordValidationMessage, !passwordErrorMessage);
    console.log(!pwdError, !pwdErrorB);
    if (
      !pwdError &&
      !pwdErrorB &&
      !passwordValidationMessage &&
      !passwordErrorMessage
    ) {
      axios
        .post("https://reqres.in/api/register", loginData)
        .then((res) => {
          if (res.data.token === "QpwL5tke4Pnpja7X4") {
            openNotificationWithIcon("sucess", "SignUp Sucessfull");
            Navigate("/dashboard");
          }
        })
        .catch((err) => {
          openNotificationWithIcon("error", "Sorry An Error Occured" 
          );
        });
    }
  };
  //================== Password Validator ===================
  const passwordValidator = (e) => {
    setPasswordValidationMessage(false);
    setPasswordErrorMessage(true);
    setcPWord(e.target.value);
    setregixB(e.target.value);
    if (e.target.value === pWord) {
      setPasswordErrorMessage(false);
    }
  };
  const validator = (e) => {
    setregixA(e.target.value);
    setPWord(e.target.value);
    setPasswordErrorMessage(true);

    if (e.target.value === cPWord) {
      setPasswordErrorMessage(false);
    }
  };
  //================== Notification ===================
  const openNotificationWithIcon = (type, str) => {
    notification[type]({
      message: "NOTIFICATION",
      description: str,
    });
  };
  function togglePasswordA(event) {
    setFlagA(!flagA);
  }
  function togglePasswordB(event) {
    setFlagB(!flagB);
  }
  const validate = () => {
    if (!validPassword.test(regixA)) {
      setPwdError(true);
    }
  };
  const validate2 = () => {
    if (!validPassword.test(regixB)) {
      setPwdErrorB(true);
    }
  };
  return (
    <div className="w-full max-w-sm mx-auto  mt-20">
      <form
        className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={formSubmitHandeler}
      >
        <div className="text-gray-900 text-2xl text-center font-bold mb-2">
          Sighnup
        </div>
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
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Email"
            type="email"
            placeholder="email"
            required
          />
        </div>
        <div className="">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline isvalid:border-red-500"
              id="password"
              type={flagA ? "password" : "text"}
              placeholder="Password"
              pattern=".{8,}"
              required
              title="8 characters minimum"
              onChange={validator}
              value={regixA}
            />
            {flagA ? (
              <EyeOutlined
                onClick={togglePasswordA}
                className="absolute w-4 hidden translate-y-[50%] right-4 top-1 hover:text-slate-500 "
              />
            ) : (
              <EyeInvisibleOutlined
                onClick={togglePasswordA}
                className="absolute w-4 hidden translate-y-[50%] right-4 top-1 hover:text-slate-500 "
              />
            )}
            {pwdError && (
              <p className="text-xs text-red-300">
                Password Must Contain atleast (1 uppercase Letter 1 lowercase
                Letter 1 symbol Character and 1 number)
              </p>
            )}
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Confirm Password"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline isvalid:border-red-500"
              id="confirmPassword"
              type={flagB ? "password" : "text"}
              required
              placeholder="Confirm Password"
              onChange={passwordValidator}
              value={regixB}
            />
            {flagB ? (
              <EyeOutlined
                onClick={togglePasswordB}
                className="absolute w-4 hidden translate-y-[50%] right-4 top-1 hover:text-slate-500 "
              />
            ) : (
              <EyeInvisibleOutlined
                onClick={togglePasswordB}
                className="absolute w-4 hidden translate-y-[50%] right-4 top-1 hover:text-slate-500 "
              />
            )}

            {pwdErrorB && (
              <p className="text-xs text-red-300">
                Password Must Contain atleast (1 uppercase Letter 1 lowercase
                Letter 1 symbol Character and 1 number)
              </p>
            )}
          </div>
          {!passwordValidationMessage ? (
            !passwordErrorMessage ? (
              <p className="bg-blue-300 text-blue-600 p-2"> Password match</p>
            ) : (
              <p className="bg-red-300 text-red-600">Password Doesn't match</p>
            )
          ) : (
            <p className="hidden">.....</p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <p className="mt-8 text-center">
          {" "}
          Already Have An Account!{"   "}
          <Link className="text-blue-600" to="/">
            Login
          </Link>{" "}
          here.
        </p>
      </form>
    </div>
  );
};

export default Signup;
