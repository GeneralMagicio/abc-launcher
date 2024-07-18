import { type FC } from "react";

interface IButtonProps {
  children: React.ReactNode;
}

export const Button: FC<IButtonProps> = ({ children }) => {
  return (
    <button className="inline-block text-white font-bold text-xs border-none rounded-full bg-pink-500 py-4 px-10">
      {children}
    </button>
  );
};
