//custom hooks are cool be cool kids HaHahA

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

/**
 * Reducer function for authentication state.
 *
 * @param {Object} state - The current authentication state.
 * @param {Object} action - The action to apply to the state.
 * @returns {Object} The new authentication state.
 */

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

/**
 * Provider component for the authentication context.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to render.
 */

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const login = async (data) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      // Call API to authenticate user
      const response = await fetch('MONGOOSE OR SOMETHING RAH', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const userData = await response.json();
      dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      setUser(userData);
      navigate('/profile');
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    setUser(null);
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
    [user] // or maybe state would be better?
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


/**
 * Hook to access the authentication context.
 * 
 * @returns {Object} The authentication context value.
 */

export const useAuth = () => {
  return useContext(AuthContext);
};
