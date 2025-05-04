import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = async (data) => {};
  return (
    <div className="flex flex-col gap-4 justify-center items-center font-serif">
      <div className="items-center justify-center flex">
        <h1 className="text-3xl font-bold text-indigo-600">Signup to Today</h1>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="space-y-2">
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              id="fullName"
              {...register("fullName", {
                required: {
                  value: true,
                  message: "Full Name is required",
                },
              })}
              placeholder="Enter Full Name"
              name="fullName"
              onChange={() => form.clearErrors("fullName")}
              className="border border-[#D6DDEB] rounded-xl p-2 w-full"
            />
          </div>
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
              onChange={() => form.clearErrors("email")}
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
                form.clearErrors("password");
              }}
              className="border border-[#D6DDEB] rounded-xl p-2 pl-12 w-full"
            />
          </div>
          <button
            className="border rounded-full bg-[#4640DE] text-white justify-center p-2 cursor-pointer"
            type="submit"
          >
            Register
          </button>
        </form>

        <div className="flex justify-center text-sm">
          Already have an account?{" "}
          <NavLink to="/login" className="font-semibold text-[#4640DE]">
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Signup;
