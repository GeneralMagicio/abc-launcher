// components/Input.tsx
import { useFormContext, RegisterOptions } from "react-hook-form";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
  rules?: RegisterOptions;
  maxLength?: number;
  showCounter?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  description,
  rules,
  type = "text",
  maxLength,
  showCounter = false,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  // Watch the current value for the counter
  const currentValue = watch(name) || "";

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative mt-1 mb-4">
        <input
          {...register(name, rules)}
          type={type}
          maxLength={maxLength}
          {...props}
          className={`px-4 py-4 block w-full rounded-lg border-2 ${
            errors[name]
              ? "border-red-500 focus:border-red-500"
              : "border-gray-200 focus:border-gray-300"
          } focus:outline-none focus:ring-0 text-base sm:text-sm ${
            props.className
          }`}
        />
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
        {errors[name] && (
          <p className="absolute text-red-500 text-xs -bottom-4">
            {(errors[name]?.message as string) || "Error"}
          </p>
        )}
        {showCounter && maxLength && (
          <div className="absolute right-2 top-1/2 py-1 px-2 transform -translate-y-1/2 flex items-center justify-center bg-gray-100 border rounded-full text-xs text-gray-400">
            {currentValue.length}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
