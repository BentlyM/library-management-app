import ErrorPage from '../error-page';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import React from 'react';
import Dashboard from '../pages/DashboardPage';
import DefaultDashPage from '../pages/DefaultDashPage';

const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: 'profile/:name',
        element: <DefaultDashPage />,
      }
    ]
  }
]

export default routes;