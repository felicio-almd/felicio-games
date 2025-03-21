// import { Link } from "react-router-dom";
import logo from "../../../public/logo-games-felicio.svg";
import GenreItem from "../GenreItem";

import "./styles.css";

function Header({ genres, onChange, selectedGenre, children }) {

  // const userIsLogged = () => {
  //   return !!user;
  // };

  // const handleLogout = async () => {
  //   try {
  //     await logOut();
  //     window.location.reload();
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <header className="header">
      <div className="header__logo">
        <img
          className="header__logo__image"
          src={logo}
          alt="logo-gamesfelicio"
        />
        <h1 className="header__logo__title">Games Felicio </h1>
      </div>
      {/* <div className="header__actions">
        {userIsLogged() ? (
          <p className="header__actions__name">{user.email}</p>
        ) : (
          <Link className="header__login__button" to="/login">
            <i className="fa-regular fa-circle-user"></i>
            <p>Fazer Login</p>
          </Link>
        )}

        {userIsLogged() ? (
          <button onClick={handleLogout} className="header__logout__button">
            Sair
          </button>
        ) : null}
      </div> */}

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
