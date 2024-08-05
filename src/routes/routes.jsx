import ErrorPage from '../error-page';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import React from 'react';


const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />
  }
]

export default routes;