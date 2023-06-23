import { Component, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/logo-games-felicio.svg";
import home from "./assets/home-button.svg";

function App() {
  const [count, setCount] = useState(0);
  const [games, setGames] = useState([]);

  function getGames() {
    axios
      .get("https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/", {
        headers: {
          "dev-email-address": "feliciorar@gmail.com",
        },
        timeout: 5000,
      })
      .then((response) => {
        console.log(response.data);
        setGames((games) => (games = response.data));
      })
      .catch((error) => {
        const errorCode = error.response.status;
        if (
          errorCode == 500 ||
          errorCode == 502 ||
          errorCode == 503 ||
          errorCode == 504 ||
          errorCode == 507 ||
          errorCode == 508 ||
          errorCode == 509
        ) {
          alert("O servidor fahou em responder, tente recarregar a página");
        } else if (error.code === "ECONNABORTED") {
          console.log("O servidor demorou para responder, tente mais tarde");
        }
      });
  }

  useEffect(() => {
    getGames();
  }, []);

  return (
    <>
      <div className="body">
        <div>
          <header className="header">
            <div className="header__logo">
              <img
                className="header__logo__image"
                src={logo}
                alt="logo-gamesfelicio"
              />
              <h1 className="header__logo__title">Games Felicio</h1>
            </div>
            <button className="header__home__button">
              <img
                className="header__home__logo"
                src={home}
                alt="home-button"
              />
            </button>
            <input
              type="text"
              className="header__search__box"
              name=""
              placeholder="Digite aqui seu jogo..."
            ></input>
            <div className="games__genre">
              <input type="radio" id="All" name="filtro" value="All" />
              <label for="All">Todos</label>

              <input type="radio" id="shooter" name="filtro" value="shooter" />
              <label for="shooter">Tiro</label>

              <input type="radio" id="RPG" name="filtro" value="RPG" />
              <label for="RPG">RPG</label>

              <input
                type="radio"
                id="Fighting"
                name="filtro"
                value="Fighting"
              />
              <label for="Fighting">Luta</label>

              <input
                type="radio"
                id="battleRoyale"
                name="filtro"
                value="battleRoyale"
              />
              <label for="battleRoyale">Battle</label>

              <input type="radio" id="battle" name="filtro" value="battle" />
              <label for="battle">Batalha</label>
            </div>
          </header>
        </div>

        <div className="games__container">
          {games.length < 1 ? (
            <p>Ainda não existem jogos!</p>
          ) : (
            <div className="games__main">
              {games.map((game) => (
                <a
                  href={game.game_url}
                  target="_blank"
                  className="games__card"
                  key={game.id}
                >
                  <img
                    className="games__card__image"
                    src={game.thumbnail}
                    alt="thumb"
                  />
                  <div className="games__card__infos">
                    <strong className="games__card__title">{game.title}</strong>
                    <div className="games__sub__infos">
                      <small className="games__card__genre">{game.genre}</small>
                      <small className="games__card__dev">
                        {game.developer}
                      </small>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
