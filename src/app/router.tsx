import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout';
import { AllocatedDOPage } from '../features/delivery-order/AllocatedDOPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/outbound/create-do" replace />,
      },
      {
        path: 'outbound/create-do',
        element: <AllocatedDOPage />,
      },
    ],
  },
]);
