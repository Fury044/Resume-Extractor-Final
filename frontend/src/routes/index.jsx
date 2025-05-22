import { createBrowserRouter } from 'react-router-dom';
import Upload from '../pages/Upload';
import NotFound from '../pages/NotFound';
import Layout from '../components/Layout';
import Results from '../pages/Results';
import Status from '../pages/Status';

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
        path: 'status',
        element: <Status />,
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