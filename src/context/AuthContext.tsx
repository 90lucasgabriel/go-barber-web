import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SigninCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  name: string;
  signin(signinCredentials: SigninCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const signin = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    console.log('response', response.data);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'Lucas', signin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
