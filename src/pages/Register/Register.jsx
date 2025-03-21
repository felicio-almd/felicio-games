import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../../public/logo-games-felicio.svg";
import Input from "../../components/Input";

import "./Register.css";
import signUp from "../../firebase/auth/signUp";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await signUp(email, password);
      // await createUser(email, password);
      if (error) {
        const firebaseError = error;
          console.error("Erro ao fazer cadastro:", firebaseError);
          setError("Erro ao fazer login. Tente novamente.");
          setLoading(false);
          return;
        }
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

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

            <Input
              placeholder="Confirmar senha"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            >
              <i className="fa-solid fa-lock"></i>
            </Input>
          </div>
          <>
            {password !== confirmPassword ? (
              <small className="auth__error__password__message">
                As senhas não coincidem
              </small>
            ) : null}
          </>

          <button
            disabled={password !== confirmPassword}
            className="auth__button"
            type="Submit"
          >
            Registrar-se
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
