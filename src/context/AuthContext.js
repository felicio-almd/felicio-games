'use client';

import { createContext, useContext } from 'react';

// 1. Criação do contexto com valor inicial
export const AuthContext = createContext(null);

// 2. Hook personalizado para usar o contexto
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  return context;
};