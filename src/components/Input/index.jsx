import React from "react";
import { useState } from "react";
import "./styles.css";

const Input = ({ children, onChange, type, placeholder, value }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const showPassword = () => {
    setPasswordType(isShowing ? "password" : "text");
    setIsShowing(!isShowing);
  };

  return (
    <div className="login__field">
      {children}
      <input
        className="login__field__input"
        type={type !== "password" ? type : passwordType}
        placeholder={placeholder}
        required
        onChange={onChange}
        minLength="6"
        value={value}
      />

      {type === "password" ? (
        <a className="password__show" onClick={showPassword}>
          {isShowing ? (
            <i className="fa-regular fa-eye-slash"></i>
          ) : (
            <i className="fa-regular fa-eye"></i>
          )}
        </a>
      ) : null}
    </div>
  );
};

export default Input;
