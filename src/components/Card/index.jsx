import { useFavorites } from "../../hooks/useFavorites";
import { Icon } from "@iconify/react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

function Card({ game }) {
  const { favorites, addFavorite, deleteFavorite } = useFavorites();
  const { userAuth } = useAuthContext();
  
  // Verifica se o jogo está nos favoritos
  const isFavorite = favorites.some(fav => fav.gameId === game.id);
  const navigate = useNavigate();


  const handleFavoriteClick = (e) => {
    if (!userAuth) {
      navigate("/login");
    }
    e.preventDefault();
    if (isFavorite) {
      const favoriteToDelete = favorites.find(fav => fav.gameId === game.id);
      deleteFavorite(favoriteToDelete.id);
    } else {
      addFavorite(game.id);
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
        className={`favorite__button ${isFavorite ? "favorited" : ""}`}
      >
        {isFavorite ? ( 
          <Icon icon="material-symbols:favorite-rounded"></Icon>
          ) : (  
          <Icon icon="material-symbols:favorite-outline-rounded"></Icon> 
        )}
      </button>
    </div>
  );
}

export default Card;
