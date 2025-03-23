import { useFavorites } from "../../hooks/useFavorites";
import "./styles.css";

function Card({ game }) {
  const { favorites, addFavorite, deleteFavorite } = useFavorites();
  
  // Verifica se o jogo está nos favoritos
  const isFavorite = favorites.some(fav => fav.id === game.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Evita que o link seja acionado
    if (isFavorite) {
      // Encontra o favorito correspondente
      const favoriteToDelete = favorites.find(fav => fav.id === game.id);
      deleteFavorite(favoriteToDelete.id);
    } else {
      addFavorite(game);
    }
  };

  return (
    <div className="games__card">
      <a href={game.game_url} target="_blank" className="games__card" rel="noreferrer">
        <img className="games__card__image" src={game.thumbnail} alt="thumb" />

        <div className="games__card__infos">
          <strong className="games__card__title">{game.title}</strong>
            
          <div className="games__sub__infos">
            <small className="games__card__genre">{game.genre}</small>
            <small className="games__card__dev">{game.developer}</small>
          </div>
        </div>
      </a>
      
      {/* Botão da estrela */}
      <button 
        onClick={handleFavoriteClick}
        className="favorite-button"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: isFavorite ? 'gold' : 'gray'
        }}
      >
        {isFavorite ? '★' : '☆'}
      </button>
    </div>
  );
}

export default Card;
