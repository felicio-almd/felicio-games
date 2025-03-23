import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  getDocs,
  doc,
  addDoc,
} from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";
import { firestore } from "../firebase/firebase";

// const ratingsCollection = collection(db, "ratings");
// const favoritesCollection = collection(db, "favorites");

const FavoritesContext = createContext();

export const FavoritesProvider = ( {children} ) => {
  const { userAuth } = useAuthContext();
  const [favorites, setFavorites] = useState([]);
  // const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userAuth) return;

      const userFavoritesRef = collection(firestore, "users", userAuth.uid, "favorites");
      const querySnapshot = await getDocs(userFavoritesRef);
      const loadedFavorites = [];
      querySnapshot.forEach((doc) => {
        loadedFavorites.push({ id: doc.id, ...doc.data() });
      });
      setFavorites(loadedFavorites);
    };

    fetchFavorites();
  }, [userAuth]);

  async function addFavorite(gameId) {
    if (!userAuth) return;

    const exists = favorites.some(fav => fav.gameId === gameId);
    if (exists) return;

    try {
      const userFavoritesRef = collection(firestore, "users", userAuth.uid, "favorites");
      const docRef = await addDoc(userFavoritesRef, {
        gameId, 
        createdAt: new Date().toISOString(), 
      });
      const newFavorite = {
        id: docRef.id, 
        gameId,
        createdAt: new Date().toISOString(), 
      };
      setFavorites([...favorites, newFavorite]);
    } catch (error) {
      console.error("Erro ao adicionar aos favoritos:", error);
    }
  }

  async function deleteFavorite(id) {
    if (!userAuth) return;

    try {
      const favoriteDocRef = doc(firestore, "users", userAuth.uid, "favorites", id);
      await deleteDoc(favoriteDocRef);
      setFavorites(favorites.filter(favorite => favorite.id !== id));
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, deleteFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites precisa ser usado dentro do contexto FavoritesProvider");
  }
  return context;
}


  // const addFavorite = (gameId) => {
  //   return setDoc(doc(db, "favorites", gameId), { id: gameId });
  // };

  // const removeFavorite = (gameId) => {
  //   return deleteDoc(doc(db, "favorites", gameId));
  // };

  // const addRating = (gameId, ratingValue) => {
  //   return setDoc(doc(db, "ratings", gameId), {
  //     id: gameId,
  //     value: ratingValue,
  //   });
  // };

  // const removeRating = (gameId) => {
  //   return deleteDoc(doc(db, "ratings", gameId));
  // };

  // useEffect(() => {
  //     getDocs(favoritesCollection).then((docFavoriteSnap) => {
  //     const documents = docFavoriteSnap.docs.map((doc) => +doc.id);
  //     setFavorites(documents);
  //   });
  //   getDocs(ratingsCollection).then((docRatingSnap) => {
  //     const documents = docRatingSnap.docs.map((doc) => doc.data());
  //     setRatings(documents);
  //   });
  // }, []);

//   return (
//     <FavoritesContext.Provider
//       value={{
//         addFavorite,
//         removeFavorite,
//         addRating,
//         removeRating,
//         favorites,
//         ratings,
//       }}
//     >
//       {children}
//     </FavoritesContext.Provider>
//   );
// };

// export const FirestoreActions = () => {
//   return useContext(FirestoreContext);
// };
