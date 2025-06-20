import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import ErrorMessage from "@/components/ErrorMessage";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const { signup } = useAuthStore();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await signup(data);
      if (response) {
        alert("Signup successful! Please check your email for verification.");
        navigate("/verify-email", { state: { email: data.email } });
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center font-serif w-full p-6">
      <div className="items-center justify-center flex">
        <h1 className="text-3xl font-bold text-indigo-600">Signup to Today</h1>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-semibold">First Name</label>
              <input
                type="text"
                id="firstName"
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "First Name is required",
                  },
                })}
                placeholder="Enter First Name"
                onChange={() => clearErrors("firstName")}
                className="border border-[#D6DDEB] rounded-xl p-2 w-full"
              />
              {errors.firstName && (
                <ErrorMessage message={errors.firstName.message} />
              )}
            </div>
            <div className="space-y-2">
              <label className="font-semibold">Last Name</label>
              <input
                type="text"
                id="lastName"
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "Last Name is required",
                  },
                })}
                placeholder="Enter Last Name"
                onChange={() => clearErrors("lastName")}
                className="border border-[#D6DDEB] rounded-xl p-2 w-full"
              />
              {errors.lastName && (
                <ErrorMessage message={errors.lastName.message} />
              )}
            </div>
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
              onChange={() => clearErrors("email")}
              className="border border-[#D6DDEB] rounded-xl p-2 w-full"
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
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
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
          </div>
          <button
            className="border rounded-full bg-[#4640DE] text-white justify-center p-2 cursor-pointer"
            type="submit"
          >
            Register
          </button>
        </form>

        <div className="flex justify-center text-sm gap-1">
          Already have an account?
          <NavLink to="/login" className="font-semibold text-[#4640DE]">
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Signup;
