import React from "react";
import GoogleImg from "../../assets/images/google.png";
import facebookImg from "../../assets/images/facebook.png";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate("/auth/register");
  };

  return (
    <div className="max-w-[430px] border w-full p-[30px] rounded-md bg-white/30 shadow-lg">
      <div className="w-full">
        <header className="text-[28px] font-semibold text-[#232836] text-center">
          Login
        </header>
        <form className="mt-[30px]">
          <div className="relative h-[50px] w-full mt-[20px] rounded-md">
            <input
              type="email"
              placeholder="Email"
              className="h-full w-full text-base font-normal rounded-md outline-none px-[15px] border border-solid border-[#CACACA] focus:border-b-2"
            />
          </div>

          <div className="relative h-[50px] w-full mt-[20px] rounded-md">
            <input
              type="password"
              placeholder="Password"
              className="password h-full w-full text-base font-normal rounded-md outline-none px-[15px] border border-solid border-[#CACACA] focus:border-b-2"
            />
            <i className="bx bx-hide eye-icon absolute top-1/2 right-[10px] transform -translate-y-1/2 text-[18px] text-[#8b8b8b] cursor-pointer p-[5px]"></i>
          </div>

          <div className="text-center mt-[10px]">
            <Link
              to="/auth/forgot-password"
              className="text-[#0171d3] text-sm font-normal no-underline hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative h-[50px] w-full mt-[20px] rounded-md">
            <button className="h-full w-full border-none text-base font-normal rounded-md text-white bg-[#0171d3] transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#016dcb]">
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-[10px]">
          <span className="text-sm font-normal text-[#232836]">
            Don't have an account?{" "}
            <a
              className="text-[#0171d3] cursor-pointer no-underline hover:underline signup-link"
              onClick={handleSignupClick}
            >
              Signup
            </a>
          </span>
        </div>
      </div>

      {/* <div className="relative h-[1px] w-full my-[36px] bg-[#d4d4d4]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-[#8b8b8b] px-[15px]">
          Or
        </div>
      </div>

      <div className="w-full">
        <a
          href="#"
          className="flex items-center justify-center text-white bg-[#4267b2] h-[50px] w-full rounded-md relative"
        >
          <img
            src={facebookImg}
            alt="facebookImg"
            className="absolute top-1/2 left-[15px] transform -translate-y-1/2 h-[20px] w-[20px] object-cover"
          />
          <span>Login with Facebook</span>
        </a>
      </div>

      <div className="w-full mt-4">
        <a
          href="#"
          className="flex items-center justify-center border border-solid border-[#CACACA] h-[50px] w-full rounded-md relative"
        >
          <img
            src={GoogleImg}
            alt="GoogleImg"
            className="absolute top-1/2 left-[15px] transform -translate-y-1/2 h-[20px] w-[20px] object-cover"
          />
          <span className="font-medium opacity-60 text-[#232836]">
            Login with Google
          </span>
        </a>
      </div> */}
    </div>
  );
};

export default Login;
