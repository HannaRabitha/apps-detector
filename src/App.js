import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './components/home';
import Menu from './components/menu';
import About from './components/about';
import Help from './components/help';
import Deteksi from './components/deteksi';
import Roboflow from './components/Roboflow';

export default function App() {
  let element = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/menu', element: <Menu /> },
    { path: '/help', element: <Help /> },
    { path: '/detect', element: <Deteksi /> },
    {
      path: '/detect2',
      element: <Roboflow />,
    },
  ]);

  return element;
}
