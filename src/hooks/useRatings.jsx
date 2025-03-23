// src/hooks/useRatings.js
import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";
import { firestore } from "../firebase/firebase";

const RatingsContext = createContext();

export const RatingsProvider = ({ children }) => {
  const { userAuth } = useAuthContext();
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      if (!userAuth) return;

      const userRatingsRef = collection(firestore, "users", userAuth.uid, "ratings");
      const querySnapshot = await getDocs(userRatingsRef);
      const loadedRatings = [];
      querySnapshot.forEach((doc) => {
        loadedRatings.push({ id: doc.id, ...doc.data() });
      });
      setRatings(loadedRatings);
    };

    fetchRatings();
  }, [userAuth]);

  async function saveRating(gameId, newRating) {
    if (!userAuth) return;
  
    try {
      const existingRating = ratings.find(r => r.gameId === gameId);
      
      if (existingRating) {
        if (existingRating.rating === newRating) {
          await deleteRating(existingRating.id);
          return;
        }
        
        const ratingDocRef = doc(firestore, "users", userAuth.uid, "ratings", existingRating.id);
        await setDoc(ratingDocRef, { rating: newRating }, { merge: true });
        
        setRatings(ratings.map(r => 
          r.id === existingRating.id ? { ...r, rating: newRating } : r
        ));
      } else {
        const userRatingsRef = collection(firestore, "users", userAuth.uid, "ratings");
        const docRef = await addDoc(userRatingsRef, {
          gameId,
          rating: newRating,
          createdAt: new Date().toISOString(),
        });
        
        const newRatingObj = {
          id: docRef.id,
          gameId,
          rating: newRating,
          createdAt: new Date().toISOString(),
        };
        setRatings([...ratings, newRatingObj]);
      }
    } catch (error) {
      console.error("Erro ao salvar avaliação:", error);
    }
  }

  async function deleteRating(id) {
    if (!userAuth) return;

    try {
      const ratingDocRef = doc(firestore, "users", userAuth.uid, "ratings", id);
      await deleteDoc(ratingDocRef);
      setRatings(ratings.filter(rating => rating.id !== id));
    } catch (error) {
      console.error("Erro ao remover avaliação:", error);
    }
  }

  return (
    <RatingsContext.Provider value={{ ratings, saveRating, deleteRating }}>
      {children}
    </RatingsContext.Provider>
  );
}

export function useRatings() {
  const context = useContext(RatingsContext);
  if (!context) {
    throw new Error("useRatings deve ser usado dentro de RatingsProvider");
  }
  return context;
}