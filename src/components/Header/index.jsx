import "./styles.css";
import logo from "../../../public/logo-games-felicio.svg";
import GenreItem from "../GenreItem";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

function Header({ genres, onChange, selectedGenre, children }) {
  const { user, logOut } = UserAuth();

  const returnUser = () => {
    return user ? user.email : "usuario deslogado";
  };

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header className="header">
      <button className="header__logo" onClick={scrollTop}>
        <img
          className="header__logo__image"
          src={logo}
          alt="logo-gamesfelicio"
        />
        <h1 className="header__logo__title">Games Felicio </h1>
      </button>
      <div className="header__actions">
        <Link className="header__login__button" to="/login">
          <i className="fa-regular fa-circle-user"></i>
          <p>{returnUser()}</p>
        </Link>

        <button onClick={handleLogout}>LogOut</button>
      </div>

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
