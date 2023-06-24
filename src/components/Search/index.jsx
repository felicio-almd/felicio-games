import "./styles.css";

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
