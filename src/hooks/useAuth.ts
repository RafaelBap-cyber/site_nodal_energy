import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    isLoading: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token');
      
      if (!token) {
        setAuthState({
          isAuthenticated: false,
          token: null,
          isLoading: false,
        });
        return;
      }

      try {
        // Em desenvolvimento, aceitar token mockado
        if (token === 'mock-jwt-token-for-development') {
          setAuthState({
            isAuthenticated: true,
            token,
            isLoading: false,
          });
          return;
        }

        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.success) {
          setAuthState({
            isAuthenticated: true,
            token,
            isLoading: false,
          });
        } else {
          localStorage.removeItem('admin_token');
          setAuthState({
            isAuthenticated: false,
            token: null,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Erro ao verificar token:', error);
        localStorage.removeItem('admin_token');
        setAuthState({
          isAuthenticated: false,
          token: null,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  const login = (token: string) => {
    localStorage.setItem('admin_token', token);
    setAuthState({
      isAuthenticated: true,
      token,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setAuthState({
      isAuthenticated: false,
      token: null,
      isLoading: false,
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
};
