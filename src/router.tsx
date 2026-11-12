import { createBrowserRouter } from 'react-router';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Animals from '../pages/Animals';
import Visite from '../pages/Visite';
import Reservation from '../pages/Reservation';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'animaux', element: <Animals /> },
      { path: 'preparer-sa-visite', element: <Visite /> },
      { path: 'reservation', element: <Reservation /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
