import { Button, notification, Space } from "antd";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [initialData, setInitialData] = useState("");
  const [formData, setFormData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const endpoint = "https://reqres.in/api/users/" + id;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        console.log("res.data.data",res.data.data);
        setInitialData(res.data.data);
      })
      .catch(err => console.error(err));
  }, []);

  function formSubmitHandeler(event) {
    event.preventDefault();
    setFormData({
      email: event.target[0].value,
      first_name: event.target[1].value,
      last_name: event.target[2].value,
      password: event.target[3].value,
    });
    apiPatch(endpoint, formData);

    console.log("times");
  }
  const apiPatch = (path, data) => {
    axios
      .patch(path, data)
      .then((res) => {
        console.log(res, "fff");
        const data = {
          title: `STATUS ${res.status}`,
          desc: JSON.stringify(res.data.updatedAt),
        };
        if (res.data) {
          openNotificationWithIcon("success", data);
          navigate("/dashboard/profile/"+id)
        }

        // console.log("yey");
        // navigate("http://localhost:3000/dashboard/profile"+id)
        // console.log(res);
        // console.log(res.status);
        // console.log(JSON.stringify(res.data) + "Response.data");
      })
      .catch((err) => {
        console.log(err);
        const data = {
          title: `STATUS ${err.message}`,
          desc: JSON.stringify(err.name),
        };
        openNotificationWithIcon("error", data);
      });
  };
  const openNotificationWithIcon = (type, data) => {
    notification[type]({
      message: data.title,
      description: data.desc,
    });
  };
  function handleChange(evt) {
    const value = evt.target.value;
    setInitialData({
      ...initialData,
      [evt.target.name]: value
    });
  }
  return (
    <div className="mt-24 mx-[20%]">
      <form
        className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={formSubmitHandeler}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            value={initialData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="FirstName"
          >
            FirstName
          </label>
          <input
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline isvalid:border-red-500"
            id="FirstName"
            name="first_name"
            type="text"
            placeholder="FirstName"
            value={initialData.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="LastName"
          >
            LastName
          </label>
          <input
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline isvalid:border-red-500"
            id="LastName"
            type="text"
            name="last_name"
            placeholder="LastName"
            value={initialData.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline isvalid:border-red-500"
            id="Password"
            type="text"
            placeholder="Password"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
