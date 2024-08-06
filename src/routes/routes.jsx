import ErrorPage from '../error-page';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import React from 'react';
import ProfilePage from '../pages/ProfilePage';


const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  }
]

export default routes;