import logo from "../../../public/logo-games-felicio.svg";
import "./styles.css";

// Componente de rodapé de pagina

function Footer() {
  return (
    <footer className="footer">
      <img className="footer__logo__image" src={logo} alt="logo-gamesfelicio" />
      <h1>Games Felicio</h1>
      <ul className="footer__links">
        <li>
          <a
            className="footer__social"
            href="https://www.linkedin.com/in/fel%C3%ADcio-rodney-almeida-rocha-230930204/"
            target="_blank"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            className="footer__social"
            href="https://github.com/felicio-almd"
            target="_blank"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            className="footer__social"
            href="mailto:feliciorar@gmail.com"
            target="_blank"
          >
            E-Mail
          </a>
        </li>
      </ul>
      <p className="copyright">&copy; Copyright Felicio Almeida - 2023</p>
    </footer>
  );
}

export default Footer;
