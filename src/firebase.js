import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjQitrLrRKHtpqRkZ1xtrf6tdaHTiQjkY",
  authDomain: "games-felicio-auth.firebaseapp.com",
  projectId: "games-felicio-auth",
  storageBucket: "games-felicio-auth.appspot.com",
  messagingSenderId: "667286034550",
  appId: "1:667286034550:web:9f47fd70e7ff1f369f2757",
  measurementId: "G-0ZC1NZHT1V",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
