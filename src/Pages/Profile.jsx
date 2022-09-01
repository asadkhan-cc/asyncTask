import axios from "axios";
import { Button, notification, Space } from 'antd';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { GetLocalStorage } from "../Common/Localstorage";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Profile = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  //   console.log("https://reqres.in/api/unknown/"+id)
  useEffect(() => {
    axios.get("https://reqres.in/api/users/" + id).then((res) => {
      //   console.log("response res", res);
      //   console.log("data", res.data.data);
      //   setUser(JSON.stringify(res.data.data));
      setUser(res.data.data);
    });
  }, []);
  //   console.log(user);
  const data = user;
  // const usersFromLocalStor = JSON.parse(GetLocalStorage("response"));
  // console.log("data from local storage ", usersFromLocalStor);
  //   console.log(matchObject(Users, id));
  // console.log(id);
  // console.log(usersFromLocalStor.filter((elem) => elem.id === parseInt(id)));
  // const matchObject = (arr1, param) => {
  //   var result = arr1.filter((elem) => {
  //     elem.id = param;
  //   });
  //   return result;
  // };
  function deleteUser(event) {
    event.preventDefault();
    axios
      .delete("https://reqres.in/api/users/" + id)
      .then((res) => {
        const data = {
          title: `STATUS ${res.status}`,
          desc: "Profile Deleted",
        };
        openNotificationWithIcon("success", data);
        navigate("/dashboard")
      })
      .catch((err) => {
        const data = {
          title: `STATUS ${err.message}`,
          desc: JSON.stringify(err.name),
        };
        openNotificationWithIcon("error", data);
      });
  }
  const openNotificationWithIcon = (type, data) => {
    notification[type]({
      message: data.title,
      description: data.desc,
    });
  };
  function redirectDashboard() {
    navigate("/dashboard")
  }
  return (
    <div className="my-28">
      <div className="text-left  w-[50%] relative mx-auto grid-cols-3 my-8 shadow-2xl rounded-lg py-5 hover:bg-zinc-100 hover:shadow-none">
        <div className="absolute top-[-50px] left-[50%] translate-x-[-50px] ">
          <img
            className="w-[100px] h-[100px]  rounded-full "
            src={data.avatar}
            alt={data.first_name}
          />
        </div>
        <ArrowLeftOutlined 
        className="absolute top-0 translate-x-[10px] translate-y-[10px] "
        onClick={redirectDashboard}/>
        <div className="ml-4  mt-[60px]">
          <h1 className="font-medium text-xl text-slate-800 py-2">
            {data.first_name} {"  "}
            {data.last_name}
          </h1>
          <h1 className="text-lg">{data.age}</h1>
          <h3 className="py-2 text-blue-600">
            <span className="py-2 text-gray-900	font-bold"> Email : </span>
            {data.email}
          </h3>
        </div>
        <div className="flex flex-row items-center justify-between mx-14">
          <button
            onClick={() => {
              navigate("/dashboard/edit/"+data.id);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            EDIT
          </button>
          <button
            onClick={deleteUser}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
