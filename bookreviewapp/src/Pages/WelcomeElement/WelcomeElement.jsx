import React from 'react'
import Logo from "../../assets/logobgremoved.png";
import { Link, redirect } from "react-router-dom";
import {ROUTE_DEFAULT as LOGIN_PAGE_ROUTE} from "../Login/Constants";

export default function WelcomeElement() {
  return (
    <div
    className="min-h-screen flex items-center justify-center bg-cover"
    style={{
      backgroundImage:
        "url('https://foodtank.com/wp-content/uploads/2021/07/alfons-morales-YLSwjSy7stw-unsplash.jpg')",
    }}
  >
    <div className="bg-white bg-opacity-65 pb-10 pl-10 pr-10 rounded-lg shadow-lg w-[400px] h-[400px] flex flex-col items-center justify-start">
      <div className="mb-2">
        <img src={Logo} alt="Logo" className="h-[270px]  object-contain" />
        <div className="mb-8 text-center mt-[-20px]">
          <h2 className="text-xl text-[#223F7A] font-bold m-0">
            Login To Review Books
          </h2>
        </div>
      </div>

      <div className="w-8/12 ">
        <Link to={`${LOGIN_PAGE_ROUTE}`} className="w-[100%]">
          <button className="bg-[#223F7A] hover:opacity-95 text-white font-bold py-2 px-4 w-[100%] rounded">
            Login
          </button>
        </Link>
      </div>
    </div>
  </div>
  )
}

export const welcomeAuthLoader = async ({ request, params }) => {
  
  const response = await fetch("https://book-review-platform-qfuv.vercel.app/api/users/auth/status", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });


  if (response.status === 403) {
    return redirect(`/loginpage`);
  }

  if (response.status === 200) {
    const data = await response.json();

    const { userid } = data;
    return redirect(`/home/users/${userid}`);
  }

return null;
};