import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { FirestoreContextProvider } from "./context/FirestoreContext";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function AppRoutes() {
  return (
    <AuthContextProvider>
      <FirestoreContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </BrowserRouter>
      </FirestoreContextProvider>
    </AuthContextProvider>
  );
}

export default AppRoutes;
