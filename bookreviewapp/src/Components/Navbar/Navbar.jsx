import React from 'react';
import Logo from "../../assets/logobgremoved.png";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ROUTE_DEFAULT as USER_PROFILE_ROUTE} from "../../Pages/User Profile/Constants";
import { useSelector } from 'react-redux';
import { ROUTE_DEFAULT as HOME_ROUTE } from "../../Pages/Home/Constants";

const Navbar = () => {

  const params = useParams()
  const {userid} = params;
  const navigate = useNavigate();

  const logouthandle = async () => {
    const sendLogoutRequest = await fetch("http://localhost:5001/api/users/auth/logout",{
      method:"GET",
      credentials:'include'
    })

    if(sendLogoutRequest.status === 200){
      navigate("/")
    }

  } 
  return (
    <nav className="bg-white ">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="h-[80px] w-[80px]"
          />
          <div className="ml-4 flex items-center space-x-4">
            <Link
              to="/"
              className="text-[#223F7A] text-md font-semibold hover:bg-[#e6f0ff] px-2 py-7 rounded"
            >
              HOME
            </Link>
            <Link
              to={`/${HOME_ROUTE}/users/${userid}/${USER_PROFILE_ROUTE}`}
              className="text-[#223F7A] text-md font-semibold hover:bg-[#e6f0ff] px-2 py-7 rounded"
            >
              User Profile
            </Link>
          </div>
        </div>
        <button
          onClick={logouthandle} 
          className="bg-[#223F7A] text-white text-lg font-semibold px-4 py-2 rounded hover:bg-[#1a2a5a]"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
