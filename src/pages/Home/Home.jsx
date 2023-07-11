import { Component, useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import Search from "../../components/Search";
import Footer from "../../components/Footer";
import Favorites from "../../components/Favorites";
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

  // utilizado o hook de usestate para que os componentes possam ter estado, a interface é atualizada de forma adequada, posso atribuir valor a cada variavel e gerenciar facilmente esses estados com base em interações.

  function getGenres() {
    // nessa função é setado os generos dos jogos para que seja feito a label com os generos dentro da pagina
    const uniqueGenres = [...new Set(games.map((game) => game.genre))];
    setGenres(["Todos", ...uniqueGenres]);
  }

  // Nessa função, o programa busca na API os dados necessários para que depois os jogos sejam mostrados
  //  Para que ela funcione melhor, tem programação assincrona, quando se fala em promises, temos a promessa que esses dados chegarão e a função trabalha em cima disso, caso não chegarem, mostra um erro.

  // o async/await trás uma sintaxe melhor, trabalha com uma promise por vez e tem boa performance

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
  const filterGames = (genre, search) => {
    let filtered;
    if (genre === "Todos" && search === "") {
      filtered = games;
    } else {
      filtered = games.filter((game) => {
        const matchesGenre = genre === "Todos" || game.genre === genre;
        const matchesSearchTerm =
          search === "" ||
          game.title.toLowerCase().includes(search.toLowerCase());
        return matchesGenre && matchesSearchTerm;
      });
    }
    setFilteredGames(filtered);
  };

  // Função para atualizar de qual genero irá aparecer jogos na página
  const handleGenreChange = (event) => {
    const genre = event.target.value;
    setSelectedGenre(genre);
    setLimitGames(LIMIT_GAMES);
    filterGames(genre, search);
  };

  // Função para atualizar o estado do termo de pesquisa
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);
    setLimitGames(LIMIT_GAMES);
    filterGames(selectedGenre, searchTerm);
  };

  // Com os useEffects é passado para o react que meu componente precisa se executar e não renderizar e podendo lidar com manipulação de API ou coisas que não são ligadas diretamente a componentização
  // Eles só são passados após as funções serem renderizadas
  useEffect(() => {
    getGames();
  }, []);

  useEffect(() => {
    filterGames(selectedGenre, search);
  }, [games, selectedGenre, search]);

  useEffect(() => {
    getGenres();
  }, [games]);

  // esse efeito é hook de scroll infinito, onde a página mostra 12 jogos por vezes e carrega de acordo o scroll
  useEffect(() => {
    function bottomPageVerify() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setLimitGames((limitGames) => limitGames + 12);
      }
    }
    window.addEventListener("scroll", bottomPageVerify);
    return () => {
      window.removeEventListener("scroll", bottomPageVerify);
    };
  });

  // retorno que aparece ná pagina, nela foi utilizado a componentização separando o header, a página de loader e a parte que aparecerá os jogos.
  return (
    <>
      <div className="body">
        {games.length < 1 ? null : (
          <Header
            genres={genres}
            onChange={handleGenreChange}
            selectedGenre={selectedGenre}
          >
            <Search onChange={handleSearchChange} />
            {/* <Favorites /> */}
          </Header>
        )}

        <div className="games__container">
          {games.length < 1 ? (
            <div>
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
        {games.length < 1 ? null : <Footer />}
      </div>
    </>
  );
}

export default Home;
