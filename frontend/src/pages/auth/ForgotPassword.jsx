import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = ({setForgotPasswordIsOpen}) => {
  const { forgotpassword, loading } = useAuthStore();
  const [email, setEmail] = useState("");

  return (
    <>
      <div className="flex flex-col gap-2 font-serif">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          className="py-2 px-3 border rounded-xl border-black"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <Button
        variant={"default"}
        className={"bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"}
        onClick={async () => {
          try {
            const resp = await forgotpassword(email);
            if (resp.data) {
              toast.success("Reset link sent to your email!");
            }
            setTimeout(() => {
              setForgotPasswordIsOpen(false);
            }, 2000);
          } catch {
            toast.error("Failed to send reset link. Please try again.");
          }
        }}
      >
        Send Reset Link
      </Button>
    </>
  );
};

export default ForgotPassword;
