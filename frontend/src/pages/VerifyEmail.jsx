import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import ErrorMessage from "@/components/ErrorMessage";
import { MdEmail } from "react-icons/md";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const [resendMessage, setResendMessage] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const { error, verifyEmail, resendVerification, loading } = useAuthStore();

  const handleInputChange = (value, index) => {
    const updatedCode = [...code];

    if (value.length > 1) {
      const characters = value.slice(0, 6 - index).split("");
      characters.forEach((char, i) => {
        updatedCode[index + i] = char;
        if (inputRef.current[index + i + 1]) {
          inputRef.current[index + i + 1].focus();
        }
      });
    } else {
      updatedCode[index] = value;
      if (value && inputRef.current[index + 1]) {
        inputRef.current[index + 1].focus();
      }
    }

    setCode(updatedCode);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationToken = code.join("");

    try {
      const response = await verifyEmail(verificationToken, email);
      if (response) {
        alert("Email verified successfully!");
        navigate("/login");
      }
    } catch {
      console.error("Verification error:", error);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    try {
      await resendVerification(email);
      setResendMessage(true);
    } catch {
      console.error("Resend error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <MdEmail size={48} className="mx-auto" />
      <div className="flex items-center gap-2 w-full font-serif font-bold ">
        <span className="flex-grow h-[1px] bg-[#D6DDEB]"></span>
        <div>VERIFICATION</div>
        <span className="flex-grow h-[1px] bg-[#D6DDEB]"></span>
      </div>

      <p className="text-center text-[#7C8493]">
        We've sent a 6-digit verification code to your email. Please enter it
        below.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full items-center"
      >
        <div className="flex gap-3 justify-center">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRef.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              placeholder="_"
              maxLength={6}
              required
              className="text-4xl text-center border-2 border-[#4640DE] border-opacity-40 bg-[#F8F8FD] rounded-xl w-12 h-14 focus:outline-none"
            />
          ))}
        </div>

        <button
          type="submit"
          className="bg-[#4640DE] text-white rounded-full px-6 py-2 font-semibold hover:bg-indigo-700 transition cursor-pointer"
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            </div>
          ) : (
            "Verify"
          )}
        </button>
      </form>

      {resendMessage && (
        <div className="text-green-500 font-semibold text-center">
          New verification code sent!
        </div>
      )}
      {error && <ErrorMessage message={error} />}

      <div className="flex flex-col gap-2 items-center text-sm text-[#7C8493] mt-2">
        <p>
          Didn't receive the code?{" "}
          <button
            onClick={handleResend}
            className="text-[#4640DE] font-bold ml-1 hover:underline cursor-pointer"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
