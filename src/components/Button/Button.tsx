import { MouseEventHandler, ReactNode } from "react";
import "./Button.css";

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
}

const Button: React.FC<Props> = ({ onClick, children, className }) => {
  return (
    <button
      className={`hangmanButton${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
