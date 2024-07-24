import React from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  rules?: RegisterOptions;
  type?: string;
}

const Input: React.FC<InputProps> = ({ name, label, rules, type = "text" }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        {...register(name, rules)}
        type={type}
        className={`px-4 py-4 mt-1 block w-full rounded-lg border-2 ${
          errors[name] ? "border-red-500" : "border-gray-200"
        } focus:outline-none focus:border-gray-300 focus:ring-0 text-base sm:text-sm`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {(errors[name]?.message as string) || "Error"}
        </p>
      )}
    </div>
  );
};

export default Input;
