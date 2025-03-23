import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthProvider';
import { FavoritesProvider } from './hooks/useFavorites';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { RatingsProvider } from './hooks/useRatings';

function AppRoutes() {
  return (
    <AuthContextProvider>
      <FavoritesProvider>
        <RatingsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </RatingsProvider>
      </FavoritesProvider>
    </AuthContextProvider>
  );
}

export default AppRoutes;