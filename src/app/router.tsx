import { createBrowserRouter, Navigate } from "react-router-dom"
import { MainLayout } from "../components/layout"
import { AllocatedDOPage } from "../features/delivery-order/AllocatedDOPage"
import { ComingSoonPage } from "../pages/ComingSoon"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/outbound/create-do" replace />,
      },
      {
        path: "dashboard",
        element: <ComingSoonPage />,
      },
      {
        path: "inbound",
        element: <ComingSoonPage />,
      },
      {
        path: "outbound/create-do",
        element: <AllocatedDOPage />,
      },
      {
        path: "inventory/*",
        element: <ComingSoonPage />,
      },
      {
        path: "report/*",
        element: <ComingSoonPage />,
      },
      {
        path: "master/*",
        element: <ComingSoonPage />,
      },
    ],
  },
])
