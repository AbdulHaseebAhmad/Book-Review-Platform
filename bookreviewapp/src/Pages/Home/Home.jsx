import React, {useEffect} from "react";
import { Link, redirect } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Cards } from "./Constants";
import axios from "axios";
import { ROUTE_DEFAULT as LOGIN_PAGE_ROUTE } from "../Login/Constants";
import { getUserProfile } from "../../Redux/User Profile/userprofileactions";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const userprofile = useSelector((state) => state.userProfile);
  console.log(userprofile)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
    window.scrollTo({ top: 0, behavior: "smooth" });

  }, []);
  return (
    <div className="w-full">
      <div className="w-full bg-[#e8f2f2] flex justify-start items-start pl-10 pt-14 h-[170px]">
        <h2 className="text-[#223F7A] text-2xl md:text-4xl font-bold text-center px-4">
          Hi, {userprofile.data.username}!
        </h2>
      </div>

      {/* Card container with responsive width */}
      <div className="py-8 px-4 md:px-8 mt-5 w-full md:w-5/6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 py-11">
          {Cards.map(({ id, content, cardname, link }) => {
            return (
              <div
                className="bg-white p-6 rounded-lg shadow-lg min-h-[180px]"
                key={id}
              >
                <h3 className="text-[#223F7A] font-extrabold text-2xl font-semibold mb-2">
                  {cardname}
                </h3>
                <p className="text-[#223F7A] mb-8">{content}</p>
                <Link to={link}>
                  <div className="w-[40px] h-[40px] bg-[#FF6600] flex justify-center items-center">
                    <FaLongArrowAltRight style={{ color: "white" }} />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

export const homeAuthloaders = async ({ request, params }) => {
  const response = await fetch("http://localhost:5001/api/users/auth/status", {
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
    return null;
  }

  return null;
};
