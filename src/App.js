import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './components/home';
import Menu from './components/menu';
import About from './components/about';
import Help from './components/help';

export default function App() {
  let element = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/menu', element: <Menu /> },
    { path: '/help', element: <Help /> },
  ]);

  return element;
}
