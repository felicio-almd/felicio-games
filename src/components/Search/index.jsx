import "./styles.css";

// Componente de busca de jogos que muda ao digitar. Tem o header como component parent

function Search({
  onChange,
  onFavoriteChange,
  favChecked,
  onRatedChange,
  rateChecked,
}) {
  return (
    <div className="header__filter">
      <input
        className="header__search__box"
        type="text"
        onChange={onChange}
        placeholder="Digite aqui seu jogo..."
      />

      <label className="header__filter__favorites">
        <input
          className="fav__check"
          type="checkbox"
          name="Favoritos"
          id="Favoritos"
          onChange={onFavoriteChange}
          checked={favChecked}
        />
        Favoritos
      </label>
    </div>
  );
}

export default Search;
