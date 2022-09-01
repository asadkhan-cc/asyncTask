import React from "react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();
  //   const data = {
  //     avatar: "https://reqres.in/img/faces/1-image.jpg",
  //     email: "george.bluth@reqres.in",
  //     first_name: "George",
  //     id: 1,
  //     last_name: "Bluth",
  //   };
  // console.log(props.data);
  const data = props.data;
  return (
    <div
      onClick={() => {
        navigate("profile/" + data.id);
      }}
    >
      <div className="text-left cursor-pointer w-[90%] relative mx-auto grid-cols-3 my-8 shadow-2xl rounded-lg py-5 hover:bg-zinc-100 hover:shadow-none">
        <div className="absolute top-[-50px] left-[50%] translate-x-[-50px] ">
          <img
            className="w-[100px] h-[100px]  rounded-full "
            src={data.avatar}
            alt={data.first_name}
          />
        </div>
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
  
      </div>
    </div>
  );
};

export default Card;
