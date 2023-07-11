import React from "react";
import "./styles.css";

const Input = ({ children, onChange, type, placeholder }) => {
  return (
    <div className="login__field">
      <input
        className="login__field__input"
        type={type}
        placeholder={placeholder}
        required
        onChange={onChange}
      />
      {children}
    </div>
  );
};

export default Input;
