import "./styles.css";
import logo from "../../../public/logo-games-felicio.svg";
import home from "../../assets/home-button.svg";
import GenreItem from "../GenreItem";

// Componente de header que tem várias funcionalidades a serem utilizadas pelo usuário na página, o componente search é a children desse.

function Header({ genres, onChange, selectedGenre, children }) {
  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <header className="header">
      <div className="header__logo">
        <img
          className="header__logo__image"
          src={logo}
          alt="logo-gamesfelicio"
        />
        <h1 className="header__logo__title">Games Felicio</h1>
      </div>
      <button className="header__home__button" onClick={scrollTop}>
        <img className="header__home__logo" src={home} alt="home-button" />
      </button>

      {children}

      <div className="games__genre">
        {genres.map((genre, index) => (
          <GenreItem
            onChange={onChange}
            selectedGenre={selectedGenre}
            key={genre}
            genre={genre}
            index={index}
          />
        ))}
      </div>
    </header>
  );
}

export default Header;
