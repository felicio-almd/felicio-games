import React, { useEffect } from "react";
import "./Favorites.css";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../../firebase";

const Favorites = () => {
  const docRef = collection(db, "favorites");

  useEffect(() => {
    getDocSnap();
  }, []);

  async function getDocSnap() {
    const docSnap = await getDocs(docRef);
    docSnap.forEach((doc) => {
      console.log(doc.data());
    });
  }

  return (
    <section className="favorites">
      <h2 className="favorites__h2">Meus Favoritos</h2>
    </section>
  );
};

export default Favorites;
