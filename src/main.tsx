import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserPage from './pages/user.page.tsx';
import LayoutAdminComponent from './components/index/layout-admin.component.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdminComponent />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: "users",
        element: <UserPage />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
