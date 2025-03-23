import "./styles.css";

function Search({ onChange, onFavoriteChange, favChecked }) {
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