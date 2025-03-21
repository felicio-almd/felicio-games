"use client";

import { useState } from "react";
import { signIn, signInWithGoogle } from "../../firebase/auth/signIn"; 
import logo from "../../../public/logo-games-felicio.svg";
import google_icon from "../../../public/google.png";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetPasswordRequested, setResetPasswordRequested] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        const firebaseError = error;
        console.error("Erro ao fazer login:", firebaseError);
        if (firebaseError.code === "auth/user-not-found") {
          setError("Usuário não encontrado!");
        } else if (firebaseError.code === "auth/wrong-password") {
          setError("Senha incorreta!");
        } else {
          setError("Erro ao fazer login. Tente novamente.");
        }
        setLoading(false);
        return;
      }

      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const { error } = await signInWithGoogle();

      if (error) {
        console.error("Erro ao fazer login com o Google:", error);
        setError("Erro ao logar com o Google. Tente novamente.");
        setLoading(false);
        return;
      }

      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error);
      setError("Erro ao logar com o Google. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setError("Por favor, insira seu e-mail para recuperar a senha.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      setResetPasswordRequested(true);
    } catch (error) {
      console.error("Erro ao solicitar recuperação de senha:", error);
      setError("Erro ao solicitar recuperação de senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const isEmailEmpty = email.trim() === "";
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="auth__page">
      <img
        className="header__logo__image__login"
        src={logo}
        alt="logo-gamesfelicio"
      />
      <div className="auth">
        <form onSubmit={handleSubmit} className="auth__form">
          <h1 className="auth__title">Login</h1>
          {!resetPasswordRequested ? (
            <>
              <div className="auth__sign">
                  <Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  >
                    <i className="fa-regular fa-envelope "></i>
                  </Input>
                  <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth__input"
                  >
                    <i className="fa-solid fa-key"></i>
                  </Input>
              </div>

              {error && <small className="auth__error">{error}</small>}

              <button className="auth__button" type="submit" disabled={loading}>
                {loading ? "Carregando..." : "Entrar"}
              </button>

              <button
                className="auth__forgot"
                onClick={handleResetPassword}
                disabled={isEmailEmpty || !isEmailValid || loading}
              >
                Esqueceu sua senha?
              </button>

              <div className="auth__actions">
                <p>Não tem conta?</p>
                <button
                  type="button"
                  className="auth__actions__link"
                  onClick={() => navigate("/register")}
                >
                  Registrar-se
                </button>
              </div>

              <button
                className="auth__google"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <img src={google_icon} alt="Google Logo" height={40} />
                Login com Google
              </button>
            </>
          ) : (
            <div className="auth__instructions">
              <p>
                Um email com instruções para redefinir sua senha foi enviado para
                o seu endereço de email.
              </p>
              <p>Retorne à Home, por favor.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;