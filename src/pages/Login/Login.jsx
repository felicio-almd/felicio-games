import React from "react";
import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import logo from "../../../public/logo-games-felicio.svg";
import { UserAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
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
        <form onSubmit={handleSubmit} className="auth__form">
          <h1 className="auth__title">Login</h1>
          <div className="auth__sign">
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

          <button className="auth__button" type="submit">
            Entrar
          </button>
          {/* {error && (
            <span className="auth__wrong">Email ou senha incorretos!</span>
          )} */}
          <div>
            <button href="#" className="auth__remember">
              Esqueceu sua senha?
            </button>
          </div>
          <div className="auth__actions">
            <p>Não tem conta?</p>

            <Link to="/Register" className="auth__actions__link">
              Registrar-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
