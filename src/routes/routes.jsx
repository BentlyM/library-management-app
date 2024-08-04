import ErrorPage from '../error-page';
import HomePage from '../pages/HomePage';
import React from 'react';


const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
]

export default routes;