import "./styles.css";
import logo from "../../../public/logo-games-felicio.svg";

// Componente de rodapé de pagina

function Footer() {
  return (
    <footer className="footer">
      <img className="footer__logo__image" src={logo} alt="logo-gamesfelicio" />
      <h1>Games Felicio</h1>
      <p className="footer__links">
        <a
          className="footer__social"
          href="https://www.linkedin.com/in/fel%C3%ADcio-rodney-almeida-rocha-230930204/"
          target="_blank"
        >
          LinkedIn
        </a>
        <a
          className="footer__social"
          href="https://github.com/felicio-almd"
          target="_blank"
        >
          GitHub
        </a>
        <a
          className="footer__social"
          href="mailto:feliciorar@gmail.com"
          target="_blank"
        >
          E-Mail
        </a>
      </p>
      <p className="copyright">&copy; Copyright Felicio Almeida - 2023</p>
    </footer>
  );
}

export default Footer;
