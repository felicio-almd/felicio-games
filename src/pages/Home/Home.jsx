import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import Search from "../../components/Search";
import "./Home.css";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
  const [showingFavorite, setShowingFavorite] = useState(false);

  const { userAuth } = useAuthContext();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const getGenres = () => {
    const uniqueGenres = [...new Set(games.map((game) => game.genre))];
    setGenres(["Todos", ...uniqueGenres]);
  };

  const getGames = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL, {
        headers: {
          "dev-email-address": "defensive00@gmail.com",
        },
        timeout: 5000,
      });
      setGames(response.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    setIsError(true);
    if (error.response) {
      const status = error.response.status;
      if ([500, 502, 503, 504, 507, 508, 509].includes(status)) {
        setErrorMessage("O servidor falhou em responder, tente recarregar a página");
      }
    } else if (error.code === "ECONNABORTED") {
      setErrorMessage("O servidor demorou para responder, tente mais tarde");
    } else {
      setErrorMessage("O servidor não conseguirá responder por agora, tente novamente mais tarde");
    }
  };

  const filterGames = () => {
    let filtered = games;

    // Filtro por gênero
    if (selectedGenre !== "Todos") {
      filtered = filtered.filter((game) => game.genre === selectedGenre);
    }

    // Filtro por busca
    if (search) {
      const searchTerm = search.toLowerCase();
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(searchTerm)
      );
    }

    // Filtro por favoritos
    if (showingFavorite && userAuth) {
      const favoriteIds = favorites.map((fav) => fav.gameId);
      filtered = filtered.filter((game) => favoriteIds.includes(game.id));
    }

    setFilteredGames(filtered);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setLimitGames(LIMIT_GAMES);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setLimitGames(LIMIT_GAMES);
  };

  const handleFavoriteToggle = (event) => {
    if(!userAuth){
      navigate("/login")
    }
    setShowingFavorite(event.target.checked);
    setLimitGames(LIMIT_GAMES);
  };

  const handleScroll = () => {
    setShowScrollButton(window.scrollY > 0);
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // effects
  useEffect(() => {
    getGames();
  }, []);

  useEffect(() => {
    filterGames();
  }, [games, selectedGenre, search, showingFavorite, favorites]);

  useEffect(() => {
    getGenres();
  }, [games]);

  useEffect(() => {
    let timeoutId;
    
    const scrollHandler = () => {
      handleScroll();
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
          setLimitGames((prev) => prev + 12);
        }
      }, 100);
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <div className="body">
      {games.length > 0 && (
        <Header
          genres={genres}
          onChange={handleGenreChange}
          selectedGenre={selectedGenre}
        >
          <Search
            onChange={handleSearchChange}
            onFavoriteChange={handleFavoriteToggle}
            favChecked={showingFavorite}
          />
        </Header>
      )}

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

      {showScrollButton && (
        <button className="scroll__top__button" onClick={scrollTop}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
}

export default Home;