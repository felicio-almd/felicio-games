import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import logo from "../../../public/logo-games-felicio.svg";
import "./Register.css";
import { UserAuth } from "../../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="auth__page">
      <img className="header__logo__image" src={logo} alt="logo-gamesfelicio" />

      <div className="auth">
        <div className="back">
          <button className="back__button" onClick={handleGoBack}>
            <i className="fa-solid fa-angle-left"></i>
            Voltar
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <h1 className="auth__title">Inscreva-se com</h1>
          <div className="auth__register">
            <Input
              placeholder="E-mail"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            >
              <i className="fa-regular fa-envelope "></i>
            </Input>
            <Input
              placeholder="Senha"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            >
              <i className="fa-solid fa-key"></i>
            </Input>
          </div>

          <button className="auth__button" type="Submit">
            Registrar-se
          </button>
          {/* {error && (
            <span className="auth__wrong">Email ou senha incorretos!</span>
          )} */}
        </form>
      </div>
    </div>
  );
};
export default Register;
