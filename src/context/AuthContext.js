'use client';

import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  return context;
};