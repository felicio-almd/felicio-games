import "./styles.css";

function Card({ game }) {
  return (
    <a href={game.game_url} target="_blank" className="games__card">
      <img className="games__card__image" src={game.thumbnail} alt="thumb" />
      <div className="games__card__infos">
        <strong className="games__card__title">{game.title}</strong>
        <div className="games__sub__infos">
          <small className="games__card__genre">{game.genre}</small>
          <small className="games__card__dev">{game.developer}</small>
        </div>
      </div>
    </a>
  );
}
export default Card;
