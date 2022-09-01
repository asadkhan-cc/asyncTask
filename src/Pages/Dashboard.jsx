import axios from "axios";
import { Space, Spin } from 'antd';
// import ReactLoading from "react-loading";
import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import { GetLocalStorage, setLocalStorage } from "../Common/Localstorage";
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("https://reqres.in/api/users").then((res) => {
      console.log("response res", res);
      console.log("gfgg", res.data.data);
      const status = setLocalStorage("response", res.data.data);
      // console.log(status);
      const usersdata = GetLocalStorage("response");
      // console.log(JSON.parse(usersdata))
      setUsers(JSON.parse(usersdata));
    });
  }, []);
  console.log(users);
  return (
    <div>
      <Navbar></Navbar>
      <p className="text-center text-3xl my-4"> WELCOME TO DASHBOARD </p>
      <div className="mx-[10%]">
        {users.length > 0 ? (
          <div className="grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-16">
            {users.map((elem) => (
              <Card data={elem} key={elem.id}></Card>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-48">
            <Space size="large">
              <Spin size="large" />
            </Space>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
