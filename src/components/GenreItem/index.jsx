import "./styles.css";

function GenreItem({ genre, onChange, selectedGenre, index }) {
  return (
    <>
      <input
        type="radio"
        id={genre}
        name="filtro"
        value={genre}
        onChange={onChange}
        checked={
          index === 0 ? selectedGenre === "Todos" : selectedGenre === genre
        }
      />
      <label htmlFor={genre}>{genre}</label>
    </>
  );
}

export default GenreItem;
