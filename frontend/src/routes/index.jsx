import { createBrowserRouter } from 'react-router-dom';
import Upload from '../pages/Upload';
import NotFound from '../pages/NotFound';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Loading from '../pages/Loading';
import Results from '../pages/Results';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Upload />,
      },
      {
        path: 'loading',
        element: <Loading />,
      },
      {
        path: 'status',
        element: <Home />,
      },
      {
        path: 'results',
        element: <Results />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]); 