import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FirestoreActions } from "../../context/FirestoreContext";
import { UserAuth } from "../../context/AuthContext";

import "./styles.css";

function Card({ game }) {
  const {
    addFavorite,
    removeFavorite,
    favorites,
    ratings,
    removeRating,
    addRating,
  } = FirestoreActions();
  const { user } = UserAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [stars, setStars] = useState(0);

  const userIsLogged = () => {
    return !!user;
  };

  const verifyGameIsInFavorite = () => {
    return favorites.includes(game.id);
  };

  const handleRate = async (ratingValue) => {
    try {
      await addRating(game.id.toString(), ratingValue);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetStar = (selectedRating, event) => {
    event.preventDefault();
    setStars(selectedRating);
    handleRate(selectedRating);
  };

  const handleRemoveRate = async (event) => {
    event.preventDefault();
    try {
      await removeRating(game.id.toString());
      setStars(0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFav = async (event) => {
    event.preventDefault();
    try {
      if (isFavorite) {
        await removeFavorite(game.id.toString());
      } else {
        await addFavorite(game.id.toString());
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  useEffect(() => {
    setIsFavorite(verifyGameIsInFavorite());
    const verifyRateCount = async () => {
      if (userIsLogged) {
        const found = await ratings.find(
          (element) => element.id === game.id.toString()
        );
        if (found) {
          setStars(found.value);
        } else {
          setStars(0);
        }
      }
    };
    verifyRateCount();
  }, []);

  return (
    <div className="games__card">
      <a href={game.game_url} target="_blank" className="games__card">
        <img className="games__card__image" src={game.thumbnail} alt="thumb" />
        {userIsLogged() ? (
          <button onClick={handleFav} className="games__card__button">
            {isFavorite ? "❤️ " : "🤍 "}
          </button>
        ) : (
          <Link to="/login" className="games__card__button">
            {isFavorite ? "❤️ " : "🤍 "}
          </Link>
        )}

        <div className="games__card__infos">
          <strong className="games__card__title">{game.title}</strong>
          {userIsLogged() ? (
            <div className="games__card__rating">
              <div className="star-rating">
                {[1, 2, 3, 4].map((star) => {
                  return (
                    <button
                      key={star}
                      className="star-rating__button"
                      onClick={(event) => {
                        handleSetStar(star, event);
                      }}
                    >
                      <span
                        className={`${
                          star <= stars ? "on" : "off"
                        } star-rating__button__star`}
                      >
                        &#9733;
                      </span>
                    </button>
                  );
                })}
              </div>
              <button className="rate__remove" onClick={handleRemoveRate}>
                Remover estrelas
              </button>
            </div>
          ) : (
            <Link to="/login" className="games__card__rating">
              <div className="star-rating">
                {[1, 2, 3, 4].map((star) => {
                  return (
                    <button key={star} className="star-rating__button">
                      <span
                        className={`${
                          star <= stars ? "on" : "off"
                        } star-rating__button__star`}
                      >
                        &#9733;_
                      </span>
                    </button>
                  );
                })}
              </div>
            </Link>
          )}

          <div className="games__sub__infos">
            <small className="games__card__genre">{game.genre}</small>
            <small className="games__card__dev">{game.developer}</small>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Card;
