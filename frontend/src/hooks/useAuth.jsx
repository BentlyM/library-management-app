import { createContext, useContext, useMemo } from 'react';
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage.js';

const AuthContext = createContext();

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, isLoading: false };
    case 'LOGIN_FAILURE':
      return { ...state, error: action.payload, isLoading: false };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [state, dispatch] = useReducer(authReducer, {
    ...initialState,
    user
  });
  const navigate = useNavigate();

  const login = async (data) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const response = await fetch('/api/db.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const userData = await response.json();
      dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      setUser(userData); // Save to local storage
      navigate('/profile');
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    setUser(null); // Remove from local storage
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user: state.user,
      isLoading: state.isLoading,
      error: state.error,
      login,
      logout,
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
