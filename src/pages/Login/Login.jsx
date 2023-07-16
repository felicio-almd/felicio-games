import React, { useEffect } from "react";
import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import logo from "../../../public/logo-games-felicio.svg";
import { UserAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberUser, setRememberUser] = useState(() => {
    const freshRememberUser = localStorage.getItem("save-user");
    return freshRememberUser ? freshRememberUser === "true" : false;
  });
  const [resetPasswordRequested, setResetPasswordRequested] = useState(false);

  const navigate = useNavigate();

  const { signIn, recovery } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      localStorage.setItem("user-email", email);
      localStorage.setItem("user-password", password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      if (error.message.includes("auth/user-not-found")) {
        setError("Usuário não encontrado!");
      } else if (error.message.includes("auth/wrong-password")) {
        setError("Senha Incorreta!");
      }
    }
  };

  const handleRemember = (event) => {
    setRememberUser(event.target.checked);
  };

  const handleResetPassword = () => {
    setResetPasswordRequested(true);

    recovery(email)
      .then(() => {
        console.log("Email de recuperação de senha enviado");
      })
      .catch((error) => {
        console.log(error);
        setError("Ocorreu um erro ao solicitar a recuperação de senha");
      });
  };

  const isEmailEmpty = email.trim() === "";
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (rememberUser) {
      const freshUserEmail = localStorage.getItem("user-email");
      const freshUserPassword = localStorage.getItem("user-password");
      if (freshUserEmail && freshUserPassword) {
        setEmail(freshUserEmail.toString());
        setPassword(freshUserPassword.toString());
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("save-user", rememberUser.toString());
  }, [rememberUser]);

  return (
    <div className="auth__page">
      <img
        className="header__logo__image__login"
        src={logo}
        alt="logo-gamesfelicio"
      />
      <div className="auth">
        <div className="back">
          <button className="back__button" onClick={handleGoBack}>
            <i className="fa-solid fa-angle-left"></i>
            Voltar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth__form">
          <h1 className="auth__title">Login</h1>
          {!resetPasswordRequested ? (
            <>
              <div className="auth__sign">
                <Input
                  placeholder="E-mail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                >
                  <i className="fa-regular fa-envelope "></i>
                </Input>

                <Input
                  placeholder="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                >
                  <i className="fa-solid fa-key"></i>
                </Input>
              </div>
              <div className="auth__remember">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  onChange={handleRemember}
                  checked={rememberUser}
                />
                <label htmlFor="remember">Lembrar</label>
              </div>

              <>
                {error ? <small className="auth__error">{error}</small> : null}
              </>

              <button className="auth__button" type="submit">
                Entrar
              </button>

              <button
                className="auth__forgot"
                onClick={handleResetPassword}
                disabled={isEmailEmpty || !isEmailValid}
              >
                Esqueceu sua senha?
              </button>
              <div className="auth__actions">
                <p>Não tem conta?</p>

                <Link to="/Register" className="auth__actions__link">
                  Registrar-se
                </Link>
              </div>
            </>
          ) : (
            <div className="auth__instructions">
              <p className="auth__instructions">
                Um email com instruções para redefinir sua senha foi enviado
                para o seu endereço de email.
              </p>

              <p>Retorne a Home por favor.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
