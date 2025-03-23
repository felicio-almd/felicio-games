import firebaseConfig from "../firebase";
import { signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth(firebaseConfig);

export async function signIn(email, password) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }
    return { result, error };
}

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    let result = null,
        error = null;
    try {
        result = await signInWithPopup(auth, provider);
    } catch (e) {
        error = e;
    }
    return { result, error };
}