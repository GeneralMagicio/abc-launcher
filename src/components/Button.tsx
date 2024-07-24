import { FC, ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: FC<IButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="inline-block text-white font-bold text-xs border-none rounded-full bg-pink-500 py-4 px-10"
    >
      {children}
    </button>
  );
};
