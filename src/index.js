import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './pages/Home'
import HeroPage from './pages/HeroPage'
import ToggleMode from './components/ToggleMode';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/hero/:id",
    element: <HeroPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ToggleMode />
    <RouterProvider router={router} />
  </React.StrictMode>
);