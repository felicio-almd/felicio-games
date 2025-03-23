import { useFavorites } from "../../hooks/useFavorites";
import { Icon } from "@iconify/react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useRatings } from "../../hooks/useRatings";

function Card({ game }) {
  const { favorites, addFavorite, deleteFavorite } = useFavorites();
  const { ratings, saveRating } = useRatings();
  const { userAuth } = useAuthContext();
  
  const isFavorite = favorites.some(fav => fav.gameId === game.id);
  const currentRating = ratings.find(r => r.gameId === game.id)?.rating || 0;
  const navigate = useNavigate();

  const handleRatingClick = (e, newRating) => {
    if (!userAuth) {
      navigate("/login");
      return;
    }
    e.preventDefault();
    
    // Verifica se está tentando remover a avaliação
    if (currentRating === newRating) {
      const existingRating = ratings.find(r => r.gameId === game.id);
      if (existingRating) {
        saveRating(game.id, newRating); // A função já trata a remoção
      }
    } else {
      saveRating(game.id, newRating);
    }
  };

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
      <div className="games__card">
        <a href={game.game_url} target="_blank" className="games__card__link" rel="noreferrer">
          <img className="games__card__image" src={game.thumbnail} alt="thumb" />
        </a>

        <div className="games__card__infos">
        <a href={game.game_url} target="_blank" className="games__card__link" rel="noreferrer">
          <strong className="games__card__title">
            {game.title}
          </strong>
          </a>

          <div className="buttons__rate">
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
              <div className="star__rating">
              {[1, 2, 3, 4].map((star) => (
                <button
                  key={star}
                  onClick={(e) => handleRatingClick(e, star)}
                  className={`star__button ${currentRating >= star ? 'active' : ''}`}
                >
                  <Icon
                    icon={
                      currentRating >= star
                        ? "material-symbols:star-rounded"
                        : "material-symbols:star-outline-rounded"
                    }
                  />
                </button>
              ))}
            </div>
          </div>
            
          <div className="games__sub__infos">
            <small className="games__card__genre">{game.genre}</small>
            <small className="games__card__dev">{game.developer}</small>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Card;
