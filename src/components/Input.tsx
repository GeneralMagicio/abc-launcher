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
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default Input;
