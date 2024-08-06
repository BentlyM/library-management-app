import ErrorPage from '../error-page';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import React from 'react';
import Dashboard from '../pages/DashboardPage';
import DefaultDashPage from '../pages/DefaultDashPage';

const routes = [
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/users/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard/profile/:name',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <DefaultDashPage />,
      },
      {
        path: 'add-book',
        element: <div></div>,
      },
      {
        path: 'current-books',
        element: <div></div>,
      },
      {
        path: 'send-books',
        element: <div></div>,
      },
      {
        path: 'borrow-books',
        element: <div></div>,
      },
      {
        path: 'profile',
        element: <div></div>,
      },
    ],
  },
];

export default routes;
