import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col space-y-2">
      {label && <label className="text-[13px] text-slate-800">{label}</label>}

      <div className="input-box">
        <input
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={onChange} // No need for extra function wrapping
        />

        {type === "password" && (
          <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
            {showPassword ? (
              <FaRegEye size={22} className="text-primary" />
            ) : (
              <FaRegEyeSlash size={22} className="text-slate-400" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
