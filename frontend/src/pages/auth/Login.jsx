import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    try {
      const resp = await login(data);
      if (resp) {
        navigate("/chat");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };
  return (
    <div className="flex flex-col gap-3 justify-center items-center font-serif w-full p-6">
      <div className="items-center justify-center flex">
        <h1 className="text-3xl font-bold text-indigo-600">Welcome Back</h1>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="space-y-2">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid Email",
                },
              })}
              placeholder="Enter email address"
              name="email"
              onChange={() => clearErrors("email")}
              className="border border-[#D6DDEB] rounded-xl p-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter password"
              onChange={() => {
                clearErrors("password");
              }}
              className="border border-[#D6DDEB] rounded-xl p-2 w-full"
            />
          </div>
          <div className="flex justify-center text-[#4640DE] text-sm">
            <NavLink className="font-semibold" to="/forgot_password">
              Forgot Password?
            </NavLink>
          </div>
          <button
            className="border rounded-full bg-[#4640DE] text-white justify-center p-2 cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </form>

        <div className="flex justify-center text-sm gap-1">
          Don't have account?
          <NavLink to="/signup" className="font-semibold text-[#4640DE]">
            Signup
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
