import { FC, ButtonHTMLAttributes } from "react";
import { Spinner } from "./Loading/Spinner";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

export const Button: FC<IButtonProps> = ({ children, loading, ...props }) => {
  return (
    <button
      {...props}
      className="inline-block text-white font-bold text-xs border-none rounded-full bg-pink-500 py-4 px-10 flex gap-2"
    >
      {loading && <Spinner size={16} />}
      {children}
    </button>
  );
};
