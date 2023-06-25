import "./styles.css";

// Componente de busca de jogos que muda ao digitar. Tem o header como component parent

function Search({ onChange }) {
  return (
    <input
      className="header__search__box"
      type="text"
      onChange={onChange}
      placeholder="Digite aqui seu jogo..."
    />
  );
}

export default Search;
