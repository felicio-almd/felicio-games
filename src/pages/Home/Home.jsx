import { useEffect, useState } from "react";
import { FirestoreActions } from "../../context/FirestoreContext";
import axios from "axios";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import Search from "../../components/Search";

import "./Home.css";

const LIMIT_GAMES = 12;

function Home() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [filteredGames, setFilteredGames] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [limitGames, setLimitGames] = useState(LIMIT_GAMES);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showingFavorite, setShowingFavorites] = useState(false);
  const [showingRated, setShowingRated] = useState(false);

  const { favorites, ratings } = FirestoreActions();

  function getGenres() {
    const uniqueGenres = [...new Set(games.map((game) => game.genre))];
    setGenres(["Todos", ...uniqueGenres]);
  }

  async function getGames() {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL, {
        headers: {
          "dev-email-address": "defensive00@gmail.com",
        },
        timeout: 5000,
      });
      setGames(response.data);
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (
          status == 500 ||
          status == 502 ||
          status == 503 ||
          status == 504 ||
          status == 507 ||
          status == 508 ||
          status == 509
        ) {
          setIsError(true);
          setErrorMessage(
            "O servidor falhou em responder, tente recarregar a página"
          );
        }
      } else if (error.code === "ECONNABORTED") {
        setIsError(true);
        setErrorMessage("O servidor demorou para responder, tente mais tarde");
      } else {
        setIsError(true);
        setErrorMessage(
          "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde"
        );
      }
    }
  }

  // Essa constante é feita para que quando esteja selecionado um genero especifico e a busca seja utilizada, só aparece jogos que estão no genero selecionado.
  const filterGames = (genre, search, favorites, userIsLogged) => {
    let filtered;
    if (
      genre === "Todos" &&
      search === "" &&
      (!userIsLogged || favorites.length === 0)
    ) {
      filtered = games;
    } else {
      filtered = games.filter((game) => {
        const matchesGenre = genre === "Todos" || game.genre === genre;
        const matchesSearchTerm =
          search === "" ||
          game.title.toLowerCase().includes(search.toLowerCase());
        const isFavorited = userIsLogged && favorites.includes(game.id);
        return (
          matchesGenre && matchesSearchTerm && (!userIsLogged || isFavorited)
        );
      });
    }
    setFilteredGames(filtered);
  };

  const filterGamesById = (ids, games) => {
    const filteredGames = games.filter((game) => {
      return ids.includes(game.id);
    });

    return filteredGames;
  };

  const favoritedGames = filterGamesById(favorites, games);

  const handleFavorite = (event) => {
    setShowingFavorites(event.target.checked);
  };

  // Função para atualizar de qual genero irá aparecer jogos na página
  const handleGenreChange = (event) => {
    const genre = event.target.value;
    setShowingFavorites(false);
    setSelectedGenre(genre);
    setLimitGames(LIMIT_GAMES);
    filterGames(genre, search);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);
    setLimitGames(LIMIT_GAMES);
    filterGames(selectedGenre, searchTerm);
  };

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleScroll() {
    setShowScrollButton(window.scrollY > 0);
  }

  useEffect(() => {
    getGames();
  }, []);

  useEffect(() => {
    filterGames(selectedGenre, search);
  }, [games, selectedGenre, search]);

  useEffect(() => {
    getGenres();
  }, [games]);

  useEffect(() => {
    function bottomPageVerify() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setLimitGames((limitGames) => limitGames + 12);
      }
    }

    function scrollHandler() {
      handleScroll();
      bottomPageVerify();
    }

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      <div className="body">
        {games.length < 1 ? null : (
          <Header
            genres={genres}
            onChange={handleGenreChange}
            selectedGenre={selectedGenre}
          >
            <Search
              onChange={handleSearchChange}
              onFavoriteChange={handleFavorite}
              // onRatedChange={handleRated}
              favChecked={showingFavorite}
              // rateChecked={showingRated}
            />
          </Header>
        )}

        {showingFavorite ? (
          <div className="games__container">
            <div className="games__main">
              {favoritedGames.map((game) => (
                <Card key={game.id} game={game} />
              ))}
            </div>
          </div>
        ) : (
          <div className="games__container">
            {games.length < 1 ? (
              <div className="games__container__message">
                {isError ? (
                  <p className="error-message"> {errorMessage} </p>
                ) : (
                  <Loader />
                )}
              </div>
            ) : (
              <div className="games__main">
                {filteredGames.length < 1 ? (
                  <div className="error-message">Nenhum Jogo Encontrado</div>
                ) : (
                  filteredGames
                    .slice(0, limitGames)
                    .map((game) => <Card key={game.id} game={game} />)
                )}
              </div>
            )}
          </div>
        )}

        {games.length < 1 ? null : (
          <>
            {showScrollButton && (
              <button className="scroll__top__button" onClick={scrollTop}>
                <i className="fa-solid fa-arrow-up"></i>
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Home;
