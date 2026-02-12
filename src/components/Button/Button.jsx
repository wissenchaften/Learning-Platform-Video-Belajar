import React from "react";
import "./Button.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary, secondary, danger, outline
  size = "md", // sm, md, lg
  fullWidth = false,
  className = "", // untuk tambahan styling khusus dari luar
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? "btn-full" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
