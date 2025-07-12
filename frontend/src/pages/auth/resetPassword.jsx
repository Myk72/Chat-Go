import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Lock } from "lucide-react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";

const ResetPassword = () => {
  const { id } = useParams();
  const { resetpassword } = useAuthStore();
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();

  const handleChange = async (data) => {
    const { password, confirmPassword } = data;
    if (confirmPassword !== password) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);

      try {
        setIsLoading(true);
        const response = await resetpassword(password, id);
        setIsLoading(false);
        if (response) {
          toast.success("Password reset successfully!", { duration: 2000 });
        }
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.error("Error resetting password:", error);
        setIsLoading(false);
        toast.error(
          error.response?.data?.detail ||
            "Failed to reset password. Please try again."
        );
      }
    }
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Processing...");
    } else {
      toast.dismiss();
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col gap-6 p-6 items-center bg-white w-full">
      <Toaster />
      <div className="flex flex-row gap-2 justify-between items-center font-serif font-bold w-full">
        <span className="bg-[#D6DDEB] h-[1px] w-1/4"></span>
        <div className="font-semibold text-xs lg:text-lg">
          RESET YOUR PASSWORD
        </div>
        <span className="bg-[#D6DDEB] h-[1px] w-1/4"></span>
      </div>
      <form
        className="flex flex-col gap-4 px-4 w-full"
        onSubmit={handleSubmit(handleChange)}
      >
        <div className="relative w-full">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
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
            placeholder="Enter new password"
            onChange={() => {
              setPasswordMismatch(false);
              form.clearErrors("password");
            }}
            className="border border-[#D6DDEB] rounded-xl p-2 pl-12 w-full"
          />
        </div>

        <div className="relative w-full">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirm Password is required",
              },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Confirm new password"
            onChange={() => {
              form.clearErrors("confirmPassword");
              setPasswordMismatch(false);
            }}
            className="border border-[#D6DDEB] rounded-xl p-2 pl-12 w-full"
          />
        </div>

        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
        {passwordMismatch && (
          <p className="text-red-500 text-sm">
            Passwords do not match. Please try again.
          </p>
        )}

        <button
          className="rounded-full bg-gray-600 text-white p-2 mt-4 w-full cursor-pointer"
          type="submit"
        >
          Confirm
        </button>
        <div className="flex flex-row text-sm justify-center text-gray-500 gap-1">
          <p>Go back to</p>
          <a href="/login" className="text-blue-500 font-bold">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
