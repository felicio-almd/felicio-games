import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  collection,
  addDoc,
  setDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

const ratingsCollection = collection(db, "ratings");
const favoritesCollection = collection(db, "favorites");

const FirestoreContext = createContext();

export const FirestoreContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState([]);

  const addFavorite = (gameId) => {
    return setDoc(doc(db, "favorites", gameId), { id: gameId });
  };

  const removeFavorite = (gameId) => {
    return deleteDoc(doc(db, "favorites", gameId));
  };

  const addRating = (gameId, ratingValue) => {
    return setDoc(doc(db, "ratings", gameId), {
      id: gameId,
      value: ratingValue,
    });
  };

  const removeRating = (gameId) => {
    return deleteDoc(doc(db, "ratings", gameId));
  };

  useEffect(() => {
    getDocs(favoritesCollection).then((docFavoriteSnap) => {
      const documents = docFavoriteSnap.docs.map((doc) => +doc.id);
      setFavorites(documents);
    });
    getDocs(ratingsCollection).then((docRatingSnap) => {
      const documents = docRatingSnap.docs.map((doc) => doc.data());
      setRatings(documents);
    });
  }, []);

  return (
    <FirestoreContext.Provider
      value={{
        addFavorite,
        removeFavorite,
        addRating,
        removeRating,
        favorites,
        ratings,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export const FirestoreActions = () => {
  return useContext(FirestoreContext);
};
